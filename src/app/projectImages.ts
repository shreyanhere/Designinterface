// ─────────────────────────────────────────────────────────────────────────────
// PROJECT IMAGES
// Hero SVGs  → used for the project card thumbnail AND as first slide in modal
// Screen svgs → follow in order 1, 2, 3 …
// ─────────────────────────────────────────────────────────────────────────────

// ─── Project 01 · My Chat Lesson ─────────────────────────────────────────────
import chatHero   from "../images/chatlesson/My Chat Lesson Hero Image.svg";
import chat1      from "../images/chatlesson/1.svg";
import chat2      from "../images/chatlesson/2.svg";
import chat3      from "../images/chatlesson/3.svg";
import chat4      from "../images/chatlesson/4.svg";
import chat5      from "../images/chatlesson/5.svg";
import chat6      from "../images/chatlesson/6.svg";

// ─── Project 02 · LexGo ──────────────────────────────────────────────────────
import lexgoHero  from "../images/lexgo/Lex Go Hero Image.svg";
import lexgo1     from "../images/lexgo/1.svg";
import lexgo2     from "../images/lexgo/2.svg";
import lexgo3     from "../images/lexgo/3.svg";
import lexgo4     from "../images/lexgo/4.svg";
import lexgo5     from "../images/lexgo/5.svg";
import lexgo6     from "../images/lexgo/6.svg";
import lexgo7     from "../images/lexgo/7.svg";
import lexgo8     from "../images/lexgo/8.svg";
import lexgo9     from "../images/lexgo/9.svg";
import lexgo10    from "../images/lexgo/10.svg";

// ─── Project 03 · Choco Factory ──────────────────────────────────────────────
import chocoHero  from "../images/choco factory/Choco Factory Hero.svg";
import choco1     from "../images/choco factory/1.svg";
import choco2     from "../images/choco factory/2.svg";
import choco3     from "../images/choco factory/3.svg";
import choco4     from "../images/choco factory/4.svg";
import choco5     from "../images/choco factory/5.svg";
import choco6     from "../images/choco factory/6.svg";
import choco7     from "../images/choco factory/7.svg";
import choco8     from "../images/choco factory/8.svg";
import choco9     from "../images/choco factory/9.svg";
import choco10    from "../images/choco factory/10.svg";
import choco11    from "../images/choco factory/11.svg";
import choco12    from "../images/choco factory/12.svg";

// ─────────────────────────────────────────────────────────────────────────────
// Exports used by App.tsx
// ─────────────────────────────────────────────────────────────────────────────

// ── Project 01 · My Chat Lesson ───────────────────────────────────────────────

/** Card thumbnail + modal hero */
export const IMG_CHAT_LESSON = chatHero;

/** Persona photo — Umesh (Software Developer, 34) */
export const IMG_PERSONA_UMESH = "https://images.unsplash.com/photo-1681165232934-c09dfa5ee694?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBtYW4lMjBzb2Z0d2FyZSUyMGRldmVsb3BlciUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MzkwNDc2Mnww&ixlib=rb-4.1.0&q=80&w=1080";

/** Persona photo — Raj (Student, 19) */
export const IMG_PERSONA_RAJ = "https://images.unsplash.com/photo-1675268919487-33bc3c4c0892?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjB0ZWVuYWdlJTIwYm95JTIwc3R1ZGVudCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MzkwNDc2Mnww&ixlib=rb-4.1.0&q=80&w=1080";

/**
 * My Chat Lesson — hero first, then screens 1–6 in order
 */
export const SCREENS_CHAT_LESSON: string[] = [
  chatHero,  // 00 — hero (same as card thumbnail)
  chat1,     // 01
  chat2,     // 02
  chat3,     // 03
  chat4,     // 04
  chat5,     // 05
  chat6,     // 06
];


// ── Project 02 · LexGo ────────────────────────────────────────────────────────

/** Card thumbnail + modal hero */
export const IMG_LEXGO_HERO = lexgoHero;

/** Persona photo — Ricky (Fashion Designer, 28) */
export const IMG_PERSONA_RICKY = "https://images.unsplash.com/photo-1772757844633-0f1e20b8a199?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMEluZGlhbiUyMG1hbiUyMGZhc2hpb24lMjBkZXNpZ25lciUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MzkwNTYyOHww&ixlib=rb-4.1.0&q=80&w=1080";

/**
 * LexGo — hero first, then screens 1–10 in order
 */
export const SCREENS_LEXGO: string[] = [
  lexgoHero, // 00 — hero (same as card thumbnail)
  lexgo1,    // 01
  lexgo2,    // 02
  lexgo3,    // 03
  lexgo4,    // 04
  lexgo5,    // 05
  lexgo6,    // 06
  lexgo7,    // 07
  lexgo8,    // 08
  lexgo9,    // 09
  lexgo10,   // 10
];


// ── Project 03 · Choco Factory ────────────────────────────────────────────────

