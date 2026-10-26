// ---------------------------------------------------------------------------
// SINGLE SOURCE OF TRUTH for site content.
//
// Every name, photo, sponsor, stat, and paragraph of copy on the website
// lives in this one file. To update the site, edit the values below —
// you do not need to touch any component or page file.
//
// Photos/logos are plain paths into the `public/` folder (e.g. "/team/jane.jpg").
// Leave a photo/logo as "" until you have the real file — the site will show
// a clearly labeled placeholder instead of a broken image.
// ---------------------------------------------------------------------------

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
  email?: string;
}

export interface Stat {
  label: string;
  value: string;
}

export interface TeamMember {
  name: string;
  role?: string;
  major: string;
  gradYear: string;
  /** Additional degrees beyond the primary major/gradYear (e.g. a dual-degree student finishing an MBA later). */
  additionalDegrees?: { major: string; gradYear: string }[];
  photo: string;
  linkedin?: string;
  bio?: string;
  /** Zoom multiplier applied to the photo so every subject reads at a consistent size. Defaults to 1. */
  photoScale?: number;
  /** CSS transform-origin for the zoom, e.g. "50% 15%". Defaults to "50% 20%". */
  photoPosition?: string;
  /** Backdrop color revealed when photoScale < 1 letterboxes the image. Matches the photoshoot's wood backdrop. */
  photoBg?: string;
}

export interface Subteam {
  name: string;
  members: TeamMember[];
}

export interface CarSpec {
  label: string;
  value: string;
}

export interface CarSystem {
  name: string;
  description: string;
}

export interface CompetitionGoal {
  result: string;
  competition: string;
  date?: string;
  location?: string;
}

export interface Car {
  id: string;
  name: string;
  year: string;
  category: string;
  tagline?: string;
  photo: string;
  heroPhoto?: string;
  specs: CarSpec[];
  features: string[];
  systems?: CarSystem[];
  goals?: CompetitionGoal[];
}

export interface Sponsor {
  name: string;
  logo: string;
  url?: string;
}

export interface SponsorTier {
  tier: string;
  blurb?: string;
  sponsors: Sponsor[];
}

export interface GalleryItem {
  caption: string;
  /** Competition season the photo is from, as a paired school year (e.g. "25-26"). Powers the year picker on the Gallery page. */
  year: string;
  photo: string;
  /** Intrinsic pixel dimensions — drive the masonry grid's aspect ratio for each tile. */
  width: number;
  height: number;
}

export interface ValueCard {
  title: string;
  description: string;
}


export interface Subsystem {
  name: string;
  description: string;
}

export interface JoinStep {
  title: string;
  description: string;
}

export interface Meeting {
  day: string;
  title: string;
  description: string;
  time: string;
  location: string;
}

const social: SocialLinks = {
  instagram: "https://www.instagram.com/rensselaer_motorsport",
  facebook: "https://www.facebook.com/RPIFSAE/",
  linkedin: "https://www.linkedin.com/company/rensselaer-motorsport/",
  youtube: "https://www.youtube.com/@rensselaermotorsport",
  email: "mailto:admin@rensselaermotorsport.com",
};

