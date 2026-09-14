# AGENTS.md — Portfolio Website Instructions

## Repository Architecture

This is a single-page Next.js 16 (App Router) portfolio site built with React 19,
Tailwind CSS v4, and shadcn/ui (New York variant). It was generated via v0.app.

```
portfolio-website-design/
├── app/
│   ├── page.tsx              ← Single page, all sections rendered here ("use client")
│   ├── layout.tsx            ← Root layout (Geist fonts, Vercel Analytics)
│   └── globals.css           ← Dark cinematic theme (oklch colors, red accent)
├── components/
│   ├── navbar.tsx            ← Fixed nav with anchor links (#featured, #projects, etc.)
│   ├── hero-section.tsx      ← Full-viewport hero with video background
│   ├── content-row.tsx       ← Horizontal scroll row (Netflix-style cards, generic)
│   ├── connect-row.tsx       ← Same scroll layout for social links with icons
│   ├── project-modal.tsx     ← Modal overlay for project/blog/connect details
│   ├── footer.tsx            ← Site footer
│   ├── theme-provider.tsx
│   └── ui/                   ← 56 shadcn/ui primitive components (do not modify)
├── data/
│   └── portfolio.json        ← SINGLE SOURCE OF TRUTH for all content
├── types/
│   └── portfolio.ts          ← TypeScript interfaces (Profile, Project, Blog, ConnectItem, PortfolioData)
├── lib/
│   └── utils.ts              ← cn() class merge helper
├── hooks/
│   ├── use-mobile.ts
│   └── use-toast.ts
├── public/
│   └── images/               ← Local project thumbnails and hero video
├── package.json
├── next.config.mjs           ← TypeScript errors ignored, image optimization OFF
├── tsconfig.json             ← Strict mode, @/* path alias to project root
└── components.json           ← shadcn/ui config
```

**Package manager: pnpm** (pnpm-lock.yaml). Never use npm or yarn.

## Data Model

All content lives in `data/portfolio.json`. The TypeScript interfaces are in `types/portfolio.ts`.

### Project Interface

```ts
interface Project {
  id: string            // Unique, e.g. "featured-1", "project-7"
  title: string
  description: string
  thumbnail: string     // Local path (/images/...) or external URL
  previewVideo: string  // Video URL shown in modal; empty string if none
  tags: string[]        // Tech stack labels
  year: string          // e.g. "2026"
  duration: string      // e.g. "3 months"
  maturityRating: string // Free-form label: "Full Stack", "Frontend", "AI/ML", etc.
  liveUrl?: string      // Optional live demo URL
  githubUrl?: string    // Optional source code URL
}
```

### Blog Interface

```ts
interface Blog {
  id: string
  title: string
  description: string
  thumbnail: string
  previewVideo: string  // Usually empty for blogs
  tags: string[]
  year: string
  duration: string      // e.g. "8 min read"
  maturityRating: string
  url: string           // Link to the blog post (required, not optional)
}
```

### ConnectItem Interface

```ts
interface ConnectItem {
  id: string
  title: string
  description: string
  thumbnail: string
  icon: string          // Must match iconMap keys in connect-row.tsx: "github", "linkedin", "twitter", "mail", "youtube", "discord"
  url: string
}
```

### Portfolio Data Structure

```json
{
  "profile": { ... },
  "featuredProjects": [ ... ],
  "allProjects": [ ... ],
  "blogs": [ ... ],
  "connect": [ ... ]
}
```

## Rules for Adding Projects

0. **New projects default to featured**: Any project the user mentions goes into
   `featuredProjects` by default, unless the user explicitly says otherwise.
   (This generally also means listing it in `allProjects` — confirm intended
   placement when the user does not state it.)

1. **Only edit `data/portfolio.json` and `types/portfolio.ts`** (if adding new fields).
   Never hardcode project content in components.

2. **Append** to `featuredProjects` for hero/landing projects, or `allProjects` for
   everything else.

3. **ID convention**: Use `"featured-N"` for featured projects, `"project-N"` for all
   projects. Increment from the last existing ID in that array.

4. **Thumbnail images** must be placed in `public/images/` and referenced as
   `"/images/filename.png"`. Use PNG format. The aspect ratio of rendered cards is
   2:3 (portrait), so images should be sized or cropped accordingly.

5. **If there is no preview video**, set `"previewVideo": ""`. The modal will fall back
   to showing the thumbnail image.

6. **maturityRating** is a free-form string, not an enum. Use descriptive labels like
   "Full Stack", "Frontend", "Backend Heavy", "AI/ML", "Creative", etc.

7. **All Project fields are required** except `liveUrl` and `githubUrl` which are optional.

