import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "motion/react";

// ─── Images ──────────────────────────────────────────────────────────────────
// All image paths live in one place → src/app/projectImages.ts
import {
  IMG_CHAT_LESSON, IMG_PERSONA_UMESH, IMG_PERSONA_RAJ, SCREENS_CHAT_LESSON,
  IMG_LEXGO_HERO, IMG_PERSONA_RICKY, SCREENS_LEXGO,
  IMG_HEALTH, IMG_PERSONA_MARCUS, IMG_PERSONA_SARAH, IMG_PERSONA_PRIYA, IMG_PERSONA_JAMES, SCREENS_DRTM,
  IMG_DASHBOARD, IMG_HUB, IMG_ACCESS, IMG_DARK_UI, IMG_MOBILE_HLTH,
  IMG_WIREFRAME, IMG_MOBILE_APP, IMG_LIGHT_DASH, IMG_ONBOARDING, IMG_SETTINGS, LOGO_MAIN,
} from "./projectImages";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Competitor {
  name: string; tagline: string; strengths: string[]; weaknesses: string[];
}
interface FeatureRow { feature: string; values: boolean[]; }
interface FeatureComparisonData { competitorNames: string[]; rows: FeatureRow[]; }
interface UserPersona {
  name: string; age: number; role: string; quote: string;
  goals: string[]; painPoints: string[]; techLevel: number; image: string;
}
interface CaseStudyFull {
  title: string; role: string; year: string; tags: string[];
  overview: string; heroImage: string;
  processSteps?: { phase: string; steps: string[] }[];
  threeCols: { challenge: string; solution: string; impact: string };
  interviewQuestions?: string[];
  painPoints: { num: string; title: string; description: string }[];
  researchQuotes?: { name: string; age: number; quote: string }[];
  userFlow?: boolean;
  styleGuide?: boolean;
  prototypes: string[]; screenLabels?: string[];
  competitors?: Competitor[];
  featureComparison?: FeatureComparisonData;
  personas?: UserPersona[];
  swot: { strengths: string[]; weaknesses: string[]; opportunities: string[]; threats: string[] };
  results: string[];
}

