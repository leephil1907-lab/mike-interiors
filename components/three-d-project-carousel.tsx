"use client";
import Image from "next/image";
import Link from "next/link";
import {useCallback,useEffect,useRef,useState} from "react";
import {motion,useReducedMotion} from "framer-motion";
import {ArrowLeft,ArrowRight,ArrowUpRight,Pause,Play} from "lucide-react";
const slides=[
{title:"A living room, reimagined",category:"LIVING SPACES",image:"living-ring-chandelier.webp",alt:"Living room with ring chandelier, POP ceiling and marble-look television feature wall",note:"Layered light. Calm, considered finishes."},
{title:"Warmth in every detail",category:"FEATURE WALLS",image:"tv-wall-tan-gloss.webp",alt:"Tan gloss television feature wall with floating console and illuminated display niche",note:"A focal point designed around everyday living."},
{title:"Storage with a softer edge",category:"WARDROBES",image:"wardrobe-glass-centre.webp",alt:"Cream wardrobe with a softly illuminated glass display centre",note:"Quietly refined storage and display."},
{title:"A bedroom made to unwind",category:"BEDROOMS",image:"bed-green-boucle.webp",alt:"Sage green upholstered bed with moulded wall panels",note:"Texture, tone and a sense of ease."},
{title:"Details that catch the light",category:"FINISHES & DETAILS",image:"glass-cabinet-amber.webp",alt:"Glass-front display cabinet with warm amber lighting",note:"The finishing touches make the room."}
];
export function ThreeDProjectCarousel(){
 const [active,setActive]=useState(0),[manualPaused,setManualPaused]=useState(false),[hovered,setHovered]=useState(false),[focused,setFocused]=useState(false);
 const pointerStart=useRef<number|null>(null),reduceMotion=useReducedMotion();
 const move=useCallback((direction:number)=>setActive(current=>(current+direction+slides.length)%slides.length),[]);
 const paused=manualPaused||hovered||focused||Boolean(reduceMotion);
 useEffect(()=>{if(paused)return;const timer=window.setInterval(()=>move(1),5600);return()=>window.clearInterval(timer)},[paused,move]);
 const offsetFor=(index:number)=>{let offset=index-active;if(offset>slides.length/2)offset-=slides.length;if(offset< -slides.length/2)offset+=slides.length;return offset};
 const handleKeyDown=(event:React.KeyboardEvent<HTMLDivElement>)=>{if(event.key==="ArrowLeft"){event.preventDefault();move(-1)}if(event.key==="ArrowRight"){event.preventDefault();move(1)}};
 const handlePointerUp=(event:React.PointerEvent<HTMLDivElement>)=>{if(pointerStart.current===null)return;const delta=event.clientX-pointerStart.current;pointerStart.current=null;if(Math.abs(delta)>48)move(delta<0?1:-1)};
 return <section className="three-d-showcase" aria-label="Featured Mike Interiors projects" onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} onFocusCapture={()=>setFocused(true)} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node|null))setFocused(false)}}>
 <div className="three-d-showcase-inner"><div className="three-d-heading"><div><span className="eyebrow">A closer look</span><h2 className="serif">Designed to be <em>experienced.</em></h2></div><p>Move through a selection of real Mike Interiors spaces, finishes and details.</p></div>
 <div className="three-d-stage" role="region" aria-roledescription="carousel" aria-label="Selected interior projects" tabIndex={0} onKeyDown={handleKeyDown} onPointerDown={event=>{pointerStart.current=event.clientX}} onPointerUp={handlePointerUp} onPointerCancel={()=>{pointerStart.current=null}}>
 <div className="three-d-orbit" aria-hidden="true"/>
 {slides.map((slide,index)=>{const offset=offsetFor(index),visible=Math.abs(offset)<=2;return <motion.article key={slide.image} className={`three-d-card ${offset===0?"is-active":""}`} initial={false} animate={{x:`${offset*69}%`,scale:offset===0?1:Math.abs(offset)===1?.79:.62,rotateY:offset*-24,opacity:visible?(offset===0?1:.48):0,zIndex:10-Math.abs(offset),filter:offset===0?"blur(0px)":"blur(1.2px)"}} transition={{duration:reduceMotion?0:.85,ease:[.16,1,.3,1]}} style={{pointerEvents:offset===0?"auto":"none"}} aria-hidden={offset!==0}>
 <div className="three-d-image"><Image src={`/images/projects/thumb/${slide.image}`} alt={slide.alt} fill sizes="(max-width:700px) 82vw, 58vw" priority={index===0} className="three-d-photo"/></div><div className="three-d-card-shade"/><div className="three-d-card-label"><span>{slide.category}</span><h3 className="serif">{slide.title}</h3><p>{slide.note}</p><Link href="/work" tabIndex={offset===0?0:-1}>EXPLORE PROJECTS <ArrowUpRight size={14}/></Link></div><span className="three-d-card-number">{String(index+1).padStart(2,"0")} <i/> 0{slides.length}</span></motion.article>})}
 <button className="three-d-arrow three-d-prev" type="button" onClick={()=>move(-1)} aria-label="Previous project"><ArrowLeft size={19}/></button><button className="three-d-arrow three-d-next" type="button" onClick={()=>move(1)} aria-label="Next project"><ArrowRight size={19}/></button>
 </div><div className="three-d-controls"><div className="three-d-dots" role="group" aria-label="Choose featured project">{slides.map((slide,index)=><button key={slide.image} type="button" className={index===active?"active":""} onClick={()=>setActive(index)} aria-label={`Show ${slide.title}`} aria-pressed={index===active}/>)}</div><div className="three-d-counter" aria-live="polite"><span>{String(active+1).padStart(2,"0")}</span> / 0{slides.length}</div><button type="button" className="three-d-play" onClick={()=>setManualPaused(value=>!value)} aria-label={manualPaused?"Resume carousel":"Pause carousel"}>{manualPaused?<Play size={14}/>:<Pause size={14}/>}<span>{manualPaused?"PLAY":"PAUSE"}</span></button></div></div></section>
}
