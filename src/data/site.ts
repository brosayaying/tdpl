export const site = {
  name: "The Don't Panic Lab",
  tagline: 'A kids\u2019 coding academy for curious builders.',
  contactEmail: 'hello@thedontpaniclab.org',
  /** Canonical origin, used for absolute URLs in social metadata. */
  url: 'https://thedontpaniclab.org',
} as const

export const navLinks = [
  { to: '/schedule', label: 'Schedule' },
  { to: '/about', label: 'About Us' },
] as const

/**
 * Current term. South Australian state school Term 4 runs 12 Oct – 11 Dec 2026;
 * our courses are 8 weeks, starting the week of 19 Oct 2026.
 */
export const term = {
  number: 4,
  label: 'Term 4',
  weeks: 8,
  /** First day of our 8-week block. */
  startsOn: '2026-10-19',
  /** Last day of our 8-week block. */
  endsOn: '2026-12-10',
  /** SA state school term dates, for context. */
  schoolTermStartsOn: '2026-10-12',
  schoolTermEndsOn: '2026-12-11',
  /** Price per course for the full 8-week block, in AUD. */
  priceAud: 200,
  /** Discount for each additional sibling enrolled in the same term. */
  siblingDiscountPercent: 25,
} as const

/** Price for an additional sibling, after the sibling discount. */
export const siblingPriceAud = Math.round(
  term.priceAud * (1 - term.siblingDiscountPercent / 100),
)

/** Format an ISO date (YYYY-MM-DD) as e.g. "Thursday 22 October 2026". */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-AU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

/** Format an ISO date as e.g. "22 Oct". */
export function formatShortDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  })
}

export type Track = {
  id: string
  name: string
  command: string
  ageRange: string
  outcome: string
  blurb: string
  image: string
  imageAlt: string
  /** Whether this track is open for enrolment in the current term. */
  offeredThisTerm: boolean
  /** Stripe Payment Link, present only for tracks open this term. */
  paymentLink?: string
}

export const tracks: Track[] = [
  {
    id: 'scratch',
    name: 'Scratch Explorers',
    command: 'run scratch.exe',
    ageRange: 'Ages 6\u20139',
    outcome: 'Builds animated stories and games they can demo to the family.',
    blurb:
      'Drag-and-drop blocks, instant feedback, and big creative wins. The perfect first contact with loops, events, and logic.',
    image: '/images/track-scratch.svg',
    imageAlt: 'Stylised terminal artwork for the Scratch track',
    offeredThisTerm: true,
    paymentLink: 'https://buy.stripe.com/14A28saSZfUpfvW6Sj7g401',
  },
  {
    id: 'python',
    name: 'Python Foundations',
    command: 'python main.py',
    ageRange: 'Ages 9\u201312',
    outcome: 'Writes real text-based programs and small tools from scratch.',
    blurb:
      'Real syntax, real problem solving. Kids learn variables, functions, and how to debug like professionals.',
    image: '/images/track-python.svg',
    imageAlt: 'Stylised terminal artwork for the Python track',
    offeredThisTerm: true,
    paymentLink: 'https://buy.stripe.com/14A3cwf9f0Zv0B25Of7g402',
  },
  {
    id: 'ai',
    name: 'AI Builders',
    command: 'train --model curious',
    ageRange: 'Ages 10\u201313',
    outcome: 'Trains simple models and learns to question what AI tells them.',
    blurb:
      'From teaching a model to recognise drawings to prompting with intent — kids learn to direct intelligent tools, not just consume them.',
    image: '/images/track-ai.svg',
    imageAlt: 'Stylised terminal artwork for the AI track',
    offeredThisTerm: false,
  },
  {
    id: 'robotics',
    name: 'Robotics Club',
    command: 'deploy robot_v2.bin',
    ageRange: 'Ages 8\u201312',
    outcome: 'Programs robots that navigate, sense, and react to the world.',
    blurb:
      'Code that moves. Sensors, motors, and friendly competitions make abstract logic physical and unforgettable.',
    image: '/images/track-robotics.svg',
    imageAlt: 'Stylised terminal artwork for the Robotics track',
    offeredThisTerm: false,
  },
]

