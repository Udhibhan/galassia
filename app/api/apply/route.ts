import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { teams as TEAMS, years as YEARS } from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Vercel caps serverless request bodies at 4.5 MB, so keep resumes under 4 MB.
const MAX_RESUME_BYTES = 4 * 1024 * 1024;
const NUS_EMAIL = /^[a-z0-9._%+-]+@(u\.nus\.edu|nus\.edu\.sg)$/i;
const TEAM_IDS = new Set<string>(TEAMS.map((t) => t.id));
const YEAR_SET = new Set<string>(YEARS);

function bad(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

function str(form: FormData, key: string) {
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return bad("Could not read the form. Is the resume under 4 MB?");
  }

  // Honeypot: real users never see or fill this field.
  if (str(form, "company")) return NextResponse.json({ ok: true });

  const fullName = str(form, "fullName");
  const email = str(form, "email").toLowerCase();
  const year = str(form, "year");
  const major = str(form, "major");
  const why = str(form, "why");
  const links = str(form, "links");
  const teams = form
    .getAll("teams")
    .filter((t): t is string => typeof t === "string" && TEAM_IDS.has(t));
  const resume = form.get("resume");

  if (!fullName || fullName.length > 120) return bad("Please enter your name.");
  if (!NUS_EMAIL.test(email)) return bad("Please use your NUS email (@u.nus.edu or @nus.edu.sg).");
  if (!YEAR_SET.has(year)) return bad("Please pick your year of study.");
  if (!major || major.length > 120) return bad("Please enter your major.");
  if (teams.length === 0) return bad("Pick at least one team you're interested in.");
  if (why.length < 20) return bad("Tell us a little more about why you're interested (20+ characters).");
  if (why.length > 3000) return bad("Please keep your answer under 3000 characters.");
  if (links.length > 500) return bad("Links field is too long.");
  if (!(resume instanceof File) || resume.size === 0) return bad("Please attach your resume as a PDF.");
  if (resume.size > MAX_RESUME_BYTES) return bad("Resume must be under 4 MB.");

  const bytes = Buffer.from(await resume.arrayBuffer());
  if (bytes.subarray(0, 5).toString("latin1") !== "%PDF-") return bad("Resume must be a PDF file.");

  let db;
  try {
    db = supabaseAdmin();
  } catch (e) {
    console.error(e);
    return bad("Applications are temporarily unavailable.", 503);
  }

  const { data: existing } = await db
    .from("applications")
    .select("id")
    .eq("email", email)
    .maybeSingle();
  if (existing) return bad("Looks like you've already applied with this email. We'll be in touch!", 409);

  const resumePath = `${new Date().getFullYear()}/${randomUUID()}.pdf`;
  const upload = await db.storage
    .from("resumes")
    .upload(resumePath, bytes, { contentType: "application/pdf", upsert: false });
  if (upload.error) {
    console.error("resume upload failed", upload.error);
    return bad("Could not upload your resume. Please try again.", 500);
  }

  const insert = await db.from("applications").insert({
    full_name: fullName,
    email,
    year,
    major,
    teams,
    why,
    links: links || null,
    resume_path: resumePath,
  });

  if (insert.error) {
    await db.storage.from("resumes").remove([resumePath]);
    if (insert.error.code === "23505") {
      return bad("Looks like you've already applied with this email. We'll be in touch!", 409);
    }
    console.error("insert failed", insert.error);
    return bad("Could not save your application. Please try again.", 500);
  }

  return NextResponse.json({ ok: true });
}