// ─── Case Study Data ──────────────────────────────────────────────────────────
const CASE_STUDIES: Record<string, CaseStudyFull> = {
  "01": {
    title: "My Chat Lesson",
    role: "UX/UI Designer", year: "2023",
    tags: ["AI Chat Interface", "E-Learning", "UX Research", "Conversational UI"],
    overview: "An AI-powered chat-based e-learning platform designed to make personalised education accessible, conversational, and available on-demand — replacing exhausting tuition sessions with an intuitive lesson experience built for how students actually learn.",
    heroImage: IMG_CHAT_LESSON,
    processSteps: [
      { phase: "Understand", steps: ["Identify Current Market", "User Research", "User Interviews"] },
      { phase: "Define",     steps: ["Finding Insights", "User Personae"] },
      { phase: "Ideate",     steps: ["Consider Possible Solutions", "Userflow"] },
      { phase: "Prototype",  steps: ["Wireframes", "Prototypes", "User Testing"] },
    ],
    threeCols: {
      challenge: "Students struggle with complex subjects after long school hours, with no affordable or adaptive alternative to expensive tuitions — causing disengagement, exhaustion, and poor concept retention.",
      solution:  "A conversational AI chatbot interface that delivers personalised, subject-specific educational content at the student's own pace — in a familiar, low-friction chat format accessible anytime, anywhere.",
      impact:    "A validated, research-backed UX concept grounded in direct user interviews with students, parents, and educators — resulting in a chat-first learning interface designed around real student behaviour.",
    },
    interviewQuestions: [
      "What subjects do you find the most challenging and why?",
      "Do you think your current method of studying is effective? Why or why not?",
      "How much time do you spend studying each day, and how do you manage your time?",
      "Do you attend tuition or after-school programs? Why or why not?",
      "Have you used any e-learning apps before? If so, which ones and what did you think of them?",
      "Do you prefer using textbooks or online resources when studying? Why?",
      "Are there any particular topics or concepts that you find difficult to understand, even after reviewing them multiple times?",
      "What motivates you to learn and do well in school?",
      "Do you think e-learning apps can be helpful in improving your understanding of subjects? Why or why not?",
      "What features would make e-learning apps more effective and engaging for you?",
    ],
    painPoints: [
      { num: "01", title: "Difficulty Understanding Subject Matter", description: "Students struggle to grasp concepts taught in class, making it hard to keep up with the pace of a course without immediate, personalised support." },
      { num: "02", title: "Limited Time in Class",                   description: "Teachers cover large volumes of material in constrained time slots — students feel rushed and unable to fully absorb key concepts before moving on." },
      { num: "03", title: "Different Learning Styles",               description: "One-size-fits-all classroom delivery fails many students. What works for one learner can be entirely ineffective for another, yet the system rarely adapts." },
      { num: "04", title: "Lack of Individual Attention",            description: "Large class sizes prevent teachers from providing the focused, per-student support needed for real understanding — especially for struggling learners." },
      { num: "05", title: "Lack of Motivation",                      description: "Repetitive tuition after a full school day drains students mentally. Sitting through another lecture at 5pm — a recap of everything — kills motivation to learn." },
    ],
    researchQuotes: [
      { name: "Raj",     age: 16, quote: "Having classes from 9–3 is tiring. Then again going to tuitions at 5 makes me very lazy and I can't grasp anything taught there. It's just a recap of everything." },
      { name: "Pranith", age: 16, quote: "Tuitions are expensive and it's tough to sit through all subjects everyday after school. My friends and I just revise on WhatsApp before exams. Wish there was a better option." },
      { name: "Roopa",   age: 35, quote: "As both a teacher and a parent, I see how it feels for kids to go through the whole book. Some memorise and very few understand — and it's tough to keep up with my kid's syllabus at home too." },
    ],
    userFlow: true,
    styleGuide: true,
    prototypes: SCREENS_CHAT_LESSON,
    screenLabels: [
      "Cover",
      "Visual Designer",
      "Wireframe",
      "Wireframe",
      "Home",
      "In Progress",
      "Chat Bot",
    ],
    personas: [
      {
        name: "Umesh", age: 40, role: "Software Developer & Parent · Bengaluru, India",
        quote: "My main motivation is to get my daughter the best learning experience. Tuitions are expensive and tiring after a 9–5 school day — I need something that works at her own pace.",
        goals: ["Keep daughter current with school syllabus", "Reinforce concepts with follow-up questions", "Avoid expensive tuitions on top of long school hours"],
        painPoints: ["Tough to keep up with the current syllabus", "Online teaching platforms are too expensive", "Daughter too exhausted after school for structured classes"],
        techLevel: 4, image: IMG_PERSONA_UMESH,
      },
      {
        name: "Raj", age: 16, role: "High School Student · Chennai, India",
        quote: "Having classes from 9–3 is already tiring. Going to tuitions at 5 just makes me more exhausted — it's a recap of everything and I can't grasp anything. I wish there was a better option.",
        goals: ["Study at my own pace without extra classes", "Get instant help with difficult concepts", "Revise effectively before exams without tuition"],
        painPoints: ["Exhausted after long school hours", "Tuition feels like a repetitive, draining recap", "Hard to retain information when mentally drained"],
        techLevel: 3, image: IMG_PERSONA_RAJ,
      },
    ],
    competitors: [
      {
        name: "Coursera", tagline: "Industry-leading online education platform",
        strengths: ["Strong global brand recognition", "Diverse course offerings across all subjects", "Offers personalised learning recommendations", "High student retention and course completion rates"],
        weaknesses: ["High subscription cost for premium content", "Lecture-based format mirrors classroom fatigue — students sit and listen again"],
      },
      {
        name: "Khan Academy", tagline: "Free, world-class education for anyone, anywhere",
        strengths: ["Wide range of subjects covered", "Completely free to use", "User-friendly and accessible interface", "Downloadable content for offline viewing"],
        weaknesses: ["Lack of interaction and real-time engagement", "Limited language support for non-English users", "Provides limited personalised feedback to individual students"],
      },
    ],
    featureComparison: {
      competitorNames: ["My Chat Lesson", "Coursera", "Khan Academy", "Duolingo", "ChatGPT"],
      rows: [
        { feature: "Chat-Based Learning Interface", values: [true,  false, false, true,  true]  },
        { feature: "Personalised Lesson Flow",      values: [true,  true,  false, true,  true]  },
        { feature: "Free to Use",                   values: [true,  false, true,  false, false] },
        { feature: "K-12 Subject Coverage",         values: [true,  false, true,  false, false] },
        { feature: "Real-Time Feedback",            values: [true,  false, false, true,  true]  },
        { feature: "Progress Tracking",             values: [true,  true,  true,  true,  false] },
        { feature: "Offline Access",                values: [true,  false, true,  false, false] },
        { feature: "Mobile-Friendly",               values: [true,  true,  true,  true,  true]  },
      ],
    },
    swot: {
      strengths:     ["Chat-first interface lowers barriers for students who struggle in traditional settings", "Available on-demand — no fixed schedule or location required", "AI personalisation adapts to each student's pace and learning style", "Familiar messaging UI minimises onboarding effort significantly"],
      weaknesses:    ["AI accuracy limitations in handling complex, nuanced academic topics", "High development complexity to ensure reliable subject-matter correctness", "Risk of over-reliance on the app reducing critical thinking and independent study habits"],
      opportunities: ["Growing demand for affordable, accessible ed-tech alternatives to expensive tuition", "Potential to expand across multiple languages and school curricula worldwide", "Integration with school systems as a supplementary personalised tutoring layer"],
      threats:       ["Intense competition from established platforms like Coursera and Khan Academy", "Teacher and parent resistance to screen-based learning tools for young students", "Data privacy concerns around minors interacting with AI-powered educational platforms"],
    },
    results: [
      "Research validated core hypothesis: students strongly prefer on-demand, conversational learning over repetitive lecture-style tuition",
      "Identified 5 critical pain points through direct interviews with students, parents, and educators",
      "Competitive analysis of 4 platforms revealed a clear unaddressed gap for free, chat-based K-12 subject support",
      "Delivered end-to-end UX — process flows, wireframes, and high-fidelity prototype ready for usability testing",
    ],
  },

  "02": {
    title: "LexGo",
    role: "UX Designer", year: "2024",
    tags: ["Cab Booking", "Mobile UX", "UX Research", "Ride-Hailing"],
    overview: "Lex Go is a cab booking app that prioritises the convenience and satisfaction of its users. With a focus on streamlining the booking process, Lex Go makes booking a cab as simple as possible — fast, reliable, and hassle-free, anytime and anywhere.",
    heroImage: IMG_LEXGO_HERO,
    processSteps: [
      { phase: "Empathize", steps: ["User Research", "User Personae", "User Story"] },
      { phase: "Define",    steps: ["Competitive Analysis", "Problem Statement"] },
      { phase: "Ideate",    steps: ["Brainstorming", "User Flow"] },
      { phase: "Design",    steps: ["Design Iterations", "Prototyping"] },
    ],
    threeCols: {
      challenge: "Existing cab booking apps are plagued by cancellation failures, broken payment flows, and inaccurate location tracking — turning a simple daily task into a consistently frustrating experience for regular commuters.",
      solution:  "A streamlined cab booking experience that prioritises speed, reliability, and clarity — simplifying the booking flow, surfacing recent locations instantly, and presenting critical ride info (OTP, car number) without confusion.",
      impact:    "A research-validated UX concept built on one-to-one interviews and a competitive SWOT analysis of the two dominant Indian cab platforms — addressing 5 core failure points users face every day.",
    },
    painPoints: [
      { num: "01", title: "Inaccurate Cancellation Notifications", description: "Users are not reliably notified when their cab is cancelled — leading to missed rides, late arrivals, and no awareness that they need to rebook." },
      { num: "02", title: "Complicated Booking Flow",              description: "Too many steps and a cluttered interface make the basic act of booking a cab unnecessarily time-consuming, especially for frequent destinations." },
      { num: "03", title: "Broken Payment Method Switching",       description: "Users cannot easily change payment methods mid-booking, and when they try, the feature either fails silently or doesn't function as expected." },
      { num: "04", title: "Non-Availability of Cabs",              description: "Despite accepting a booking request, drivers frequently cancel — or no cabs are available at all — leaving users stranded without a clear alternative." },
      { num: "05", title: "Inaccurate Location Detection",         description: "The app fails to correctly identify or retain user locations, forcing users to manually search for places they travel to regularly." },
    ],
    researchQuotes: [
      { name: "Gagan",    age: 27, quote: "The cab booking apps these days have a lot of issues with finding location. Someone should really sort that out and keep searched locations on the home screen — or something better." },
      { name: "Prashanth", age: 24, quote: "Most of my bookings get cancelled and sometimes I don't even get to know if it's been cancelled. The cab drivers demand cash and the app's payment change doesn't even work properly." },
      { name: "Aditya",   age: 25, quote: "Initially the booking process and cabs arriving on time was pretty good. But then I started facing a lot of bugs and cabs always got cancelled — it was very frustrating." },
    ],
    prototypes: SCREENS_LEXGO,
    screenLabels: [
      "Cover",
      "Visual Design",
      "Wireframe",
      "Wireframe",
      "Home",
      "Booking",
      "Cab Details",
      "In Progress Trip",
      "SOS Feature",
      "Previous Rides",
      "Previous Rides",
    ],
    personas: [
      {
        name: "Ricky", age: 28, role: "Fashion Designer · Mumbai, India",
        quote: "My main motivation is to avoid traffic and reach the office on time. I just want to book a cab in a few clicks — without hunting for a location I've already travelled to a dozen times.",
        goals: ["Book a cab in seconds using recent or saved locations", "Get to the office on time without driving in traffic", "Receive reliable updates if a cab is cancelled"],
        painPoints: ["Has to manually re-search recently visited places every time", "Waits too long for cabs to accept bookings", "OTP and car number are displayed too close together — confusing to read quickly"],
        techLevel: 4, image: IMG_PERSONA_RICKY,
      },
    ],
    competitors: [
      {
        name: "Uber", tagline: "Global ride-hailing leader with own fleet",
        strengths: ["Easy to set up and get started", "Affordable pricing across ride tiers", "Positive user feedback on both Android and iOS", "Operates its own fleet of cars and chauffeurs"],
        weaknesses: ["Too many features cluttering the core booking experience", "Very polarising UX design — loved by some, disliked by many"],
      },
      {
        name: "Ola Cabs", tagline: "India's first and largest taxi aggregator",
        strengths: ["First-ever taxi aggregator in India — strong brand trust", "Good in-app safety features for riders", "Relatively simple core design"],
        weaknesses: ["Too many cab booking cancellations from drivers", "Dull and dated UI design", "Inconsistent UX across app versions and regions"],
      },
    ],
    featureComparison: {
      competitorNames: ["Lex Go", "Uber", "Ola Cabs", "Rapido", "Meru"],
      rows: [
        { feature: "Streamlined Booking Flow",        values: [true,  false, false, true,  false] },
        { feature: "Recent Locations on Home Screen", values: [true,  false, false, false, false] },
        { feature: "Reliable Cancellation Alerts",    values: [true,  false, false, true,  true]  },
        { feature: "Payment Method Switching",        values: [true,  true,  true,  false, false] },
        { feature: "In-App Safety Features",          values: [true,  true,  true,  false, true]  },
        { feature: "Scheduled Ride Booking",          values: [true,  true,  true,  false, true]  },
        { feature: "Clear OTP & Car Info Display",    values: [true,  false, false, false, false] },
        { feature: "24/7 Cab Availability",           values: [true,  true,  true,  false, false] },
      ],
    },
    swot: {
      strengths:     ["Streamlined booking flow — cab booked in seconds, not steps", "Recent locations surfaced on the home screen eliminating repetitive searching", "Clear, unambiguous OTP and car number display prevents rider confusion", "Reliable payment method switching that functions as users expect"],
      weaknesses:    ["New entrant competing against Ola and Uber with much larger driver networks", "No existing brand recognition or user base in a highly competitive market", "Limited driver supply during early launch phase affects ride availability"],
      opportunities: ["Growing commuter frustration with Ola/Uber cancellations creates an opening for reliability-first positioning", "Differentiate on UX quality and simplicity rather than feature quantity", "Capture daily commuters who need consistent, dependable cab service"],
      threats:       ["Ola and Uber have deep market penetration and strong brand loyalty across Indian cities", "Driver supply challenges in tier-2 cities could replicate the same cancellation problem", "Aggressive pricing from established players could offset UX advantages for price-sensitive users"],
    },
    results: [
      "Research confirmed 5 recurring pain points from direct one-to-one interviews with frequent cab users",
      "Competitive SWOT analysis of Ola and Uber revealed clear gaps in cancellation handling and payment reliability",
      "Designed a simplified booking flow that surfaces recent locations instantly — eliminating repetitive searching",
      "Delivered end-to-end UX — user flows, wireframes, and high-fidelity prototype targeting the most critical usability failures",
    ],
    userFlow:   true,
    styleGuide: true,
  },

  "03": {
    title: "Choco Factory",
    role: "UX Designer", year: "2023",
    tags: ["E-commerce", "Web Design", "Consumer UX", "Branding"],
    overview: "An e-commerce platform designed for a premium chocolate brand, focusing on an immersive shopping experience, smooth checkout flow, and vibrant visual storytelling.",
    heroImage: IMG_HEALTH,
    threeCols: {
      challenge: "Healthcare users — patients and clinicians alike — faced products built for compliance, not people. Dense information architecture and zero visual hierarchy made engagement nearly impossible.",
      solution:  "I led research-driven redesigns: competitive analysis, moderated usability studies, and iterative high-fidelity prototyping in Figma and Adobe XD — always with real users in the loop.",
      impact:    "Feature recommendations adopted across 5+ products. Prototype-to-dev handoff reduced by 35%. Stakeholder sessions cut from 3 rounds to 1 through clear, testable prototypes.",
    },
    painPoints: [
      { num: "01", title: "Clinical Complexity",      description: "Medical platforms were designed by and for clinical staff. Patients encountered walls of jargon with no plain-language alternatives." },
      { num: "02", title: "Inconsistent Patterns",    description: "Each product in the suite had been built by a different team. Patients moving between apps faced entirely different navigation models." },
      { num: "03", title: "No Usability Testing",     description: "Design decisions were based on stakeholder opinion rather than user evidence. Products shipped with known pain points never validated." },
      { num: "04", title: "Inaccessible Prototyping", description: "Stakeholder reviews relied on static PDFs. Feedback was slow, vague, and disconnected from how real users interact with the product." },
    ],
    prototypes: SCREENS_DRTM,
    screenLabels: [
      "Cover",               "Home Page",          "Product Listing",    "Product Detail",
      "Shopping Cart",       "Checkout Step 1",    "Checkout Step 2",    "Order Confirmation",
      "User Profile",        "Order History",      "About Us",           "Contact Us",
      "Promotional Landing",
    ],
    competitors: [
      {
        name: "Epic MyChart", tagline: "The EHR giant's patient portal",
        strengths: ["Deep EHR integration", "High clinical trust", "Feature-rich record access"],
        weaknesses: ["Poor consumer UX", "Overwhelmingly complex navigation", "Slow to innovate"],
      },
      {
        name: "Zocdoc", tagline: "Appointment-first healthcare platform",
        strengths: ["Massive provider network", "Frictionless booking flow", "Insurance filtering"],
        weaknesses: ["No clinical records", "Limited post-visit features", "Shallow health management"],
      },
      {
        name: "Teladoc", tagline: "Telehealth market leader",
        strengths: ["Strong telemedicine offering", "24/7 on-demand access", "Insurance coverage"],
        weaknesses: ["No in-person scheduling", "Limited EHR integration", "Subscription fatigue"],
      },
      {
        name: "HealthTap", tagline: "AI-driven health guidance",
        strengths: ["AI symptom checker", "Doctor Q&A access", "Cost-effective pricing"],
        weaknesses: ["Limited diagnostic depth", "Lower clinical trust", "No diagnostics support"],
      },
    ],
    featureComparison: {
      competitorNames: ["Our Design", "Epic MyChart", "Zocdoc", "Teladoc", "HealthTap"],
      rows: [
        { feature: "Appointment Booking",       values: [true,  true,  true,  false, false] },
        { feature: "EHR / Health Record Access",values: [true,  true,  false, false, true]  },
        { feature: "Video Consultation",        values: [true,  false, false, true,  true]  },
        { feature: "Lab Results Access",        values: [true,  true,  false, false, false] },
        { feature: "Prescription Management",   values: [true,  true,  false, true,  false] },
        { feature: "Multi-language Support",    values: [true,  false, false, false, false] },
        { feature: "Offline Access",            values: [true,  false, false, false, false] },
        { feature: "WCAG AA Accessibility",     values: [true,  false, false, false, false] },
      ],
    },
    swot: {
      strengths:     ["Research-first approach grounded in real user needs", "Cross-product consistency through shared design language", "High-fidelity interactive prototypes accelerate sign-off", "Deep domain expertise across 5+ healthcare product types"],
      weaknesses:    ["Healthcare compliance constraints limit design flexibility", "Long stakeholder review cycles in regulated industries", "User recruitment for sensitive health research is complex"],
      opportunities: ["Integrate AI-assisted symptom triage into patient flows", "Build accessible design guidelines for clinical staff tools", "Expand research practice with longitudinal studies"],
      threats:       ["Regulatory changes affecting feature scope mid-project", "Patient data privacy constraints limiting research methods", "Clinical staff resistance to consumer-grade UI patterns"],
    },
    results: [
      "Research recommendations adopted across 5+ healthcare products",
      "35% reduction in prototype-to-development handoff time",
      "Stakeholder approval rounds reduced from 3 to 1 using interactive Figma prototypes",
      "Usability study findings directly prevented 2 major post-launch UX regressions",
    ],
  },
};

// ─── Custom Cursor ────────────────────────────────────────────────────────────
function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos  = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const raf = useRef<number | null>(null);
  useEffect(() => {
    const onMove  = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };
    const tick    = () => {
      if (dotRef.current)  { dotRef.current.style.left = pos.current.x + "px"; dotRef.current.style.top = pos.current.y + "px"; }
      if (ringRef.current) {
        ring.current.x += (pos.current.x - ring.current.x) * 0.12;
        ring.current.y += (pos.current.y - ring.current.y) * 0.12;
        ringRef.current.style.left = ring.current.x + "px"; ringRef.current.style.top = ring.current.y + "px";
      }
      raf.current = requestAnimationFrame(tick);
    };
    const onEnter = (e: MouseEvent) => { if ((e.target as Element).closest("a,button,[data-hover]")) setHovering(true);  };
    const onLeave = (e: MouseEvent) => { if ((e.target as Element).closest("a,button,[data-hover]")) setHovering(false); };
    document.addEventListener("mousemove", onMove); document.addEventListener("mouseover", onEnter); document.addEventListener("mouseout", onLeave);
    raf.current = requestAnimationFrame(tick);
    return () => { document.removeEventListener("mousemove", onMove); document.removeEventListener("mouseover", onEnter); document.removeEventListener("mouseout", onLeave); if (raf.current) cancelAnimationFrame(raf.current); };
  }, []);
  return (
    <>
      <div ref={dotRef}  className={`cursor-dot  ${hovering ? "is-hovering" : ""}`} />
      <div ref={ringRef} className={`cursor-ring ${hovering ? "is-hovering" : ""}`} />
    </>
  );
}

