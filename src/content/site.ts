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
  /** RPI email, shown as an Email button on the team card. */
  email?: string;
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

/** One competition's results for a car, e.g. "Formula SAE Electric 2026" -> 21st Place Overall, ... */
export interface CompetitionResult {
  competition: string;
  results: { title: string; detail?: string }[];
}

export interface Car {
  id: string;
  name: string;
  year: string;
  category: string;
  tagline?: string;
  photo: string;
  heroPhoto?: string;
  /** CSS object-position for the lineup card photo, e.g. "left center" when the car runs to one edge. */
  photoPosition?: string;
  /**
   * Box around the car in the card photo, as fractions of the image (0-1), plus the image's
   * width/height ratio. The card zooms so this box fills as much of the frame as it can while
   * staying fully visible. Overrides photoPosition.
   */
  photoCrop?: { x: number; y: number; w: number; h: number; aspect: number };
  specs: CarSpec[];
  features: string[];
  systems?: CarSystem[];
  results?: CompetitionResult[];
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
    // logoDark trimmed to the lettering (the full file has wide transparent margins), for the header.
    logoDarkTrimmed: "/rm-logo-wordmark.png",
    // Public address of the live site, used for the sitemap, robots.txt, canonical URLs and
    // link previews. Update this if the site moves to a custom domain.
    url: "https://rensselaermotorsport.vercel.app",
    // Image shown when a page link is shared (iMessage, Slack, social posts).
    shareImage: "/RM29/car.jpg",
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
    eyebrow: "Rensselaer Polytechnic Institute Formula SAE",
    headline: "RENSSELAER MOTORSPORT",
    subheadline:
      "A student-run engineering team designing, building, and racing an electric formula-style race car—from scratch, every year.",
    primaryCta: { label: "Join the Team", href: "/join" } satisfies NavLink,
    secondaryCta: { label: "Meet the Car", href: "/the-car" } satisfies NavLink,
    // TEMP preview: original was "/background.png"
    image: { src: "/RM29/car.jpg", alt: "Rensselaer Motorsport car on track, hero shot" },
  },

  video: {
    // Self-hosted MP4 in /public (e.g. "/video/recap-1080.mp4"). Preferred over the embed below:
    // it starts much faster on phones and autoplays without Vimeo's player. srcMobile is an
    // optional smaller encode served below the lg breakpoint. Leave src blank to use the embed.
    src: "",
    srcMobile: "",
    // Vimeo embed URL, used only when src is blank. If both are blank the homepage shows a
    // clearly labeled placeholder instead.
    url: "https://player.vimeo.com/video/1137944844",
    title: "Rensselaer Motorsport - Season Recap",
    // Still frame shown until the player loads (it only loads once scrolled near).
    poster: "/video-poster.jpg",
  },

  homeCards: [
    {
      title: "Who We Are",
      description:
        "A student-run engineering team designing, building, and racing a formula-style car from the ground up every season.",
      href: "/about",
      image: "/RM29/team.jpg",
      cta: "About the Team",
    },
    {
      title: "Meet the Car",
      description:
        "See the specs, systems, and engineering decisions behind this year's competition car.",
      href: "/the-car",
      image: "/RM29/DSC01663.JPG",
      cta: "View the Car",
    },
    {
      title: "Join the Team",
      description:
        "No experience required. Engineering, business, and manufacturing roles are open to all majors and class years.",
      href: "/join",
      image: "/RM29/DSC04831.JPG",
      cta: "Get Involved",
    },
    {
      title: "Our Sponsors",
      description: "Rensselaer Motorsport runs on the generous support of our industry partners and sponsors.",
      href: "/sponsors",
      image: "/RM29/car.jpg",
      cta: "View Sponsors",
    },
    {
      title: "Gallery",
      description:
        "Moments from the shop, the track, and everywhere in between—see the build come together.",
      href: "/gallery",
      image: "/RM29/FD1A1699.jpg",
      cta: "View Gallery",
    },
  ] satisfies { title: string; description: string; href: string; cta: string; image: string }[],

  sponsorPacket: {
    url: "/Sponsor Packet RM30.pdf",
    label: "View Sponsor Packet",
  },

  whySponsor: {
    intro:
      "Building a competition race car would not be possible without the generosity of sponsors and partners like you. We accept cash donations as well as in-kind parts, materials, and tools—all cash donations are tax-deductible, as we are a 501(c)3 organization.",
    benefits: [
      "Logo placement on our race car and website",
      "Invitations to team events and competitions",
      "Logo on team merchandise",
      "Access to our student resume pool",
      "Featured recognition on social media",
      "Access to our monthly newsletter",
    ],
  },

  contact: {
    intro:
      "Have a question, want to sponsor the team, or just want to say hello? Reach out, we'd love to hear from you!",
    email: "admin@rensselaermotorsport.com",
    address: "Rensselaer Polytechnic Institute, Troy, NY",
    // Web3Forms access key (from web3forms.com, confirmed to the email above).
    // The contact form POSTs directly to Web3Forms with this key, so submissions
    // land in that inbox without opening the visitor's email client. Paste the
    // key here once you have it; leave blank and the form falls back to mailto.
    web3FormsAccessKey: "f5040e48-ab2a-4882-8713-0e145d7e6b41",
    meetings: [
      {
        day: "Every Tuesday",
        title: "General Team Meeting",
        description:
          "Our weekly meeting where we update the entire team about admin, business, and engineering progress.",
        time: "7:00 PM – 8:00 PM",
        location: "Sage 3101",
      },
      {
        day: "Every Wednesday",
        title: "Engineering Meeting",
        description:
          "Our weekly engineering meetings go in depth about the car's development and allow the team to participate in design reviews.",
        time: "7:00 PM – 8:00 PM",
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
      "Rensselaer Motorsport is a student-funded team—every donation goes directly toward materials, manufacturing, and competition travel.",
    // Rensselaer giving form for the team.
    url: "https://securelb.imodules.com/s/1225/lg22/form.aspx?sid=1225&gid=1&pgid=10302&cid=23465",
    instructions:
      "When you give through the RPI giving site, select \"Give to the club(s) of your choice\" and choose \"Rensselaer Motorsport\" so your gift is directed to our team.",
  },

  about: {
    heroImage: { src: "/RM29/team-background.jpg", alt: "The Rensselaer Motorsport team with car #27" },
    intro: [
      "Rensselaer Motorsport is a student-run engineering team at Rensselaer Polytechnic Institute competing in Formula SAE, an international collegiate design competition where teams design, build, and race a small formula-style race car.",
      "Beyond the car itself, members run every part of the operation—engineering, manufacturing, business, and sponsorship—giving students hands-on experience they can't get in a classroom.",
    ],
    // Condensed synopsis for the About page hero/intro block.
    // "{members}" is filled in with the current roster size from `team` below.
    aboutUs:
      "Rensselaer Motorsport is Rensselaer Polytechnic Institute's student-run Formula SAE team, made up of {members} full members including both undergraduate and graduate students who design, build, and race a formula-style car from the ground up every season. The team operates like a small startup—every subsystem, from the chassis to the electrical system, is designed, manufactured, and validated in-house by students, alongside the business and sponsorship operation that funds it all. Members join with no prior experience required and leave with hands-on engineering, manufacturing, and project-management experience that classroom coursework alone cannot provide.",
    whatIsFsae: {
      title: "What is FSAE?",
      body: "Formula SAE is an international collegiate engineering design competition organized by SAE International. Student teams from universities around the world design, build, and test small formula-style race cars, then bring them to competition to be evaluated against other schools. Cars are judged on a mix of static events—cost, engineering design, and a business/sponsorship presentation—and dynamic events on track, including acceleration, skidpad, autocross, endurance, and efficiency. Essentially, the student teams go through the full product-development cycle each school year: design, manufacture, validate, and race.",
    },
    ourWork: {
      title: "Our Work",
      body: "Every year, Rensselaer Motorsport designs and manufactures a new competition car from a blank sheet. The team focuses on maintaining excellent engineering practices, establishing a hands-on learning environment, and emphasizing a collaborative “one team” approach to project management.",
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
          "Members machine parts, wire electronics, and turn wrenches—learning by building, testing, and racing.",
      },
      {
        title: "One Team",
        description:
          "Our engineering and business members work side by side, fostering a collaborative community and allowing everyone to get experience dealing with both the technical and logistical aspects of building a race car.",
      },
    ] satisfies ValueCard[],
    subsystems: [
      { name: "Suspension", description: "Suspension geometry, kinematics, and handling balance." },
      { name: "Chassis", description: "Structural frame design, safety, and manufacturing." },
      {
        name: "Aerodynamics",
        description: "Aerodynamic packages for increased downforce and cornering speeds.",
      },
      {
        name: "High Voltage",
        description: "High-voltage system integration within the tractive battery.",
      },
      {
        name: "Tractive Battery",
        description: "Battery pack design, cell selection, and accumulator safety.",
      },
      { name: "Low Voltage", description: "Vehicle electronics, sensors, and data acquisition." },
      { name: "Drivetrain", description: "Power delivery from the tractive battery to the wheels." },
      { name: "Ergonomics", description: "Driver interface, cockpit layout, and controls." },
      {
        name: "Business",
        description:
          "Budgeting, sponsor outreach and management, purchasing, and the cost/business competition events.",
      },
    ] satisfies Subsystem[],
    foundingYear: 1992,
    // First Formula SAE competition (Michigan 1994, 32nd of 58). The team was founded in 1992.
    firstCompetitionYear: 1994,
    // Seasons with no in-person Formula SAE result (per the FS-Elo results database): no entry in
    // 2010, RM20 broke before Michigan 2013, and 2020-2021 were virtual-only during COVID.
    // yearsCompeting in stats.ts counts every other year from 1994 through the latest result on a
    // car card. It isn't shown right now; add a "Years Competing" stat below to bring it back.
    missedCompetitionYears: [2010, 2013, 2020, 2021],
    history:
      "Founded in 1992, Rensselaer Motorsport has represented RPI in SAE International's Formula SAE competition since 1994. After nearly three successful decades competing in the internal-combustion category of the competition, the team transitioned to an all-electric powertrain for the 2022-2023 academic year.",
    majors: [
      "Aeronautical Engineering",
      "Aerospace Engineering",
      "Business Administration",
      "Chemical Engineering",
      "Civil Engineering",
      "Communication, Media, and Design",
      "Computer Systems Engineering",
      "Design, Innovation, and Society",
      "Electrical Engineering",
      "Materials Engineering",
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
      "Roadster Shop",
      "Sonnax",
      "Nyobolt",
      "Atlas Copco",
      "Multimatic",
      "P&G",
      "IBM",
      "GE Vernova",
    ],
  },

  stats: [
    { label: "Founded", value: "-" },
    { label: "Cars Built", value: "-" },
    { label: "Active Members", value: "-" },
  ] satisfies Stat[],

  team: [
    {
      name: "Team Leadership",
      members: [
        {
          name: "Cameron Quail",
          role: "Team Lead",
          major: "Aerospace & Mechanical Engineering",
          gradYear: "2028",
          photo: "/Headshots/cards/cam-ab9bfabc.jpg",
          linkedin: "https://www.linkedin.com/in/cameronquail/",
          email: "quailc@rpi.edu",
        },
        {
          name: "Abel Arellano",
          role: "Co-Vehicle Dynamics Lead",
          major: "Aerospace Engineering",
          gradYear: "2028",
          photo: "/Headshots/cards/abel-86b48b5a.jpg",
          linkedin: "https://www.linkedin.com/in/abel-arellano-a3a3a4339/",
          email: "arella2@rpi.edu",
        },
        {
          name: "Zayd Farjo",
          role: "Co-Vehicle Dynamics Lead",
          major: "Mechanical Engineering",
          gradYear: "2026",
          additionalDegrees: [{ major: "Master of Business Administration", gradYear: "2027" }],
          photo: "/Headshots/cards/zayd-15de7e83.jpg",
          linkedin: "https://www.linkedin.com/in/zayd-farjo-a2a983254/",
          email: "farjoz@rpi.edu",
        },
        {
          name: "Alexander Ethier",
          role: "Electric Vehicle Lead",
          major: "Electrical & Computer Systems Engineering",
          gradYear: "2028",
          photo: "/Headshots/cards/alex e-6852fd1b.jpg",
          linkedin: "https://www.linkedin.com/in/alexanderjethier/",
          email: "ethiea@rpi.edu",
        },
        {
          name: "Alexander Weiss",
          role: "Safety Officer",
          major: "Aerospace & Mechanical Engineering",
          gradYear: "2028",
          photo: "/Headshots/cards/alex w-76c2de1e.jpg",
          linkedin: "https://www.linkedin.com/in/alexander-weiss-ct/",
          email: "weissa9@rpi.edu",
        },
        {
          name: "Nicholas Cummings",
          role: "Chief Information Officer",
          major: "Mechanical Engineering",
          gradYear: "2027",
          photo: "/Headshots/cards/nick-17be1896.jpg",
          linkedin: "https://www.linkedin.com/in/nicholas--cummings/",
          email: "cummin2@rpi.edu",
        },
        {
          name: "Arfan Shikder",
          role: "Shop Manager",
          major: "Civil Engineering",
          gradYear: "2029",
          photo: "/Headshots/cards/arfan-64a63f0b.jpg",
          linkedin: "https://www.linkedin.com/in/arfan-shikder-029b1a280/",
          email: "shikda@rpi.edu",
        },
      ],
    },
    {
      name: "Business Team",
      members: [
        {
          name: "Ben Dingman",
          role: "Business Lead",
          major: "Design, Innovation, and Society & Communication, Media, and Design",
          gradYear: "2028",
          photo: "/Headshots/cards/ben-4cc391af.jpg",
          linkedin: "https://www.linkedin.com/in/benjamin-dingman-509570357/",
          email: "dingmb@rpi.edu",
        },
      ],
    },
    {
      name: "Electric Vehicle Team",
      members: [
        {
          name: "Emma Platts",
          role: "Senior Tractive Battery Lead",
          major: "Materials Engineering",
          gradYear: "2028",
          photo: "/Headshots/cards/emma-723a11c0.jpg",
          linkedin: "https://www.linkedin.com/in/emma-m-platts/",
          email: "platte@rpi.edu",
        },
        {
          name: "Colby Giunta",
          role: "Junior Tractive Battery Lead",
          major: "Electrical Engineering",
          gradYear: "2029",
          photo: "/Headshots/cards/colby-f01504b9.jpg",
          linkedin: "https://www.linkedin.com/in/colby-giunta-658296371/",
          email: "giuntc2@rpi.edu",
        },
        {
          name: "Alexander Ethier",
          role: "High Voltage Lead",
          major: "Electrical & Computer Systems Engineering",
          gradYear: "2028",
          photo: "/Headshots/cards/alex e-6852fd1b.jpg",
          linkedin: "https://www.linkedin.com/in/alexanderjethier/",
          email: "ethiea@rpi.edu",
        },
        {
          name: "Henry Blount",
          role: "Low Voltage Lead",
          major: "Electrical Engineering",
          gradYear: "2029",
          photo: "/Headshots/cards/henry-b5d21984.jpg",
          linkedin: "https://www.linkedin.com/in/henry-blount-978a59348/",
          email: "blounh@rpi.edu",
        },
        {
          name: "Joey Marchand",
          role: "All Wheel Drive R&D Manager",
          major: "Mechanical Engineering",
          gradYear: "2027",
          photo: "/Headshots/cards/joey-cba4f458.jpg",
          linkedin: "https://www.linkedin.com/in/joey-marchand/",
          email: "marchj5@rpi.edu",
        },
        {
          name: "Yulin Du",
          role: "Drivetrain Lead",
          major: "Mechanical Engineering",
          gradYear: "2029",
          photo: "/Headshots/cards/yulin-2533789b.jpg",
          linkedin: "https://www.linkedin.com/in/yulin-du/",
          email: "duy6@rpi.edu",
        },
      ],
    },
    {
      name: "Vehicle Dynamics Team",
      members: [
        {
          name: 'Jonathan "JB" Brooks',
          role: "Senior Chassis Lead",
          major: "Mechanical Engineering & Design, Innovation, and Society",
          gradYear: "2028",
          photo: "/Headshots/cards/jb-732e52bd.jpg",
          linkedin: "https://www.linkedin.com/in/jbooks06/",
          email: "brookj12@rpi.edu",
        },
        {
          name: "Imran Siraj",
          role: "Junior Chassis Lead",
          major: "Mechanical Engineering",
          gradYear: "2028",
          photo: "/Headshots/cards/imran-6d623daf.jpg",
          linkedin: "https://www.linkedin.com/in/imran-siraj-me/",
          email: "siraji2@rpi.edu",
        },
        {
          name: "Zayd Farjo",
          role: "Senior Suspension Lead",
          major: "Mechanical Engineering",
          gradYear: "2026",
          additionalDegrees: [{ major: "Master of Business Administration", gradYear: "2027" }],
          photo: "/Headshots/cards/zayd-15de7e83.jpg",
          linkedin: "https://www.linkedin.com/in/zayd-farjo-a2a983254/",
          email: "farjoz@rpi.edu",
        },
        {
          name: "Alexander Weiss",
          role: "Junior Suspension Lead",
          major: "Aerospace & Mechanical Engineering",
          gradYear: "2028",
          photo: "/Headshots/cards/alex w-76c2de1e.jpg",
          linkedin: "https://www.linkedin.com/in/alexander-weiss-ct/",
          email: "weissa9@rpi.edu",
        },
        {
          name: "Theodore Racz",
          role: "Aerodynamics Lead",
          major: "Mechanical & Aeronautical Engineering",
          gradYear: "2026",
          additionalDegrees: [{ major: "Master of Engineering in Mechanical Engineering", gradYear: "2027" }],
          photo: "/Headshots/cards/theo-79bc1042.jpg",
          linkedin: "https://www.linkedin.com/in/theodore-racz-560605293/",
          email: "raczt@rpi.edu",
        },
        {
          name: "Amalan Narashimman",
          role: "Ergonomics Lead",
          major: "Mechanical Engineering",
          gradYear: "2028",
          photo: "/Headshots/cards/amalan-925af184.jpg",
          linkedin: "https://www.linkedin.com/in/amalannarashimman/",
          email: "narasa2@rpi.edu",
        },
      ],
    },
    {
      name: "Full Members",
      members: [
        {
          name: "Matthew Riccobono",
          major: "Mechanical Engineering",
          gradYear: "2027",
          photo: "/Headshots/cards/matt r-341b5000.jpg",
          linkedin: "https://www.linkedin.com/in/matthew-riccobono-645a20313/",
          email: "riccom@rpi.edu",
        },
        {
          name: "Maya Gorse",
          major: "Mechanical Engineering & Design, Innovation, and Society",
          gradYear: "2027",
          photo: "/Headshots/cards/maya-87816511.jpg",
          linkedin: "https://www.linkedin.com/in/maya-gorse/",
          email: "gorsem@rpi.edu",
        },
        {
          name: "Aaron Wang",
          major: "Electrical Engineering",
          gradYear: "2026",
          photo: "/Headshots/cards/aaron-76ba43d3.jpg",
          linkedin: "https://www.linkedin.com/in/aaron-wang-aa6bba388/",
          email: "wanga16@rpi.edu",
        },
        {
          name: "Alexander Singer",
          major: "Electrical Engineering",
          gradYear: "2029",
          photo: "/Headshots/cards/alex s-a8fd65b4.jpg",
          linkedin: "https://www.linkedin.com/in/alexander-singer-5ba391289/",
          email: "singea@rpi.edu",
        },
        {
          name: "Jay Sen",
          major: "Mechanical Engineering",
          gradYear: "2029",
          photo: "/Headshots/cards/jay-4e31a2bf.jpg",
          linkedin: "https://www.linkedin.com/in/jaymsen/",
          email: "senj2@rpi.edu",
        },
        {
          name: "Blake Hopper",
          major: "Electrical Engineering",
          gradYear: "2025",
          additionalDegrees: [{ major: "Master of Engineering in Mechanical Engineering", gradYear: "2026" }],
          photo: "/Headshots/cards/driver-7d226b30.jpg",
          linkedin: "https://www.linkedin.com/in/bhopper/",
          email: "hoppeb@rpi.edu",
        },
        {
          name: "Matthew Sgritta",
          major: "Mechanical Engineering",
          gradYear: "2027",
          photo: "/Headshots/cards/matt s-4501fe55.jpg",
          linkedin: "https://www.linkedin.com/in/matthew-sgritta-5454aa238/",
          email: "sgritm@rpi.edu",
        },
        {
          name: "Joshua Levy",
          major: "Mechanical Engineering",
          gradYear: "2028",
          photo: "/Headshots/cards/driver-7d226b30.jpg",
          linkedin: "https://www.linkedin.com/in/joshua-g-levy/",
          email: "levyj2@rpi.edu",
        },
        {
          name: "Debarshi Sen",
          major: "Mechanical Engineering",
          gradYear: "2028",
          photo: "/Headshots/cards/driver-7d226b30.jpg",
          linkedin: "https://www.linkedin.com/in/debarshisen/",
          email: "send@rpi.edu",
        },
        {
          name: "Satvik Mathur",
          major: "Mechanical Engineering",
          gradYear: "2028",
          photo: "/Headshots/cards/driver-7d226b30.jpg",
          linkedin: "https://www.linkedin.com/in/satvik-mathur/",
          email: "mathus3@rpi.edu",
        },
        {
          name: "Louisa Ersenkal",
          major: "Mechanical Engineering",
          gradYear: "2028",
          photo: "/Headshots/cards/driver-7d226b30.jpg",
          linkedin: "https://www.linkedin.com/in/louisa-ersenkal/",
          email: "ersenl@rpi.edu",
        },
        {
          name: "Bennet Strong Sarmiento",
          major: "Mechanical Engineering",
          gradYear: "2029",
          photo: "/Headshots/cards/bennet-59afa38e.jpg",
          linkedin: "https://www.linkedin.com/in/bennet-strong-ba551a3a7/",
          email: "stronb@rpi.edu",
        },
        {
          name: "Kimberly Pascual",
          major: "Mechanical Engineering",
          gradYear: "2029",
          photo: "/Headshots/cards/kimmy-c0557081.jpg",
          linkedin: "https://www.linkedin.com/in/kimberly-pascual-14929843a/",
          email: "pascuk2@rpi.edu",
        },
        {
          name: "Amelie Peterson",
          major: "Mechanical & Aerospace Engineering",
          gradYear: "2029",
          photo: "/Headshots/cards/amelie-0517a1c4.jpg",
          linkedin: "https://www.linkedin.com/in/amelie-peterson-b69680400/",
          email: "petera17@rpi.edu",
        },
        {
          name: "Charlotte \"Charlie\" Marino",
          major: "Mechanical Engineering",
          gradYear: "2030",
          photo: "/Headshots/cards/charlie-83b4fffe.jpg",
          linkedin: "https://www.linkedin.com/in/charlotte-marino2030/",
          email: "marinc10@rpi.edu",
        },
        {
          name: "Ian Stambaugh",
          major: "Mechanical Engineering",
          gradYear: "2030",
          photo: "/Headshots/cards/driver-7d226b30.jpg",
          linkedin: "https://www.linkedin.com/in/ian-stambaugh-213849375/",
          email: "stambi@rpi.edu",
        },
        {
          name: "Ryan Dey",
          major: "Mechanical Engineering",
          gradYear: "2030",
          photo: "/Headshots/cards/ryan-885052c0.jpg",
          linkedin: "https://www.linkedin.com/in/ryan-dey/",
          email: "deyr@rpi.edu",
        },
        {
          name: "Aiden Price",
          major: "Aerospace Engineering",
          gradYear: "2030",
          photo: "/Headshots/cards/aiden-c3afc0c9.jpg",
          linkedin: "https://www.linkedin.com/in/aidentprice/",
          email: "pricea7@rpi.edu",
        },
        {
          name: "Ethan Chen",
          major: "Mechanical Engineering",
          gradYear: "2030",
          photo: "/Headshots/cards/driver-7d226b30.jpg",
          email: "chene13@rpi.edu",
        },
        {
          name: "Gennaro Marino",
          major: "Chemical Engineering",
          gradYear: "2030",
          photo: "/Headshots/cards/gennaro-d987dc02.jpg",
          linkedin: "https://www.linkedin.com/in/gennaro-marino-68727344b/",
          email: "maring3@rpi.edu",
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
        "RM29 is our fourth electric car, and the first to finish every dynamic event at Formula SAE Electric, including the 22 km endurance event.",
      photo: "/RM29/rollout.jpg",
      heroPhoto: "/RM29/cardriving2.jpg",
      specs: [
        { label: "Powertrain", value: "107 HP PMSM, 4000 RPM @ 400V" },
        { label: "Horsepower", value: "107 HP" },
        { label: "Weight", value: "490 lb (target)" },
        { label: "0–60 mph", value: "3.5 sec (target)" },
        { label: "Chassis", value: "4130 steel tube-frame" },
      ],
      features: [
        "Custom 80kW battery pack—400V, 200A Li-Ion accumulator",
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
            "A custom 80kW battery pack—a 400V, 200A Li-Ion accumulator designed and built in-house.",
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
      results: [
        {
          competition: "Formula Hybrid + Electric 2026",
          results: [
            { title: "5th Place Overall" },
            { title: "Scrutineer's Award", detail: "Most prepared team for mechanical inspection" },
            { title: "Test Equity Award", detail: "Superior preparation during electrical inspection" },
            {
              title: "IEEE Engineering the Future Award",
              detail: "Recognized for excellence in engineering design and vehicle testing",
            },
          ],
        },
        {
          competition: "Formula SAE Electric 2026",
          results: [{ title: "21st Place Overall" }, { title: "2nd Place in Efficiency" }],
        },
        {
          competition: "Toronto Shootout 2026",
          results: [{ title: "10th Place Overall" }, { title: "6th Place in Electric Category" }],
        },
      ] satisfies CompetitionResult[],
    },
    {
      id: "rm28",
      name: "RM28",
      year: "2024-2025",
      category: "Formula SAE Electric",
      tagline: "RM28 was our third electric car, built around a new battery pack assembled from prepackaged power modules.",
      photo: "/RM28/IMG_6957.jpg",
      // Extra room on the left so the diagonal edge of the (reversed) card doesn't clip the rear wheel.
      photoCrop: { x: 0.08, y: 0.22, w: 0.82, h: 0.6, aspect: 6000 / 4000 },
      specs: [
        { label: "Motor", value: "EMRAX 228, combined-cooled" },
        { label: "Accumulator", value: "Custom pack from prepackaged power modules" },
        { label: "Chassis", value: "4130 steel tube-frame" },
        { label: "Brakes", value: "ISR & Wilwood calipers, custom rotors" },
        { label: "Aerodynamics", value: "Custom aero package" },
      ],
      features: [],
      results: [
        {
          competition: "Formula Hybrid + Electric 2025",
          results: [
            { title: "7th Place Overall" },
            { title: "3rd Place in Endurance" },
            { title: "6th Place in Autocross" },
          ],
        },
        {
          competition: "Formula SAE Electric 2025",
          results: [{ title: "50th Place Overall" }],
        },
      ] satisfies CompetitionResult[],
    },
    {
      id: "rm27",
      name: "RM27",
      year: "2023-2024",
      category: "Formula SAE Electric",
      tagline: "RM27, our second electric car, raced as car #251 at Formula SAE Electric at Michigan International Speedway in June 2024.",
      photo: "/RM27/DSC_0654.jpg",
      // The car runs to the photo's left edge; anchor there so any crop comes off the nose side.
      photoPosition: "left center",
      specs: [{ label: "Car Number", value: "#251" }],
      features: [],
      results: [
        {
          competition: "Formula SAE Electric 2024",
          results: [{ title: "47th Place Overall" }],
        },
      ] satisfies CompetitionResult[],
    },
    {
      id: "rm26",
      name: "RM26",
      year: "2022-2023",
      category: "Formula SAE Electric",
      tagline:
        "RM26 was our first electric car, taking the team from combustion to EV and racing as car #226 at Formula SAE Electric in June 2023.",
      photo: "/RM26/IMG_4654.jpg",
      // Portrait shot with the car small at the bottom; the crop zooms in on just the car.
      photoCrop: { x: 0.27, y: 0.7, w: 0.445, h: 0.15, aspect: 3024 / 4032 },
      specs: [],
      features: [],
      results: [
        {
          competition: "Formula SAE Electric 2023",
          results: [{ title: "42nd Place Overall" }],
        },
      ] satisfies CompetitionResult[],
    },
  ] satisfies Car[],

  upcomingCar: {
    name: "RM30",
    year: "2026-2027",
  },

  sponsors: [
    {
      tier: "Platinum",
      sponsors: [
        { name: "Legacy EV", logo: "/sponsors/legacy ev-dark.webp", url: "https://legacyev.com/" },
        { name: "SolidWorks", logo: "/sponsors/solidworks-dark.webp", url: "https://www.solidworks.com/" },
        { name: "Fabbro Industries", logo: "/sponsors/fabbro-dark.webp", url: "https://www.fabbroindustries.com/" },
        { name: "KISSsoft", logo: "/sponsors/kisssoft.webp", url: "https://www.kisssoft.com/" },
      ],
    },
    {
      tier: "Gold",
      sponsors: [
        { name: "ANSYS", logo: "/sponsors/ansys.png", url: "https://www.ansys.com/" },
        { name: "Gene Haas Foundation", logo: "/sponsors/gene haas foundation.webp", url: "https://ghaasfoundation.org/" },
      ],
    },
    {
      tier: "Silver",
      sponsors: [
        { name: "Boeing", logo: "/sponsors/boeing.webp", url: "https://www.boeing.com/" },
        { name: "Rapid Harness", logo: "/sponsors/rapidharness-dark.webp", url: "" },
        { name: "OSH Cut", logo: "/sponsors/osh cut.webp", url: "https://www.oshcut.com/" },
        { name: "GE Vernova", logo: "/sponsors/ge vernova.svg", url: "https://www.gevernova.com/" },
      ],
    },
    {
      tier: "Bronze",
      sponsors: [
        { name: "MoTeC", logo: "/sponsors/motec-dark.webp", url: "https://www.motec.com.au/" },
        { name: "Bender", logo: "/sponsors/bender.webp", url: "https://www.bender.de/en/" },
        { name: "Rock Krawler", logo: "/sponsors/rock krawler.webp", url: "https://www.rockkrawler.com/" },
        { name: "Sonnax", logo: "/sponsors/sonnax.svg", url: "https://www.sonnax.com/" },
      ],
    },
    // Sponsors marked "Other" on the team sheet: listed after the four tiers with a neutral badge.
    {
      tier: "Supporting",
      sponsors: [
        { name: "Atlas Copco", logo: "/sponsors/atlascopco.png", url: "https://www.atlascopco.com/" },
        {
          name: "Quail Financial Group",
          logo: "/sponsors/quail financial group-dark.webp",
          url: "https://www.quailfinancialgroup.com/",
        },
      ],
    },
  ] satisfies SponsorTier[],

  // Every school year shown in the Gallery page's year picker, oldest first.
  // Add a year here before adding its photos below and it'll show up in the
  // picker (even with no photos yet); years with photos get a populated section.
  // Wide banner photo at the top of the Gallery page.
  galleryHero: "/RM29/DSC01951.JPG",

  galleryYears: ["22-23", "23-24", "24-25", "25-26"],

  gallery: [
    { caption: "Car #86 on the RPI quad", year: "25-26", photo: "/RM29/car.jpg", width: 4897, height: 3266 },
    { caption: "Car #86 with the team's competition awards", year: "25-26", photo: "/RM29/car1.jpg", width: 8192, height: 5464 },
    { caption: "Team photo at Formula SAE Electric", year: "25-26", photo: "/RM29/FD1A8003.jpg", width: 2048, height: 1366 },
    { caption: "Autocross in the rain", year: "25-26", photo: "/RM29/cardriving.JPG", width: 6000, height: 4000 },
    { caption: "Threading the cones", year: "25-26", photo: "/RM29/cardriving1.JPG", width: 6000, height: 4000 },
    { caption: "On track", year: "25-26", photo: "/RM29/cardriving2.jpg", width: 4892, height: 3270 },
    { caption: "Taking the corner", year: "25-26", photo: "/RM29/cardriving3.jpg", width: 2048, height: 1366 },
    { caption: "Kicking up dust", year: "25-26", photo: "/RM29/FD1A1699.jpg", width: 2048, height: 1366 },
    { caption: "Race day", year: "25-26", photo: "/RM29/DSC03778.JPG", width: 6000, height: 4000 },
    { caption: "Weaving through the slalom", year: "25-26", photo: "/RM29/DSC04102.JPG", width: 6000, height: 4000 },
    { caption: "Car #86 trackside", year: "25-26", photo: "/RM29/IMG_2406.jpg", width: 4032, height: 3024 },
    { caption: "Out on the circuit", year: "25-26", photo: "/RM29/DSC02050.JPG", width: 6000, height: 4000 },
    { caption: "Rolling out at Formula SAE Electric", year: "25-26", photo: "/RM29/FD1A6514.jpg", width: 2048, height: 1366 },
    { caption: "Walking the car to the track", year: "25-26", photo: "/RM29/FD1A6998.jpg", width: 2048, height: 1366 },
    { caption: "Buckled in and ready to drive", year: "25-26", photo: "/RM29/FD1A6543.jpg", width: 4897, height: 3266 },
    { caption: "Tilt test at technical inspection", year: "25-26", photo: "/RM29/FD1A4452.jpg", width: 1366, height: 2048 },
    { caption: "Final checks", year: "25-26", photo: "/RM29/FD1A4349.jpg", width: 2048, height: 1366 },
    { caption: "Wrenching on the suspension", year: "25-26", photo: "/RM29/FD1A7128.jpg", width: 4897, height: 3266 },
    { caption: "Electrical work in the pits", year: "25-26", photo: "/RM29/FD1A7204.jpg", width: 2048, height: 1366 },
    { caption: "Setup in the paddock", year: "25-26", photo: "/RM29/FD1A4492.jpg", width: 2048, height: 1365 },
    { caption: "Working in the pits", year: "25-26", photo: "/RM29/DSC02384.JPG", width: 6000, height: 4000 },
    { caption: "Pit garage at competition", year: "25-26", photo: "/RM29/DSC03563.JPG", width: 6000, height: 4000 },
    { caption: "Show me your data", year: "25-26", photo: "/RM29/FD1A6237.jpg", width: 2048, height: 1366 },
    { caption: "The team in the paddock", year: "25-26", photo: "/RM29/team.jpg", width: 2048, height: 1366 },
    { caption: "Lifting the car in celebration", year: "25-26", photo: "/RM29/team-pic.jpg", width: 4897, height: 3266 },
    { caption: "Car #27 at the overlook", year: "25-26", photo: "/RM29/DSC01951.JPG", width: 6000, height: 4000 },
    { caption: "Car #27 on campus", year: "25-26", photo: "/RM29/DSC01959.JPG", width: 6000, height: 4000 },
    { caption: "Shakedown run on campus", year: "25-26", photo: "/RM29/DSC01966.JPG", width: 4000, height: 6000 },
    { caption: "Car #27 testing on campus", year: "25-26", photo: "/RM29/DSC01663.JPG", width: 6000, height: 4000 },
    { caption: "Filming at the overlook", year: "25-26", photo: "/RM29/DSC02105.JPG", width: 6000, height: 4000 },
    { caption: "Autocross practice", year: "25-26", photo: "/RM29/DSC02166.JPG", width: 6000, height: 4000 },
    { caption: "Pre-run checks in the paddock", year: "25-26", photo: "/RM29/PHO00053.JPG", width: 4000, height: 2250 },
    { caption: "Late night in the shop garage", year: "25-26", photo: "/RM29/DSC00834.JPG", width: 6000, height: 4000 },
    { caption: "The crew in the shop", year: "25-26", photo: "/RM29/PHO00034.JPG", width: 4000, height: 2250 },
    { caption: "Showing off the car on campus", year: "25-26", photo: "/RM29/DSC04827.JPG", width: 6000, height: 4000 },
    { caption: "Meeting new members at a campus event", year: "25-26", photo: "/RM29/DSC04831.JPG", width: 6000, height: 4000 },
    { caption: "Car display under the tents", year: "25-26", photo: "/RM29/DSC04867.JPG", width: 6000, height: 4000 },
    { caption: "Showcasing the car at an expo", year: "25-26", photo: "/RM29/FD1A9847.jpg", width: 2048, height: 1366 },
    { caption: "RM29 rollout", year: "25-26", photo: "/RM29/rollout.jpg", width: 4897, height: 3266 },
    { caption: "The team at rollout", year: "25-26", photo: "/RM29/team-background.jpg", width: 4897, height: 3266 },
    { caption: "Under the lights", year: "25-26", photo: "/RM29/IMG_0289.PNG", width: 2001, height: 3000 },
    { caption: "RM28 outside EMPAC", year: "24-25", photo: "/RM28/DSCF9921.JPG", width: 4896, height: 3264 },
    { caption: "Full speed down the straight", year: "24-25", photo: "/RM28/_G5D8237.jpg", width: 4898, height: 3265 },
    { caption: "Cornering hard", year: "24-25", photo: "/RM28/_G5D8407.jpg", width: 4898, height: 3265 },
    { caption: "RM28 at speed", year: "24-25", photo: "/RM28/DSCF0266.JPG", width: 4896, height: 3264 },
    { caption: "Pushing through the slalom", year: "24-25", photo: "/RM28/DSCF0786.JPG", width: 4896, height: 3264 },
    { caption: "Autocross testing", year: "24-25", photo: "/RM28/DSCF0530.JPG", width: 4896, height: 3264 },
    { caption: "Turn-in", year: "24-25", photo: "/RM28/_G5D8884.jpg", width: 4898, height: 3265 },
    { caption: "Head-on approach", year: "24-25", photo: "/RM28/_G5D8910.jpg", width: 4898, height: 3265 },
    { caption: "Testing in the wet", year: "24-25", photo: "/RM28/IMG_8083.JPG", width: 6000, height: 4000 },
    { caption: "Team photo with RM28", year: "24-25", photo: "/RM28/IMG_7677.jpg", width: 2048, height: 1152 },
    { caption: "The team at competition", year: "24-25", photo: "/RM28/IMG_7669.jpg", width: 2048, height: 1365 },
    { caption: "Team photo on the lawn", year: "24-25", photo: "/RM28/IMG_8624.JPG", width: 3744, height: 2496 },
    { caption: "Walking the track", year: "24-25", photo: "/RM28/IMG_3918.JPG", width: 4032, height: 3024 },
    { caption: "RM28 and its sponsor board", year: "24-25", photo: "/RM28/PA031748.JPG", width: 5184, height: 2920 },
    { caption: "On display on the lawn", year: "24-25", photo: "/RM28/PA031710.JPG", width: 5184, height: 2920 },
    { caption: "RM28 on the lawn", year: "24-25", photo: "/RM28/_G5D8701.jpg", width: 3265, height: 4898 },
    { caption: "Showing RM28 to students", year: "24-25", photo: "/RM28/DSCF9705.JPG", width: 4896, height: 3264 },
    { caption: "Talking with students under the tent", year: "24-25", photo: "/RM28/PA031715.JPG", width: 5184, height: 2920 },
    { caption: "Campus showcase", year: "24-25", photo: "/RM28/DSCF9811.JPG", width: 4896, height: 3264 },
    { caption: "Rolling out of the trailer", year: "24-25", photo: "/RM28/IMG_9016.jpg", width: 2048, height: 1365 },
    { caption: "Working by the trailer", year: "24-25", photo: "/RM28/P9071610.JPG", width: 5184, height: 2920 },
    { caption: "RM28 with Rensselaer Public Safety", year: "24-25", photo: "/RM28/DSCF0037.JPG", width: 4896, height: 3264 },
    { caption: "RM27 unveiled at rollout", year: "23-24", photo: "/RM27/DSC_0654.jpg", width: 6016, height: 4016 },
    { caption: "The RM27 team at rollout", year: "23-24", photo: "/RM27/DSC_0597.jpg", width: 6016, height: 4016 },
    { caption: "RM27 team photo at Michigan International Speedway", year: "23-24", photo: "/RM27/RMeditedmore.png", width: 2048, height: 1365 },
    { caption: "Car #251 in the paddock at Formula SAE Electric", year: "23-24", photo: "/RM27/20240613_152554.jpg", width: 4000, height: 1848 },
    { caption: "RM27 in technical inspection", year: "23-24", photo: "/RM27/OCT05979.jpg", width: 2048, height: 1365 },
    { caption: "Car #251 heading out with the crew", year: "23-24", photo: "/RM27/OCT05917.jpg", width: 1365, height: 2048 },
    { caption: "The team gathered around car #251", year: "23-24", photo: "/RM27/OCT06026.jpg", width: 2048, height: 1365 },
    { caption: "Final prep under the tent", year: "23-24", photo: "/RM27/OCT06097.jpg", width: 1365, height: 2048 },
    { caption: "Working on the car outside the team tent", year: "23-24", photo: "/RM27/OCT05716.jpg", width: 2048, height: 1365 },
    { caption: "Our pit at competition", year: "23-24", photo: "/RM27/DSC_0884.jpg", width: 5670, height: 3785 },
    { caption: "Talking through the plan in the pits", year: "23-24", photo: "/RM27/DSC_0888.jpg", width: 6016, height: 4016 },
    { caption: "Wrenching on RM27 in the shop", year: "23-24", photo: "/RM27/DSC_0298.jpg", width: 6016, height: 4016 },
    { caption: "The RM26 team at rollout", year: "22-23", photo: "/RM26/IMG_1659.jpg", width: 6000, height: 4000 },
    { caption: "Car #226 on display outside", year: "22-23", photo: "/RM26/IMG_1640.JPG", width: 4032, height: 3024 },
    { caption: "RM26 on display in an aircraft hangar", year: "22-23", photo: "/RM26/20231104_161105.jpg", width: 4000, height: 1848 },
    { caption: "Car #226 on track", year: "22-23", photo: "/RM26/IMG_4654.jpg", width: 3024, height: 4032 },
    { caption: "Team photo on the start/finish line", year: "22-23", photo: "/RM26/IMG_3186.jpg", width: 3830, height: 2950 },
    { caption: "Rolling car #226 through the paddock", year: "22-23", photo: "/RM26/IMG_2092.JPG", width: 6000, height: 4000 },
    { caption: "Car #226 in the paddock", year: "22-23", photo: "/RM26/IMG_3092.jpg", width: 4032, height: 3024 },
    { caption: "RM26 under the Rensselaer Motorsport tent", year: "22-23", photo: "/RM26/IMG_2524.JPG", width: 6000, height: 4000 },
    { caption: "The team at our tent on campus", year: "22-23", photo: "/RM26/IMG_2138.jpg", width: 4032, height: 3024 },
    { caption: "Our booth at a campus event", year: "22-23", photo: "/RM26/IMG_2541.JPG", width: 6000, height: 4000 },
    { caption: "Showing off RM26 at a campus event", year: "22-23", photo: "/RM26/IMG_1347.JPG", width: 3024, height: 4032 },
    { caption: "RM26 with visitors at an outreach event", year: "22-23", photo: "/RM26/IMG_3775.jpg", width: 3024, height: 4032 },
    { caption: "RM26 on the RPI campus", year: "22-23", photo: "/RM26/IMG_6130.jpg", width: 3024, height: 4032 },
  ] satisfies GalleryItem[],

  join: {
    intro:
      "Rensselaer Motorsport is always looking for motivated students—no experience required. Whether your interest is engineering, business, or manufacturing, there's a place for you on the team.",
    steps: [
      {
        title: "Come to a Meeting",
        description:
          "Come to a weekly Tuesday general meeting, Wednesday engineering meeting, or stop by the shop on a Friday evening and chat with us—see the full schedule on our Contact page.",
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