/** Card thumbnail + modal hero */
export const IMG_HEALTH = chocoHero;

/** Persona photo — Marcus (Technology Analyst) */
export const IMG_PERSONA_MARCUS = "https://images.unsplash.com/photo-1716471361267-9bc5d3291fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjB0ZWNobm9sb2d5JTIwYW5hbHlzdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MzgxNzU2MXww&ixlib=rb-4.1.0&q=80&w=1080";

/** Persona photo — Sarah (Business Executive) */
export const IMG_PERSONA_SARAH = "https://images.unsplash.com/photo-1770363756771-c288cfd6a3dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCbGFjayUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwZXhlY3V0aXZlJTIwYnVzaW5lc3N8ZW58MXx8fHwxNzczODE3NTU3fDA&ixlib=rb-4.1.0&q=80&w=1080";

/** Persona photo — Priya (Healthcare Patient) */
export const IMG_PERSONA_PRIYA = "https://images.unsplash.com/photo-1592393532405-fb1f165c4a1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTb3V0aCUyMEFzaWFuJTIwd29tYW4lMjBwYXRpZW50JTIwaGVhbHRoY2FyZXxlbnwxfHx8fDE3NzM4MTc1NTh8MA&ixlib=rb-4.1.0&q=80&w=1080";

/** Persona photo — James (Doctor / Physician) */
export const IMG_PERSONA_JAMES = "https://images.unsplash.com/photo-1758691463605-f4a3a92d6d37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZG9jdG9yJTIwcGh5c2ljaWFuJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczODE3NTU4fDA&ixlib=rb-4.1.0&q=80&w=1080";

/**
 * Choco Factory — hero first, then screens 1–12 in order
 */
export const SCREENS_DRTM: string[] = [
  chocoHero, // 00 — hero (same as card thumbnail)
  choco1,    // 01
  choco2,    // 02
  choco3,    // 03
  choco4,    // 04
  choco5,    // 05
  choco6,    // 06
  choco7,    // 07
  choco8,    // 08
  choco9,    // 09
  choco10,   // 10
  choco11,   // 11
  choco12,   // 12
];


// ── Misc placeholders (still used in App.tsx for other sections) ───────────────
export const IMG_DASHBOARD   = IMG_CHAT_LESSON;
export const IMG_HUB         = IMG_LEXGO_HERO;
export const IMG_ACCESS      = "https://images.unsplash.com/photo-1682637275957-8e62180efd1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2Nlc3MlMjBjb250cm9sJTIwcGVybWlzc2lvbnMlMjBlbnRlcnByaXNlJTIwdG9vbHxlbnwxfHx8fDE3NzM4MTYwMzh8MA&ixlib=rb-4.1.0&q=80&w=1080";
export const IMG_DARK_UI     = "https://images.unsplash.com/photo-1720962158812-d16549f1e5a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwVUklMjBkYXNoYm9hcmQlMjBhbmFseXRpY3MlMjBtb25pdG9yaW5nfGVufDF8fHx8MTc3MzgxNjA0MXww&ixlib=rb-4.1.0&q=80&w=1080";
export const IMG_MOBILE_HLTH = "https://images.unsplash.com/photo-1623915695133-d624f7759fd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBoZWFsdGglMjBwYXRpZW50JTIwYXBwJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc3MzgxNjA0MXww&ixlib=rb-4.1.0&q=80&w=1080";
export const IMG_WIREFRAME   = "https://images.unsplash.com/photo-1695903096358-8912486294e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlZnJhbWUlMjBwcm90b3R5cGUlMjBVWCUyMGRlc2lnbiUyMHNrZXRjaHxlbnwxfHx8fDE3NzM4MTYwNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080";
export const IMG_MOBILE_APP  = "https://images.unsplash.com/photo-1764406562219-105937cc3f95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBVSSUyMHNjcmVlbiUyMGRlc2lnbiUyMHByb2R1Y3R8ZW58MXx8fHwxNzczODE2ODUxfDA&ixlib=rb-4.1.0&q=80&w=1080";
export const IMG_LIGHT_DASH  = "https://images.unsplash.com/photo-1575388902449-6bca946ad549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2UlMjBsaWdodCUyMGNsZWFufGVufDF8fHx8MTc3MzgxNjg1MXww&ixlib=rb-4.1.0&q=80&w=1080";
export const IMG_ONBOARDING  = "https://images.unsplash.com/photo-1711169678351-2765420a5b02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dpbiUyMG9uYm9hcmRpbmclMjBzY3JlZW4lMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzczODE2ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080";
export const IMG_SETTINGS    = "https://images.unsplash.com/photo-1762340275855-ae8f4c2c144e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXR0aW5ncyUyMHByb2ZpbGUlMjB1c2VyJTIwYWNjb3VudCUyMHBhbmVsfGVufDF8fHx8MTc3MzgxNjg1M3ww&ixlib=rb-4.1.0&q=80&w=1080";