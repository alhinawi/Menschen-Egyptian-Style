/**
 * Verified answer maps for every LineMatching instance in the book.
 *
 * Format (defined with the retry-red work): per instance,
 *   answers[i] = comma-separated zero-based right-column indices allowed for
 *   left row i. A single-match row is one index ("2"); a multi-match row lists
 *   every allowed target ("0,5"). The fixed printed example pair is
 *   auto-accepted by the component; its target is included here so each row
 *   carries the full allowed set. An empty string ("") means no correct
 *   target exists in this column for that row: any connection there is wrong
 *   (used by the two-column matching on ab-a12 p96, where each dialogue's
 *   answer sits in only one of the two columns).
 *
 * Every map below was verified against the official Hueber answer keys:
 *   KB A1 (Kursbuch + Arbeitsbuch, Lektionen 1-24):
 *     https://edit.hueber.de/media/36/Loesungen_und_Verbliste_Menschen_A1.pdf
 *   AB A1.1: https://legacy.hueber.de/media/36/Loesungsschluessel_Menschen_AB_A1-1.pdf
 *   AB A1.2: https://legacy.hueber.de/media/36/mns-loesungsschluessel-AB-A12.pdf
 * Instances whose exercise has no answer in those keys (the AB "TEST" pages
 * are not covered by the official Lösungsschlüssel) are listed in
 * lineMatchingUngraded instead. Never inferred.
 *
 * Key: "<book>:<book-page>:<matching-id>". Book pages are the app's page
 * numbers (scan page numbers). Entries marked WIP are in components that are
 * not routed in any lesson yet; they are keyed by their target page so the
 * map is ready when the page goes live.
 */
