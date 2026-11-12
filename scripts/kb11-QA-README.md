# KB A1.1 native page workflow (generator v2)
1. View assets/kb-a11-pN.png. Write the printed text with exact punctuation into src/native-kb11/text/pN.txt (reading order is not required; one line per printed line is fine; keep ... tokens out of the matching, they are separate).
2. python3 scripts/build-native-kb11.py N      # writes src/native-kb11/pN.json and assets/book-crops/kb11-pN-*.webp
3. python3 scripts/wire-native-kb11.py N        # switches the lesson JSON to native (undo with: git checkout -- src/lessons)
4. npm run build
5. node tests/react/native-kb11-shots.cjs <lessonfile> N 900   # lessonfile: index (p9-12), l2-3 (p13-24), l4-6 (p25-40)
6. python3 scripts/kb11-cmp.py N   # writes /tmp/shots/cmpN_0.png (top half) and cmpN_1.png (bottom half): original left, native right
7. Look at both images. Fix residue with src/native-kb11/overrides/pN.json: sans [[ymin,ymax,xmin,xmax,(0)]]; drop [{x,cy,tol}]; adj [{x,cy,tol,dx,dy,dw,set:{b,f,...},text:"new line"}]; erase [[x0,y0,x1,y1]] in scan units.
8. Only wire pages that pass close-up; leave others hybrid (git checkout -- src/lessons for them).
9. Test: npx tsc --noEmit; node tests/react/hybrid-scan.cjs; PAGES=N PORT=<unique> node tests/react/native-kb11.cjs
