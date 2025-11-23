/**
 * Centralized SEO configuration and helpers for the site.
 * - Uses NEXT_PUBLIC_SITE_URL when available.
 * - Exports default metadata and small helpers to build Open Graph / canonical URLs.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ahmed-tamer.vercel.app";

export type SEOConfig = {
  title: string;
  description: string;
  keywords: string[];
  siteUrl: string;
  defaultImage?: string; // path under `/public` or absolute url
  twitterHandle?: string; // optional like '@yourhandle'
};

export const DEFAULT_SEO: SEOConfig = {
  title: "Ahmed Tamer — Software Engineer & Flutter & Web Developer",
  description:
    "A Software Engineer experienced in Flutter and React ecosystems, with a solid background in building mobile and web applications. I've worked on ERP systems, AI chat applications, invoicing systems, and payment solutions.",
  keywords: [
    "Ahmed Tamer",
    "Software Engineer",
    "Flutter Developer",
    "Web Developer",
    "React",
    "Portfolio",
  ],
  siteUrl: SITE_URL,
  defaultImage: "/screenshot-og.png",
  twitterHandle: "",
};

export type MetaTags = {
  title: string;
  description: string;
  canonical: string;
  openGraph: {
    url: string;
    title: string;
    description: string;
    image: string;
    type?: string;
  };
  twitter?: {
    handle?: string;
    site?: string;
    cardType?: string;
  };
};

/**
 * Build a canonical absolute URL for a given path.
 * @param path Path or full URL. If path starts with '/', it's appended to siteUrl.
 */
export function buildCanonical(path = ""): string {
  try {
    // If a full URL was provided already, return it
    const possible = new URL(path);
    return possible.toString();
  } catch {
    // Not a full URL -> combine with site
    return new URL(path.replace(/^\//, ""), SITE_URL).toString();
  }
}

/**
 * Generate meta tag values for a page using defaults with optional overrides.
 */
export function generateMeta(
  overrides?: Partial<SEOConfig> & { path?: string }
): MetaTags {
  const cfg: SEOConfig = { ...DEFAULT_SEO, ...(overrides || {}) };
  const canonical = buildCanonical(overrides?.path || "");
  const image =
    cfg.defaultImage && cfg.defaultImage.startsWith("http")
      ? cfg.defaultImage
      : buildCanonical(cfg.defaultImage || "");

  return {
    title: cfg.title,
    description: cfg.description,
    canonical,
    openGraph: {
      url: canonical,
      title: cfg.title,
      description: cfg.description,
      image,
      type: "website",
    },
    twitter: {
      handle: cfg.twitterHandle || undefined,
      site: cfg.twitterHandle || undefined,
      cardType: "summary_large_image",
    },
  };
}

export default DEFAULT_SEO;
