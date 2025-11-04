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
  { name: "Twitter", url: "https://twitter.com" },
  { name: "LinkedIn", url: "https://linkedin.com" },
  { name: "GitHub", url: "https://github.com" },
  { name: "Facebook", url: "https://facebook.com" },
  { name: "Instagram", url: "https://instagram.com" },
] as const;

export const CONTACT_EMAIL = "Georgy@gmail.com";
