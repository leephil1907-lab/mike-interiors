import Image from "next/image";
import Link from "next/link";
import {ArrowUpRight,Play} from "lucide-react";
import {projects} from "@/lib/projects";
import {Reveal} from "@/components/reveal";

const galleryProjects=projects.filter(project=>project.status==="completed").slice(0,8);
export function HomeGallery(){
 return <section className="home-gallery section-pad" id="gallery">
  <div className="container">
   <Reveal><div className="home-gallery-heading"><div><span className="eyebrow">The Mike Interiors gallery</span><h2 className="serif">Spaces, finishes<br/>and moments.</h2></div><p className="body-copy">Explore our interior designs and project walkthroughs — from considered feature walls to the details that make a space feel complete.</p></div></Reveal>
   <div className="home-gallery-grid">
    {galleryProjects.map((project,index)=><Reveal key={project.id} delay={(index%4)*.035}><Link href={`/work/${project.slug}`} className={`home-gallery-card home-gallery-card-${index+1}`}><div className="home-gallery-image"><Image src={`/images/projects/thumb/${project.image}`} alt={project.alt} fill sizes="(max-width:700px) 100vw, (max-width:1050px) 50vw, 33vw" loading="lazy"/></div><div className="home-gallery-meta"><span>{project.category}</span><h3>{project.title}</h3><ArrowUpRight size={16}/></div></Link></Reveal>)}
    <Reveal><a href="/videos" className="home-gallery-video home-gallery-video-short"><div className="home-gallery-video-frame"><video controls playsInline preload="none" poster="/videos/walkthrough-short.webp"><source src="/videos/walkthrough-short.mp4" type="video/mp4"/>Your browser does not support video playback.</video><span className="home-gallery-video-label"><Play size={14}/> WATCH WALKTHROUGH</span></div><div className="home-gallery-meta"><span>PROJECT FILM · 00:22</span><h3>A room, brought together.</h3><ArrowUpRight size={16}/></div></a></Reveal>
    <Reveal><a href="/videos" className="home-gallery-video home-gallery-video-full"><div className="home-gallery-video-frame"><video controls playsInline preload="none" poster="/videos/walkthrough-full.webp"><source src="/videos/walkthrough-full.mp4" type="video/mp4"/>Your browser does not support video playback.</video><span className="home-gallery-video-label"><Play size={14}/> WATCH FULL FILM</span></div><div className="home-gallery-meta"><span>PROJECT FILM · 01:07</span><h3>See the details up close.</h3><ArrowUpRight size={16}/></div></a></Reveal>
   </div>
   <div className="home-gallery-footer"><span className="eyebrow">A growing collection of our work</span><Link href="/work" className="btn-line">Explore the full portfolio <ArrowUpRight size={15}/></Link></div>
  </div>
 </section>
}
