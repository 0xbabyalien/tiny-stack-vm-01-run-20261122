import{mkdirSync,readFileSync,readdirSync,writeFileSync}from'node:fs';
import{join}from'node:path';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',Q=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const id of readdirSync(I).sort()){
let P,B;
try{P=readFileSync(join(I,id,'program.bin'))}catch{P=Buffer.alloc(0)}
try{B=readFileSync(join(I,id,'input.bin'))}catch{B=Buffer.alloc(0)}
const S=new Int32Array(256),M=new Int32Array(256),C=new Int32Array(64);
let sp=0,cp=0,pc=0,ip=0,st=0,ex=0;const O=[];
let done=false;
while(!done){
if(st>=1e6){ex=10;break}
if(pc<0||pc>=P.length){ex=9;break}
const op=P[pc];st++;
let il=0;
if(op==1)il=1;else if(op==2)il=4;else if(op>=48&&op<=51)il=2;
const ok=op<=7||op>=16&&op<=30||op==32||op==33||op==34||op>=48&&op<=52||op==64||op==65||op>=80&&op<=83;
if(!ok){ex=5;break}
if(pc+1+il>P.length){ex=9;break}
const u=P[pc+1]|P[pc+2]<<8,s=u>=32768?u-65536:u;
const T=c=>{ex=c;done=true};
switch(op){
case 0:ex=0;done=true;break;
case 1:if(sp>=256)T(3);else{S[sp++]=P[pc+1]<<24>>24;pc+=2}break;
case 2:if(sp>=256)T(3);else{S[sp++]=P.readInt32LE(pc+1);pc+=5}break;
case 3:if(sp<1)T(2);else{sp--;pc++}break;
case 4:if(sp<1)T(2);else if(sp>=256)T(3);else{S[sp]=S[sp-1];sp++;pc++}break;
case 5:if(sp<2)T(2);else{const t=S[sp-1];S[sp-1]=S[sp-2];S[sp-2]=t;pc++}break;
case 6:if(sp<2)T(2);else if(sp>=256)T(3);else{S[sp]=S[sp-2];sp++;pc++}break;
case 7:if(sp<3)T(2);else{const a=S[sp-3];S[sp-3]=S[sp-2];S[sp-2]=S[sp-1];S[sp-1]=a;pc++}break;
case 16:case 17:case 18:case 19:case 20:case 21:case 22:case 24:case 25:case 26:case 28:case 29:case 30:case 32:case 33:case 34:
if(sp<2)T(2);else{const b=S[--sp],a=S[sp-1];let r=0;
if(op==16)r=a+b|0;else if(op==17)r=a-b|0;else if(op==18)r=Math.imul(a,b);
else if(op==19){if(!b){T(4);break}r=a/b|0}
else if(op==20){if(!b){T(4);break}r=a%b}
else if(op==21){if(!b){T(4);break}r=(a>>>0)/(b>>>0)|0}
else if(op==22){if(!b){T(4);break}r=(a>>>0)%(b>>>0)|0}
else if(op==24)r=a&b;else if(op==25)r=a|b;else if(op==26)r=a^b;
else if(op==28)r=a<<b;else if(op==29)r=a>>b;else if(op==30)r=a>>>b;
else if(op==32)r=a==b?1:0;else if(op==33)r=a<b?1:0;else r=(a>>>0)<(b>>>0)?1:0;
S[sp-1]=r;pc++}break;
case 23:if(sp<1)T(2);else{S[sp-1]=-S[sp-1]|0;pc++}break;
case 27:if(sp<1)T(2);else{S[sp-1]=~S[sp-1];pc++}break;
case 48:pc=pc+3+s;break;
case 49:if(sp<1)T(2);else{const v=S[--sp];pc=v==0?pc+3+s:pc+3}break;
case 50:if(sp<1)T(2);else{const v=S[--sp];pc=v!=0?pc+3+s:pc+3}break;
case 51:if(cp>=64)T(7);else{C[cp++]=pc+3;pc=u}break;
case 52:if(cp==0)T(8);else pc=C[--cp];break;
case 64:if(sp<1)T(2);else{const a=S[sp-1];if(a<0||a>255)T(6);else{S[sp-1]=M[a];pc++}}break;
case 65:if(sp<2)T(2);else{const a=S[sp-1],v=S[sp-2];if(a<0||a>255)T(6);else{M[a]=v;sp-=2;pc++}}break;
case 80:if(sp<1)T(2);else{const s=String(S[sp-1]);if(O.length+s.length>65536)T(11);else{for(let i=0;i<s.length;i++)O.push(s.charCodeAt(i));sp--;pc++}}break;
case 81:if(sp<1)T(2);else{if(O.length>=65536)T(11);else{O.push(S[sp-1]&255);sp--;pc++}}break;
case 82:if(sp>=256)T(3);else{S[sp++]=ip<B.length?B[ip++]:-1;pc++}break;
case 83:if(sp<1)T(2);else{ex=S[--sp]&255;done=true}break;
}}
mkdirSync(join(Q,id),{recursive:true});
writeFileSync(join(Q,id,'stdout.bin'),Buffer.from(O));
writeFileSync(join(Q,id,'exit.txt'),String(ex));
}
