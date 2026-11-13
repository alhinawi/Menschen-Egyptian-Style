# p58 (AB A1.2 TEST page) analysis for gen58.py

## CORRECTION (verified 2026-11-13): the cursive fills are PRINTED, not pen
- Earlier note "p58 ex1/ex4 pen fills ARE pen -> erase" was WRONG. ex4 has no cursive at all.
- ex1 (a) "chlan" bbox x461-508 y235-248 and ex3 (a) "gefallen" bbox x424-480 y714-737 are the book's
  printed blue script example answers: repeated glyphs are pixel-identical (font, not handwriting),
  both sit at (a) = worked-example positions, and no other blank on the page is filled.
- Action: keep both as blue-ink-only transparent art crops (blue mask: B-R>30 & B>100), 'a' items.
  Do NOT erase as pen. (Same pattern as learning #1 for printed script.)

## Page structure (1072x1453)
- Keep in bg: TEST header + blue rule (y~40-115), exercise number badges 1-4 (red/blue squares),
  vertical margin labels (WÖRTER ex1, STRUKTUREN ex2+ex3, KOMMUNIKATION ex4), square/triangle
  dialogue markers, "_/N Punkte" labels, bottom dots table (Wörter/Strukturen/Kommunikation),
  www.hueber.de/menschen/lernen, footer "58 | achtundfünfzig".
- Native: exercise titles, all dialogue text, hint letters, row letters. No audio (audio:[]).

## Exercises
1. ex1 WÖRTER y190-380, title "Ergänzen Sie das Gespräch." badge 1.
   Dialogue (square/triangle rows):
   - "Wie sieht Sarah van der Ahe aus?"
   - "Sie steht am Eingang. Sie ist s[script chlan]k (a) und hat k____ (b) braune H____ (c)."
   - "Sie ist wirklich h_____ (d)."
   - "Ja, das finde ich auch."
   - "Und wer ist der Mann neben ihr mit dem B___ (e)?"
   - "Hat er dunkle L_____ (f)? Dann ist es Louis."
   "_/5 Punkte" right y~360. chk g1.
2. ex2 STRUKTUREN y420-600, title "Ergänzen Sie haben und sein in der richtigen Form." badge 2.
   Row letters a-d native. Dialogue with pure underscore blanks (no hint letters).
   "_/7 Punkte" right y~595. chk g2.
3. ex3 STRUKTUREN y640-890, title "Ordnen Sie zu und ergänzen Sie die Verben in der richtigen Form." badge 3.
   Bank y~687: "sagen | gefallen | kommen | tanzen | entschuldigen | erkennen | vergessen" blue sans;
   "gefallen" appears marked (used-example underline) - zoom before deciding bg-art vs native.
   Row letters a-g native. Long pure blanks (w~181). "[script gefallen]" at (a) = printed example art.
   "_/6 Punkte" right y~880. chk g3.
4. ex4 KOMMUNIKATION y940-1210, title "Ergänzen Sie das Gespräch." badge 4.
   Hint-letter blanks: (a) "A__ w_s!" (b) "E___?" (c) "_c__o_m!" (d) "W___s i__!" (e) "A___u _ie_e Z_i_!"
   "_/5 Punkte" right y~1205. chk g4.

## Fields (23, scan-data src/scan-data/ab-a12/p58.json, answers support | alternates natively in renderer ok())
Mapping to range item: y_item = y_scan + 18 (h24 - 6), w_item = w_scan + 4, x unchanged (p56 verified).
Blanks with hint letters (ex1 b-f, ex4 a-e): erase underscores from bg, hint letters become native 't',
field over blank with DEFAULT underline (c=null, like p56 ex7). Fields ex2/ex3 (pure blanks): same.
Field list with scan x,y,w:
 1b(647,232,73,"urze|kurze") 1c(845,232,62,"aare|Haare") 1d(338,256,90,"übsch|hübsch")
 1e(578,309,44,"art|Bart") 1f(330,334,84,"ocken|Locken")
 2a(190,437,126,"Hattest") 2b1(448,465,122,"Ist") 2b2(239,490,126,"war")
 2c1(272,541,128,"war") 2c2(668,542,129,"bin") 2d1(236,568,129,"wart") 2d2(703,569,129,"hatten")
 3b(422,736,181,"gekommen") 3c(373,761,182,"vergessen") 3d(287,787,181,"gesagt")
 3e(519,813,181,"entschuldigt") 3f(468,839,182,"getanzt") 3g(437,865,180,"erkannt")
 4a(252,967,113,"Ach was!|Ach was") 4b(183,1046,67,"Echt|Echt?") 4c(183,1096,137,"Ach komm!|Ach komm")
 4d(183,1148,142,"Wahnsinn!|Wahnsinn") 4e(183,1175,264,"Ach du liebe Zeit!|Ach du liebe Zeit")
Groups g1-g4 (Aufgabe 1-4). chk placement like p56 (near Punkte label, e.g. x~945, y = Punkte baseline).

## Rendering conventions (from p56/p57)
- 't': top = y - .84*s; body Droid 18.5 baseline offset ~+3px; measure with nativeutil best_size/textw,
  right font path (DROID for body, FIRA paths for sans, DROID700 for bold).
- Erase rects: cut between marker edge and text start; flood erased area with paper #fefdf8.
- chk item: {"k":"chk","g":"gN","x":~945,"y":Punkte-line-y}.
- No 'au' items (no audio). gen in scripts/n58/gen58.py, reuse scripts/n56/nativeutil.py;
  shot: node scripts/n56/shot2.cjs 58 /tmp/native-58 (from repo dir).