export const site = {
  meta: {
    name: "Rensselaer Motorsport",
    shortName: "RMS",
    tagline: "Design. Build. Race.",
    description:
      "Rensselaer Motorsport is RPI's student-run Formula SAE team, designing, building, and racing a formula-style car from the ground up every season.",
    // "light" = dark wordmark for use on white/light backgrounds (header, footer forms, etc.)
    // "dark" = light wordmark (as shipped) for use on black/dark backgrounds (footer, dark sections)
    logo: "/rm-logo-light.png",
    logoDark: "/rm-logo.png",
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Cars", href: "/the-car" },
    { label: "Team", href: "/team" },
    { label: "Sponsors", href: "/sponsors" },
    { label: "Contact", href: "/contact" },
    { label: "Gallery", href: "/gallery" },
  ] satisfies NavLink[],

  joinCta: { label: "Get Involved", href: "/join" } satisfies NavLink,
  donateCta: { label: "Donate", href: "/donate" } satisfies NavLink,

  social,

  hero: {
    eyebrow: "Rensselaer Polytechnic Institute - Formula SAE",
    headline: "RENSSELAER MOTORSPORT",
    subheadline:
      "A student-run engineering team designing, building, and racing a formula-style car from scratch - every year, from the ground up.",
    primaryCta: { label: "Join the Team", href: "/join" } satisfies NavLink,
    secondaryCta: { label: "Meet the Car", href: "/the-car" } satisfies NavLink,
    image: { src: "/background.png", alt: "Rensselaer Motorsport car on track, hero shot" },
  },

  video: {
    // Paste a YouTube/Vimeo embed URL here (e.g. "https://www.youtube.com/embed/VIDEO_ID").
    // Leave blank and the homepage will show a clearly labeled placeholder instead.
    url: "https://player.vimeo.com/video/1137944844",
    title: "Rensselaer Motorsport - Season Recap",
  },

  homeCards: [
    {
      title: "Who We Are",
      description:
        "A student-run engineering team designing, building, and racing a formula-style car from the ground up every season.",
      href: "/about",
      cta: "About the Team",
    },
    {
      title: "Meet the Car",
      description:
        "See the specs, systems, and engineering decisions behind this year's competition car.",
      href: "/the-car",
      cta: "View the Car",
    },
    {
      title: "Join the Team",
      description:
        "No experience required. Engineering, business, and manufacturing roles are open to all majors and class years.",
      href: "/join",
      cta: "Get Involved",
    },
    {
      title: "Our Sponsors",
      description:
        "Rensselaer Motorsport runs on the generous support of 40+ industry partners and sponsors.",
      href: "/sponsors",
      cta: "View Sponsors",
    },
    {
      title: "Gallery",
      description:
        "Moments from the shop, the track, and everywhere in between - see the build come together.",
      href: "/gallery",
      cta: "View Gallery",
    },
  ] satisfies { title: string; description: string; href: string; cta: string }[],

  sponsorPacket: {
    url: "/sponsor-packet.pdf",
    label: "View Sponsor Packet",
  },

  whySponsor: {
    intro:
      "Building a competition race car would not be possible without the generosity of sponsors and partners like you. We accept cash donations as well as in-kind parts, materials, and tools - all cash donations are tax-deductible, as we are a 501(c)3 organization.",
    benefits: [
      "Logo placement on our race car and website",
      "Invitations to team events and competitions",
      "Logo on team merchandise",
      "Access to our student engineering resume pool",
      "Featured recognition on social media",
      "Access to our monthly newsletter",
    ],
  },

  contact: {
    intro:
      "Have a question, want to sponsor the team, or just want to say hello? Reach out - we'd love to hear from you.",
    email: "admin@rensselaermotorsport.com",
    address: "Rensselaer Polytechnic Institute, Troy, NY",
    // Web3Forms access key (from web3forms.com, confirmed to the email above).
    // The contact form POSTs directly to Web3Forms with this key, so submissions
    // land in that inbox without opening the visitor's email client. Paste the
    // key here once you have it; leave blank and the form falls back to mailto.
    web3FormsAccessKey: "",
    meetings: [
      {
        day: "Every Tuesday",
        title: "Engineering Meeting",
        description:
          "Our weekly engineering meetings go in depth about the car's development and allow the team to participate in design reviews.",
        time: "7:00 PM – 8:00 PM",
        location: "Sage 3101",
      },
      {
        day: "Every Wednesday",
        title: "General Team Meeting",
        description:
          "Our weekly meeting, where we update the entire team about admin, business, and engineering updates.",
        time: "7:00 PM – 7:30 PM",
        location: "Ricketts 203",
      },
      {
        day: "Every Friday",
        title: "Shop Open Hours",
        description:
          "Our shop is open many times during the week, but you can find the most people in shop on Friday evenings.",
        time: "7:00 PM – 12:00 AM",
        location: "2368 Burdett Ave",
      },
    ] satisfies Meeting[],
  },

  donate: {
    intro:
      "Rensselaer Motorsport is a student-funded team - every donation goes directly toward materials, manufacturing, and competition travel.",
    // RPI's official giving portal. Verify this is still the correct fund/URL before relying on it.
    url: "https://giving.rpi.edu/",
    instructions:
      "When you give through the Rensselaer giving site, use the comments/designation field at checkout and write \"Rensselaer Motorsport\" (RPI Formula SAE) so your gift is directed to our team.",
  },

  about: {
    heroImage: { src: "/team-background.jpg", alt: "The Rensselaer Motorsport team with car #27" },
    memberCount: "32+",
    intro: [
      "Rensselaer Motorsport is a student-run engineering team at Rensselaer Polytechnic Institute competing in Formula SAE, an international collegiate design competition where teams design, build, and race a small formula-style race car.",
      "Beyond the car itself, members run every part of the operation - engineering, manufacturing, business, and sponsorship - giving students hands-on experience they can't get in a classroom.",
    ],
    // Condensed synopsis for the About page hero/intro block.
    aboutUs:
      "Rensselaer Motorsport is Rensselaer Polytechnic Institute's student-run Formula SAE team, made up of 32+ undergraduate engineers and business students who design, build, and race a formula-style car from the ground up every season. The team operates like a small startup - every subsystem, from the chassis to the electrical system, is designed, manufactured, and validated in-house by students, alongside the business and sponsorship operation that funds it all. Members join with no prior experience required and leave with hands-on engineering, manufacturing, and project-management experience that classroom coursework alone can't provide.",
    whatIsFsae: {
      title: "What is FSAE?",
      body: "Formula SAE is an international collegiate engineering design competition organized by SAE International. Student teams from universities around the world design, build, test, and race a small formula-style race car, then bring it to competition to be evaluated against other schools. Cars are judged on a mix of static events - cost, engineering design, and a business/sponsorship presentation - and dynamic events on track, including acceleration, skidpad, autocross, endurance, and efficiency. It's a full product-development cycle compressed into a single school year: design, manufacture, validate, and race.",
    },
    ourWork: {
      title: "Our Work",
      body: "Every year, Rensselaer Motorsport designs and manufactures a new competition car from a blank sheet - running the full engineering cycle of concept, CAD, analysis, manufacturing, and testing, while the business team secures sponsorship, manages budget, and prepares the cost and presentation events that are judged alongside the car itself.",
    },
    values: [
      {
        title: "Engineering Excellence",
        description:
          "Every subsystem is designed, analyzed, and validated by students, applying classroom theory to a real, competing vehicle.",
      },
      {
        title: "Hands-On Learning",
        description:
          "Members machine parts, wire electronics, and turn wrenches - learning by building, testing, and racing.",
      },
      {
        title: "One Team",
        description:
          "Engineering and business members work side by side, because a competitive car needs both a strong design and a strong program behind it.",
      },
    ] satisfies ValueCard[],
    subsystems: [
      {
        name: "Vehicle Dynamics & Suspension",
        description: "Suspension geometry, kinematics, and handling balance.",
      },
      { name: "Chassis", description: "Structural frame design, safety, and manufacturing." },
      { name: "Aerodynamics", description: "Aero packages for downforce and cooling." },
      {
        name: "EV & High Voltage",
        description: "Motor, inverter, and high-voltage system integration.",
      },
      {
        name: "Tractive Battery",
        description: "Battery pack design, cell selection, and accumulator safety.",
      },
      { name: "Low Voltage", description: "Vehicle electronics, sensors, and data acquisition." },
      { name: "Drivetrain", description: "Power delivery from motor to wheels." },
      { name: "Ergonomics", description: "Driver interface, cockpit layout, and controls." },
      {
        name: "Business & Sponsorship",
        description: "Budget, partnerships, and the cost/business competition events.",
      },
    ] satisfies Subsystem[],
    foundingYear: 1992,
    history:
      "Rensselaer Motorsport has represented RPI in SAE International's Formula SAE competition since 1992, evolving over more than 30 years from an internal-combustion platform to today's electric race car. At the 2025 Formula Hybrid + Electric competition, the team placed 7th overall - 16th in design and 10th in business among static events, and 9th in acceleration, 6th in autocross, and 3rd in endurance among dynamic events. At FSAE Electric, the team finished 50th overall in 2025, 47th in 2024, and 42nd in 2023.",
    majors: [
      "Aeronautical Engineering",
      "Computer Science",
      "Computer Systems Engineering",
      "Design, Innovation, and Society",
      "Electrical Engineering",
      "Materials Engineering",
      "Mathematics",
      "Mechanical Engineering",
    ],
    alumniEmployers: [
      "Tesla",
      "GM",
      "Rivian",
      "Ford",
      "Haas",
      "Honda Racing",
      "Boeing",
      "BAE Systems",
      "SpaceX",
      "Lockheed Martin",
      "Amazon",
    ],
  },

  stats: [
    { label: "Cars Built", value: "29" },
    { label: "Years Competing", value: "-" },
    { label: "Active Members", value: "32+" },
    { label: "Sponsors & Partners", value: "-" },
  ] satisfies Stat[],

  team: [
    {
      name: "Team Leadership",
      members: [
        {
          name: "Cameron Quail",
          role: "Team Lead",
          major: "Aeronautical/Aerospace & Mechanical Engineering",
          gradYear: "2028",
          photo: "/Headshots/cam1.jpg",
          linkedin: "https://www.linkedin.com/in/cameronquail/",
        },
        {
          name: "Abel Arellano",
          role: "Vehicle Dynamics Lead",
          major: "Aeronautical/Aerospace Engineering",
          gradYear: "2028",
          photo: "/Headshots/abel.jpg",
          linkedin: "https://www.linkedin.com/in/abel-arellano-a3a3a4339/",
        },
        {
          name: "Alexander Ethier",
          role: "EV Lead, High Voltage Lead",
          major: "Electrical & Computer Science Engineering",
          gradYear: "2028",
          photo: "/Headshots/alex e.jpg",
          linkedin: "https://www.linkedin.com/in/alexanderjethier/",
        },
        {
          name: "Alexander Weiss",
          role: "Safety Officer, Junior Suspension Lead",
          major: "Aeronautical/Aerospace & Mechanical Engineering",
          gradYear: "2028",
          photo: "/Headshots/alex w.jpg",
          linkedin: "https://www.linkedin.com/in/alexander-weiss-ct/",
          photoScale: 1.35,
        },
        {
          name: "Ben Dingman",
          role: "Business Lead",
          major: "Design Innovation and Society & Communication, Media, and Design",
          gradYear: "2028",
          photo: "/Headshots/ben.jpg",
          linkedin: "https://www.linkedin.com/in/benjamin-dingman-509570357/",
        },
        {
          name: "Nicholas Cummings",
          role: "CIO",
          major: "Mechanical Engineering",
          gradYear: "2027",
          photo: "/Headshots/nick.jpg",
          linkedin: "https://www.linkedin.com/in/nicholas--cummings/",
        },
      ],
    },
    {
      name: "Electric Vehicle Team",
      members: [
        {
          name: "Emma Platts",
          role: "Senior Tractive Battery Lead",
          major: "Materials Engineering & Chemistry",
          gradYear: "2028",
          photo: "/Headshots/emma.jpg",
          linkedin: "https://www.linkedin.com/in/emma-m-platts/",
        },
        {
          name: "Henry Blount",
          role: "Low Voltage Lead",
          major: "Electrical Engineering",
          gradYear: "2029",
          photo: "/Headshots/henry.jpg",
          linkedin: "https://www.linkedin.com/in/henry-blount-978a59348/",
          photoScale: 1.15,
        },
        {
          name: "Joey Marchand",
          role: "All Wheel Drive R&D Lead",
          major: "Mechanical Engineering",
          gradYear: "2027",
          photo: "/Headshots/joey.jpg",
          linkedin: "https://www.linkedin.com/in/joey-marchand/",
        },
        {
          name: "Yulin Du",
          role: "Drivetrain Lead",
          major: "Mechanical Engineering",
          gradYear: "2029",
          photo: "/Headshots/yulin.jpg",
          linkedin: "https://www.linkedin.com/in/yulin-du/",
        },
        {
          name: "Colby Giunta",
          role: "Junior Tractive Battery Lead",
          major: "Electrical Engineering",
          gradYear: "2029",
          photo: "/Headshots/colby.jpg",
          linkedin: "https://www.linkedin.com/in/colby-giunta-658296371/",
        },
      ],
    },
    {
      name: "Vehicle Dynamics Team",
      members: [
        {
          name: 'Jonathan "JB" Brooks',
          role: "Senior Chassis Lead",
          major: "Mechanical Engineering & Design Innovation and Society",
          gradYear: "2028",
          photo: "/Headshots/jb.jpg",
          linkedin: "https://www.linkedin.com/in/jbooks06/",
        },
        {
          name: "Theodore Racz",
          role: "Aero Lead",
          major: "Mechanical Engineering",
          gradYear: "2027",
          photo: "/Headshots/theo.jpg",
          linkedin: "https://www.linkedin.com/in/theodore-racz-560605293/",
        },
        {
          name: "Zayd Farjo",
          role: "Senior Suspension Lead",
          major: "Mechanical Engineering",
          gradYear: "2026",
          additionalDegrees: [{ major: "Master of Business Administration", gradYear: "2028" }],
          photo: "/Headshots/zayd.jpg",
          linkedin: "https://www.linkedin.com/in/zayd-farjo-a2a983254/",
        },
        {
          name: "Amalan Narashimman",
          role: "Ergonomics Lead",
          major: "Mechanical Engineering",
          gradYear: "2028",
          photo: "/Headshots/amalan.jpg",
          linkedin: "https://www.linkedin.com/in/amalannarashimman/",
          photoScale: 1.15,
        },
        {
          name: "Arfan Shikder",
          role: "JigBoy",
          major: "Mechanical Engineering",
          gradYear: "2029",
          photo: "/Headshots/arfan.jpg",
          linkedin: "https://www.linkedin.com/in/arfan-shikder-029b1a280/",
        },
      ],
    },
    {
      name: "Full Members",
      members: [
        {
          name: "Joshua Levy",
          major: "Mechanical Engineering",
          gradYear: "2028",
          photo: "/Headshots/driver.jpg",
          linkedin: "https://www.linkedin.com/in/joshua-g-levy/",
        },
        {
          name: "Aaron Wang",
          major: "Electrical Engineering",
          gradYear: "2028",
          photo: "/Headshots/aaron.jpg",
          linkedin: "https://www.linkedin.com/in/aaron-wang-aa6bba388/",
        },
        {
          name: "Alexander Singer",
          major: "Electrical Engineering",
          gradYear: "2029",
          photo: "/Headshots/alex s.jpg",
          linkedin: "https://www.linkedin.com/in/alexander-singer-5ba391289/",
        },
        {
          name: "Bennet Strong Sarmiento",
          major: "Mechanical Engineering",
          gradYear: "2029",
          photo: "/Headshots/driver.jpg",
          linkedin: "https://www.linkedin.com/in/bennet-strong-ba551a3a7/",
        },
        {
          name: "Blake Hopper",
          major: "Electrical Engineering",
          gradYear: "2026",
          photo: "/Headshots/driver.jpg",
          linkedin: "https://www.linkedin.com/in/bhopper/",
        },
        {
          name: "Debarshi Sen",
          major: "Mechanical Engineering",
          gradYear: "2028",
          photo: "/Headshots/driver.jpg",
          linkedin: "https://www.linkedin.com/in/debarshisen/",
        },
        {
          name: "Jay Sen",
          major: "Mechanical Engineering",
          gradYear: "2029",
          photo: "/Headshots/jay.jpg",
          linkedin: "https://www.linkedin.com/in/jaymsen/",
        },
        {
          name: 'Hung Xuan "Simon" Ngo',
          major: "Electrical Engineering",
          gradYear: "2029",
          photo: "/Headshots/driver.jpg",
          linkedin: "https://www.linkedin.com/in/hung-xuan-ngo-181940388/",
        },
        {
          name: "Kimberly Pascual",
          major: "Mechanical Engineering",
          gradYear: "2029",
          photo: "/Headshots/driver.jpg",
          linkedin: "https://www.linkedin.com/in/kimberly-pascual-14929843a/",
        },
        {
          name: "Matthew Riccobono",
          major: "Mechanical Engineering",
          gradYear: "2027",
          photo: "/Headshots/matt r1.jpg",
          linkedin: "https://www.linkedin.com/in/matthew-riccobono-645a20313/",
        },
        {
          name: "Matthew Sgritta",
          major: "Mechanical Engineering",
          gradYear: "2027",
          photo: "/Headshots/driver.jpg",
          linkedin: "https://www.linkedin.com/in/matthew-sgritta-5454aa238/",
        },
        {
          name: "Maya Gorse",
          major: "Mechanical Engineering & Design Innovation and Society",
          gradYear: "2027",
          photo: "/Headshots/maya.jpg",
          linkedin: "https://www.linkedin.com/in/maya-gorse/",
        },
        {
          name: "Satvik Mathur",
          major: "Mechanical Engineering",
          gradYear: "2028",
          photo: "/Headshots/driver.jpg",
          linkedin: "https://www.linkedin.com/in/satvik-mathur/",
        },
        {
          name: "Louisa Ersenkal",
          major: "Mechanical Engineering",
          gradYear: "2028",
          photo: "/Headshots/driver.jpg",
          linkedin: "https://www.linkedin.com/in/louisa-ersenkal/",
        },
      ],
    },
  ] satisfies Subteam[],

  cars: [
    {
      id: "current-car",
      name: "RM29",
      year: "2025-2026",
      category: "Formula SAE Electric",
      tagline:
        "RM29 marks our third year competing as a rear-wheel-drive electric vehicle. The team placed 21st overall and won 2nd place in efficiency at FSAE Michigan.",
      photo: "/rollout.jpg",
      heroPhoto: "/Gallery/cardriving2.jpg",
      specs: [
        { label: "Powertrain", value: "107 HP PMSM, 4000 RPM @ 400V" },
        { label: "Horsepower", value: "107 HP" },
        { label: "Weight", value: "490 lb (target)" },
        { label: "0–60 mph", value: "3.5 sec (target)" },
        { label: "Chassis", value: "4130 steel tube-frame" },
      ],
      features: [
        "Custom 80kW battery pack - 400V, 200A Li-Ion accumulator",
        "Carbon fiber aero package (Cl = 2.0, Cd = 1.5)",
        "Custom vehicle control unit built on an STM32F7 chip",
      ],
      systems: [
        {
          name: "Chassis",
          description:
            "A 4130 steel tube-frame space-frame chassis optimized for the maximum torsional-rigidity-to-weight ratio.",
        },
        {
          name: "Suspension & Vehicle Dynamics",
          description:
            "Custom aluminum suspension components with CNC-machined uprights and hubs.",
        },
        {
          name: "Powertrain & Drivetrain",
          description:
            "A 107 HP permanent magnet synchronous traction motor running up to 4000 RPM at 400V.",
        },
        {
          name: "Tractive Battery & High Voltage",
          description:
            "A custom 80kW battery pack - a 400V, 200A Li-Ion accumulator designed and built in-house.",
        },
        {
          name: "Aerodynamics",
          description:
            "A carbon fiber aero package tuned to a coefficient of lift of 2.0 and coefficient of drag of 1.5.",
        },
        {
          name: "Electronics & Data",
          description: "A custom vehicle control unit (VCU) built on an STM32F7 chip.",
        },
      ] satisfies CarSystem[],
      goals: [
        {
          result: "21st Overall, 2nd Place Efficiency",
          competition: "FSAE Michigan",
        },
        {
          result: "5th Place Overall",
          competition: "Formula Hybrid + Electric",
        },
        {
          result: "Scrutineer's Award",
          competition: "Most prepared team for mechanical inspection",
        },
        {
          result: "Test Equity Award",
          competition: "Superior preparation during electrical inspection",
        },
        {
          result: "IEEE Engineering the Future Award",
          competition: "Recognized for excellence in engineering design and vehicle testing",
        },
      ] satisfies CompetitionGoal[],
    },
  ] satisfies Car[],

  upcomingCar: {
    name: "RM30",
    year: "2026-2027",
  },

  sponsors: [
    {
      tier: "Title",
      sponsors: [
        { name: "Hondata", logo: "/sponsors/hondata.webp", url: "https://www.hondata.com/" },
        { name: "Dana", logo: "/sponsors/dana.webp", url: "https://www.dana.com/" },
        {
          name: "BAE Systems",
          logo: "/sponsors/bae systems.webp",
          url: "https://www.baesystems.com/",
        },
        {
          name: "Markforged",
          logo: "/sponsors/markforged.webp",
          url: "https://markforged.com/",
        },
        { name: "Fearless Racing", logo: "/sponsors/fearless racing.webp", url: "" },
        { name: "ANSYS", logo: "/sponsors/ansys.png", url: "https://www.ansys.com/" },
      ],
    },
    {
      tier: "Level 3",
      sponsors: [
        {
          name: "Ice Cutting Edge Metals",
          logo: "/sponsors/ice cutting edge.webp",
          url: "",
        },
        { name: "Rapid Harness", logo: "/sponsors/rapidharness.webp", url: "" },
        {
          name: "Griot's Garage",
          logo: "/sponsors/griots garage.webp",
          url: "https://www.griotsgarage.com/",
        },
        {
          name: "Beast Branch Engineering and Manufacturing",
          logo: "/sponsors/beast branch.webp",
          url: "",
        },
        { name: "NSH USA", logo: "/sponsors/nsh usa.webp", url: "" },
        { name: "Noel's CNC Manufacturing", logo: "/sponsors/noel's cnc.webp", url: "" },
        {
          name: "Kaman Composites",
          logo: "/sponsors/kaman.webp",
          url: "https://www.kaman.com/",
        },
        {
          name: "Saint-Gobain",
          logo: "/sponsors/saint gobain.webp",
          url: "https://www.saint-gobain.com/",
        },
        { name: "Tektronix", logo: "/sponsors/tektronix.webp", url: "https://www.tek.com/" },
        { name: "TI64 Titanium", logo: "/sponsors/ti64.webp", url: "" },
        {
          name: "XCA Advanced Composites Design and Manufacturing",
          logo: "/sponsors/xca.webp",
          url: "",
        },
        { name: "Boeing", logo: "/sponsors/boeing.webp", url: "https://www.boeing.com/" },
        { name: "Atlas Copco", logo: "/sponsors/atlascopco.png", url: "https://www.atlascopco.com/" },
      ],
    },
    {
      tier: "Level 2",
      sponsors: [
        { name: "Ducommun", logo: "/sponsors/ducommun.webp", url: "https://www.ducommun.com/" },
        { name: "AMGIO", logo: "/sponsors/amgio.webp", url: "" },
        { name: "Acronis", logo: "/sponsors/acronis.webp", url: "https://www.acronis.com/" },
        { name: "Axcel", logo: "/sponsors/axcel.webp", url: "" },
        {
          name: "Oakwood Bible Church",
          logo: "/sponsors/oakwood bible church.webp",
          url: "",
        },
        {
          name: "Lockheed Martin",
          logo: "/sponsors/lockheed martin.webp",
          url: "https://www.lockheedmartin.com/",
        },
        { name: "Cartesian", logo: "/sponsors/cartesian.webp", url: "" },
        { name: "Holley", logo: "/sponsors/holley.webp", url: "https://www.holley.com/" },
        { name: "PMC Race Cars", logo: "/sponsors/pmc race cars.webp", url: "" },
        {
          name: "Powder Tech Custom Powder-Coated Finishes",
          logo: "/sponsors/powdertech.webp",
          url: "",
        },
        {
          name: "RBC Bearings",
          logo: "/sponsors/rbc bearings.webp",
          url: "https://www.rbcbearings.com/",
        },
        {
          name: "Sandvik Coromant",
          logo: "/sponsors/sandvik.webp",
          url: "https://www.sandvik.coromant.com/",
        },
        {
          name: "Gene Haas Foundation",
          logo: "/sponsors/gene haas foundation.webp",
          url: "https://www.genehaasfoundation.org/",
        },
        { name: "SimScale", logo: "/sponsors/simscale.webp", url: "https://www.simscale.com/" },
        {
          name: "Simpson",
          logo: "/sponsors/simpson.webp",
          url: "https://www.simpsonraceproducts.com/",
        },
        { name: "Siemens", logo: "/sponsors/siemens.webp", url: "https://www.siemens.com/" },
        { name: "SKF", logo: "/sponsors/skf.webp", url: "https://www.skf.com/" },
        {
          name: "SOLIDWORKS",
          logo: "/sponsors/solidworks.webp",
          url: "https://www.solidworks.com/",
        },
        { name: "VI-Grade", logo: "/sponsors/vi-grade.webp", url: "https://www.vi-grade.com/" },
        { name: "About Energy", logo: "/sponsors/aboutenergy.png", url: "" },
      ],
    },
    {
      tier: "Level 1",
      sponsors: [
        {
          name: "Rock Krawler Suspension",
          logo: "/sponsors/rock krawler.webp",
          url: "https://www.rockkrawler.com/",
        },
        { name: "ProSpeed RS683", logo: "/sponsors/prospeed rs683.webp", url: "" },
        { name: "Tilton", logo: "/sponsors/tilton.webp", url: "https://www.tiltonracing.com/" },
        {
          name: "HGSI Harold G. Schaevitz Industries",
          logo: "/sponsors/hgsi.png",
          url: "",
        },
      ],
    },
  ] satisfies SponsorTier[],

  // Every school year shown in the Gallery page's year picker, oldest first.
  // Add a year here before adding its photos below and it'll show up in the
  // picker (even with no photos yet); years with photos get a populated section.
  galleryYears: ["17-18", "22-23", "23-24", "24-25", "25-26"],

  gallery: [
    { caption: "Car #86 on the RPI quad", year: "25-26", photo: "/Gallery/car.jpg", width: 4897, height: 3266 },
    {
      caption: "Car #86 with the team's competition awards", year: "25-26",
      photo: "/Gallery/car1.jpg",
      width: 8192,
      height: 5464,
    },
    {
      caption: "Autocross in the rain", year: "25-26",
      photo: "/Gallery/cardriving.JPG",
      width: 6000,
      height: 4000,
    },
    { caption: "On course", year: "25-26", photo: "/Gallery/cardriving1.JPG", width: 6000, height: 4000 },
    { caption: "On track", year: "25-26", photo: "/Gallery/cardriving2.jpg", width: 4892, height: 3270 },
    {
      caption: "Taking the corner", year: "25-26",
      photo: "/Gallery/cardriving3.jpg",
      width: 2048,
      height: 1366,
    },
    { caption: "Trackside", year: "25-26", photo: "/Gallery/DSC00834.JPG", width: 6000, height: 4000 },
    { caption: "Competition weekend", year: "25-26", photo: "/Gallery/DSC01951.JPG", width: 6000, height: 4000 },
    { caption: "In the paddock", year: "25-26", photo: "/Gallery/DSC02166.JPG", width: 6000, height: 4000 },
    { caption: "Pit lane", year: "25-26", photo: "/Gallery/DSC02384.JPG", width: 6000, height: 4000 },
    { caption: "Tech inspection", year: "25-26", photo: "/Gallery/DSC03563.JPG", width: 6000, height: 4000 },
    { caption: "Race day", year: "25-26", photo: "/Gallery/DSC03778.JPG", width: 6000, height: 4000 },
    { caption: "The team at the track", year: "25-26", photo: "/Gallery/DSC04827.JPG", width: 6000, height: 4000 },
    { caption: "Getting ready to run", year: "25-26", photo: "/Gallery/DSC04831.JPG", width: 6000, height: 4000 },
    { caption: "On the grid", year: "25-26", photo: "/Gallery/DSC04867.JPG", width: 6000, height: 4000 },
    { caption: "Final checks", year: "25-26", photo: "/Gallery/FD1A4349.jpg", width: 2048, height: 1366 },
    {
      caption: "Pre-run safety check", year: "25-26",
      photo: "/Gallery/FD1A4452.jpg",
      width: 1366,
      height: 2048,
    },
    { caption: "Setup in the paddock", year: "25-26", photo: "/Gallery/FD1A4492.jpg", width: 2048, height: 1365 },
    { caption: "Rolling to the grid", year: "25-26", photo: "/Gallery/FD1A6523.jpg", width: 1366, height: 2048 },
    {
      caption: "Buckled in and ready to drive", year: "25-26",
      photo: "/Gallery/FD1A6543.jpg",
      width: 4897,
      height: 3266,
    },
    { caption: "Working in the pits", year: "25-26", photo: "/Gallery/FD1A6998.jpg", width: 2048, height: 1366 },
    {
      caption: "Showcasing the car at an expo", year: "25-26",
      photo: "/Gallery/FD1A9847.jpg",
      width: 2048,
      height: 1366,
    },
    { caption: "Under the lights", year: "25-26", photo: "/Gallery/IMG_0289.PNG", width: 2001, height: 3000 },
    {
      caption: "Pre-run checks in the paddock", year: "25-26",
      photo: "/Gallery/PHO00053.JPG",
      width: 4000,
      height: 2250,
    },
    { caption: "The team in the paddock", year: "25-26", photo: "/Gallery/team.jpg", width: 2048, height: 1366 },
  ] satisfies GalleryItem[],

  join: {
    intro:
      "Rensselaer Motorsport is always looking for motivated students - no experience required. Whether your interest is engineering, business, or manufacturing, there's a place for you on the team.",
    steps: [
      {
        title: "Come to a Meeting",
        description:
          "Come to a weekly Tuesday engineering meeting, Wednesday general meeting, or stop by the shop on a Friday evening and chat with us - see the full schedule on our Contact page.",
      },
      {
        title: "Fill Out Our Interest Form",
        description:
          "Not on campus yet or can't make it to a meeting? Fill out our interest form and we'll follow up with next steps.",
      },
    ] satisfies JoinStep[],
    requirements: [
      "Open to all majors and class years",
      "No prior experience necessary",
      "Willingness to learn and get hands-on",
    ],
    contact: {
      email: "admin@rensselaermotorsport.com",
    },
  },
};

export type Site = typeof site;
