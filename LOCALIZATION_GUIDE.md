# Localization Guide

## Quick Start

### Using Translations in Components

```tsx
import { useTranslation } from "../i18n/useTranslation";

export default function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("hero.name")}</h1>
      <p>{t("about.paragraph1")}</p>
    </div>
  );
}
```

### Using Array Data

```tsx
import { useTranslation } from "../i18n/useTranslation";

interface Service {
  icon: string;
  title: string;
  description: string;
}

export default function Services() {
  const { t } = useTranslation();
  const services: Service[] = t("services.items");

  return (
    <div>
      {services.map((service, index) => (
        <div key={index}>
          <span>{service.icon}</span>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### Language Switching

The `LanguageSwitcher` component is already integrated in the Navigation. Users can switch between English and Arabic.

## Translation File Structure

### Adding Simple Strings

```json
{
  "section": {
    "title": "My Title",
    "description": "My Description"
  }
}
```

### Adding Arrays of Objects

```json
{
  "items": {
    "list": [
      {
        "name": "Item 1",
        "value": "Value 1"
      },
      {
        "name": "Item 2",
        "value": "Value 2"
      }
    ]
  }
}
```

### Adding Simple Arrays

```json
{
  "tags": ["Tag 1", "Tag 2", "Tag 3"]
}
```

## Adding a New Language

1. **Create Translation File**

   ```bash
   # Create new file: app/i18n/translations/fr.json
   ```

2. **Copy Structure from English**

   ```json
   {
     "nav": {
       "home": "Accueil",
       "about": "À propos",
       ...
     },
     ...
   }
   ```

3. **Update Language Context**

   ```tsx
   // In app/i18n/LanguageContext.tsx
   import fr from "./translations/fr.json";

   const translations = {
     en: enTranslations,
     ar: arTranslations,
     fr: fr, // Add new language
   };
   ```

4. **Update LanguageSwitcher**
   ```tsx
   // Add French option to dropdown/buttons
   <button onClick={() => changeLanguage("fr")}>FR</button>
   ```

## Using Design Constants

### Fonts

```tsx
import { FONTS } from '../constants';

<h1 className={`${FONTS.heading} text-5xl`}>Title</h1>
<p className={`${FONTS.body} text-base`}>Body text</p>
<button className={`${FONTS.button} font-bold`}>Click</button>
```

### Colors

```tsx
import { COLORS } from '../constants';

// Use in inline styles
<div style={{ backgroundColor: COLORS.background }}>

// Use in Tailwind classes
<div className="bg-[#1a1a1a]"> // From COLORS.background
```

### Spacing

```tsx
import { SPACING } from "../constants";

<section className={`${SPACING.sectionPadding} ${SPACING.containerPadding}`}>
  <div className={SPACING.maxWidth}>Content</div>
</section>;
```

### Social Links & Contact

```tsx
import { SOCIAL_LINKS, CONTACT_EMAIL } from "../constants";

// Email link
<a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

// Social links
{
  SOCIAL_LINKS.map((social) => (
    <a key={social.name} href={social.url}>
      {social.name}
    </a>
  ));
}
```

## Best Practices

### 1. Always Use Translation Keys

❌ **Bad:**

```tsx
<h1>About Me</h1>
```

✅ **Good:**

```tsx
<h1>{t("about.title")}</h1>
```

### 2. Use Constants for Design Tokens

❌ **Bad:**

```tsx
<div className="font-['Poppins'] text-white bg-[#1a1a1a]">
```

✅ **Good:**

```tsx
import { FONTS } from '../constants';
<div className={`${FONTS.heading} text-white bg-[#1a1a1a]`}>
```

### 3. Type Your Translation Data

❌ **Bad:**

```tsx
const items = t("services.items");
// No type safety
```

✅ **Good:**

```tsx
interface Service {
  icon: string;
  title: string;
  description: string;
}
const items: Service[] = t("services.items");
```

### 4. Keep Translations Flat (Avoid Deep Nesting)

❌ **Bad:**

```json
{
  "page": {
    "section": {
      "subsection": {
        "item": {
          "title": "Too Deep"
        }
      }
    }
  }
}
```

✅ **Good:**

```json
{
  "section": {
    "itemTitle": "Just Right"
  }
}
```

### 5. Use Descriptive Translation Keys

❌ **Bad:**

```json
{
  "text1": "Click here",
  "text2": "Submit"
}
```

✅ **Good:**

```json
{
  "hero": {
    "callToAction": "Click here"
  },
  "contact": {
    "submit": "Submit"
  }
}
```

## Common Patterns

### Dynamic Lists

```tsx
const items = t("projects.items").map((item, index) => (
  <div key={index}>
    <h3>{item.title}</h3>
    <p>{item.description}</p>
  </div>
));
```

### Form Fields

```tsx
<input
  placeholder={t("contact.namePlaceholder")}
  aria-label={t("contact.name")}
