import Link from "next/link";
import {ArrowUpRight} from "lucide-react";
export function SiteFooter(){return <footer className="footer"><div className="container">
 <div className="footer-grid">
  <div><Link href="/" className="brand"><span className="brand-mark">M</span><span>mike interiors</span></Link><p style={{maxWidth:310,marginTop:24}}>Thoughtful interiors, carefully considered details, and spaces made for living.</p><p>Abraka, Delta State, Nigeria</p></div>
  <div><h4>Explore</h4><p><Link href="/work">Our work</Link><br/><Link href="/design-ideas">Design ideas</Link><br/><Link href="/videos">Videos</Link><br/><Link href="/about">Our story</Link></p></div>
  <div><h4>Get in touch</h4><p><a href="tel:+2347036206407">+234 703 620 6407</a><br/><a href="https://wa.me/2347036206407" target="_blank" rel="noreferrer">WhatsApp us <ArrowUpRight size={12}/></a><br/><Link href="/contact">Start a project</Link></p></div>
 </div><div className="footer-bottom"><span>© {new Date().getFullYear()} Mike Interiors. All rights reserved.</span><span>Good design for good moments.</span></div>
 </div></footer>}
