import Image from "next/image";
import Link from "next/link";
import {ArrowUpRight,Play} from "lucide-react";
import {imageSrc, type InteriorProject} from "@/lib/projects";
import {Reveal} from "@/components/reveal";

export function HomeGallery({projects}:{projects:InteriorProject[]}){
 const galleryProjects=projects.filter(project=>project.status==="completed").slice(0,8);
 return <section className="home-gallery section-pad" id="gallery">
  <div className="container">
   <Reveal><div className="home-gallery-heading"><div><span className="eyebrow">The Mike Interiors gallery</span><h2 className="serif">Spaces, finishes<br/>and moments.</h2></div><p className="body-copy">Explore our interior designs and project walkthroughs — from considered feature walls to the details that make a space feel complete.</p></div></Reveal>
   <div className="home-gallery-grid">
    {galleryProjects.map((project,index)=>{const n=index+1;const wide=n===2||n===3||n===6||n===7;const lifted=n===2||n===6;return <Reveal key={project.id} delay={(index%4)*.035} className={`${wide?"is-wide":""} ${lifted?"is-lifted":""}`}><Link href={`/work/${project.slug}`} className={`home-gallery-card home-gallery-card-${n}`}><div className="home-gallery-image"><Image src={imageSrc(project.image,"")} alt={project.alt} fill sizes="(max-width:700px) 50vw, (max-width:1050px) 50vw, 33vw" quality={82} loading="lazy"/></div><div className="home-gallery-meta"><span>{project.category}</span><h3>{project.title}</h3><ArrowUpRight size={16}/></div></Link></Reveal>})}
    <Reveal className="is-film"><article className="home-gallery-video home-gallery-video-short"><div className="home-gallery-video-frame"><video controls playsInline preload="none" poster="/videos/walkthrough-short.webp"><source src="/videos/walkthrough-short.mp4" type="video/mp4"/>Your browser does not support video playback.</video><span className="home-gallery-video-label"><Play size={14}/> PROJECT WALKTHROUGH</span></div><div className="home-gallery-meta"><span>PROJECT FILM · 00:22</span><h3>A room, brought together.</h3><Link href="/videos" aria-label="View all project videos"><ArrowUpRight size={16}/></Link></div></article></Reveal>
    <Reveal className="is-film"><article className="home-gallery-video home-gallery-video-full"><div className="home-gallery-video-frame"><video controls playsInline preload="none" poster="/videos/walkthrough-full.webp"><source src="/videos/walkthrough-full.mp4" type="video/mp4"/>Your browser does not support video playback.</video><span className="home-gallery-video-label"><Play size={14}/> FULL PROJECT FILM</span></div><div className="home-gallery-meta"><span>PROJECT FILM · 01:07</span><h3>See the details up close.</h3><Link href="/videos" aria-label="View all project videos"><ArrowUpRight size={16}/></Link></div></article></Reveal>
   </div>
   <div className="home-gallery-footer"><span className="eyebrow">A growing collection of our work</span><Link href="/work" className="btn-line">Explore the full portfolio <ArrowUpRight size={15}/></Link><Link href="/videos" className="btn-line">More project videos <ArrowUpRight size={15}/></Link></div>
  </div>
 </section>
}