// ─── Reveal ───────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className={className}>
      <motion.div initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}>
        {children}
      </motion.div>
    </div>
  );
}

// ─── Prototype Carousel ───────────────────────────────────────────────────────
function PrototypeCarousel({ images, labels }: { images: string[]; labels?: string[] }) {
  const [current,      setCurrent]      = useState(0);
  const [direction,    setDirection]    = useState(0);
  const [labelVisible, setLabelVisible] = useState(true);
  const labelTimerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHoveringRef  = useRef(false);

  const clearTimer = () => { if (labelTimerRef.current) clearTimeout(labelTimerRef.current); };
  const startTimer = () => {
    clearTimer();
    labelTimerRef.current = setTimeout(() => { if (!isHoveringRef.current) setLabelVisible(false); }, 8000);
  };

  // Show label + start 8s hide timer whenever slide changes
  useEffect(() => {
    setLabelVisible(true);
    startTimer();
    return clearTimer;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const goTo = (idx: number, dir: number) => { setDirection(dir); setCurrent(idx); };
  const prev = () => goTo((current - 1 + images.length) % images.length, -1);
  const next = () => goTo((current + 1) % images.length,  1);

  // Keyboard left/right
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "ArrowLeft") prev(); if (e.key === "ArrowRight") next(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  const variants = {
    enter:  (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: "0%", opacity: 1 },
    exit:   (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  const pad   = (n: number) => String(n).padStart(2, "0");
  const label = labels?.[current];

  return (
    <div>
      {/* ── Image frame — no overflow-hidden so arrows can bleed outside ── */}
      <div
        className="relative w-full bg-[#0A0A0A]"
        style={{ height: "78vh" }}
        onMouseEnter={() => { isHoveringRef.current = true;  clearTimer();  setLabelVisible(true); }}
        onMouseLeave={() => { isHoveringRef.current = false; startTimer(); }}
      >
        {/* Inner clip — only slides + vignettes are clipped */}
        <div className="absolute inset-0 overflow-hidden">
          <AnimatePresence custom={direction} initial={false}>
            <motion.img
              key={current}
              src={images[current]}
              alt={label || `Screen ${current + 1}`}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full object-contain"
            />
          </AnimatePresence>
          {/* Edge vignette */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
        </div>

        {/* ── Screen label — top-left, auto-hides after 8s, shows on hover ── */}
        {label && (
          <div
            className="absolute top-5 left-6 z-10 pointer-events-none"
            style={{ opacity: labelVisible ? 1 : 0, transition: "opacity 0.55s ease" }}
          >
            <div className="bg-white/90 backdrop-blur-md rounded-xl px-4 py-2.5 shadow-md border border-black/8">
              <p className="font-syne text-[10px] tracking-[0.18em] uppercase text-black/35 mb-0.5 leading-none">
                Screen {pad(current + 1)} / {pad(images.length)}
              </p>
              <p className="font-syne font-bold text-sm text-[#0A0A0A] leading-tight">{label}</p>
            </div>
          </div>
        )}

        {/* ── Prev arrow — 96×96 button is the real hit area; 56px circle is visual only ── */}
        <button
          onClick={prev}
          data-hover
          aria-label="Previous screen"
          style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", zIndex: 20, width: 96, height: 96, display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", border: "none", cursor: "pointer" }}
          className="group focus:outline-none"
        >
          <div className="w-14 h-14 rounded-full bg-white/92 backdrop-blur-sm flex items-center justify-center shadow-xl border border-black/8 group-hover:bg-black group-hover:border-transparent transition-all duration-200">
            <svg className="w-5 h-5 text-black group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </div>
        </button>

        {/* ── Next arrow — 96×96 button is the real hit area; 56px circle is visual only ── */}
        <button
          onClick={next}
          data-hover
          aria-label="Next screen"
          style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", zIndex: 20, width: 96, height: 96, display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", border: "none", cursor: "pointer" }}
          className="group focus:outline-none"
        >
          <div className="w-14 h-14 rounded-full bg-white/92 backdrop-blur-sm flex items-center justify-center shadow-xl border border-black/8 group-hover:bg-black group-hover:border-transparent transition-all duration-200">
            <svg className="w-5 h-5 text-black group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      </div>

      {/* ── Pagination bar ───────────────────────────────────────────────── */}
      <div className="w-full bg-[#F7F7F7] border-b border-black/[0.07]">
        <div className="px-6 md:px-16 lg:px-24 py-5 max-w-[1600px] mx-auto flex items-center justify-between gap-8">

          {/* Dash track */}
          <div className="flex items-center gap-[6px] flex-wrap">
            {images.map((_, i) => (
              <button
                key={i}
                data-hover
                onClick={() => goTo(i, i > current ? 1 : -1)}
                aria-label={`Screen ${i + 1}${labels?.[i] ? ": " + labels[i] : ""}`}
                className="rounded-full focus:outline-none transition-all duration-300"
                style={{
                  width:      i === current ? "42px" : "13px",
                  height:     i === current ? "7px"  : "5px",
                  background: i === current ? "#0A0A0A" : "rgba(0,0,0,0.18)",
                  boxShadow:  i === current ? "0 0 0 1.5px rgba(0,0,0,0.08)" : "inset 0 0 0 1px rgba(0,0,0,0.10)",
                  transform:  i === current ? "scaleY(1)" : "scaleY(0.85)",
                }}
              />
            ))}
          </div>

          {/* Counter only */}
          <span className="font-syne text-sm text-black/45 tracking-wide select-none flex-shrink-0">
            <span className="font-bold text-black/70">{pad(current + 1)}</span>
            <span className="mx-1.5 text-black/20">/</span>
            {pad(images.length)}
          </span>

        </div>
      </div>
    </div>
  );
}

// ─── Persona Card ─────────────────────────────────────────────────────────────
function PersonaCard({ persona, wide = false }: { persona: UserPersona; wide?: boolean }) {
  if (wide) {
    return (
      <div className="rounded-3xl overflow-hidden border border-black/10 hover:border-black/20 transition-colors grid grid-cols-1 md:grid-cols-2">
        {/* LEFT — photo + identity + quote (dark) */}
        <div className="bg-[#0A0A0A] flex flex-col">
          <div className="relative flex-1" style={{ minHeight: "300px" }}>
            <img src={persona.image} alt={persona.name} className="absolute inset-0 w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="inline-block font-syne text-xs tracking-widest uppercase text-white/80 border border-white/50 rounded-full px-3 py-1 mb-3 w-fit">{persona.age} yrs old</span>
              <h3 className="font-jakarta text-3xl font-extrabold text-white leading-tight mb-1">{persona.name}</h3>
              <p className="font-inter text-xs text-white/60">{persona.role}</p>
            </div>
          </div>
          <div className="border-t border-white/8 px-8 py-6">
            <p className="font-inter italic text-sm text-white/60 leading-relaxed">"{persona.quote}"</p>
          </div>
        </div>

        {/* RIGHT — goals + pain points (light) */}
        <div className="p-10 md:p-12 flex flex-col gap-10 border-t md:border-t-0 md:border-l border-black/10 justify-center">
          <div>
            <p className="font-syne text-xs tracking-[0.18em] uppercase text-black/50 mb-4">Goals</p>
            <ul className="flex flex-col gap-3">
              {persona.goals.map((g) => (
                <li key={g} className="font-inter text-sm text-black/70 leading-relaxed flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C853]/70 flex-shrink-0 mt-[5px]" />{g}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-syne text-xs tracking-[0.18em] uppercase text-black/50 mb-4">Pain Points</p>
            <ul className="flex flex-col gap-3">
              {persona.painPoints.map((pp) => (
                <li key={pp} className="font-inter text-sm text-black/70 leading-relaxed flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF3D00]/50 flex-shrink-0 mt-[5px]" />{pp}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl overflow-hidden border border-black/10 hover:border-black/20 transition-colors">
      {/* Dark top */}
      <div className="bg-[#0A0A0A] relative" style={{ height: "240px" }}>
        <img src={persona.image} alt={persona.name} className="absolute right-0 top-0 h-full w-1/2 object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <span className="inline-block font-syne text-xs tracking-widest uppercase text-white/80 border border-white/50 rounded-full px-3 py-1 mb-3 w-fit">{persona.age} yrs old</span>
          <h3 className="font-jakarta text-3xl font-extrabold text-white leading-tight mb-1">{persona.name}</h3>
          <p className="font-inter text-xs text-white/60">{persona.role}</p>
        </div>
      </div>
      {/* Quote strip */}
      <div className="bg-[#111] border-t border-white/5 px-8 py-5">
        <p className="font-inter italic text-sm text-white/60 leading-relaxed">"{persona.quote}"</p>
      </div>
      {/* Goals + Pain Points */}
      <div className="p-8 grid grid-cols-2 gap-6 border-t border-black/8">
        <div>
          <p className="font-syne text-xs tracking-[0.18em] uppercase text-black/50 mb-3">Goals</p>
          <ul className="flex flex-col gap-2">
            {persona.goals.map((g) => (
              <li key={g} className="font-inter text-xs text-black/68 leading-relaxed flex gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C853]/70 flex-shrink-0 mt-1" />{g}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-syne text-xs tracking-[0.18em] uppercase text-black/50 mb-3">Pain Points</p>
          <ul className="flex flex-col gap-2">
            {persona.painPoints.map((pp) => (
              <li key={pp} className="font-inter text-xs text-black/68 leading-relaxed flex gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3D00]/50 flex-shrink-0 mt-1" />{pp}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ─── User Flow Section ────────────────────────────────────────────────────────
function UserFlowSection() {
  // ── Primitive node components ────────────────────────────────────────────
  const NodeStart = ({ label }: { label: string }) => (
    <div className="w-14 h-14 rounded-full bg-[#1A1A1A] flex items-center justify-center text-center shrink-0">
      <span className="font-inter text-[10px] text-white/85 leading-tight px-2">{label}</span>
    </div>
  );
  const NodePage = ({ label, className = "" }: { label: string; className?: string }) => (
    <div className={`bg-[#57C4AB] rounded-xl p-3 flex items-center justify-center text-center w-full ${className}`}>
      <span className="font-inter text-[11px] text-white/95 leading-snug">{label}</span>
    </div>
  );
  const NodeAction = ({ label }: { label: string }) => (
    <div className="bg-[#1A5F7A] rounded-xl p-2.5 flex items-center justify-center text-center w-full">
      <span className="font-inter text-[10px] text-white leading-snug">{label}</span>
    </div>
  );
  // clip-path diamond stays strictly within its own bounding box — no overflow, no clipping by scroll container
  const NodeDecision = ({ label, size = "md" }: { label: string; size?: "sm" | "md" }) => {
    const dim = size === "sm" ? "w-16 h-16" : "w-24 h-24";
    return (
      <div
        className={`${dim} bg-[#D75F5F] flex items-center justify-center shrink-0`}
        style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
      >
        <span className="font-inter text-[9px] text-white text-center leading-snug px-5">{label}</span>
      </div>
    );
  };
  const ArrowH = () => (
    <div className="flex items-center shrink-0 mx-2">
      <div className="w-6 h-px bg-black/20" />
      <div className="w-0 h-0 border-l-[5px] border-t-[3px] border-b-[3px] border-l-black/20 border-t-transparent border-b-transparent" />
    </div>
  );
  const ArrowV = ({ tall }: { tall?: boolean }) => (
    <div className="flex flex-col items-center shrink-0">
      <div className={`w-px bg-black/20 ${tall ? "h-6" : "h-4"}`} />
      <div className="w-0 h-0 border-t-[5px] border-l-[3px] border-r-[3px] border-t-black/20 border-l-transparent border-r-transparent" />
    </div>
  );
  const MiniArrowV = () => (
    <div className="flex flex-col items-center my-0.5">
      <div className="w-px h-3 bg-black/20" />
      <div className="w-0 h-0 border-t-[4px] border-l-[2.5px] border-r-[2.5px] border-t-black/20 border-l-transparent border-r-transparent" />
    </div>
  );

  // Sub-flow data — one array per dashboard column
  const subFlows: { type: "action" | "decision"; label: string }[][] = [
    [{ type: "action", label: "List of Chapters" }],
    [
      { type: "action", label: "AI Chat Bot starts lesson (Pre-Loaded Chats)" },
      { type: "action", label: "Tap to continue after AI Chat Bot's response" },
      { type: "action", label: "Skip — View all Chats" },
    ],
    [
      { type: "action", label: "Chapters In Progress" },
      { type: "action", label: "Continue from where it was left off" },
      { type: "action", label: "Skip — View all Chats" },
    ],
    [
      { type: "action", label: "Chapters Completed" },
      { type: "action", label: "Click Retake to start Chat again" },
    ],
    [{ type: "decision", label: "Log Out" }],
  ];

  return (
    <section className="px-6 md:px-16 lg:px-24 mb-28 md:mb-36 max-w-[1600px] mx-auto">
      <p className="font-syne text-sm tracking-widest uppercase text-black/45 mb-6">Ideation</p>
      <h2 className="font-jakarta font-extrabold text-black mb-12 md:mb-16 leading-none" style={{ fontSize: "clamp(36px, 6vw, 80px)" }}>User Flow</h2>

      {/* Horizontally scrollable only when viewport is narrow */}
      <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0 pb-4">
        <div style={{ minWidth: "820px" }} className="pt-6">

          {/* ── LAYER 1 · Entry path (centred above the dashboard) ── */}
          <div className="flex items-center justify-center mb-2">
            <NodeStart label="Open App" />
            <ArrowH />
            <NodePage label="Loading Page" className="max-w-[118px]" />
            <ArrowH />
            <NodeDecision label="Sign In / Sign Up" />
          </div>

          {/* Connector: entry → dashboard */}
          <div className="flex justify-center mb-2">
            <ArrowV tall />
          </div>

          {/* ── LAYER 2 · Dashboard rail ── */}
          <div className="relative border-2 border-[#57C4AB]/40 rounded-2xl p-4 mb-2">
            <span className="absolute -top-[11px] left-5 bg-white px-2.5 font-syne text-[9px] uppercase tracking-[0.2em] text-black/35">
              Dashboard
            </span>
            {/* Equal-width columns via CSS grid — never overflows */}
            <div className="grid grid-cols-5 gap-3">
              <NodePage label="Choose Class & Syllabus" />
              <NodePage label="Choose Chapters" />
              <NodePage label="In Progress Chapters" />
              <NodePage label="Completed / Retake" />
              <NodePage label="Profile" />
            </div>
          </div>

          {/* ── Down arrows, one per column ── */}
          <div className="grid grid-cols-5 gap-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-center">
                <ArrowV />
              </div>
            ))}
          </div>

          {/* ── LAYER 3 · Sub-flows ── */}
          <div className="grid grid-cols-5 gap-3 items-start">
            {subFlows.map((flow, colIdx) => (
              <div key={colIdx} className="flex flex-col items-center">
                {flow.map((node, nodeIdx) => (
                  <div key={nodeIdx} className="w-full flex flex-col items-center">
                    {node.type === "decision" ? (
                      <NodeDecision label={node.label} size="sm" />
                    ) : (
                      <NodeAction label={node.label} />
                    )}
                    {nodeIdx < flow.length - 1 && <MiniArrowV />}
                  </div>
                ))}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── LexGo User Flow Section ──────────────────────────────────────────────────
function LexGoUserFlowSection() {
  // ── Colors (dark enough for white text) ────────────────────────────────────
  const C_MAIN = "#1B7065"; // dark teal-green  — main flow nodes
  const C_SIDE = "#1A537A"; // dark navy-blue    — side branch nodes
  const C_DIAM = "#0D7A8F"; // deep teal-cyan    — decision diamond

  // ── Node primitives ────────────────────────────────────────────────────────
  const NodeStart = ({ label }: { label: string }) => (
    <div className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center text-center shrink-0">
      <span className="font-inter text-[10px] text-white/85 leading-tight px-2">{label}</span>
    </div>
  );
  // Entry-path page node — fixed 120 px width
  const NodePage = ({ label }: { label: string }) => (
    <div style={{ width: 120, backgroundColor: C_MAIN }} className="rounded-xl px-3 py-2.5 flex items-center justify-center text-center shrink-0">
      <span className="font-inter text-[11px] text-white leading-snug">{label}</span>
    </div>
  );
  // Main vertical-flow node — fixed 160 px width
  const NodeMain = ({ label }: { label: string }) => (
    <div style={{ width: 160, backgroundColor: C_MAIN }} className="rounded-xl px-4 py-3.5 flex items-center justify-center text-center shrink-0">
      <span className="font-inter text-xs text-white leading-snug">{label}</span>
    </div>
  );
  // Side-branch node — fixed 130 px width
  const NodeSide = ({ label }: { label: string }) => (
    <div style={{ width: 130, backgroundColor: C_SIDE }} className="rounded-xl px-3 py-3 flex items-center justify-center text-center shrink-0">
      <span className="font-inter text-[10px] text-white leading-snug">{label}</span>
    </div>
  );
  // clip-path diamond — stays inside bounding box, zero overflow
  const NodeDecision = ({ label }: { label: string }) => (
    <div
      className="w-20 h-20 flex items-center justify-center shrink-0"
      style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", backgroundColor: C_DIAM }}
    >
      <span className="font-inter text-[9px] text-white text-center leading-snug px-5">{label}</span>
    </div>
  );
  const ArrowH = () => (
    <div className="flex items-center shrink-0 mx-2">
      <div className="w-6 h-px bg-black/20" />
      <div className="w-0 h-0 border-l-[5px] border-t-[3px] border-b-[3px] border-l-black/20 border-t-transparent border-b-transparent" />
    </div>
  );
  const ArrowV = () => (
    <div className="flex flex-col items-center shrink-0 my-1">
      <div className="w-px h-4 bg-black/20" />
      <div className="w-0 h-0 border-t-[5px] border-l-[3px] border-r-[3px] border-t-black/20 border-l-transparent border-r-transparent" />
    </div>
  );

  // ── Main vertical flow data ─────────────────────────────────────────────────
  const mainFlow: { label: string; side?: string }[] = [
    { label: "Enter Pickup Location" },
    { label: "Select Cab Type" },
    { label: "Choose Destination" },
    { label: "Request for Cab",  side: "Cancel" },
    { label: "Wait for Pick Up" },
    { label: "Start the Ride",   side: "Tell the OTP to the Driver" },
    { label: "Reach Destination" },
    { label: "Pay for the Ride", side: "Pay by Cash, UPI or Card" },
  ];

  /*
   * Layout maths (all CSS widths):
   *   NodeStart=48  ArrowH=40  NodePage=120  ArrowH=40  NodeDecision=80
   *   Entry total = 328 px
   *   Diamond centre from left = 48+40+120+40+40 = 288 px
   *   NodeMain half-width = 80 px  →  main-flow marginLeft = 288−80 = 208 px
   *   Widest row = 208 + 160 + 40 + 130 = 538 px  → minWidth 560 px
   */
  const ML = 208; // px — aligns NodeMain centre under diamond centre

  return (
    <section className="px-6 md:px-16 lg:px-24 mb-28 md:mb-36 max-w-[1600px] mx-auto">
      <p className="font-syne text-sm tracking-widest uppercase text-black/45 mb-6">Ideation</p>
      <h2 className="font-jakarta font-extrabold text-black mb-12 md:mb-16 leading-none" style={{ fontSize: "clamp(36px, 6vw, 80px)" }}>User Flow</h2>

      {/* overflow-x-auto only kicks in on narrow screens; pt-6 stops top clip */}
      <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0 pb-4">
        <div style={{ minWidth: 560 }} className="pt-6">

          {/* ── Entry path ── */}
          <div className="flex items-center">
            <NodeStart label="Open App" />
            <ArrowH />
            <NodePage label="Loading Page" />
            <ArrowH />
            <NodeDecision label="Sign In / Sign Up" />
          </div>

          {/* ── Main vertical flow, offset so NodeMain centre ≡ diamond centre ── */}
          <div style={{ marginLeft: ML }}>
            {/* down arrow from diamond */}
            <div style={{ width: 160 }} className="flex justify-center my-1">
              <ArrowV />
            </div>

            {mainFlow.map((step, idx) => (
              <div key={idx}>
                {/* row: main node + optional side branch */}
                <div className="flex items-center">
                  <NodeMain label={step.label} />
                  {step.side && (
                    <>
                      <ArrowH />
                      <NodeSide label={step.side} />
                    </>
                  )}
                </div>
                {/* vertical connector to next step */}
                {idx < mainFlow.length - 1 && (
                  <div style={{ width: 160 }} className="flex justify-center my-1">
                    <ArrowV />
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Style Guide Section ──────────────────────────────────────────────────────
function StyleGuideSection() {
  const colorGroups = [
    {
      label: "Text & Icons",
      swatches: [
        { name: "White Smoke",        hex: "#F4F4F4" },
        { name: "Gray 89",            hex: "#E3E3E3" },
        { name: "Gray 44",            hex: "#707070" },
        { name: "Silver Polish Gray", hex: "#C6C6C6" },
      ],
    },
    {
      label: "Background & Logo",
      swatches: [
        { name: "Spiced Coral",    hex: "#D75F5F" },
        { name: "Race Car Stripe", hex: "#D14646" },
        { name: "Artful Red",      hex: "#820000" },
      ],
    },
    {
      label: "Logo",
      swatches: [
        { name: "Shoreline Green", hex: "#57C4AB" },
        { name: "Pottery Blue",    hex: "#52ABC1" },
      ],
    },
  ];

  const typefaces = [
    { name: "Mukta Mahee", sample: "Mukta Mahee",  usage: "Logo" },
    { name: "Montserrat",  sample: "Montserrat",   usage: "Header · Body" },
  ];

  const icons = [
    { label: "Forward",   path: "M9 18l6-6-6-6" },
    { label: "Chevron",   path: "M19 9l-7 7-7-7" },
    { label: "More",      path: "M12 5v.01M12 12v.01M12 19v.01" },
    { label: "Menu",      path: "M4 6h16M4 12h16M4 18h16" },
    { label: "Profile",   path: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" },
  ];

  return (
    <section className="px-6 md:px-16 lg:px-24 mb-28 md:mb-36 max-w-[1600px] mx-auto">
      <p className="font-syne text-sm tracking-widest uppercase text-black/45 mb-6">Visual Design</p>
      <h2 className="font-jakarta font-extrabold text-black mb-12 md:mb-16 leading-none" style={{ fontSize: "clamp(36px, 6vw, 80px)" }}>Style Guide</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ── Colour Palette ── */}
        <div className="border border-black/10 rounded-3xl p-10 md:p-12 hover:border-black/20 transition-colors">
          <p className="font-syne text-xs tracking-[0.18em] uppercase text-[#D75F5F] mb-8">Colour Palette</p>
          <div className="flex flex-col gap-8">
            {colorGroups.map((group) => (
              <div key={group.label} className="flex items-start gap-5">
                <p className="font-inter text-[10px] text-black/40 w-28 flex-shrink-0 pt-3 leading-relaxed">{group.label}</p>
                <div className="w-px self-stretch bg-black/10 flex-shrink-0" />
                <div className="flex flex-wrap gap-4">
                  {group.swatches.map((s) => (
                    <div key={s.hex} className="flex flex-col items-center gap-2">
                      <div
                        className="w-11 h-11 rounded-full shadow-sm border border-black/8"
                        style={{ backgroundColor: s.hex }}
                      />
                      <div className="text-center">
                        <p className="font-inter text-[9px] text-black/60 leading-tight">{s.name}</p>
                        <p className="font-syne text-[9px] text-black/35 tracking-wide">{s.hex}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Icons + Typefaces ── */}
        <div className="flex flex-col gap-6">

          {/* Icons */}
          <div className="border border-black/10 rounded-3xl p-10 md:p-12 hover:border-black/20 transition-colors">
            <p className="font-syne text-xs tracking-[0.18em] uppercase text-[#57C4AB] mb-8">Icons</p>
            <div className="flex items-center gap-8">
              {icons.map((icon) => (
                <div key={icon.label} className="flex flex-col items-center gap-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-black/70">
                    <path d={icon.path} />
                  </svg>
                  <span className="font-inter text-[9px] text-black/35">{icon.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Typefaces */}
          <div className="border border-black/10 rounded-3xl p-10 md:p-12 hover:border-black/20 transition-colors flex-1">
            <p className="font-syne text-xs tracking-[0.18em] uppercase text-[#57C4AB] mb-8">Type Faces</p>
            <div className="flex flex-col gap-6">
              {typefaces.map((tf) => (
                <div key={tf.name} className="flex items-baseline justify-between border-b border-black/6 pb-6 last:border-b-0 last:pb-0">
                  <div>
                    <p className="font-jakarta text-3xl font-extrabold text-black leading-none mb-1" style={{ fontFamily: tf.name === "Montserrat" ? "'Montserrat', sans-serif" : "inherit" }}>
                      {tf.sample}
                    </p>
                    <p className="font-inter text-xs text-black/40">{tf.usage}</p>
                  </div>
                  <span className="font-syne text-xs tracking-widest uppercase text-black/25 ml-4">{tf.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── LexGo Style Guide Section ────────────────────────────────────────────────
function LexGoStyleGuideSection() {
  const primary = [
    { name: "Mint Green", hex: "#74D4A0" },
    { name: "Cyan Blue",  hex: "#2B9DC6" },
    { name: "White",      hex: "#FFFFFF" },
  ];
  const secondary = [
    { name: "White",       hex: "#FFFFFF" },
    { name: "Light Grey",  hex: "#E0E0E0" },
    { name: "Mid Grey",    hex: "#757575" },
    { name: "Dark Grey",   hex: "#4A4A4A" },
    { name: "Black",       hex: "#0A0A0A" },
  ];
  const typeRamp = [
    { label: "Heading 1",   spec: "20 px · Regular" },
    { label: "Heading 2",   spec: "14 px · Regular" },
    { label: "Heading 3",   spec: "12 px · Regular" },
    { label: "Heading 4",   spec: "10 px · Regular" },
    { label: "Sub Heading", spec: "10 px · Regular" },
    { label: "Buttons",     spec: "14 px · Regular" },
    { label: "Buttons",     spec: "14 px · Semi Bold" },
    { label: "Buttons",     spec: "10 px · Bold" },
  ];

  return (
    <section className="px-6 md:px-16 lg:px-24 mb-28 md:mb-36 max-w-[1600px] mx-auto">
      <p className="font-syne text-sm tracking-widest uppercase text-black/45 mb-6">Visual Design</p>
      <h2 className="font-jakarta font-extrabold text-black mb-12 md:mb-16 leading-none" style={{ fontSize: "clamp(36px, 6vw, 80px)" }}>Style Guide</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ── Colour Palette ── */}
        <div className="border border-black/10 rounded-3xl p-10 md:p-12 hover:border-black/20 transition-colors">
          <p className="font-syne text-xs tracking-[0.18em] uppercase mb-8" style={{ color: "#2B9DC6" }}>Colour Palette</p>

          {/* Primary */}
          <p className="font-inter text-xs text-black/50 mb-3">Primary Colours</p>
          <div className="flex items-start gap-5 bg-[#0A0A0A] rounded-2xl p-5 mb-7">
            {primary.map((s) => (
              <div key={s.hex} className="flex flex-col items-center gap-2">
                <div
                  className="w-12 h-12 rounded-full"
                  style={{ backgroundColor: s.hex, border: s.hex === "#FFFFFF" ? "1.5px solid rgba(255,255,255,0.25)" : "none" }}
                />
                <p className="font-syne text-[9px] text-white/40 tracking-wide">{s.hex}</p>
              </div>
            ))}
          </div>

          {/* Secondary */}
          <p className="font-inter text-xs text-black/50 mb-3">Secondary Colours</p>
          <div className="flex items-start gap-4 bg-[#0A0A0A] rounded-2xl p-5">
            {secondary.map((s) => (
              <div key={s.hex + s.name} className="flex flex-col items-center gap-2">
                <div
                  className="w-11 h-11 rounded-full"
                  style={{ backgroundColor: s.hex, boxShadow: "0 0 0 1.5px rgba(255,255,255,0.18)" }}
                />
                <p className="font-syne text-[9px] text-white/40 tracking-wide">{s.hex}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Typography ── */}
        <div className="border border-black/10 rounded-3xl p-10 md:p-12 hover:border-black/20 transition-colors">
          <p className="font-syne text-xs tracking-[0.18em] uppercase mb-8" style={{ color: "#2B9DC6" }}>Type Faces</p>
          {/* Montserrat */}
          <div className="pb-5 mb-5 border-b border-black/8">
            <p className="font-jakarta font-extrabold text-2xl text-black leading-none mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>Montserrat</p>
            <p className="font-inter text-[10px] text-black/40">Logo Text</p>
          </div>
          {/* Inter */}
          <p className="font-jakarta font-extrabold text-xl text-black mb-4">Inter</p>
          <ul className="flex flex-col gap-2.5">
            {typeRamp.map((t, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-black/25" />
                <span className="font-inter text-xs text-black/65 leading-snug">
                  {t.label} / {t.spec}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ─── Competitor Grid ──────────────────────────────────────────────────────────
function CompetitorGrid({ competitors }: { competitors: Competitor[] }) {
  return (
    <section className="px-6 md:px-16 lg:px-24 mb-28 md:mb-36 max-w-[1600px] mx-auto">
      <p className="font-syne text-sm tracking-widest uppercase text-black/45 mb-6">Competitive Landscape</p>
      <h2 className="font-jakarta font-extrabold text-black mb-12 md:mb-16 leading-none" style={{ fontSize: "clamp(36px, 6vw, 80px)" }}>
        Competitor Analysis
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {competitors.map((c, i) => (
          <div key={c.name} className="border border-black/10 rounded-3xl p-10 md:p-12 hover:border-black/20 transition-colors">
            <div className="flex items-start justify-between mb-7 pb-7 border-b border-black/8">
              <div>
                <p className="font-syne text-sm tracking-widest uppercase text-black/40 mb-2">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="font-jakarta text-3xl md:text-4xl font-extrabold text-black mb-1">{c.name}</h3>
                <p className="font-inter text-xs text-black/55">{c.tagline}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="font-syne text-xs tracking-widest uppercase mb-3" style={{ color: "#00C853" }}>Strengths</p>
                <ul className="flex flex-col gap-2.5">
                  {c.strengths.map((s) => (
                    <li key={s} className="font-inter text-xs text-black/68 leading-relaxed flex gap-2">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1 bg-[#00C853]" />{s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-syne text-xs tracking-widest uppercase mb-3" style={{ color: "#FF3D00" }}>Weaknesses</p>
                <ul className="flex flex-col gap-2.5">
                  {c.weaknesses.map((w) => (
                    <li key={w} className="font-inter text-xs text-black/68 leading-relaxed flex gap-2">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1 bg-[#FF3D00]" />{w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Feature Comparison ───────────────────────────────────────────────────────
function FeatureComparison({ data }: { data: FeatureComparisonData }) {
  const [ourName, ...compNames] = data.competitorNames;
  const total = data.competitorNames.length;
  return (
    <section className="px-6 md:px-16 lg:px-24 mb-28 md:mb-36 max-w-[1600px] mx-auto">
      <p className="font-syne text-sm tracking-widest uppercase text-black/45 mb-6">Product Benchmarking</p>
      <h2 className="font-jakarta font-extrabold text-black mb-12 md:mb-16 leading-none" style={{ fontSize: "clamp(36px, 6vw, 80px)" }}>
        Feature Comparison
      </h2>
      <div className="overflow-x-auto rounded-3xl border border-black/10">
        <table className="w-full min-w-[640px] border-collapse">
          {/* Header row */}
          <thead>
            <tr>
              <th className="text-left px-8 py-5 font-syne text-sm uppercase tracking-widest text-black/30 bg-[#FAFAFA] border-b border-black/8 border-r border-black/8 min-w-[200px] rounded-tl-3xl">
                Feature
              </th>
              {/* Our Design — highlighted black */}
              <th className="px-6 py-5 bg-[#0A0A0A] border-b border-white/5 border-r border-white/5 text-center min-w-[120px]">
                <p className="font-syne text-xs tracking-[0.18em] uppercase text-white/40 mb-0.5">Our</p>
                <p className="font-syne font-bold text-sm text-white">{ourName}</p>
              </th>
              {compNames.map((name, i) => (
                <th key={name} className={`px-6 py-5 bg-[#FAFAFA] border-b border-black/8 text-center min-w-[120px] ${i < compNames.length - 1 ? "border-r border-black/8" : ""} ${i === compNames.length - 1 ? "rounded-tr-3xl" : ""}`}>
                  <p className="font-syne text-xs tracking-widest uppercase text-black/45 mb-0.5">Competitor</p>
                  <p className="font-syne font-bold text-xs text-black/70">{name}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, ri) => {
              const isLast = ri === data.rows.length - 1;
              return (
                <tr key={row.feature} className={ri % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]/60"}>
                  <td className={`px-8 py-4 font-inter text-sm text-black/65 border-r border-black/8 ${isLast ? "rounded-bl-3xl" : ""}`}>{row.feature}</td>
                  {row.values.map((val, ci) => {
                    const isOurs  = ci === 0;
                    const isLastC = ci === total - 1;
                    return (
                      <td
                        key={ci}
                        className={`px-6 py-4 text-center ${isOurs ? "bg-[#0A0A0A]" : ""} ${ci < total - 1 && !isOurs ? "border-r border-black/8" : ""} ${isOurs && !isLast ? "border-b border-white/5" : ""} ${isLast && isLastC ? "rounded-br-3xl" : ""}`}
                      >
                        {val ? (
                          <span className={`text-base select-none ${isOurs ? "text-emerald-400" : "text-black/50"}`}>✓</span>
                        ) : (
                          <span className={`text-base select-none ${isOurs ? "text-white/15" : "text-black/15"}`}>✗</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ─── Full-Screen Case Study Modal ─────────────────────────────────────────────
function CaseStudyModal({ study, onClose }: { study: CaseStudyFull; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  const swotConfig = [
    { key: "strengths",     label: "Strengths",     color: "#00C853", items: study.swot.strengths     },
    { key: "weaknesses",    label: "Weaknesses",    color: "#FF3D00", items: study.swot.weaknesses    },
    { key: "opportunities", label: "Opportunities", color: "#3D5AFE", items: study.swot.opportunities },
    { key: "threats",       label: "Threats",       color: "#FFB300", items: study.swot.threats       },
  ];

  return (
    <>
      {/* Fixed close button */}
      <motion.div className="fixed top-8 right-8 z-[300]" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ delay: 0.4, duration: 0.3 }}>
        <button onClick={onClose} data-hover className="flex items-center gap-2.5 bg-black text-white font-inter text-xs tracking-widest uppercase px-5 py-3 rounded-full hover:bg-[#222] transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          Close
        </button>
      </motion.div>

      {/* Full-screen scroll container */}
      <motion.div className="fixed inset-0 z-[200] bg-white overflow-y-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} style={{ cursor: "auto" }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>

          {/* ① TITLE */}
          <section className="px-6 md:px-16 lg:px-24 pt-20 pb-16 max-w-[1600px] mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="font-inter text-xs tracking-widest uppercase text-black/50">{study.role}</span>
              <span className="w-1 h-1 rounded-full bg-black/30" />
              <span className="font-inter text-xs tracking-widest uppercase text-black/50">{study.year}</span>
            </div>
            <h1 className="font-jakarta font-extrabold text-black leading-[0.88] tracking-tight mb-10" style={{ fontSize: "clamp(56px, 10vw, 140px)" }}>
              {study.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              {study.tags.map((tag) => (
                <span key={tag} className="font-inter text-[11px] bg-black/[0.05] text-black/60 rounded px-3 py-1 tracking-wide">{tag}</span>
              ))}
            </div>
          </section>

          {/* ② HERO */}
          <div className="w-full overflow-hidden" style={{ height: "75vh" }}>
            <motion.img src={study.heroImage} alt={study.title} className="w-full h-full object-cover" initial={{ scale: 1.06 }} animate={{ scale: 1 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} />
          </div>

          {/* ③ OVERVIEW */}
          <section className="px-6 md:px-16 lg:px-24 py-24 md:py-32 max-w-[1600px] mx-auto">
            <p className="font-syne text-sm tracking-widest uppercase text-black/45 mb-8">Overview</p>
            <p className="font-inter text-black/80 leading-[1.2] max-w-5xl" style={{ fontSize: "clamp(24px, 3.5vw, 52px)" }}>
              {study.overview}
            </p>
          </section>

          {/* ③b DESIGN PROCESS (optional) */}
          {study.processSteps && study.processSteps.length > 0 && (
            <section className="px-6 md:px-16 lg:px-24 mb-28 md:mb-36 max-w-[1600px] mx-auto">
              <p className="font-syne text-sm tracking-widest uppercase text-black/45 mb-6">Design Process</p>
              <h2 className="font-jakarta font-extrabold text-black mb-12 md:mb-16 leading-none" style={{ fontSize: "clamp(36px, 6vw, 80px)" }}>How We Got Here</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {study.processSteps.map((phase, idx) => (
                  <div key={phase.phase} className="relative bg-[#0A0A0A] rounded-3xl p-8 md:p-10 overflow-hidden">
                    <span className="absolute -right-2 -top-4 font-syne font-extrabold text-white select-none pointer-events-none leading-none" style={{ fontSize: "clamp(80px, 10vw, 130px)", opacity: 0.04 }}>{String(idx + 1).padStart(2,"0")}</span>
                    <p className="font-syne text-xs tracking-[0.2em] uppercase text-white/35 mb-4">{String(idx + 1).padStart(2,"0")}</p>
                    <h3 className="font-jakarta text-2xl font-bold text-white mb-5">{phase.phase}</h3>
                    <ul className="flex flex-col gap-2.5">
                      {phase.steps.map((step) => (
                        <li key={step} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/30 flex-shrink-0 mt-[5px]" />
                          <span className="font-inter text-sm text-white/60 leading-snug">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ④ 3-COLUMN GRID */}
          <section className="px-6 md:px-16 lg:px-24 mb-28 md:mb-36 max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 border border-black/10 rounded-3xl overflow-hidden">
              {[
                { label: "Challenge", text: study.threeCols.challenge },
                { label: "Solution",  text: study.threeCols.solution  },
                { label: "Impact",    text: study.threeCols.impact    },
              ].map((col, i) => (
                <div key={col.label} className={`p-10 md:p-12 flex flex-col gap-5 ${i < 2 ? "border-b md:border-b-0 md:border-r border-black/10" : ""}`}>
                  <p className="font-syne text-sm tracking-widest uppercase text-black/45">{col.label}</p>
                  <p className="font-inter text-sm text-black/70 leading-relaxed">{col.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ④b INTERVIEW QUESTIONS (optional) */}
          {study.interviewQuestions && study.interviewQuestions.length > 0 && (
            <section className="px-6 md:px-16 lg:px-24 mb-28 md:mb-36 max-w-[1600px] mx-auto">
              <p className="font-syne text-sm tracking-widest uppercase text-black/45 mb-6">User Research</p>
              <h2 className="font-jakarta font-extrabold text-black mb-12 md:mb-16 leading-none" style={{ fontSize: "clamp(36px, 6vw, 80px)" }}>Interview Questions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {study.interviewQuestions.map((q, idx) => (
                  <div key={idx} className="flex items-start gap-5 border border-black/10 rounded-2xl px-8 py-6 hover:border-black/20 transition-colors">
                    <span className="font-syne text-sm tracking-widest text-black/25 flex-shrink-0 mt-0.5">{String(idx + 1).padStart(2,"0")}</span>
                    <p className="font-inter text-sm text-black/70 leading-relaxed">{q}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ⑤ PAIN POINTS */}
          <section className="px-6 md:px-16 lg:px-24 mb-28 md:mb-36 max-w-[1600px] mx-auto">
            <p className="font-syne text-sm tracking-widest uppercase text-black/45 mb-6">Identified Problems</p>
            <h2 className="font-jakarta font-extrabold text-black mb-12 md:mb-16 leading-none" style={{ fontSize: "clamp(36px, 6vw, 80px)" }}>Pain Points</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {study.painPoints.map((pp) => (
                <div key={pp.num} className="relative bg-[#0A0A0A] rounded-3xl p-10 md:p-12 overflow-hidden group hover:scale-[1.02] transition-transform duration-300 cursor-default">
                  <span className="absolute -right-3 -bottom-8 font-syne font-extrabold text-white select-none pointer-events-none leading-none" style={{ fontSize: "clamp(120px, 15vw, 200px)", opacity: 0.04 }}>{pp.num}</span>
                  <p className="font-syne text-sm tracking-widest uppercase text-white/40 mb-5">{pp.num}</p>
                  <h3 className="font-jakarta text-2xl md:text-3xl font-bold text-white mb-4">{pp.title}</h3>
                  <p className="font-inter text-sm text-white/65 leading-relaxed relative z-10 max-w-md">{pp.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ⑤b RESEARCH QUOTES (optional) */}
          {study.researchQuotes && study.researchQuotes.length > 0 && (
            <section className="px-6 md:px-16 lg:px-24 mb-28 md:mb-36 max-w-[1600px] mx-auto">
              <p className="font-syne text-sm tracking-widest uppercase text-black/45 mb-6">Qualitative Analysis</p>
              <h2 className="font-jakarta font-extrabold text-black mb-12 md:mb-16 leading-none" style={{ fontSize: "clamp(36px, 6vw, 80px)" }}>What Users Said</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {study.researchQuotes.map((rq) => (
                  <div key={rq.name} className="relative bg-[#0A0A0A] rounded-3xl p-10 flex flex-col gap-6 overflow-hidden">
                    <span className="absolute -right-4 -top-2 font-syne font-extrabold text-white select-none pointer-events-none leading-none" style={{ fontSize: "clamp(100px, 12vw, 160px)", opacity: 0.04 }}>"</span>
                    <p className="font-inter text-base text-white/75 leading-relaxed relative z-10">"{rq.quote}"</p>
                    <div className="mt-auto flex items-center gap-3 pt-4 border-t border-white/10">
                      <div>
                        <p className="font-jakarta font-bold text-white text-sm">{rq.name}</p>
                        <p className="font-inter text-xs text-white/40">{rq.age} years old</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ⑥ USER PERSONAS (optional) */}
          {study.personas && study.personas.length > 0 && (
            <section className="px-6 md:px-16 lg:px-24 mb-28 md:mb-36 max-w-[1600px] mx-auto">
              <p className="font-syne text-sm tracking-widest uppercase text-black/45 mb-6">Research Insights</p>
              <h2 className="font-jakarta font-extrabold text-black mb-12 md:mb-16 leading-none" style={{ fontSize: "clamp(36px, 6vw, 80px)" }}>User Personas</h2>
              <div className={`grid gap-6 ${study.personas!.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
                {study.personas!.map((p) => (
                  <PersonaCard key={p.name} persona={p} wide={study.personas!.length === 1} />
                ))}
              </div>
            </section>
          )}

          {/* ⑦ COMPETITOR ANALYSIS (optional) */}
          {study.competitors && study.competitors.length > 0 && (
            <CompetitorGrid competitors={study.competitors} />
          )}

          {/* ⑧ FEATURE COMPARISON (optional) */}
          {study.featureComparison && (
            <FeatureComparison data={study.featureComparison} />
          )}

          {/* ⑧b USER FLOW (optional) */}
          {study.userFlow && (
            study.title === "LexGo" ? <LexGoUserFlowSection /> : <UserFlowSection />
          )}

          {/* ⑧c STYLE GUIDE (optional) */}
          {study.styleGuide && (
            study.title === "LexGo" ? <LexGoStyleGuideSection /> : <StyleGuideSection />
          )}

          {/* ⑨ PROTOTYPES — CAROUSEL */}
          {study.prototypes.length > 0 && (
            <section className="mb-28 md:mb-36">
              <div className="px-6 md:px-16 lg:px-24 mb-10 max-w-[1600px] mx-auto">
                <p className="font-syne text-sm tracking-widest uppercase text-black/45 mb-6">Design Work</p>
                <h2 className="font-jakarta font-extrabold text-black leading-none" style={{ fontSize: "clamp(36px, 6vw, 80px)" }}>Prototypes</h2>
              </div>
              <PrototypeCarousel images={study.prototypes} labels={study.screenLabels} />
            </section>
          )}

          {/* ⑩ SWOT */}
          <section className="px-6 md:px-16 lg:px-24 mb-28 md:mb-36 max-w-[1600px] mx-auto">
            <p className="font-syne text-sm tracking-widest uppercase text-black/45 mb-6">Strategic Assessment</p>
            <h2 className="font-jakarta font-extrabold text-black mb-12 md:mb-16 leading-none" style={{ fontSize: "clamp(36px, 6vw, 80px)" }}>SWOT Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {swotConfig.map((cell) => (
                <div key={cell.key} className="border border-black/10 rounded-3xl p-10 md:p-12 hover:border-black/20 transition-colors">
                  <div className="flex items-center gap-3 mb-8">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: cell.color }} />
                    <h3 className="font-jakarta text-3xl md:text-4xl font-bold text-black">{cell.label}</h3>
                  </div>
                  <ul className="flex flex-col gap-3">
                    {cell.items.map((item, j) => (
                      <li key={j} className="font-inter text-sm text-black/65 leading-relaxed flex gap-3">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: cell.color, opacity: 0.5 }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ⑪ RESULTS */}
          <section className="px-6 md:px-16 lg:px-24 mb-36 max-w-[1600px] mx-auto">
            <p className="font-syne text-sm tracking-widest uppercase text-black/45 mb-6">Outcomes</p>
            <h2 className="font-jakarta font-extrabold text-black mb-12 md:mb-16 leading-none" style={{ fontSize: "clamp(36px, 6vw, 80px)" }}>Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {study.results.map((result, i) => (
                <div key={i} className="relative overflow-hidden rounded-3xl p-10 md:p-12 group hover:scale-[1.02] transition-transform duration-300 cursor-default" style={{ background: "linear-gradient(135deg, #0A0A0A 0%, #111827 100%)" }}>
                  <span className="absolute -right-4 -bottom-10 font-syne font-extrabold text-white select-none pointer-events-none leading-none" style={{ fontSize: "clamp(140px, 18vw, 220px)", opacity: 0.04 }}>✓</span>
                  <p className="font-inter text-base md:text-lg text-white/75 leading-relaxed relative z-10 max-w-sm">{result}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FOOTER */}
          <div className="border-t border-black/10 px-6 md:px-16 lg:px-24 py-10 max-w-[1600px] mx-auto flex items-center justify-between">
            <p className="font-inter text-xs text-black/45">{study.role} — {study.year}</p>
            <button onClick={onClose} data-hover className="font-inter text-xs text-black/55 hover:text-black transition-colors nav-link">Close project ↑</button>
          </div>

        </motion.div>
      </motion.div>
    </>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ scrolled }: { scrolled: boolean }) {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-xl bg-[#F8F5F0]/80 border-b border-black/[0.06]" : ""}`}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="font-syne text-xl font-extrabold tracking-tight text-[#0A0A0A] hover:opacity-70 transition-opacity">SS<span className="gradient-text">.</span></button>
        <div className="flex items-center gap-8">
          <ul className="hidden md:flex items-center gap-7">
            {["about", "work", "experience"].map((item) => (
              <li key={item}><button onClick={() => scrollTo(item)} className="font-inter text-sm text-[#0A0A0A]/70 hover:text-[#0A0A0A] transition-colors nav-link capitalize">{item}</button></li>
            ))}
          </ul>
          <button onClick={() => scrollTo("contact")} className="font-inter text-sm px-5 py-2.5 rounded-full bg-[#0A0A0A] text-white hover:bg-[#1a1a1a] transition-colors">Let's Talk</button>
        </div>
      </div>
    </motion.nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y       = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex flex-col justify-between pt-28 pb-16 px-6 md:px-10 max-w-[1400px] mx-auto">
      <motion.div style={{ y, opacity }} className="flex flex-col gap-8 md:gap-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex items-center justify-between">
          <span className="font-inter text-xs tracking-widest uppercase text-[#0A0A0A]/50 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />Available for new opportunities</span>
          <span className="font-inter text-xs tracking-widest uppercase text-[#0A0A0A]/40">Bengaluru, IN</span>
        </motion.div>
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
            <div className="overflow-hidden pb-4 pr-3 md:pr-6"><motion.h1 initial={{ y: 120, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} className="hero-display">SHAURYA</motion.h1></div>
            <motion.div initial={{ opacity: 0, scale: 0.8, rotate: -6 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }} className="hidden md:block flex-shrink-0 mt-4 md:mt-6 lg:mt-8">
              <img src={LOGO_MAIN} alt="Avatar" className="w-28 h-28 md:w-36 md:h-36 lg:w-[150px] lg:h-[150px] drop-shadow-2xl object-contain" style={{ filter: "drop-shadow(0 12px 20px rgba(0,0,0,0.12))" }} />
            </motion.div>
          </div>
          <div className="overflow-hidden pb-4 pr-3 md:pr-6 -mt-3 md:-mt-4"><motion.h1 initial={{ y: 120, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }} className="hero-display gradient-text">SUMUK</motion.h1></div>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mt-12 md:mt-0">
        <p className="font-inter text-[#0A0A0A]/60 max-w-sm text-base md:text-lg leading-relaxed">Senior UX Designer crafting intuitive, <span className="gradient-text font-semibold">AI-powered</span> product experiences for global brands.</p>
        <div className="flex flex-col items-center gap-2">
          <span className="font-inter text-xs tracking-widest uppercase text-[#0A0A0A]/30">Scroll</span>
          <div className="h-14 w-px overflow-hidden"><div className="scroll-line-anim" /></div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Marquee ──────────────────────────────────────────────────────────────────
const CLIENTS = [
  { name: "PepsiCo",          color: "#005CB9", onDark: "#4A9EFF" },
  { name: "Mars Wrigley",     color: "#C8192B", onDark: "#FF5566" },
  { name: "Colgate",          color: "#E31E26", onDark: "#FF5566" },
  { name: "Pfizer",           color: "#0057A8", onDark: "#4A9EFF" },
  { name: "Ampol",            color: "#D92027", onDark: "#FF5566" },
  { name: "Nature's Path",    color: "#4A7C2F", onDark: "#72D44A" },
  { name: "Nike",             color: "#111111", onDark: "#E8E8E8" },
  { name: "Associated Bank",  color: "#00437A", onDark: "#4A9EFF" },
  { name: "McKesson",         color: "#B8122A", onDark: "#FF5566" },
];

// ─── Tool logos (Simple Icons CDN) ───────────────────────────────────────────
const TOOL_LOGOS = [
  { name: "Figma",        slug: "figma",              hex: "F24E1E" },
  { name: "Adobe XD",     slug: "adobexd",            hex: "FF61F6" },
  { name: "Photoshop",    slug: "adobephotoshop",     hex: "59C4FF" },
  { name: "Illustrator",  slug: "adobeillustrator",   hex: "FF9A00" },
  { name: "Lightroom",    slug: "adobelightroom",     hex: "4FBFFF" },
  { name: "Premiere Pro", slug: "adobepremierepro",   hex: "B399FF" },
  { name: "Miro",         slug: "miro",               hex: "FFD02F" },
  { name: "Jira",         slug: "jira",               hex: "4A9EFF" },
  { name: "Zeplin",       slug: "zeplin",             hex: "FDBD39" },
  { name: "ChatGPT",      slug: "openai",             hex: "19C37D" },
];

// ─── Tool logo tile with graceful fallback ────────────────────────────────────
function ToolLogoItem({ tool }: { tool: typeof TOOL_LOGOS[0] }) {
  const [failed, setFailed] = useState(false);
  const initials = tool.name.replace(/[^A-Za-z ]/g, "").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="flex flex-col items-center gap-2.5 p-4 rounded-xl border border-white/[0.07] hover:border-white/20 hover:bg-white/[0.05] transition-all duration-200 cursor-default group">
      {failed ? (
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold font-jakarta flex-shrink-0"
          style={{ background: `#${tool.hex}22`, color: `#${tool.hex}`, border: `1px solid #${tool.hex}44` }}
        >
          {initials}
        </div>
      ) : (
        <img
          src={`https://cdn.simpleicons.org/${tool.slug}/${tool.hex}`}
          alt={tool.name}
          className="w-7 h-7 object-contain group-hover:scale-110 transition-transform duration-200"
          onError={() => setFailed(true)}
        />
      )}
      <span className="font-inter text-[10px] text-white/40 text-center leading-tight group-hover:text-white/65 transition-colors">{tool.name}</span>
    </div>
  );
}

function MarqueeBanner() {
  return (
    <div className="border-y border-black/[0.08] py-5 overflow-hidden bg-[#F8F5F0]">
      <div className="marquee-track">
        <div className="marquee-inner" style={{ display: "flex", alignItems: "center" }}>
          {[...Array(4)].map((_, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>
              {CLIENTS.map((c, j) => (
                <span key={j} style={{ display: "inline-flex", alignItems: "center" }}>
                  <span
                    className="font-syne tracking-[0.14em] uppercase whitespace-nowrap"
                    style={{ color: c.color, padding: "0 26px", fontWeight: 700, fontSize: "13px" }}
                  >
                    {c.name}
                  </span>
                  <span style={{ color: "rgba(0,0,0,0.15)", fontSize: "9px", lineHeight: 1 }}>◆</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Work ─────────────────────────────────────────────────────────────────────
const PROJECTS = [
  { num: "01", title: "My Chat Lesson",          tags: "AI Chat Interface · UX Design · Learning Platform",  img: IMG_CHAT_LESSON, gradient: "linear-gradient(135deg, #6366F1 0%, #EC4899 100%)" },
  { num: "02", title: "LexGo",                   tags: "Language Learning · Mobile UX · AI Integration",     img: IMG_LEXGO_HERO,  gradient: "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)" },
  { num: "03", title: "Choco Factory",           tags: "E-Commerce · Web Design · Consumer UX",              img: IMG_HEALTH,      gradient: "linear-gradient(135deg, #8B5A2B 0%, #D2691E 100%)" },
];

function Work({ onOpen }: { onOpen: (num: string) => void }) {
  return (
    <section id="work" className="py-24 md:py-36 px-6 md:px-10 max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24">
        <Reveal><h2 className="section-display">Selected<br /><span className="gradient-text">Work</span></h2></Reveal>
        <Reveal delay={0.15}><p className="font-inter text-[#0A0A0A]/50 max-w-xs text-sm leading-relaxed">Recent case studies showcasing end-to-end design, AI integration, and enterprise solutions.</p></Reveal>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.num} delay={i * 0.12} className={i === 1 ? "md:mt-16" : ""}>
            <div className="work-card group cursor-pointer" data-hover onClick={() => onOpen(p.num)} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onOpen(p.num)}>
              <div className="work-card-img rounded-2xl overflow-hidden aspect-[4/3] relative mb-5">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500" style={{ background: p.gradient }} />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-inter text-xs tracking-wider uppercase bg-white/90 backdrop-blur-sm text-[#0A0A0A] px-4 py-2 rounded-full shadow-lg">View Case Study</span>
                </div>
                <span className="work-number">{p.num}</span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-jakarta text-base md:text-lg font-bold text-[#0A0A0A] mb-1">{p.title}</h3>
                  <p className="font-inter text-sm text-[#0A0A0A]/50">{p.tags}</p>
                </div>
                <div className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0A0A0A] group-hover:border-transparent transition-all duration-300">
                  <svg className="w-3.5 h-3.5 text-[#0A0A0A] group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1}>
        <div className="flex justify-center mt-16 md:mt-24">
          <a href="https://www.behance.net/shauryacs" target="_blank" rel="noopener noreferrer" className="magnetic-btn font-inter text-sm text-[#0A0A0A]" data-hover>
            <span>View More on Behance</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" /></svg>
          </a>
        </div>
      </Reveal>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
const SKILL_TAGS = [
  { label: "Product Design",                  accent: "#A78BFA" },
  { label: "UX & Interaction Design",         accent: "#F472B6" },
  { label: "AI Chat Interface Design",        accent: "#818CF8" },
  { label: "Information Architecture",        accent: "#34D399" },
  { label: "Design Systems",                  accent: "#60A5FA" },
  { label: "Component Libraries",             accent: "#A78BFA" },
  { label: "User Research",                   accent: "#FBBF24" },
  { label: "Usability Testing",               accent: "#F472B6" },
  { label: "Wireframing & Prototyping",       accent: "#34D399" },
  { label: "Enterprise & Dashboard UX",       accent: "#60A5FA" },
  { label: "Responsive Design",               accent: "#FB923C" },
  { label: "Accessibility (WCAG)",            accent: "#22D3EE" },
  { label: "Cross-functional Collaboration",  accent: "#FBBF24" },
];



function About() {
  const stats = [
    { value: "4+", label: "Years of Experience", accent: "#A78BFA" },
    { value: "10", label: "Projects Delivered",  accent: "#F472B6" },
    { value: "9",  label: "Global Clients",       accent: "#34D399" },
    { value: "3",  label: "Industries",           accent: "#60A5FA" },
  ];

  return (
    <section id="about" className="section-dark py-24 md:py-36 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">

        {/* ── Heading + bio ── */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-24 mb-16 md:mb-20">
          <Reveal><h2 className="section-display light">The<br />Designer</h2></Reveal>
          <div className="flex flex-col gap-7">
            <Reveal delay={0.1}>
              <p className="font-inter text-white/90 text-2xl md:text-3xl leading-relaxed">
                I specialize in <span className="gradient-text font-semibold">end-to-end UX design</span>, AI chat interfaces, and scalable design systems across web and mobile platforms.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-inter text-white/60 text-lg leading-relaxed">
                With 4+ years of experience, I embed with cross-functional teams — engineers, PMs, and stakeholders — to ship user-centric, data-informed product experiences. My work spans enterprise dashboards, AI-powered chat interfaces, B2B platforms, and consumer-facing apps for nine global brands including PepsiCo, Mars Wrigley, Pfizer, Nike, and McKesson.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="font-inter text-white/42 text-base leading-relaxed">
                Research-first philosophy: competitive analysis and usability studies before pixels, accessible systems before screens, and accurate implementation through tight engineering partnership throughout every sprint.
              </p>
            </Reveal>
          </div>
        </div>

        {/* ── Stats strip ── */}
        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-14">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-start justify-between p-6 md:p-8 rounded-2xl relative overflow-hidden"
                style={{ background: s.accent + "0D", border: `1px solid ${s.accent}22` }}
              >
                <span
                  className="font-jakarta text-5xl md:text-6xl font-extrabold tracking-tight leading-none mb-4"
                  style={{ color: s.accent }}
                >
                  {s.value}
                </span>
                <span className="font-inter text-xs tracking-widest uppercase text-white/40">{s.label}</span>
                {/* decorative glow blob */}
                <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full blur-2xl opacity-20" style={{ background: s.accent }} />
              </div>
            ))}
          </div>
        </Reveal>

        {/* ── Skills pill tags ── */}
        <Reveal delay={0.12}>
          <div className="pt-10 border-t border-white/10 mb-10">
            <h4 className="font-syne text-xs uppercase tracking-widest text-white/30 mb-6">Skills</h4>
            <div className="flex flex-wrap gap-2.5">
              {SKILL_TAGS.map((s) => (
                <span
                  key={s.label}
                  className="font-inter text-xs px-4 py-2 rounded-full transition-all duration-200 cursor-default hover:scale-105"
                  style={{
                    color: s.accent,
                    background: s.accent + "15",
                    border: `1px solid ${s.accent}30`,
                    fontWeight: 500,
                  }}
                >
                  {s.label}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── Tools logo grid ── */}
        <Reveal delay={0.16}>
          <div className="pt-10 border-t border-white/10 mb-10">
            <h4 className="font-syne text-xs uppercase tracking-widest text-white/30 mb-6">Tools &amp; Technologies</h4>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-5 gap-3">
              {TOOL_LOGOS.map((t) => <ToolLogoItem key={t.name} tool={t} />)}
            </div>
          </div>
        </Reveal>

        {/* ── Clients strip ── */}
        <Reveal delay={0.2}>
          <div className="pt-10 border-t border-white/10">
            <h4 className="font-syne text-xs uppercase tracking-widest text-white/30 mb-6">Clients &amp; Brands</h4>
            <div className="flex flex-wrap gap-3">
              {CLIENTS.map((c) => {
                const col = c.onDark;
                return (
                  <span
                    key={c.name}
                    className="font-syne text-xs tracking-[0.12em] uppercase px-4 py-2 rounded-full border hover:scale-105 transition-transform cursor-default"
                    style={{
                      color: col,
                      borderColor: col + "40",
                      background: col + "14",
                      fontWeight: 700,
                    }}
                  >
                    {c.name}
                  </span>
                );
              })}
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────
const EXP_DATA = [
  {
    year: "2023 — Present", title: "Sr. UX Designer", company: "Tiger Analytics", type: "work",
    bullets: [
      "Led end-to-end UX/UI design for enterprise products including AI-powered chat interfaces and complex data dashboards.",
      "Conducted competitive analysis and usability studies, ensuring solutions aligned with real user needs.",
      "Partnered with engineering teams throughout the full product lifecycle to evaluate technical feasibility, refine designs and ensure accurate implementation.",
      "Produced high-fidelity wireframes, interactive prototypes and design specifications in Figma and Adobe XD, improving design review efficiency with stakeholders.",
    ],
  },
  {
    year: "2021 — 2023", title: "UX Designer", company: "Hitforward Business Solutions", type: "work",
    bullets: [
      "Designed digital products and healthcare platforms across multiple verticals, from initial discovery through to shipping.",
      "Conducted competitive analysis and usability studies, ensuring solutions aligned with real user needs.",
      "Partnered with engineering teams throughout the full product lifecycle to evaluate technical feasibility and ensure accurate implementation.",
      "Produced high-fidelity wireframes, interactive prototypes and design specifications in Figma and Adobe XD.",
    ],
  },
  {
    year: "June 2018 — June 2022", title: "Bachelor of Design (Product Design)", company: "Ramaiah University of Applied Sciences", type: "edu",
    bullets: ["Bengaluru, Karnataka · Product Design specialization."],
  },
];

function Experience() {
  return (
    <section id="experience" className="py-24 md:py-36 px-6 md:px-10 max-w-[1400px] mx-auto">
      <Reveal><h2 className="section-display mb-16 md:mb-24">Experience</h2></Reveal>
      <div className="flex flex-col">
        {EXP_DATA.map((e, i) => (
          <div key={e.company}>
            {i > 0 && <div className="exp-divider" />}
            <Reveal delay={i * 0.1}>
              <div className="group grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 md:gap-12 py-10 md:py-14 hover:bg-black/[0.02] rounded-2xl transition-colors px-4 -mx-4">
                {/* Left col */}
                <div className="flex flex-col gap-3 mt-1">
                  <span className="font-inter text-xs tracking-widest uppercase text-[#0A0A0A]/65">{e.year}</span>
                  <span
                    className="font-syne text-[10px] tracking-[0.18em] uppercase px-2.5 py-1 rounded-full self-start"
                    style={e.type === "edu"
                      ? { background: "#F3F0FF", color: "#7C3AED", border: "1px solid #DDD6FE" }
                      : { background: "#F0FDF4", color: "#15803D", border: "1px solid #BBF7D0" }}
                  >
                    {e.type === "edu" ? "Education" : "Full-time"}
                  </span>
                </div>
                {/* Right col */}
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-5">
                    <h3 className="font-jakarta text-xl font-bold text-[#0A0A0A]">{e.title}</h3>
                    <span
                      className="font-jakarta text-sm font-semibold px-2.5 py-0.5 rounded-md"
                      style={{ background: "#0A0A0A0D", color: "#0A0A0A", border: "1px solid rgba(10,10,10,0.12)" }}
                    >{e.company}</span>
                  </div>
                  <ul className="flex flex-col gap-3 max-w-2xl">
                    {e.bullets.map((b, bi) => (
                      <li key={bi} className="font-inter text-base text-[#0A0A0A]/60 leading-relaxed flex gap-3">
                        <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-[#0A0A0A]/20 flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
            {i < EXP_DATA.length - 1 && <div className="exp-divider" />}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="py-24 md:py-36 px-6 md:px-10 max-w-[1400px] mx-auto">
      <div className="flex flex-col items-center text-center gap-8">
        <Reveal><h2 className="section-display">Let's<br /><span className="gradient-text">Connect</span></h2></Reveal>
        <Reveal delay={0.15}><div className="flex flex-col items-center gap-2"><a href="mailto:shaureecs@gmail.com" className="font-inter text-base md:text-lg text-[#0A0A0A]/60 hover:text-[#0A0A0A] transition-colors nav-link" data-hover>shaureecs@gmail.com</a><a href="tel:+918073719826" className="font-inter text-base md:text-lg text-[#0A0A0A]/60 hover:text-[#0A0A0A] transition-colors nav-link" data-hover>+91 80737 19826</a></div></Reveal>
        <Reveal delay={0.3}><div className="flex items-center gap-8 mt-4">{[{ label: "Behance", href: "https://www.behance.net/shauryacs" }, { label: "LinkedIn", href: "https://linkedin.com/in/shauryacs" }, { label: "Website", href: "http://www.shauryasumuk.in" }].map((s) => (<a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="font-inter text-sm text-[#0A0A0A]/40 hover:text-[#0A0A0A] transition-colors nav-link" data-hover>{s.label}</a>))}</div></Reveal>
        <Reveal delay={0.4}><a href="mailto:shaureecs@gmail.com" className="magnetic-btn font-syne text-base font-semibold text-[#0A0A0A] mt-6" data-hover><span>Say Hello →</span></a></Reveal>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-black/[0.08] py-6 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <p className="font-inter text-xs text-[#0A0A0A]/30">© 2026 Shaurya Sumuk.</p>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="font-inter text-xs text-[#0A0A0A]/30 hover:text-[#0A0A0A] transition-colors nav-link" data-hover>Back to top ↑</button>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [scrolled,    setScrolled]    = useState(false);
  const [activeStudy, setActiveStudy] = useState<CaseStudyFull | null>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="portfolio-bg min-h-screen relative" style={{ fontFamily: "'Inter', sans-serif", cursor: "none" }}>
      <div className="noise-overlay" />
      <div className="blob-container"><div className="blob blob-1" /><div className="blob blob-2" /><div className="blob blob-3" /></div>
      <Cursor />
      <div className="relative z-10">
        <Navbar scrolled={scrolled} />
        <Hero />
        <MarqueeBanner />
        <Work onOpen={(num) => { const s = CASE_STUDIES[num]; if (s) setActiveStudy(s); }} />
        <About />
        <Experience />
        <Contact />
        <Footer />
      </div>
      <AnimatePresence>
        {activeStudy && <CaseStudyModal study={activeStudy} onClose={() => setActiveStudy(null)} />}
      </AnimatePresence>
    </div>
  );
}