8. **Run `pnpm build`** after any changes to verify no errors.

## Rules for Handling Project Assets

- Place local images in `public/images/`. Use kebab-case or PascalCase filenames
  consistent with existing files (e.g., `Navicore.png`, `CFC-Fantasy-League.png`).
- Reference local images with absolute paths starting with `/images/`.
- **Image optimization is disabled** (`images: { unoptimized: true }` in next.config.mjs).
  All images are served as-is.
- Preview videos are referenced by full URL (can be external). No local video files
  should be added to `public/images/` unless they are the hero video.
- The hero video is at `/images/Portfolio-Page.mp4`.
- Thumbnails should be reasonable in file size since there is no optimization pipeline.

## Rules for Preserving UI/Design

- **Dark-only theme**: `:root` and `.dark` CSS variables are identical. Never add a
  light mode or theme toggle.
- **Do not modify** any files under `components/ui/` — these are shadcn/ui primitives.
- **Do not modify** `app/globals.css` unless explicitly asked. The theme uses oklch
  colors with a red accent (`oklch(0.65 0.25 25)`).
- **Component pattern**: `ContentRow` is a generic component (`<T extends ContentItem>`).
  It accepts any array of items with `id`, `title`, `thumbnail`, and optional
  `previewVideo`. Preserve this generic pattern — do not create specialized row
  components that duplicate its logic.
- **Modal type guards**: `ProjectModal` uses `isProject()`, `isBlog()`, `isConnectItem()`
  to decide which action buttons to render. If adding a new item type or new fields,
  update these guards accordingly.
- **File naming**: kebab-case for all component files (e.g., `hero-section.tsx`).
- **Exports**: Named exports, not default exports (e.g., `export function HeroSection`).
- **No code comments**: The codebase has zero code comments. Do not add comments unless
  the user explicitly asks.
- **All components are `"use client"`**. There is no server-side data fetching or API routes.
- **Scroll row spacing**: Items use `gap-2` with responsive card widths
  (`w-[140px] md:w-[180px] lg:w-[220px]`). Preserve these responsive breakpoints.
- **Typography**: Font is Geist (sans) and Geist Mono, loaded via `next/font/google`
  in layout.tsx.

## Rules Against Inventing Information

- **Never fabricate project details.** All titles, descriptions, URLs, tags, dates,
  and durations must come directly from the user.
- **Never invent URLs.** If a live demo or GitHub link is not provided, omit
  `liveUrl` and `githubUrl` (they are optional).
- **Never fabricate image assets.** Only use images the user has provided or
  explicitly approved. Do not use placeholder Unsplash URLs for real projects.
- **Never make up blog content or social links.** Only add entries the user has
  confirmed.
- **Placeholder projects** currently exist in `allProjects` using Unsplash images and
  w3schools video URLs. These are clearly placeholder/demo data and should be
  replaced with real projects as the user provides them.

## Rules for Validating Changes

1. **Run `pnpm build`** after every change to `data/portfolio.json`, `types/portfolio.ts`,
   or any component file. The build must succeed.
2. **Verify JSON validity**: Ensure `portfolio.json` is valid JSON with correct commas,
   brackets, and no trailing commas.
3. **Verify type alignment**: Any new fields added to the JSON must also be added to
   the corresponding TypeScript interface in `types/portfolio.ts`.
4. **Verify image paths**: Confirm referenced thumbnail paths exist in `public/images/`
   (for local assets) or are valid URLs (for external).
5. **Do not run `pnpm dev`** unless explicitly asked — only `pnpm build` for validation.
6. **Lint**: Run `pnpm lint` if changes touch component files.
7. **Deferred thumbnails**: A project may temporarily lack its final thumbnail
   because project images are generated separately. Do not block the project
   content update solely because the final user-generated image is not yet
   available. Clearly report the pending asset and provide the expected path.
   Once the final image is supplied, verify the path exists and builds cleanly.

## Resume and Portfolio Writing Rules

The resume-writing rules in the user's separate resume rules document are the
source of truth for factual accuracy, technical credibility, impact, metrics,
and avoiding overclaiming. Apply those principles to portfolio content, but
do NOT copy resume wording mechanically.

### Portfolio-specific adaptation

The portfolio is a visual, technical showcase rather than an ATS-optimised
resume.

1. **Technical clarity over ATS optimisation**
   - Preserve the technical substance of the resume rules.
   - Do not force job-description keywords, SEO keywords, or ATS-oriented
     phrasing into portfolio descriptions.
   - Use natural, technically precise language that a technically literate
     visitor can understand.
   - Portfolio copy can be more explanatory and readable than resume bullets.

