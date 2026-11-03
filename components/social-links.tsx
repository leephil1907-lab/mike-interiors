import Link from "next/link";
import {Instagram} from "lucide-react";

function TikTokMark(){return <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.1V2h-3.56v13.67a2.9 2.9 0 0 1-2.9 2.9 2.9 2.9 0 1 1 2.9-2.9c0-.24-.03-.47-.08-.69V11.3a6.48 6.48 0 0 0-2.82-.65 6.46 6.46 0 1 0 6.46 6.46V9.83a8.36 8.36 0 0 0 4.9 1.58V7.85a4.82 4.82 0 0 1-1.13-.16Z"/></svg>}

export function SocialLinks({className=""}:{className?:string}){
 return <div className={`social-links ${className}`} aria-label="Mike Interiors social media">
  <Link href="https://www.tiktok.com/@mikeswage" target="_blank" rel="noopener noreferrer" aria-label="TikTok — @mikeswage" title="TikTok"><TikTokMark/></Link>
  <Link href="https://www.instagram.com/mike_interiors6/" target="_blank" rel="noopener noreferrer" aria-label="Instagram — @mike_interiors6" title="Instagram"><Instagram/></Link>
 </div>
}
