import sys
from PIL import Image
p=int(sys.argv[1]);w=900
n=Image.open(f'/tmp/shots/native-{p}-900.png').convert('RGB');o=Image.open(f'/downloads/repo/assets/kb-a11-p{p}.png').convert('RGB')
n=n.resize((w,int(n.height*w/n.width)));o=o.resize((w,n.height))
h=n.height//2
for k in (0,1):
    m=Image.new('RGB',(w*2+10,h+4),'white');m.paste(o.crop((0,k*h,w,(k+1)*h)),(0,0));m.paste(n.crop((0,k*h,w,(k+1)*h)),(w+10,0));m.save(f'/tmp/shots/cmp{p}_{k}.png')
