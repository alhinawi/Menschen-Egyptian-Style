"""Generate native AB A1.2 page 56: spec JSON + erased bg."""
import sys, json
sys.path.insert(0, '/home/sandbox/Menschen-Egyptian-Style/scripts/n56')
from nativeutil import *

P = 56
scan = load_scan(P)
W, H = scan['width'], scan['height']

items = []
def t(x, y, text, s=None, c='', col=None, b=False, i=False, target=None, path=DROID):
    if s is None:
        s = best_size(text, path, target, lo=13, hi=24) if target else 20
    it = {'k': 't', 'x': x, 'y': y, 't': text, 's': s}
    if c: it['c'] = c
    if col: it['col'] = col
    if b: it['b'] = 1
    if i: it['i'] = 1
    items.append(it)
    return it

# ---------- erase rectangles (x0,y0,x1,y1) ----------
R = [
    (155,160,500,192),      # ex7 title
    (158,200,792,236),      # word bank incl pen strike
    (155,240,178,398),      # ex7 labels a-f
    (180,240,720,268),      # 7a incl pen answer
    (180,268,815,294),      # 7b
    (180,294,625,320),      # 7c
    (180,320,800,346),      # 7d
    (180,346,930,372),      # 7e
    (180,372,610,398),      # 7f
    (155,430,650,462),      # ex8 title
    (155,472,730,500),      # ex8 instruction
    ('fill',(312,576,852,696),(255,255,255)),  # forum post body
    (530,740,950,895),      # forum handwriting (all 4 lines)
    (155,716,475,746),      # Beantworten Sie folgende Fragen.
    (155,756,525,812),      # Q1 (2 lines) + dash
    (155,808,330,836),      # Q2 + dash
    (155,834,410,862),      # Q3 + dash
    (155,860,450,888),      # Q4 + dash
    (155,884,430,914),      # Q5 + dash
    (155,922,945,954),      # Sie haben noch nie...
    (150,986,580,1018),     # ex9 title
    (155,1026,178,1056),    # a label
    (202,1026,465,1056),    # a text
    (202,1052,580,1084),    # 9a answer line (keep printed green triangle at x184-195)
    (202,1082,430,1110),    # doch nicht so viel Geld!
    (155,1116,178,1146),    # b label
    (202,1116,515,1146),    # b text
    (348,1144,782,1174),    # 9b text after slots (incl printed !)
    (155,1182,178,1212),    # c label
    (202,1182,720,1212),    # c text
    (288,1210,445,1238),    # 9c text after slots (incl printed ?)
    ('fill',(200,1234,760,1264),(254,253,248)),  # Ja natuerlich line (fill: avoids slot-row residue)
    (524,454,544,466),      # stray tick under ex8 title
    (826,946,844,958),      # stray dash under Fantasiegeschichte
    (155,1272,178,1302),    # d label
    (202,1272,790,1302),    # d text
    (283,1198,293,1232),    # 9c printed ? remnant (slots row starts y1233)
    (340,1300,950,1328),    # 9d text after slots (incl printed ! at 345-349)
    ('fill',(202,1326,325,1354),(254,253,248)),  # Monat hier! (fill: avoids slot-row residue)
    (200,1350,590,1380),    # Doch. ...
]

make_bg(P, R, f'{REPO}/assets/book-crops/native-ab12-p56-bg.png')
items.append({'k':'a','n':'bg','x':0,'y':0,'w':W,'h':H,'alt':'Seite 56 Hintergrund'})

SER='serif'
# ---------- ex 7 ----------
t(160,183,'Ergänzen Sie das Verb im Perfekt.',c='naFiraM',col='#1d1d1b',target=329,path=FIRA)
items.append({'k':'bx','x':160,'y':204,'w':624,'h':24,'bg':'#f9f9df'})
t(166,224,'sich entschuldigen | gehören | gefallen | beschweren | vergessen | bekommen',c='naFiraR',col='#7585a2',s=17.3,path=FIRA400)
items.append({'k':'r','x':166,'y':219,'w':150,'h':2,'col':'#5b6099'})  # printed strike through example word
for ly,lab in [(260,'a'),(286,'b'),(311,'c'),(338,'d'),(365,'e'),(389,'f')]:
    t(160,ly,lab,s=15,col='#828185')
