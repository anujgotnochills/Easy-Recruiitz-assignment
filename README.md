# Easy Recruitz

A recruitment homepage and supporting pages built with the Next.js App Router, strict TypeScript, Tailwind CSS, Framer Motion, Lenis and Lucide.

## Local setup

Use Node.js 22 or newer.

    npm install
    npm run dev

Open [localhost:3000](http://localhost:3000). Set `NEXT_PUBLIC_SITE_URL` in `.env.local` if you need to test metadata against a different canonical domain.

    npm run lint
    npm run build
    npm start

The fonts are loaded by `next/font` at build time and served from the application. Allow build-time access to Google Fonts. The Google Maps embed loads lazily in the browser.

## Audience entry gate

First-time homepage visitors choose Hiring or Job Seeker. The chosen view changes the hero, process steps, benefit order and section order without changing the URL. The navbar switcher updates the same preference. Browsers that allow local storage remember it under `er-audience`. Visitors can skip the gate to open the employer view.

Set `SHOW_ENTRY_GATE` to `false` in `data/site.ts` to disable the overlay. The navbar switcher still works. Edit the two views and their section order in `data/audience.ts`.

The full employer-first homepage, including its structured data, renders on the server. A small head script reads the stored preference before paint. Without JavaScript, the homepage and its links are available directly. Reduced-motion visitors get a short fade, and touch visitors get static illustrations on the choices.

The employer figures match the counters published on the [existing Easy Recruitz homepage](https://easyrecruiitz.com/). Add approved placement quotes to `audienceCopy.candidate.testimonials.items` in `data/audience.ts`. The testimonial section appears after the candidate process once there are quotes.

## Deploy to Vercel

1. Push the project to a Git repository and import it into Vercel. Keep the Next.js framework preset and the default build command.
2. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS canonical origin without a trailing slash. Add the domain in Vercel and complete its DNS verification.
3. Connect the contact route to the approved enquiry system and CV storage. Review the launch items below, deploy, then check the enquiry flow, map pin, robots.txt, sitemap.xml and generated share image on the production domain.
4. Keep sample job and draft policy routes on `noindex` until the client approves their live content. The sitemap includes the homepage, services and editorial articles.

## Edit the content

| Location | Content |
| --- | --- |
| `data/site.ts` | Brand, contact details, canonical URL, SEO copy, navigation and gate flag |
| `data/audience.ts` | Entry gate, employer and candidate copy, and their section order |
| `data/content.ts` | Homepage headings, calls to action, form labels and errors, benefits and process steps |
| `data/services.ts`, `data/industries.ts` | Service cards, detail copy, industries and cities |
| `data/estimator.ts` | Shortlist estimate ranges |
| `data/jobs.ts` | Role examples and filter labels |
| `data/insights.ts`, `data/legal.ts` | Editorial articles and draft policies |
| `data/faqs.ts` | Visible FAQ and its JSON-LD source |
| `lib/validation.ts` | Shared contact validation rules |

## Client review before launch

- Confirm the existing domain as canonical, the complete office address and the verified map coordinates.
- Calibrate the estimator's role ranges and industry offsets using actual completed searches.
- Connect authorised vacancies before offering live applications. Each live job detail needs complete JobPosting markup and the appropriate indexing settings. The example schema currently lives on one noindex role detail page.
- Review the three recruitment guides before publishing.
- Confirm the FAQ and sales language for pricing, target timelines and replacement eligibility, coverage and exclusions.
- Approve the privacy policy, terms, contact consent and retention rules.
- Wire `app/api/contact/route.ts` to email or CRM and approved CV storage. The demo validates enquiries and logs submission events without contact details or CV contents. Update the form and privacy copy when live delivery is available.

## Design system

| Token | Value |
| --- | --- |
| Canvas, surface, soft surface | `#F6F5F1`, `#FFFFFF`, `#EEEDE7` |
| Ink and muted text | `#0B1020`, `#5B6075` |
| Brand indigo and tint | `#4338CA`, `#6C63FF` |
| Primary action | `#C6F432` with dark ink |
| Radius | Pills at full radius, fields at 12 px, icon boxes at 12–16 px, cards at 24 px, panels at 32–40 px |
| Type | Sora display, Inter body, both served locally by Next |
| Visuals | Inline SVG brand mark and icons, solid-colour panels and an editorial service directory |

Lenis handles smooth scrolling. Framer Motion handles audience, estimator and role filter transitions, FAQ expansion and timeline progress. Scroll and interface motion respect reduced-motion preferences.

