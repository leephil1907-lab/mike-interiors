import Link from "next/link";
import {ArrowUpRight,Instagram} from "lucide-react";
import {BrandLogo} from "@/components/brand-logo";

function TikTokIcon(){return <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.1V2h-3.42v13.67a2.9 2.9 0 0 1-2.9 2.9 2.9 2.9 0 1 1 2.9-2.9c0-.17-.02-.34-.05-.5V11.7a6.35 6.35 0 1 0 3.47 5.67V10.4a8.2 8.2 0 0 0 4.8 1.54V8.52a4.85 4.85 0 0 1-1.03-.11Z"/></svg>}

const socials=[
 {name:"TikTok",href:"https://www.tiktok.com/@mikeswage",icon:"tiktok"},
 {name:"Instagram",href:"https://www.instagram.com/mike_interiors6/",icon:"instagram"}
] as const;

export function SiteFooter(){return <footer className="footer"><div className="container">
 <div className="footer-grid">
  <div><BrandLogo/><p style={{maxWidth:310,marginTop:24}}>Thoughtful interiors, carefully considered details, and spaces made for living.</p><p>Abraka, Delta State, Nigeria</p></div>
  <div><h4>Explore</h4><p><Link href="/work">Portfolio</Link><br/><Link href="/services">Services</Link><br/><Link href="/design-ideas">Notebook</Link><br/><Link href="/videos">Videos</Link><br/><Link href="/about">About</Link><br/><Link href="/contact">Enquire</Link></p></div>
  <div><h4>Get in touch</h4><p><a href="tel:+2347036206407">+234 703 620 6407</a><br/><a href="https://wa.me/2347036206407" target="_blank" rel="noreferrer">WhatsApp us <ArrowUpRight size={12}/></a><br/><Link href="/contact">Start a project</Link></p><div className="footer-socials" aria-label="Social media accounts">{socials.map(social=><a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`Open Mike Interiors on ${social.name}`} title={social.name}>{social.icon==="instagram"?<Instagram size={20} strokeWidth={1.8}/>:<TikTokIcon/>}</a>)}</div></div>
 </div><div className="footer-bottom"><span>© {new Date().getFullYear()} Mike Interiors. All rights reserved.</span><span>Good design for good moments.</span></div>
 </div></footer>}
