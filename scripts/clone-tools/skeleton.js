// usage: node skeleton.js <file.tsx>  -> condensed outline: tag.class + text (no svg/picture internals)
const fs=require('fs');let s=fs.readFileSync(process.argv[2],'utf8');
s=s.replace(/<svg[\s\S]*?<\/svg>/g,'<svg/>').replace(/<picture>[\s\S]*?<\/picture>/g,m=>{const a=m.match(/alt="([^"]*)"/);return '<picture alt="'+(a?a[1]:'')+'"/>'});
const out=[];
for(const l of s.split('\n')){const t=l.trim();if(!t||/^(import|\/\/|\/\*|export|return|\);|\}|<\/)/.test(t))continue;
 const m=t.match(/^<([A-Za-z0-9]+)/);
 if(m){const c=t.match(/className="([^"]*)"/),h=t.match(/href="([^"]*)"/),id=t.match(/ id="([^"]*)"/);out.push(' '.repeat(Math.max(0,(l.length-l.trimStart().length)/2-3))+m[1]+(c?'.'+c[1].replace(/ /g,'.'):'')+(id?'#'+id[1]:'')+(h?' ->'+h[1]:''));}
 else out.push(' '.repeat(Math.max(0,(l.length-l.trimStart().length)/2-3))+'"'+t.slice(0,140)+'"');}
console.log(out.join('\n'));
