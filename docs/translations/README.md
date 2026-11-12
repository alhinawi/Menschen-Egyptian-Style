# Egyptian-Arabic translation backlog

`missing-egyptian.json` is a deduplicated editorial queue, not approved translation content. Current audit: 7,982 entries (3,086 words and 4,896 sentences/phrases) across 18 reader routes. Occurrences include file, printed page and text-unit ID when present. Existing OCR mistakes and legacy sources are deliberately included as candidates; the count is not a count of verified distinct German expressions.

Rebuild after curated translations or page changes:

```sh
npm run build
node scripts/audit-missing-translations.cjs
```

The runtime also keeps a separate, device-local queue for missing text actually tapped. The popup deliberately shows no download or explanatory text, at the user's request. The queue stays in local storage and is not synced to a server. Curated dictionaries always win over a cached machine result.

## Temporary fallback

Only a missing word, sentence or missing selection part requests automatic Arabic. Reviewed Egyptian-Arabic text is not sent or changed. The user requested removal of the temporary-translation badge and provider explanation, so the popup displays only the source/translation and its controls. The fallback may be standard Arabic rather than Egyptian Arabic. It is not promoted into the curated dictionaries.

The anonymous MyMemory GET API is called directly from the reader on demand, without account credentials, contact email, paid keys or hosting changes. No translation-memory contribution endpoint is used. Requests omit credentials/referrer, split long text within the 500-byte request limit, time out, cache successful results locally and share in-flight requests. Failed/quota-limited requests show a clear retry state rather than service error text. A late response cannot replace a later word or sentence.

- API: https://mymemory.translated.net/doc/spec.php
- Usage limits: https://mymemory.translated.net/doc/usagelimits.php
- Native Chrome translation is desktop-only, so it cannot be the sole phone fallback: https://developer.chrome.com/docs/ai/translator-api

The free anonymous service has daily limits and depends on the visitor's connection. It is temporary, not an unlimited production translation contract.

## Checks

`node tests/react/automatic-translation.cjs` covers 320/390 layouts, reviewed translations unchanged, missing words, missing sentences, cached results, local queue, quota failures, retry, delayed-response races and mixed reviewed/missing selections. It also performs one live browser request to verify CORS and real German-to-Arabic output. Screenshots of the live result and failure state were inspected at phone size. Build, TypeScript, content and hybrid-scan regression pass.
