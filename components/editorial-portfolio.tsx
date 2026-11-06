"use client";
import Image from "next/image";
import Link from "next/link";
import {useRef,useState} from "react";
import {AnimatePresence,motion,useMotionValue,useScroll,useSpring,useTransform} from "framer-motion";
import {ArrowUpRight,MoveUpRight} from "lucide-react";
const EASE=[0.16,1,0.3,1] as const;
import {imageSrc,type InteriorProject} from "@/lib/projects";
const filters=["All","Living & TV walls","Wardrobes & storage","Bedrooms","Finishes & details"] as const;
export function EditorialPortfolio({projects}:{projects:InteriorProject[]}){
 const sectionRef=useRef<HTMLElement>(null);const [filter,setFilter]=useState<(typeof filters)[number]>("All");
 const [hovered,setHovered]=useState<string|null>(null);const [pointerInside,setPointerInside]=useState(false);
 const mouseX=useMotionValue(0),mouseY=useMotionValue(0);const cursorX=useSpring(mouseX,{stiffness:130,damping:22,mass:.45});const cursorY=useSpring(mouseY,{stiffness:130,damping:22,mass:.45});
 const {scrollYProgress}=useScroll({target:sectionRef,offset:["start end","end start"]});
 const ambientY=useTransform(scrollYProgress,[0,1],["-7%","8%"]);const headingY=useTransform(scrollYProgress,[0,1],["34px","-28px"]);
 const visible=filter==="All"?projects:projects.filter(p=>p.category===filter);
 return <section ref={sectionRef} className="editorial-portfolio" onMouseMove={e=>{const b=e.currentTarget.getBoundingClientRect();mouseX.set(e.clientX-b.left);mouseY.set(e.clientY-b.top);}} onMouseEnter={()=>setPointerInside(true)} onMouseLeave={()=>{setPointerInside(false);setHovered(null);}}>
 <motion.div aria-hidden="true" className="portfolio-ambient" style={{y:ambientY}}><span className="ambient-orb ambient-orb-one"/><span className="ambient-orb ambient-orb-two"/></motion.div>
 <div className="portfolio-inner">
 <motion.header className="portfolio-heading" style={{y:headingY}}>
 <motion.p className="portfolio-eyebrow" initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.7,ease:EASE}}>THE MIKE INTERIORS PORTFOLIO</motion.p>
 <motion.h2 className="portfolio-title serif" initial={{opacity:0,y:42}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.9,ease:EASE,delay:.08}}>Spaces with a sense<br/><em>of belonging.</em></motion.h2>
 <motion.p className="portfolio-intro" initial={{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.8,ease:EASE,delay:.16}}>Real projects from Mike Interiors: wall finishes, wardrobes, bedrooms and the details that bring a room together.</motion.p>
 </motion.header>
 <div className="portfolio-controls"><span className="portfolio-count">SELECTED WORK <b>— {String(visible.length).padStart(2,"0")}</b></span><div className="portfolio-filters" role="group" aria-label="Filter portfolio projects">{filters.map(f=><button key={f} type="button" onClick={()=>setFilter(f)} className={filter===f?"active":""}>{filter===f&&<motion.span layoutId="portfolio-active-filter" className="filter-active-bg" transition={{type:"spring",stiffness:360,damping:32}}/>}<span>{f}</span></button>)}</div></div>
 <motion.div layout className="portfolio-grid">
 <AnimatePresence mode="popLayout">{visible.map((project,index)=><motion.article key={project.id} layout className={`portfolio-project portfolio-project-${index%5}`} initial={{opacity:0,y:65,filter:"blur(8px)"}} whileInView={{opacity:1,y:0,filter:"blur(0px)"}} viewport={{once:true,margin:"-80px"}} exit={{opacity:0,y:-24,filter:"blur(6px)"}} transition={{duration:.8,ease:EASE,layout:{duration:.5,ease:EASE}}} onMouseEnter={()=>setHovered(project.id)} onMouseLeave={()=>setHovered(null)}>
 <div className="portfolio-image-wrap"><motion.div className="portfolio-image-parallax" initial={{scale:1.08}} whileInView={{scale:1}} viewport={{once:true}} transition={{duration:1.3,ease:EASE}}><Image src={imageSrc(project.image,"")} alt={project.alt} fill sizes="(max-width: 760px) 100vw, 50vw" quality={82} className="portfolio-image"/></motion.div><div className="portfolio-image-shade"/><div className="portfolio-image-meta"><span>{project.id} <i/> {project.category}</span><span>{project.status==="progress"?"INSTALLATION IN PROGRESS":"MIKE INTERIORS"}</span></div><div className="portfolio-project-caption"><p>{project.status==="progress"?"ON-SITE DETAIL":"SELECTED PROJECT"}</p><h3 className="serif">{project.title}</h3><p className="portfolio-project-description">{project.description}</p></div><Link href={`/work/${project.slug}`} className="portfolio-project-link" aria-label={`View ${project.title} project details`}><MoveUpRight size={20}/></Link></div>
 </motion.article>)}</AnimatePresence>
 </motion.div>
 <div className="portfolio-footnote"><span>ABRAKA, DELTA STATE · NIGERIA</span><span>GOOD DESIGN FOR GOOD MOMENTS.</span></div>
 </div>
 <AnimatePresence>{pointerInside&&hovered&&<motion.div className="portfolio-cursor" style={{x:cursorX,y:cursorY}} initial={{opacity:0,scale:.75}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.75}} transition={{duration:.22,ease:EASE}}><span>EXPLORE</span><ArrowUpRight size={15}/></motion.div>}</AnimatePresence>
 </section>;
}