export type ScheduleRow = {
  course: string
  day: string
  time: string
  ageRange: string
  duration: string
  format: string
  /** Stripe Payment Link used by the booking button. */
  paymentLink: string
  /** True while the timetable for this course is still being confirmed. */
  tentative?: boolean
  /** First session date (ISO), when known. */
  firstSession?: string
  /** Last session date (ISO), when known. */
  lastSession?: string
}

/** Courses running this term. */
export const scheduleRows: ScheduleRow[] = [
  {
    course: 'Scratch Explorers',
    day: 'Thursdays',
    time: '19:30 \u2013 20:30',
    ageRange: 'Ages 6\u20139',
    duration: '60 min',
    format: 'In-person',
    paymentLink: 'https://buy.stripe.com/14A28saSZfUpfvW6Sj7g401',
    firstSession: '2026-10-22',
    lastSession: '2026-12-10',
  },
  {
    course: 'Python Foundations',
    day: 'TBC',
    time: 'TBC',
    ageRange: 'Ages 9\u201312',
    duration: '75 min',
    format: 'In-person or online',
    paymentLink: 'https://buy.stripe.com/14A3cwf9f0Zv0B25Of7g402',
    tentative: true,
  },
]

export type Project = {
  title: string
  author: string
  description: string
  tag: string
}

export const projects: Project[] = [
  {
    title: 'Auto Goalie',
    author: 'Z, 9 · Scratch',
    description:
      'A simple game where a goalie moves to block shots, with a scoreboard and sound effects.',
    tag: 'excite()',
  },
  {
    title: 'Scratch-asso',
    author: 'L, 7 · Scratch',
    description:
      'A Digital Art maker that turns mouse movements into generative patterns and colours.',
    tag: 'imagine()',
  },
  {
    title: 'Maze runner 2026',
    author: 'IB, 12 · Scratch',
    description:
      'Auto maze solver that uses loops and conditionals to navigate a randomly generated maze.',
    tag: 'think()',
  },
  {
    title: 'The lemonade stand',
    author: 'A, 10 · Scratch',
    description:
      'A story told as art using Scratch sprites, with a simple game mechanic to collect ingredients and make lemonade.',
    tag: 'tell()',
  },
]

export type Instructor = {
  name: string
  role: string
  bio: string
}

export const instructors: Instructor[] = [
  {
    name: 'Dr. Yasir Latif',
    role: 'Founder & Lead Coach',
    bio: 'The don\'t panic lab is Dr. Latif\'s passion project. In his day job, he makes AI for satellites, and through TDPL helps young builders do the same — with patience, humour, and a strict no-panic policy.',
  },
  {
    name: 'Zoona Azhar',
    role: 'Early Year Educator & Adult in the Room',
    bio: 'Zoona is an early childhood education specialist and ensures our youngest coders feel safe, supported, and celebrated as they explore the world of programming.',
  },
  {
    name: 'Skakutlu',
    role: 'Lab Monster and code buddy',
    bio: 'Our resident (imaginary) lab monster, Skakutlu is a friendly, code-loving creature who helps kids debug their programs and keeps the lab a fun and welcoming place for all.',
  },
]

export const steps = [
  {
    number: '01',
    title: 'Try a class',
    description:
      'Book a free taster session. No experience needed — just curiosity and a parent\u2019s sign-off.',
  },
  {
    number: '02',
    title: 'Pick a track',
    description:
      'Scratch or Python this term, with AI and Robotics returning later. We help you choose based on age, interest, and confidence.',
  },
  {
    number: '03',
    title: 'Build and ship projects',
    description:
      'Every term ends with something real: a game, a tool, a robot run. Demo day included.',
  },
] as const
