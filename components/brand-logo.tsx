import Link from "next/link";

type LogoProps={light?:boolean;className?:string};
function Monogram({light=false}:{light?:boolean}){
 const color=light?"#F5F1EA":"#141312";
 const brass="#C6A161";
 return <svg viewBox="0 0 76 76" className="brand-monogram" role="img" aria-label="MI architectural monogram" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 64V12H22L38 35L54 12H64V64" stroke={color} strokeWidth="1.15" strokeLinecap="square" strokeLinejoin="miter"/>
  <path d="M22 64V34L38 55L54 34V64" stroke={color} strokeWidth="1.15" strokeLinecap="square" strokeLinejoin="miter"/>
  <path d="M38 8V68" stroke={brass} strokeWidth=".85"/>
 </svg>
}
export function BrandLogo({light=false,className=""}:LogoProps){
 return <Link href="/" className={`brand-logo ${light?"brand-logo-light":""} ${className}`} aria-label="Mike Interiors home">
  <Monogram light={light}/>
  <span className="brand-lockup"><span className="brand-name">MIKE INTERIORS</span><span className="brand-tagline">INTERIOR ARCHITECTURE &amp; DESIGN</span></span>
 </Link>
}
export function StackedBrandLogo({light=false}:LogoProps){
 return <div className={`brand-stacked ${light?"brand-stacked-light":""}`} aria-label="Mike Interiors, Interior Architecture and Design">
  <Monogram light={light}/><span className="brand-stacked-name">MIKE INTERIORS</span><span className="brand-stacked-tagline">INTERIOR ARCHITECTURE &amp; DESIGN</span>
 </div>
}
export function MonogramLogo({light=false}:LogoProps){return <span className={`brand-monogram-only ${light?"brand-monogram-only-light":""}`}><Monogram light={light}/></span>}
