// Design tokens and constants
export const COLORS = {
  background: "#1a1a1a",
  textPrimary: "#ffffff",
  textSecondary: "#e1e1e1",
  textMuted: "#c1c1c1",
  textDimmed: "#8987a1",
  accentPrimary: "#4fc3f7",
  accentGradientStart: "#4fc3f7",
  accentGradientEnd: "#f5f5f5",
  borderColor: "#2b2b2b",
  borderLight: "#484e53",
  inputBorder: "#d6dded",
} as const;

export const FONTS = {
  heading: "font-['Poppins']",
  body: "font-['Inter']",
  nav: "font-['Montserrat']",
  logo: "font-['Oleo_Script']",
  button: "font-['Raleway']",
} as const;

export const SPACING = {
  containerPadding: "px-4 sm:px-6 lg:px-[120px]",
  sectionPadding: "py-20",
  maxWidth: "max-w-[1512px]",
} as const;

export const SOCIAL_LINKS = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/ahmedtamer109" },
  { name: "GitHub", url: "https://github.com/Ahmed1092002" },
  { name: "Facebook", url: "https://www.facebook.com/ahmed.tamer.elsayad" },
  // { name: "Instagram", url: "https://instagram.com" },
] as const;


// Resume/Portfolio assets
export const RESUME_LINK_PDF =
  process.env.NEXT_PUBLIC_RESUME_LINK_PDF ||
  "https://docs.google.com/document/d/1VfRZjbZdR1-BnIt4uKoZ8PoVa2bjSaHI/export?format=pdf";
export const RESUME_LINK_DOCX =  process.env.NEXT_PUBLIC_RESUME_LINK_PDF ||
  "https://docs.google.com/document/d/1VfRZjbZdR1-BnIt4uKoZ8PoVa2bjSaHI/export?format=docx";
