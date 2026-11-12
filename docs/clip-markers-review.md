# Clip marker audit

All four books were searched. The 24 Film-Stationen clip markers are on these Kursbuch pages:

| Book | Page | Clips | Current view |
| --- | --- | --- | --- |
| KB A1.1 | 22 | 1–3 | hybrid |
| KB A1.1 | 38 | 4–6 | legacy text |
| KB A1.1 | 54 | 7–9 | native |
| KB A1.1 | 70 | 10–12 | legacy text |
| KB A1.2 | 22 | 13–15 | native |
| KB A1.2 | 38 | 16–18 | native |
| KB A1.2 | 54 | 19–21 | hybrid |
| KB A1.2 | 70 | 22–24 | hybrid |

No Film-Stationen Clip markers found in AB A1.1 or AB A1.2 stored page text. Native and hybrid renderers support the same marker behavior so future conversions retain it. Legacy text pages receive a labeled clip button in each task heading, without changing their exercise content.

Every video URL was fetched and its dialogue compared with the official Hueber DVD transcript: https://legacy.hueber.de/media/36/msn-transkript-ldvd-A1.pdf

The video IDs and printed titles are in `src/components/ClipMarkers.tsx`; p54 retains its existing verified native video definitions. No clip lacks a verified video. Availability can change because the host is external.

Markers open a readable, unscaled modal with the matching clip, an autoplay request, a close button and a direct YouTube fallback. Autoplay depends on browser and host policy. Closing removes the frame and stops playback.

All 24 marker clicks pass at 320 and 390 pixels. Eight page screenshots and representative phone dialogs were visually inspected. The page geometry and task content remain unchanged except the explicit legacy heading labels. TypeScript, content, build and pilot regression tests pass.