2. **Describe the project, not just the resume bullet**
   - Explain the problem/question, the important technical or analytical
     approach, and the meaningful result or capability.
   - Highlight interesting engineering, analytical, modelling, research, or
     architectural decisions where they genuinely matter.
   - Do not reduce sophisticated work to basic UI actions or implementation
     mechanics.
   - Do not make a project sound more advanced, senior, impactful, or
     production-ready than it actually is.

3. **Metrics and claims**
   - Never invent metrics, users, performance improvements, accuracy,
     business outcomes, scale, or other results.
   - Use genuine metrics when they help communicate impact, technical
     complexity, or scale.
   - Distinguish technical scale from impact.
   - If a result was observed but not rigorously measured, use cautious
     language or omit the number.

4. **Technical specificity**
   - Include technologies, models, algorithms, infrastructure, datasets,
     evaluation methods, and statistical methods when they demonstrate
     meaningful complexity or help explain the project.
   - Do not stuff every library or tool into the description.
   - Tags should represent the project's genuinely relevant technologies
     and methods.
   - Only include technologies the user has actually used and can defend.

5. **Ownership and accuracy**
   - Clearly distinguish the user's contribution from work done by a team.
   - Use "Developed", "Implemented", "Evaluated", "Contributed to", or
     "Supported" according to the actual level of ownership.
   - Never imply production deployment, expertise, business impact, or
     ownership that the user has not established.

6. **Writing style**
   - Concise, professional, technically credible, and specific.
   - Avoid generic filler, empty buzzwords, excessive jargon, and exaggerated
     claims such as "revolutionary", "world-class", or "transformative".
   - Avoid repeating the same idea in multiple fields.
   - Prefer clear prose over keyword-heavy phrasing.

7. **Project fields**
   - `title`: concise and recognisable.
   - `description`: a short portfolio-oriented summary of what the project
     does and why it is technically/analytically interesting. It does not
     need to use the same wording as the resume.
   - `tags`: concise, relevant technologies/methods.
   - `maturityRating`: describe the project's technical category accurately;
     do not use it to exaggerate seniority.
   - `duration` and `year`: use only information supplied by the user.

8. **When information is missing**
   - Do not invent it.
   - Ask the user when the missing information materially affects the
     project's factual representation.
   - If the missing information only affects optional presentation, make the
     smallest safe assumption and clearly state it.

### Image / thumbnail workflow

Project images are generated separately by the user and are NOT expected to
exist when a project is first added to the repository.

When the user provides a project but no final thumbnail exists:

1. Do not fabricate, download, or add an image.
2. Do not use Unsplash or another stock placeholder for a real project.
3. Add the project data without inventing an image asset.
4. If the existing application requires a thumbnail path, use a clearly
   temporary project-specific placeholder path only if necessary for the
   application to build, and tell the user exactly which file needs to be
   replaced. Do not pretend the placeholder is the final asset.
5. Preferably, generate a separate image-generation prompt for the project
   so the user can create the final thumbnail later.
6. The recommended visual direction is a polished cinematic streaming-service
   / Netflix-inspired portfolio card: dark, premium, technically relevant,
   visually striking, and appropriate to the project's subject. Do not copy
   Netflix branding, logos, characters, or copyrighted artwork.
7. The image prompt should describe the project's concept visually rather
   than simply placing the project name and a list of technologies on a
   poster.
8. When the user later provides the generated image, place it in
   `public/images/` using the repository's naming conventions and update the
   project's `thumbnail` path.

### Image prompt format

When generating a thumbnail prompt, use this structure:

**Project:** [project name]

**Prompt:**
Create a cinematic, premium streaming-platform-style portfolio thumbnail for
[project concept]. Visualise [core subject/problem] through [specific visual
metaphor or scene]. Include subtle visual references to [important technical
elements] without turning the image into a technology logo collage. Dark
cinematic environment, sophisticated composition, strong depth, restrained
red accent lighting where appropriate, polished professional art direction,
high contrast, clean negative space, portrait 2:3 composition, no text, no
logos, no watermark, no UI screenshot, no generic stock-photo appearance.

Adapt the visual concept to the actual project rather than blindly reusing
this wording.

### Resume vs portfolio distinction

The resume and portfolio should tell the same factual story but serve
different purposes.

- **Resume:** dense, concise, evidence-based, and optimised for quick
  professional/ATS scanning.
- **Portfolio:** technical, readable, visual, and designed to communicate
  what was interesting about the work to a human reviewer.
- Do not copy resume bullets into portfolio descriptions unless they happen
  to be the best wording.
- Do not introduce facts in the portfolio that are absent from the resume
  unless the user explicitly provides those facts.