"use client";
import Link from "next/link";
import {useState} from "react";
import {usePathname} from "next/navigation";
import {Menu,X,ArrowUpRight} from "lucide-react";
import {BrandLogo} from "@/components/brand-logo";
const links=[["Portfolio","/work"],["About","/about"],["How We Work","/#approach"],["Notebook","/design-ideas"],["Videos","/videos"],["Enquire","/contact"]];
export function SiteHeader(){
 const [open,setOpen]=useState(false);const pathname=usePathname();const home=pathname==="/";
 return <header className={`site-header ${home?"site-header-overlay":"site-header-solid"}`}>
  <BrandLogo light={home}/>
  <nav className="nav-links">{links.map(([label,href])=><Link key={href} href={href}>{label}</Link>)}</nav>
  <button className="mobile-menu" onClick={()=>setOpen(!open)} aria-label={open?"Close menu":"Open menu"}>{open?<X/>:<Menu/>}</button>
  {open&&<nav className="mobile-nav">{links.map(([label,href])=><Link key={href} href={href} onClick={()=>setOpen(false)}>{label}</Link>)}</nav>}
 </header>;
}
