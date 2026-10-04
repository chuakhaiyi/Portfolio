# Louis Chua's portfolio

Personal portfolio for AI engineering and junior software development opportunities. Next.js 15 App Router, TypeScript, Tailwind CSS 4, Framer Motion, and locally hosted Inter. The homepage, seven case studies, and 404 page are prerendered. No account, database, CMS, analytics, external font calls, or email API.

## Run

Node.js 22.19+ or 24 LTS is recommended for the included development audit tools.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. For the production version:

```sh
npm run build
npm start
```

## Deploy to Cloudflare Workers for free

The project exports static files into `out/`. `wrangler.jsonc` serves them through Workers Static Assets, including the custom 404 page. No Worker script, backend, environment variables, or paid plan is required. `npm start` previews the exported site using Wrangler locally; run `npm run build` first.

Preparation verified: static export succeeded and `wrangler deploy --dry-run` validated 50 asset files. The site has not been published by this setup step.

In PowerShell:

```powershell
Set-Location 'C:\Code\Porfolio Website'
npx.cmd wrangler login
```

Sign in to your Cloudflare account in the browser window and approve Wrangler access. Create a free Cloudflare account first if needed. Then publish:

```powershell
npm.cmd run deploy
```

This rebuilds the site and deploys the `out/` assets. Select your account if prompted. For a first deployment, Wrangler may ask you to choose a `workers.dev` subdomain. The command prints the actual public URL when deployment succeeds. Open it and check project navigation, the resume download, and an unknown URL for the 404 page.

For future updates, run `npm.cmd run deploy` again. GitHub and a custom domain are optional. Only `out/` is uploaded; your original OneDrive files and local QA reports are not deployed. The updated resume in `public/` is intentionally included in the site's public download.

On Windows, stop any `npm start` / Wrangler preview with Ctrl+C before rebuilding or deploying. The preview can lock `out/`, which Next.js replaces during export, causing an `EBUSY` error. Use `npm run dev` for everyday development.

See [Cloudflare's static assets guide](https://developers.cloudflare.com/workers/static-assets/get-started/) and [SSG/404 routing](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/).

## Edit content

- `lib/content.ts`: contact links, project copy, project links, skills.
- `app/page.tsx`: hero, about, work/education timeline, contact.
- `app/globals.css`: dark theme, responsive layout, motion fallbacks.
- `public/Louis_Chua_Khai_Yi_Resume.pdf`: downloadable updated resume.
- `output/pdf/Louis_Chua_Khai_Yi_Resume_Updated.pdf`: the same PDF for sharing.

The source DOCX and PDF in OneDrive remain unchanged. The updated resume adds Ledge, MUBA, target roles, project technologies, and a four-hackathon summary. It separates coursework from personal projects and retains existing work, education, and university involvement.

## Content still needed

Marked placeholders deliberately remain in the case studies:

- Actual project screenshots. All current covers are typographic studies, not screenshots or product UI recreations.
- Live/demo links for the seven projects.
- NextChapter repository URL (the submitted CPD URL appeared twice).
- Personal challenges and approaches for Ledge, MediSync+, Intelligent CPD, and NextChapter.
- How Louis approached Suiroll's frontend/backend integration challenge.

The MUBA pitch is recorded as 6 September 2026, interpreting the supplied day/month in the current-year context. Confirm the year before publishing if different. MUBA is listed as participation, with no award claimed. The supplied MediSync+ repository link could not be independently fetched; verify its availability before sharing the site.

Source project READMEs:

- https://github.com/chuakhaiyi/FormPilot/blob/master/README.md

- https://github.com/chuakhaiyi/Ledge/blob/master/README.md
- https://github.com/DayDreamingLab/suirollpay/blob/main/README.md
- https://github.com/DayDreamingLab/Intelligent-CPD_Louis-Mutton/blob/main/README.md

- https://github.com/chuakhaiyi/QueueSense/blob/main/README.md

Personal contributions are based on the user's resume and conversation, not inferred from the team's feature list. Suiroll is described as a testnet prototype. There are no invented results or testimonials.

Contact uses `mailto:`. Writing is omitted until there are posts to share. The phone number is retained in the resume; the page itself uses email and social links.

## Verification

Verified locally on 13 September 2026: production build and TypeScript checks passed; browser checks passed at all four widths. Lighthouse on the final production homepage measured mobile performance 93/accessibility 100 and desktop performance 100/accessibility 100. These are local measurements, not promises about a future deployment.

With the production server running in another terminal:

```sh
npm run typecheck
npm test
npm run audit
```

`npm test` uses installed Chrome by default. Set `BROWSER_CHANNEL=msedge` for Edge; otherwise install Chrome. The check covers 360, 768, 1440, and 1920px widths, case-study navigation, all project routes, PDF download, 404 recovery, keyboard skip navigation, reduced motion, no-JavaScript visibility, and runtime errors. Browser screenshots and Lighthouse JSON reports are written to ignored `tmp/`.

`npm run audit` runs mobile and desktop Lighthouse sequentially against the production homepage. Lighthouse results vary with the machine and deployment; audit the public URL after deploying as well. Set `BASE_URL` to test a different origin.

Rebuild the PDF with Python plus `reportlab` and `pypdf`:

```sh
python scripts/build_resume.py
```

After changing resume content, visually inspect both pages before publishing. The script checks page count and key added content and copies the final PDF to `public/`.