export const lineMatchingAnswers: Record<string, (string | null)[]> = {
  // ---- Kursbuch A1.1 ----
  // p10, L1 3a (Hören): Paco/Nicole -> Herkunft. Key: L1 Kursbuch 3a.
  // Paco: "Du kommst aus Deutschland, hm?" (2), "Aus der Schweiz?" (3) + Beispiel "Nein, ich komme aus Mexiko." (1)
  // Nicole: "Woher kommst du? Aus Spanien?" (0), "Ich komme aus Österreich." (4)
  'kb-a11:10:task3a': ['1,2,3', '0,4'],
  // p11, L1 7 (Hören). Key: L1 Kursbuch 7.
  // Nicole: "Auch gut." (5) + Beispiel "Wie geht's?" (0). Frau Wachter: "Wie geht es Ihnen?" (1), "Gut, danke." (4)
  'kb-a11:11:task7': ['0,5', '1,4'],
  // p14, L2 2a. Key: L2 Kursbuch 2a: "Ich arbeite als Journalistin. - Ich arbeite bei X-Media."
  'kb-a11:14:task2a': ['2', '0', '1'],
  // p22 (Modul-Plus), Familie -> Bild 1-3. Key: L3 Kursbuch, Film-Stationen 3.
  // Bild 1: Vater/Aileen (New York); Bild 2: Mutter (Wien); Bild 3: Schwester Tanja + Otto (Graz).
  'kb-a11:22:familie': ['0', '1', '0', '0', '0', '0', '0', '1', '2', '2', '2', '2', '2'],
  // p25, L4 2. Key: L4 Kursbuch 2:
  // "Sibylle sagt, der Tisch ist zu groß / modern / praktisch. Artur sagt, das Bett ist nicht schlecht. / der Tisch ist zu groß."
  // t2a: Sibylle -> der Tisch ist (0, Beispiel); Artur -> der Tisch ist (0) + das Bett ist (1)
  'kb-a11:25:t2a': ['0', '0,1'],
  // t2b: der Tisch ist -> zu groß (0) / modern (2) / praktisch (4) + Beispiel schön (1); das Bett ist -> nicht schlecht (3)
  // NOTE: the inline CheckButton key on this page ({1,2,3,4} / {0}) contradicts the official key; this map is the verified one.
  'kb-a11:25:t2b': ['0,1,2,4', '3'],
  // p31, L5 6b. Key: L5 Kursbuch 6b: 2 Schirm = grün, 3 Seife = gelb, 4 Streichholz = rot, 5 Geldbörse = blau; 1 = Beispiel (braun).
  'kb-a11:31:t6b-colors': ['4', '3', '2', '1', '0'],
  // p36, L6 9a. WIP: page 36 is still legacy markup, this branch is not routed yet.
  // Key: L6 Kursbuch 9a: Person A: Brenner IT-Consulting / Schmidt / Christian Schmidt;
  // Person B: Guten Tag, hier ist Marlene Neumann / Hallo, hier ist Marlene; verabschieden: Tschüs / Auf Wiederhören.
  'kb-a11:36:task9a': ['2', '0', '0', '0', '1', '1', '2'],
  // p45, L8 2a (Hören). Key: L8 Kursbuch 2a: Manuel: Schwimmbad + "Heute Nachmittag um vier."; Jonas: Kino + "Heute Nachmittag um vier."
  'kb-a11:45:match45': ['0', '1', '0,1'],
  // p54 (Modul-Plus), Das Paar / Der Mann / Die Frau. Key: L9 Kursbuch, Film-Stationen 2:
  // Paar: essen (2), Musik hören (3), vielleicht ins Kino gehen (5) + Beispiel Freunde besuchen (1);
  // Mann: zu einem Fußballspiel gehen (4); Frau: vielleicht in eine Disco gehen (0)
  'kb-a11:54:task2': ['1,2,3,5', '4', '0'],
  // WIP duplicate of the p54 exercise in NativePage.tsx (not routed; p54 renders via NativeKb11).
  'kb-a11:54:match54': ['1,2,3,5', '4', '0'],

  // ---- Kursbuch A1.2 ----
  // p19, L15 5a. Key: L15 Kursbuch 5a ("2 c, 3 d, 4 a"; 1 -> b ist Beispiel).
  'kb-a12:19:5a-lines': ['1', '2', '3', '0'],
  // p28, L16 9 (Hören). Key: L16 Kursbuch 9:
  // glauben: "Ach, das macht doch nichts. / Kein Problem." (2); glauben nicht: "Seltsam! ..." (1); Mitte = Beispiel (0).
  'kb-a12:28:9b-lines': ['2', '0', '1'],
  // p63, L23 5a. Key: L23 Kursbuch 5a:
  // 2 -> "denn dann ist das Unwetter gekommen." (2); 3 -> "denn wir hatten ein Traumwetter." (0);
  // 4 -> "denn dort ist es auch im Herbst noch schön warm." (1); 1 -> Beispiel (3).
  'kb-a12:63:5a-lines': ['3', '2', '0', '1'],

  // ---- Arbeitsbuch A1.1 ----
  // p6, L1 3. WIP (NativeAB11, not routed). Key: AB L1 3.
  'ab-a11:6:3': ['3', '5', '1', '2', '4', '0'],
  // p12, L2 2. WIP (NativeAB11Next, not routed). Key: AB L2 2.
  'ab-a11:12:u2': ['4', '0', '2', '1', '3'],
  // p15, L2 Training: Lesen 1. WIP (NativeAB11Next, not routed). Key: AB L2, Training: Lesen 1.
  'ab-a11:15:lesen1': ['2', '3', '0', '5', '4', '1'],
  // L4 7, WIP (NativeAB11Lessons45, not routed). Key: AB L4 7:
  // "Der Sessel ist modern. Und er ist praktisch." / "Die Lampe ist schön. Sie kommt aus Italien." / "Das Bett ist auch nicht schlecht. Es ist aber sehr klein."
  'ab-a11:32:u7match': ['2', '0', '1'],
  // p37, L5 8. WIP (NativeAB11Lessons45, not routed). Key: AB L5 8:
  // Stuhl = Holz (4), Buch = Papier (3), Flasche = Plastik (1), Schlüssel = Metall (0); Lampe = Glas (2) ist Beispiel.
  'ab-a11:37:u8': ['2', '4', '3', '1', '0'],
  // p38, L5 11a. WIP (NativeAB11Next45, not routed). Key: AB L5 11a:
  // "Wie heißt das auf Deutsch? - Wie bitte? - Bitteschön, kein Problem." (+ "Wie schreibt man das?").
  // Rows 1 and 2 are both the printed word "Wie", so the two remaining "Wie..." continuations are interchangeable.
  'ab-a11:38:u11a': ['2', '0,3', '0,3', '1'],
  // p72 (Modul-Plus), Wiederholungsstation: Wortschatz 5 (Hören). WIP (NativeAB11Module3Review, not routed).
  // Key: AB Modul 3, Wiederholungsstation: Wortschatz 5: b Schwimmbad, c Bar, d Kino, e Museum; a = Beispiel (Disco, 2).
  'ab-a11:72:u5match': ['2', '4', '1', '0', '3'],

  // ---- Arbeitsbuch A1.2 (HybridScan / scan-data) ----
  // p24, L16 2. Key: AB A1.2 L16 2:
  // Garage-Auto, Arbeitszimmer-Computer, Bad-Toilette, Schlafzimmer-Bett, Wohnzimmer-Couch, Küche-Kühlschrank; Garten-Blumen = Beispiel.
  'ab-a12:24:task2': ['4', '2', '1', '6', '5', '0', '3'],
  // p32, L16 10. Key: AB A1.2 L16 10:
  // b In zwei Stunden -> abholen (0); c Am Donnerstag um drei -> Sitzung (1); d Nach der Sitzung -> anrufen (4);
  // e Am Freitag -> nach dem Mittagessen (5); f Stefan hat -> 14.30 Uhr (2); a Heute um elf = Beispiel (3).
  'ab-a12:32:task10': ['3', '0', '1', '4', '5', '2'],
  // p68, L21 12 (Hören). Key: AB A1.2 L21 12:
  // Person 2 -> "zu viele Regeln" (2); Person 3 -> "Warum muss es immer Regeln geben?" (0);
  // Person 4 -> "Handy nicht ausmachen" (1); Person 1 = Beispiel (3).
  'ab-a12:68:task12': ['3', '2', '0', '1'],
  // p68, WIP native twin (NativeAB12P68, not routed; p68 renders via HybridScan). Same exercise, same key.
  'ab-a12:68:p68-12': ['3', '2', '0', '1'],
  // p86, L23 12. Key: AB A1.2 L23 12:
  // b Am See ... grillen -> und (3); c Urlaub am Meer -> aber (1); d Techniker -> denn (0); a Kleid = Beispiel (oder, 2).
  'ab-a12:86:task12': ['2', '3', '1', '0'],
  // p86, WIP native twin (NativeAB12L23, page 86 branch not routed). First column: sentences -> conjunctions, same key.
  'ab-a12:86:86-12': ['2', '3', '1', '0'],
  // Second column: conjunctions -> sentence endings, same key transposed:
  // denn -> Spülmaschine (0); aber -> in den Bergen (1); oder -> Rock schöner (2); und -> Baden verboten (3).
  'ab-a12:86:86-12r': ['0', '1', '2', '3'],
  // p92, L24 10. Key: AB A1.2 L24 10:
  // b Klaus -> Führerschein (2); c Tochter -> Motorrad schenken (0); d Lieblingsband -> Konzert (1); a Natascha und Ella = Beispiel (3).
  'ab-a12:92:task10': ['3', '2', '0', '1'],
  // p96 (Wiederholungsstation: Wortschatz 3, Hören). Key: AB A1.2, Wiederholungsstation: Wortschatz 3:
  // a = Beispiel (sonnig); b -> "Nein, es ist warm."; c -> "Ja, es sind 27 Grad."; d -> "Nein, aber es donnert und blitzt."
  // Two columns: each row's answer exists in only one of them, so the other column's rows carry "".
  'ab-a12:96:task3l': ['1', '3', '', ''],
  'ab-a12:96:task3r': ['', '', '0', '3'],
  // p96, WIP native twins (NativeAB12L24, not routed; p96 renders via HybridScan). Same exercise, same keys.
  // Official Hueber key (AB A1.2, Wiederholungsstation Wortschatz, Aufgabe 3):
  // "b Nein, es ist warm. c Ja, es sind 27 Grad. d Nein, aber es donnert und blitzt."
  // a-Nein -> schneit is the book's printed worked example (line inked on the page), so
  // the a rows are not interactive. null = the key is silent for the row: connections stay
  // neutral (ungraded), never red. 96-3lb rows are [b-Ja, b-Nein]; 96-3r rows are [c-Ja, c-Nein, d-Ja, d-Nein].
  'ab-a12:96:96-3lb': [null, '3'],
  'ab-a12:96:96-3r': ['0', null, null, '3'],
};

