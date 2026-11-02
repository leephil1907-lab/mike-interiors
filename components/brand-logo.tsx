import Link from "next/link";
export function BrandLogo({light=false}:{light?:boolean}){
 return <Link href="/" className={`brand-logo ${light?"brand-logo-light":""}`} aria-label="Mike Interiors home">
  <svg className="brand-symbol" viewBox="0 0 54 54" role="img" aria-label="MI monogram" fill="none" xmlns="http://www.w3.org/2000/svg">
   <path d="M5 49V5H17L27 22L37 5H49V49H37V25L27 42L17 25V49H5Z" stroke="currentColor" strokeWidth="1.25"/>
   <path d="M27 5V42" stroke="currentColor" strokeWidth=".7" opacity=".55"/>
  </svg>
  <span className="brand-wordmark"><span>MIKE</span><small>INTERIORS</small></span>
 </Link>
}
