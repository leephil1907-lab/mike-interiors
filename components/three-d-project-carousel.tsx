"use client";
import Image from "next/image";
import Link from "next/link";
import {useCallback,useEffect,useRef,useState} from "react";
import {motion,useReducedMotion} from "framer-motion";
import {ArrowLeft,ArrowRight,ArrowUpRight,Pause,Play} from "lucide-react";
import {imageSrc,type InteriorProject} from "@/lib/projects";
type Slide={title:string;category:string;image:string;alt:string;note:string};

/**
 * Built from the projects marked "Feature on the homepage" in the admin studio,
 * with the static set below as a fallback.
 */
function buildSlides(projects?:InteriorProject[]):Slide[]{
 const featured=(projects??[]).filter(p=>p.featured);
 if(!featured.length)return fallbackSlides;
 return featured.slice(0,7).map(p=>({
  title:p.title,
  category:p.category.toUpperCase(),
  image:imageSrc(p.image,""),
  alt:p.alt,
  note:p.description
 }));
}

const fallbackSlides:Slide[]=[
{title:"A living room, reimagined",category:"LIVING SPACES",image:"living-ring-chandelier.webp",alt:"Living room with ring chandelier, POP ceiling and marble-look television feature wall",note:"Layered light. Calm, considered finishes."},
{title:"Warmth in every detail",category:"FEATURE WALLS",image:"tv-wall-tan-gloss.webp",alt:"Tan gloss television feature wall with floating console and illuminated display niche",note:"A focal point designed around everyday living."},
{title:"Storage with a softer edge",category:"WARDROBES",image:"wardrobe-glass-centre.webp",alt:"Cream wardrobe with a softly illuminated glass display centre",note:"Quietly refined storage and display."},
{title:"A bedroom made to unwind",category:"BEDROOMS",image:"bed-green-boucle.webp",alt:"Sage green upholstered bed with moulded wall panels",note:"Texture, tone and a sense of ease."},
{title:"Details that catch the light",category:"FINISHES & DETAILS",image:"glass-cabinet-amber.webp",alt:"Glass-front display cabinet with warm amber lighting",note:"The finishing touches make the room."},
{title:"A statement in texture",category:"FEATURE WALLS",image:"living-slat-wall.webp",alt:"Dark slatted feature wall with wood finish TV panel",note:"Natural texture and clean architectural lines."},
{title:"A softer kind of luxury",category:"WINDOW STYLING",image:"curtains-grey-sheer.webp",alt:"Grey curtains layered over cream sheer window dressing",note:"Tailored layers that complete the room."}
];
export function ThreeDProjectCarousel({projects}:{projects?:InteriorProject[]}){
 const slides=buildSlides(projects);
 const [active,setActive]=useState(0),[manualPaused,setManualPaused]=useState(false);
 const pointerStart=useRef<number|null>(null),reduceMotion=useReducedMotion();
 const move=useCallback((direction:number)=>setActive(current=>(current+direction+slides.length)%slides.length),[]);
 useEffect(()=>{if(manualPaused||reduceMotion)return;const timer=window.setInterval(()=>move(1),4800);return()=>window.clearInterval(timer)},[manualPaused,reduceMotion,move]);
 const offsetFor=(index:number)=>{let offset=index-active;if(offset>slides.length/2)offset-=slides.length;if(offset< -slides.length/2)offset+=slides.length;return offset};
 const handleKeyDown=(event:React.KeyboardEvent<HTMLDivElement>)=>{if(event.key==="ArrowLeft"){event.preventDefault();move(-1)}if(event.key==="ArrowRight"){event.preventDefault();move(1)}};
 const handlePointerUp=(event:React.PointerEvent<HTMLDivElement>)=>{if(pointerStart.current===null)return;const delta=event.clientX-pointerStart.current;pointerStart.current=null;if(Math.abs(delta)>48)move(delta<0?1:-1)};
 return <section className="three-d-showcase three-d-hero" aria-label="Mike Interiors featured design slideshow">
 <div className="three-d-stage" role="region" aria-roledescription="carousel" aria-label="Automatically rotating interior designs" tabIndex={0} onKeyDown={handleKeyDown} onPointerDown={event=>{pointerStart.current=event.clientX}} onPointerUp={handlePointerUp} onPointerCancel={()=>{pointerStart.current=null}}>
 <div className="three-d-orbit" aria-hidden="true"/>
 {slides.map((slide,index)=>{const offset=offsetFor(index),visible=Math.abs(offset)<=2;return <motion.article key={slide.image} className={`three-d-card ${offset===0?"is-active":""}`} initial={false} animate={{x:`${offset*69}%`,scale:offset===0?1:Math.abs(offset)===1?.79:.62,rotateY:offset*-24,opacity:visible?(offset===0?1:.48):0,zIndex:10-Math.abs(offset),filter:offset===0?"blur(0px)":"blur(1.2px)"}} transition={{duration:reduceMotion?0:.85,ease:[.16,1,.3,1]}} style={{pointerEvents:offset===0?"auto":"none"}} aria-hidden={offset!==0}>
 <div className="three-d-image"><Image src={slide.image} alt={slide.alt} fill sizes="(max-width:700px) 82vw, 66vw" priority={index===0} loading={index===0?"eager":"lazy"} className="three-d-photo"/></div><div className="three-d-card-shade"/><div className="three-d-card-label"><span>{slide.category}</span>{offset===0?<h1 className="serif">{slide.title}</h1>:<div className="serif three-d-card-title" aria-hidden="true">{slide.title}</div>}<p>{slide.note}</p><div className="three-d-card-actions"><Link href="/contact" className="three-d-primary-cta" tabIndex={offset===0?0:-1}>Discuss your project <ArrowUpRight size={14}/></Link><Link href="/work" className="three-d-secondary-cta" tabIndex={offset===0?0:-1}>Explore our work</Link></div></div><span className="three-d-card-number">{String(index+1).padStart(2,"0")} <i/> {String(slides.length).padStart(2,"0")}</span></motion.article>})}
 <button className="three-d-arrow three-d-prev" type="button" onClick={()=>move(-1)} aria-label="Previous design"><ArrowLeft size={19}/></button><button className="three-d-arrow three-d-next" type="button" onClick={()=>move(1)} aria-label="Next design"><ArrowRight size={19}/></button>
 <div className="three-d-hero-brand"><span>MIKE INTERIORS · ABRAKA, NIGERIA</span><strong className="serif">Good design for good moments.</strong><Link href="/work">EXPLORE OUR WORK <ArrowUpRight size={14}/></Link></div>
 </div><div className="three-d-controls"><div className="three-d-dots" role="group" aria-label="Choose featured design">{slides.map((slide,index)=><button key={slide.image} type="button" className={index===active?"active":""} onClick={()=>setActive(index)} aria-label={`Show ${slide.title}`} aria-pressed={index===active}/>)}</div><div className="three-d-counter" aria-live="polite"><span>{String(active+1).padStart(2,"0")}</span> / {String(slides.length).padStart(2,"0")}</div><button type="button" className="three-d-play" onClick={()=>setManualPaused(value=>!value)} aria-label={manualPaused?"Resume automatic slideshow":"Pause automatic slideshow"}>{manualPaused?<Play size={14}/>:<Pause size={14}/>}<span>{manualPaused?"PLAY":"PAUSE"}</span></button></div></section>
}
