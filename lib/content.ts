// Copy pulled from https://www.galassia.space — edit here to update the site.

export const timeline = [
  {
    title: "Galassia 1",
    tag: "Mission",
    description:
      "Initiated with a pioneering spirit, Galassia 1 embarked on a mission to advance quantum-based communication concepts and enhance ionospheric electron measurement.",
    status: "completed",
    image: "/images/galassia-1.png",
  },
  {
    title: "Galassia 1 Launch",
    tag: "Launch",
    description:
      "Successfully launched from the Satish Dhawan Space Centre in Andhra Pradesh, India.",
    status: "completed",
  },
  {
    title: "Galassia 2",
    tag: "Mission",
    description:
      "Galassia 2's journey began with the vision to provide remote sensing for agriculture and environmental monitoring through the implementation of a multispectral camera.",
    status: "completed",
    image: "/images/galassia-2.png",
  },
  {
    title: "Galassia 2 Launch",
    tag: "Launch",
    description:
      "Successfully launched into orbit from the Satish Dhawan Space Centre near Chennai in southern India.",
    status: "completed",
  },
  {
    title: "Galassia 5",
    tag: "In development",
    description:
      "The newest addition to the series and a cutting-edge technology demonstrator, designed to push the boundaries of space-based AI.",
    status: "in-progress",
    image: "/images/galassia-5.png",
  },
] as const;

export const objectives = [
  {
    k: "01",
    title: "AI Earth observation",
    body: "On-orbit demonstration of AI-powered Earth observation and image processing.",
  },
  {
    k: "02",
    title: "Neural processor in orbit",
    body: "Validation of an onboard Neural Processor Unit in the space environment.",
  },
  {
    k: "03",
    title: "Ku-band direct-to-VSAT",
    body: "Testing of a direct-to-VSAT Ku-band radio downlink for high-speed data transmission.",
  },
] as const;

export const conops = [
  "Galassia 5 overflies a User Vessel (UV) in the ocean",
  "UV tasks the satellite, requesting an image of an Area of Interest",
  "Satellite acquires an image of the Area of Interest",
  "Onboard AI identifies surrounding vessels and their position",
  "Positions and vessel images are downlinked back to the UV over Ku-band",
] as const;

export const specs = [
  { title: "Bus Configuration", value: "6U", lines: ["Standard 6U CubeSat form factor"] },
  {
    title: "Dimensions",
    value: "340.5 × 226.3 × 116 mm",
    lines: ["Optimized for launch vehicle compatibility"],
  },
  { title: "Mass", value: "9 kg", lines: ["Estimated, including all subsystems and payload"] },
  {
    title: "Communications",
    value: "Multi-band",
    lines: ["TT&C: S-band (2222 MHz TBD)", "Payload downlink: Ku, X", "Payload uplink: S (high speed)"],
  },
  { title: "Power", value: "75 W peak", lines: ["Li-ion 8S1P battery", "GaAs DHV solar panels"] },
  { title: "Flight Computer", value: "AVR32", lines: ["High-performance embedded computing platform"] },
  {
    title: "Attitude Control",
    value: "3-axis stabilized",
    lines: ["Determination: Mag, Gyro, CSS, FSS", "Actuators: MTQ + RW (3-axis)", "GPS navigation"],
  },
  {
    title: "Payload",
    value: "AI-enabled",
    lines: ["ARM/FPGA architecture", "SDR + BUC 14 GHz", "Hailo-8L + YOLOv8"],
  },
  { title: "Orbit", value: "550 km SSO", lines: ["Sun-synchronous orbit for optimal Earth observation"] },
] as const;

export const ticker = [
  "6U CubeSat",
  "550 km sun-synchronous orbit",
  "Ku-band downlink",
  "Hailo-8L neural processor",
  "YOLOv8 onboard",
  "75 W peak power",
  "3-axis stabilized",
  "Made at NUS",
];

// Sub-teams applicants can pick from. Adjust to match how the team is actually organised.
export const teams = [
  { id: "payload-ai", name: "Payload & AI", blurb: "Train and deploy vessel-detection models on the Hailo-8L at the edge of space." },
  { id: "comms", name: "Communications", blurb: "S-band TT&C, the Ku-band SDR downlink and the ground segment." },
  { id: "adcs", name: "ADCS & GNC", blurb: "Point a 9 kg spacecraft with magnetorquers, reaction wheels and GPS." },
  { id: "power", name: "Power", blurb: "Solar arrays, the 8S1P battery pack and power distribution." },
  { id: "software", name: "Flight Software", blurb: "Onboard computer, scheduling, fault handling and telemetry." },
  { id: "structures", name: "Structures & Thermal", blurb: "Mechanical design, integration and surviving launch and vacuum." },
  { id: "ops", name: "Outreach & Ops", blurb: "Partnerships, design, media and keeping the mission moving." },
] as const;

export const years = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5+", "Masters", "PhD"] as const;
