// Minimal hand-rolled icon set (keeps deps light — no icon library needed)
const base = "currentColor";

export const Heart = (p) => (
  <svg viewBox="0 0 24 24" fill={base} width="1em" height="1em" {...p}>
    <path d="M12 21s-7.5-4.6-10-9.3C.4 8.1 2 4.5 5.6 4.1c2-.2 3.8.9 4.9 2.6 1.1-1.7 3-2.8 4.9-2.6 3.6.4 5.2 4 3.6 7.6C19.5 16.4 12 21 12 21z" />
  </svg>
);
export const Home = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth="2" width="1em" height="1em" {...p}>
    <path d="M3 11.5 12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 10v10h14V10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const Mail = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth="2" width="1em" height="1em" {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const Images = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth="2" width="1em" height="1em" {...p}>
    <rect x="3" y="3" width="14" height="14" rx="2" />
    <path d="M7 21h14V7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const UserIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth="2" width="1em" height="1em" {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c1.5-4 6-6 8-6s6.5 2 8 6" strokeLinecap="round" />
  </svg>
);
export const LogOut = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth="2" width="1em" height="1em" {...p}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 17 21 12l-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const Plus = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth="2.5" width="1em" height="1em" {...p}>
    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
  </svg>
);
export const X = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth="2" width="1em" height="1em" {...p}>
    <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
  </svg>
);
export const ChevronLeft = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth="2" width="1em" height="1em" {...p}>
    <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const Trash = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth="2" width="1em" height="1em" {...p}>
    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const UsersIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth="2" width="1em" height="1em" {...p}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20c1.2-3.5 4.3-5.5 6.5-5.5s5.3 2 6.5 5.5" strokeLinecap="round" />
    <path d="M16 8.5a3 3 0 1 0 0-6M21.5 20c-.8-2.4-2.6-4.1-4.5-4.9" strokeLinecap="round" />
  </svg>
);
export const Pencil = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth="2" width="1em" height="1em" {...p}>
    <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
