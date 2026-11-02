"use client";
import Link from "next/link";
import {useState} from "react";
import {Menu,X,ArrowUpRight} from "lucide-react";
const links=[["Home","/"],["Our Work","/work"],["Design Ideas","/design-ideas"],["Videos","/videos"],["Our Story","/about"],["Contact","/contact"]];
export function SiteHeader(){
 const [open,setOpen]=useState(false);
 return <header className="site-header solid" style={{position:"sticky"}}>
  <Link href="/" className="brand" aria-label="Mike Interiors home"><span className="brand-mark">M</span><span>mike interiors</span></Link>
  <nav className="nav-links">{links.map(([label,href])=><Link key={href} href={href}>{label}</Link>)}<Link href="/contact" aria-label="Enquire"><ArrowUpRight size={15}/></Link></nav>
  <button className="mobile-menu" onClick={()=>setOpen(!open)} aria-label={open?"Close menu":"Open menu"}>{open?<X/>:<Menu/>}</button>
  {open&&<nav style={{position:"absolute",top:72,left:0,right:0,background:"var(--paper)",color:"var(--ink)",padding:"24px 22px 30px",display:"grid",gap:20,borderBottom:"1px solid var(--line)"}}>{links.map(([label,href])=><Link key={href} href={href} onClick={()=>setOpen(false)} style={{fontSize:12,letterSpacing:".12em",textTransform:"uppercase"}}>{label}</Link>)}</nav>}
 </header>;
}
