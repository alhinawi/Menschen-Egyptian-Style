# Menschen

German learning preview: A1.1 Kursbuch Lektion 1, tasks 1-11.

## Run

`npm run dev`, then open http://127.0.0.1:5173.

This is a static app. On Vercel, import the GitHub repository, choose **Other** as the framework, and serve the repository root. There is no required build step, backend, API key or environment variable. The HTML loads local JavaScript, fonts, images and MP3 files from `assets/`.

## Included

- 21 learning/reference pages covering tasks 1-11 and grammar/communication.
- Seven original page scans: Kursbuch pp.9-12 and linked action pages 73, 75, 77.
- Original CD 1 tracks 02-10. No substituted synthetic exercise audio.
- Answer checks grounded in the supplied teacher guide and transcripts.
- Open speaking activities are self-practice, without automatic speech grading.
- Egyptian Arabic translations can be toggled on/off.
- Answers, notes and progress are saved on the current browser/device only.
- One-page portrait layout and two-page desktop layout with soft corner page turns.

The generated word/sentence pronunciation feature and Arbeitsbuch lesson are not included in this version. There are no student accounts, server-side progress, access codes or payments.

## Hosting and access

The owner's selected hosting mode is an unlisted link without a password. `noindex,nofollow,noarchive` and `robots.txt` discourage indexing; they are not access control. Anyone with the deployed link can open or share it. No sitemap is supplied.

Connect this private GitHub repository directly to Vercel. Do not upload or deploy from a separate one-off source. No deployment has been performed as part of this commit.

## Materials and licenses

Original textbook images and recordings belong to Hueber Verlag. A private repository or unlisted link is not a copyright license. Do not make this repository public. Full-book PDFs and unrelated audio are excluded; only this lesson's required page images and recordings are included.

StPageFlip is MIT licensed; the bundled license is in `assets/page-flip-LICENSE.txt`. Noto Naskh Arabic and IBM Plex Sans Arabic are self-hosted under SIL Open Font License 1.1, included in `assets/`. Decorative paper/wood textures are local SVG assets.

## Verification

`npm test` checks the content manifest/assets. Local Playwright checks in `tests/full-lesson.cjs` cover the 28-page structure, mobile/desktop navigation, answer persistence and JavaScript errors. `tests/all-answers.cjs` exercises the source-grounded answer keys. Test scripts require local Chrome and Playwright; they are not required on Vercel.
