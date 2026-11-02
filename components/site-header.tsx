"use client";
import Link from "next/link";
import {useEffect,useState} from "react";
import {usePathname} from "next/navigation";
import {Menu,X} from "lucide-react";
import {BrandLogo} from "@/components/brand-logo";
const links=[["Portfolio","/work"],["Services","/services"],["About","/about"],["How We Work","/#approach"],["Notebook","/design-ideas"],["Videos","/videos"],["Enquire","/contact"]];
export function SiteHeader(){
 const [open,setOpen]=useState(false),pathname=usePathname(),home=pathname==="/";
 useEffect(()=>setOpen(false),[pathname]);
 useEffect(()=>{if(!open)return;const close=(event:KeyboardEvent)=>{if(event.key==="Escape")setOpen(false)};window.addEventListener("keydown",close);return()=>window.removeEventListener("keydown",close)},[open]);
 return <header className={`site-header ${home?"site-header-overlay":"site-header-solid"}`}><BrandLogo light={home}/><nav className="nav-links" aria-label="Main navigation">{links.map(([label,href])=><Link key={href} href={href} aria-current={(href==="/work"&&pathname.startsWith("/work"))||(href==="/about"&&pathname==="/about")||(href==="/design-ideas"&&pathname==="/design-ideas")||(href==="/videos"&&pathname==="/videos")||(href==="/contact"&&pathname==="/contact")?"page":undefined}>{label}</Link>)}</nav><button className="mobile-menu" type="button" onClick={()=>setOpen(!open)} aria-label={open?"Close menu":"Open menu"} aria-expanded={open} aria-controls="mobile-site-navigation">{open?<X/>:<Menu/>}</button>{open&&<nav className="mobile-nav" id="mobile-site-navigation" aria-label="Mobile navigation">{links.map(([label,href])=><Link key={href} href={href}>{label}</Link>)}</nav>}</header>
}
