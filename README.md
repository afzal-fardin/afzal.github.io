# Md Afzal Hossain — Academic Portfolio

A static website (plain HTML, CSS and a little JavaScript). No build step, no server, no code editing needed.

Live address once published: **https://mdafzalhossain.github.io/** (if you name the repository `mdafzalhossain.github.io`).

## Publish on GitHub Pages (browser only)

1. Unzip the downloaded ZIP on your computer. You should see `index.html`, `style.css`, `script.js` and an `assets` folder directly inside the unzipped folder.
2. Sign in at https://github.com and click **+ → New repository**.
3. Name it exactly **mdafzalhossain.github.io**, choose **Public**, then click **Create repository**.
4. On the new repository page click **uploading an existing file**.
5. Open the unzipped folder and select **everything inside it** (not the folder itself). Drag it all into the GitHub page. Dragging keeps the `assets` folder structure.
6. Wait until the upload finishes, then click **Commit changes**.
7. Go to **Settings → Pages**. Under **Build and deployment**, set **Source: Deploy from a branch**, **Branch: main**, **Folder: / (root)**, then **Save**.
8. Wait 1–3 minutes and open https://mdafzalhossain.github.io/. If you see a 404, wait a little and refresh.

To change anything later, send the new file or request to Claude and upload the replacement files the same way (**Add file → Upload files**; same file names overwrite the old ones).

## Before you publish: approval checklist

- [ ] **Public email** `afzal.ipe.sust@gmail.com` is shown on every page. Approve it.
- [ ] **Profile photo** `assets/images/profile.jpg` is the photo you want public.
- [ ] **Public CV** `assets/cv/Md_Afzal_Hossain_CV.pdf` was rebuilt from your CV **without** your mobile number and without the referees' names, phones and emails. Approve it.
- [ ] **Bakery report** was published **without its cover page**, because the cover lists four classmates' registration numbers. Tell Claude if you want the cover restored.
- [ ] **Arduino report** (`assets/reports/arduino-brightness-light-report.pdf`) was converted from Word. Page 9 may show overlapping pictures. For a perfect copy, open the Word file, choose **File → Save As → PDF**, and send it to Claude to replace this one.
- [ ] **Live links** (LinkedIn, GitHub, ORCID, Google Scholar, three DOIs) open the right pages after publishing.

## Optional supporting items to upload

| Item | Card it would improve |
|---|---|
| Paper PDFs (only if you may share them) | Each IEOM 2025 paper on Publications gets a "View PDF" button and a real first-page thumbnail |
| Competition certificate images or PDFs (remove IELTS ID, signature, date of birth, phone, address) | Ptak Supply Chain Case Competition 2024, IPESphere National Project Fair, CaseQuest |
| Project photos, posters, reports or public code links | Hospital Diagnostic System Simulation, Activity Sampling Study, Agricultural Supply Chain Resilience (ISCEA 2024), RC Water Trash Collector |
| Training certificates or photos | Hatil Complex Ltd., BITAC, Khadim Ceramics |
| Event photos or posters | Leadership & Activities (3 Decades of IPE, KIN, Sports Week) |
| A sitemap | Only needed when your final web address is confirmed |

Cards without supporting files intentionally show an icon tile and no "View" buttons.

## What is in this folder

- `index.html` (About), `education.html`, `experience.html`, `projects.html`, `publications.html`
- `style.css`, `script.js` (image viewer, PDF preview and copy-DOI button; all links also work without JavaScript)
- `assets/images/` profile photo, project photos, report previews
- `assets/reports/` the two project report PDFs
- `assets/cv/` public CV
- The contact form from the reference site was removed. Visitors use the email button instead.