/**
 * Instances with no answer in the official Hueber keys. The AB "TEST" pages
 * are not covered by the Lösungsschlüssel PDFs, and guessing is not allowed.
 * Value = why it is ungraded + what the current code expects (unverified).
 */
export const lineMatchingUngraded: Record<string, string> = {
  // p88, L11 TEST 1 "Was passt? Ordnen Sie zu." (NativeAB11Test88, routed; AB11LineMatching88 is an unrouted twin).
  // Not in the official keys. Existing code expects [4,2,5,0,6,3,1] (Wein->trinken example, Hausaufgaben->machen,
  // Fahrrad->fahren, Spanisch->lernen, Zeitung->lesen, Freunde->einladen, Zimmer->aufräumen) - plausible but unverified.
  'ab-a11:88:ab88-1': 'AB A1.1 p88 TEST 1: no answer in the official Hueber keys (Lösungsschlüssel AB A1.1 has no TEST answers).',
  // p70, L9 TEST 2 "Wie heißen die Artikel? Bilden Sie neue Wörter." (NativeAB11Lesson9Close, not routed).
  // Not in the official keys (AB L9 2 is "Individuelle Lösung"; TEST pages are not covered).
  // Existing code expects t2match [3,2,0,1] (Kartoffel->Suppe, Apfel->Kuchen, Schinken->Brötchen) - plausible but unverified.
  'ab-a11:70:t2match': 'AB A1.1 p70 TEST 2: no answer in the official Hueber keys (AB L9 2 is "Individuelle Lösung", TEST pages not covered).',
};