t(186,260,'Warum hast du dich bei Simon nicht',target=316)
items.append({'k':'r','x':513,'y':264,'w':92,'h':2,'col':'#9aa3ab'})
items.append({'k':'a','n':'entschuldigt','x':515,'y':244,'w':93,'h':31,'alt':'Beispielantwort entschuldigt'})
t(604,260,'?')
t(186,286,'Haben Sie die E-Mail von Professor Klüger schon',target=425)
items.append({'k':'f','id':'p56-7b','x':613,'y':290,'w':186,'l':'7 b','a':'bekommen','g':'g1'})
t(799,286,'?',target=8)
t(186,311,'Wie hat Ihnen das Konzert',target=236)
items.append({'k':'f','id':'p56-7c','x':430,'y':315,'w':180,'l':'7 c','a':'gefallen','g':'g1'})
t(610,311,'?',target=8)
t(186,338,'War das Essen wirklich schlecht? Hast du dich',target=408)
items.append({'k':'f','id':'p56-7d','x':613,'y':342,'w':169,'l':'7 d','a':'beschwert','g':'g1'})
t(782,338,'?',target=8)
t(186,365,'Ich muss noch einmal ins Büro gehen. Ich habe mein Handy',target=531)
items.append({'k':'f','id':'p56-7e','x':727,'y':369,'w':187,'l':'7 e','a':'vergessen','g':'g1'})
t(914,365,'.',target=4)
t(186,389,'Das Auto hat mir früher',target=211)
items.append({'k':'f','id':'p56-7f','x':402,'y':393,'w':189,'l':'7 f','a':'gehört','g':'g1'})
t(591,389,'.',target=4)
items.append({'k':'chk','g':'g1','x':955,'y':366})

# ---------- ex 8 ----------
t(163,456,'Haben Sie schon einmal einen Promi getroffen?',c='naFiraM',col='#1d1d1b',target=469,path=FIRA)
t(163,493,'Lesen Sie den Forumsbeitrag und antworten Sie dann',c='naFiraM',b=1,target=465,path=FIRA)
t(642,493,'petersilie.',c='naFiraM',b=1,i=1,target=76,path=FIRA)
# forum post
t(320,597,'Welchen Promi habt ihr schon mal getroffen?',b=1,target=353)
t(320,618,'Mir ist gerade ein bisschen langweilig, deshalb meine Frage:',target=435)
t(320,639,'Welchen Promi, welche berühmte Person, habt ihr schon mal getroffen?',target=521)
t(320,660,'Also, beim Einkaufen oder im Zug oder so.',target=305)
t(320,682,'Habt ihr den Promi gleich erkannt? Wie hat er/sie ausgesehen?',target=456)
t(163,737,'Beantworten Sie folgende Fragen.',c='naFiraM',b=1,target=294,path=FIRA)
for dy,q in [(0,'Haben Sie schon einmal einen Promi')]:
    t(185,778,q,target=323)
t(161,778,'–',target=10)
t(184,801,'getroffen?',target=89)
t(161,828,'–',target=10); t(185,828,'Wer war das?',target=115)
t(161,854,'–',target=10); t(185,854,'Wann und wo war das?',target=202)
t(161,880,'–',target=10); t(185,881,'Wie hat er/sie ausgesehen?',target=237)
t(161,906,'–',target=10); t(185,907,'Was hat er/sie gemacht?',target=214)
t(161,945,'Sie haben noch nie einen Promi getroffen? Dann schreiben Sie eine Fantasiegeschichte.',c='naFiraM',b=1,target=767,path=FIRA)

# ---------- ex 9 ----------
t(159,1011,'Wie können Sie reagieren? Ergänzen Sie.',c='naFiraM',col='#1d1d1b',target=400,path=FIRA)
t(160,1049,'a',s=15,col='#828185')
t(207,1049,'Gehört der Porsche Juliane?',target=244)
items.append({'k':'a','n':'achwas','x':204,'y':1044,'w':96,'h':38,'alt':'Beispielantwort Ach was'})
t(304,1074,'! Das glaube ich nicht. Sie hat',s=19)
t(212,1101,'doch nicht so viel Geld!',target=204)
t(160,1139,'b',s=15,col='#828185')
t(207,1139,'Lolita hat am Samstag geheiratet.',target=294)
items.append({'k':'f','id':'p56-9b','x':190,'y':1176,'w':160,'l':'9 b','a':'Wahnsinn','g':'g2','c':'sl'})
t(352,1165,'! Sie ist doch erst seit einem Monat geschieden.',target=417)
t(160,1203,'c',s=15,col='#828185')
t(206,1204,'Gestern habe ich Michael Ballack am Flughafen gesehen.',target=499)
items.append({'k':'f','id':'p56-9c','x':190,'y':1241,'w':102,'l':'9 c','a':'Echt','g':'g2','c':'sl'})
t(291,1230,'? Bist du sicher?',target=134)
t(205,1256,'Ja natürlich! Glaubst du, ich erkenne Michael Ballack nicht?',target=537)
t(160,1295,'d',s=15,col='#828185')
t(206,1295,'Hast du schon gehört? Frau Bauer ist ab 1.5. unsere neue Chefin.',target=564)
items.append({'k':'f','id':'p56-9d','x':205,'y':1331,'w':140,'l':'9 d','a':'Ach komm','g':'g2','c':'sl'})
t(350,1319,'! Frau Bauer? Das kann doch nicht sein! Sie ist doch erst seit einem',target=587)
t(207,1346,'Monat hier!',target=102)
t(206,1372,'Doch. Sie hat es mir heute Morgen gesagt.',target=367)
items.append({'k':'chk','g':'g2','x':945,'y':1348})

write_spec(P, {'w':W,'h':H,'items':items})
print('p56 written:', len(items), 'items')