/>
```

### Conditional Content

```tsx
const { language } = useLanguage();

{
  language === "ar" ? (
    <div dir="rtl">{t("content")}</div>
  ) : (
    <div>{t("content")}</div>
  );
}
```

## RTL Support

For Arabic (or other RTL languages), add direction handling:

```tsx
import { useLanguage } from "../i18n/LanguageContext";

export default function MyComponent() {
  const { language } = useLanguage();
  const isRTL = language === "ar";

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className={isRTL ? "text-right" : "text-left"}
    >
      {/* Content */}
    </div>
  );
}
```

## Troubleshooting

### Translation Not Showing

1. Check translation key exists in both `en.json` and `ar.json`
2. Verify correct path (e.g., `hero.title` not `hero.name`)
3. Ensure translation file is valid JSON

### Type Errors with Arrays

```tsx
// If you get type errors, explicitly type the result
interface MyItem {
  title: string;
  description: string;
}

const items = t("section.items") as MyItem[];
// or
const items: MyItem[] = t("section.items");
```

### Constants Not Applying

```tsx
// Make sure to import constants
import { FONTS, SPACING } from '../constants';

// Use template literals for combining classes
className={`${FONTS.heading} text-5xl ${SPACING.containerPadding}`}
```

## Example: Adding New Content Section

1. **Add Translations**

```json
// en.json
{
  "testimonials": {
    "title": "What Clients Say",
    "subtitle": "Testimonials",
    "items": [
      {
        "name": "John Doe",
        "role": "CEO",
        "comment": "Great work!"
      }
    ]
  }
}

// ar.json
{
  "testimonials": {
    "title": "ماذا يقول العملاء",
    "subtitle": "الشهادات",
    "items": [
      {
        "name": "جون دو",
        "role": "الرئيس التنفيذي",
        "comment": "عمل رائع!"
      }
    ]
  }
}
```

2. **Create Component**

```tsx
"use client";

import { useTranslation } from "../i18n/useTranslation";
import { FONTS, SPACING } from "../constants";

interface Testimonial {
  name: string;
  role: string;
  comment: string;
}

export default function Testimonials() {
  const { t } = useTranslation();
  const testimonials: Testimonial[] = t("testimonials.items");

  return (
    <section
      className={`${SPACING.sectionPadding} ${SPACING.containerPadding}`}
    >
      <div className={SPACING.maxWidth}>
        <h2 className={`${FONTS.heading} text-5xl text-white mb-4`}>
          {t("testimonials.title")}
        </h2>
        <p className={`${FONTS.body} text-lg text-[#4fc3f7] mb-12`}>
          {t("testimonials.subtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-[#2b2b2b] p-6 rounded-lg">
              <p className={`${FONTS.body} text-white mb-4`}>
                "{testimonial.comment}"
              </p>
              <div>
                <p className={`${FONTS.heading} font-semibold text-white`}>
                  {testimonial.name}
                </p>
                <p className={`${FONTS.body} text-[#c1c1c1]`}>
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

3. **Add to Page**

```tsx
// app/page.tsx
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <main>
      {/* ... other components */}
      <Testimonials />
    </main>
  );
}
```

## Summary

- ✅ Use `t('key.path')` for all text content
- ✅ Type arrays and objects from translations
- ✅ Import and use constants for design tokens
- ✅ Keep translation keys descriptive and organized
- ✅ Test in both languages (EN/AR)
- ✅ Consider RTL layout for Arabic
