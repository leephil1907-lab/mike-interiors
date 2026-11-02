"use client";
import Image from "next/image";
import Link from "next/link";
import {useRef,useState} from "react";
import {AnimatePresence,motion,useMotionValue,useScroll,useSpring,useTransform} from "framer-motion";
import {ArrowUpRight,MoveUpRight} from "lucide-react";
const EASE=[0.16,1,0.3,1] as const;
const base="/images/projects/thumb/";
const projects=[
  {
    "id": "01",
    "title": "Tan gloss TV feature wall",
    "category": "Living & TV walls",
    "image": "tv-wall-tan-gloss.webp",
    "alt": "Tan high-gloss TV wall with black framing lines, a floating grey console and an amber-lit display column",
    "description": "A warm, high-gloss focal wall with a floating console and illuminated display niche.",
    "status": "completed"
  },
  {
    "id": "02",
    "title": "Living room with ring chandelier",
    "category": "Living & TV walls",
    "image": "living-ring-chandelier.webp",
    "alt": "Living room with a multi-ring LED chandelier in a POP ceiling, a marble-look TV panel with backlight and tan eyelet curtains",
    "description": "A layered living space bringing ceiling detail, feature wall and window dressing together.",
    "status": "completed"
  },
  {
    "id": "03",
    "title": "Cream wardrobe with glass centre",
    "category": "Wardrobes & storage",
    "image": "wardrobe-glass-centre.webp",
    "alt": "Cream matt wardrobe with long black handles and a pair of glass doors in the centre showing a lit interior",
    "description": "A clean wardrobe composition with a softly illuminated glass display centre.",
    "status": "completed"
  },
  {
    "id": "04",
    "title": "White gloss TV wall",
    "category": "Living & TV walls",
    "image": "tv-wall-white-gloss.webp",
    "alt": "White high-gloss panelled wall with a recessed TV frame lit by a yellow LED halo above a long black floating console",
    "description": "A crisp white feature wall balanced by a long dark floating console.",
    "status": "completed"
  },
  {
    "id": "05",
    "title": "Slatted feature wall",
    "category": "Living & TV walls",
    "image": "living-slat-wall.webp",
    "alt": "Dark slatted wall with a wood-finish TV panel and a long floating wood console",
    "description": "A mix of slatted texture and warm wood tones around the entertainment wall.",
    "status": "completed"
  },
  {
    "id": "06",
    "title": "Wardrobe with open shelving",
    "category": "Wardrobes & storage",
    "image": "wardrobe-open-shelves.webp",
    "alt": "White gloss wardrobe doors with long black handles, a column of open wood shelves and two drawers",
    "description": "Storage that combines concealed wardrobe space with accessible display shelving.",
    "status": "completed"
  },
  {
    "id": "07",
    "title": "Glass-front LED wardrobe",
    "category": "Wardrobes & storage",
    "image": "wardrobe-glass-led.webp",
    "alt": "Black-framed glass wardrobe doors with warm LED strips inside and a shoe-shelf column on the left",
    "description": "Dark-framed glass and warm interior lighting bring a boutique feel to storage.",
    "status": "completed"
  },
  {
    "id": "08",
    "title": "Sage upholstered bedroom",
    "category": "Bedrooms",
    "image": "bed-green-boucle.webp",
    "alt": "Sage-green bouclé bed with a two-part headboard in front of white moulded wall panels",
    "description": "A soft green bed set against crisp moulded wall detailing.",
    "status": "completed"
  },
  {
    "id": "09",
    "title": "Amber-lit display cabinet",
    "category": "Finishes & details",
    "image": "glass-cabinet-amber.webp",
    "alt": "Tall glass-door cabinet with amber lighting beside a fluted wall panel",
    "description": "A tall display cabinet with warm internal lighting and a textured backdrop.",
    "status": "completed"
  },
  {
    "id": "10",
    "title": "Marble-look TV panel",
    "category": "Living & TV walls",
    "image": "tv-wall-marble-led.webp",
    "alt": "Marble-look TV panel with warm LED backlight above a black floating console",
    "description": "Marble-look surfaces and concealed light create a composed entertainment wall.",
    "status": "completed"
  },
  {
    "id": "11",
    "title": "Bedroom with slatted detail",
    "category": "Bedrooms",
    "image": "bedroom-led-slat.webp",
    "alt": "Bedroom with a blue LED cove, an upholstered bed and a gold-edged slatted wall panel",
    "description": "A bedroom feature wall with layered materials and accent lighting.",
    "status": "completed"
  },
  {
    "id": "12",
    "title": "Grey curtains and sheers",
    "category": "Finishes & details",
    "image": "curtains-grey-sheer.webp",
    "alt": "Floor-length grey pinch-pleat curtains over cream sheers with crystal tie-backs under a coloured LED ceiling",
    "description": "Soft window layers with tailored pleats and decorative tie-backs.",
    "status": "completed"
  },
  {
    "id": "13",
    "title": "Framed mirror grid",
    "category": "Finishes & details",
    "image": "mirror-grid.webp",
    "alt": "Nine square black-framed mirrors fixed in a grid on a white wall",
    "description": "A geometric mirror installation that adds rhythm and reflected light.",
    "status": "completed"
  },
  {
    "id": "14",
    "title": "Diamond mirror wall",
    "category": "Finishes & details",
    "image": "mirror-diamond.webp",
    "alt": "Wall of bevelled diamond-pattern mirror panels reflecting a living room with a slatted TV wall",
    "description": "Bevelled mirror panels create a reflective feature with a sense of depth.",
    "status": "completed"
  },
  {
    "id": "15",
    "title": "POP ceiling installation",
    "category": "Finishes & details",
    "image": "pop-ceiling-in-progress.webp",
    "alt": "Plastered POP ceiling steps and a timber frame ready for panelling, with a ladder in the room",
    "description": "An installation-stage view showing the ceiling work in progress.",
    "status": "progress"
  },
  {
    "id": "16",
    "title": "Tan gloss panel grid",
    "category": "Living & TV walls",
    "image": "tv-wall-tan-grid.webp",
    "alt": "Wide tan high-gloss panel wall in a grid with black shelving on the left and a long black plinth, in a living room with a grey sofa",
    "description": "A wide grid of tan panels paired with dark shelving and a grounded plinth.",
    "status": "completed"
  },
  {
    "id": "17",
    "title": "Tan gloss wall detail",
    "category": "Living & TV walls",
    "image": "tv-wall-tan-grid-close.webp",
    "alt": "Close view of the tan high-gloss panel grid wall with a five-shelf black unit and a black plinth on a marble-look floor",
    "description": "A closer look at the reflective finish and contrasting shelving.",
    "status": "completed"
  }
];
const filters=["All","Living & TV walls","Wardrobes & storage","Bedrooms","Finishes & details"] as const;
export function EditorialPortfolio(){
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
 <div className="portfolio-image-wrap"><motion.div className="portfolio-image-parallax" initial={{scale:1.08}} whileInView={{scale:1}} viewport={{once:true}} transition={{duration:1.3,ease:EASE}}><Image src={base+project.image} alt={project.alt} fill sizes="(max-width: 760px) 100vw, 50vw" className="portfolio-image"/></motion.div><div className="portfolio-image-shade"/><div className="portfolio-image-meta"><span>{project.id} <i/> {project.category}</span><span>{project.status==="progress"?"INSTALLATION IN PROGRESS":"MIKE INTERIORS"}</span></div><div className="portfolio-project-caption"><p>{project.status==="progress"?"ON-SITE DETAIL":"SELECTED PROJECT"}</p><h3 className="serif">{project.title}</h3><p className="portfolio-project-description">{project.description}</p></div><Link href="/contact" className="portfolio-project-link" aria-label={`Enquire about ${project.title}`}><MoveUpRight size={20}/></Link></div>
 </motion.article>)}</AnimatePresence>
 </motion.div>
 <div className="portfolio-footnote"><span>ABRAKA, DELTA STATE · NIGERIA</span><span>GOOD DESIGN FOR GOOD MOMENTS.</span></div>
 </div>
 <AnimatePresence>{pointerInside&&hovered&&<motion.div className="portfolio-cursor" style={{x:cursorX,y:cursorY}} initial={{opacity:0,scale:.75}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.75}} transition={{duration:.22,ease:EASE}}><span>EXPLORE</span><ArrowUpRight size={15}/></motion.div>}</AnimatePresence>
 </section>;
}