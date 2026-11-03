import Image from "next/image";
import Link from "next/link";
import {ArrowUpRight,ArrowRight} from "lucide-react";
import {Reveal} from "@/components/reveal";
import {ThreeDProjectCarousel} from "@/components/three-d-project-carousel";
import {HomeGallery} from "@/components/home-gallery";
import {services} from "@/lib/services";
export default function Home(){return <>
 <ThreeDProjectCarousel />
 <HomeGallery />
 <section className="intro-band"><div className="container intro-band-inner"><span className="eyebrow">The art of considered living</span><p className="serif">Spaces that feel personal.<br/>Details that stay with you.</p><Link className="btn-line" href="/about">Discover Mike Interiors <ArrowRight size={15}/></Link></div></section>
 <section className="section-pad" id="approach"><div className="container split"><Reveal><div className="eyebrow">The Mike Interiors approach</div><div className="split-copy"><h2 className="serif">A beautiful space should feel as good as it looks.</h2><p className="body-copy">Good interiors are more than decoration. They bring together comfort, function, texture and personality. We help you make thoughtful choices, from the first wall finish to the final detail.</p><Link href="/about" className="btn-line" style={{marginTop:26}}>How we work <ArrowUpRight size={15}/></Link></div></Reveal><Reveal delay={.12}><div className="split-image"><Image src="/images/projects/thumb/living-ring-chandelier.webp" alt="Mike Interiors living room with ring chandelier, POP ceiling and marble-look TV wall" fill sizes="(max-width:800px) 100vw, 50vw" className="image-cover" loading="lazy" /></div></Reveal></div></section>
 <section className="section-pad services-section"><div className="container"><Reveal><div className="eyebrow">Our expertise</div><h2 className="section-heading serif" style={{maxWidth:720}}>The details that bring a room together.</h2></Reveal><div className="service-grid">{services.map((service,i)=><Reveal key={service.number} delay={i*.04}><Link href={`/services/${service.slug}`} className="service service-home-link"><span className="service-no">{service.number}</span><h3>{service.title}</h3><p>{service.summary}</p><span className="service-home-explore">EXPLORE SERVICE <ArrowUpRight size={13}/></span></Link></Reveal>)}</div></div></section>
 <section className="closing-cta"><div className="container closing-cta-inner"><div><span className="eyebrow">Your next chapter starts here</span><h2 className="serif">Let's make space<br/>for something beautiful.</h2></div><Link href="/contact" className="btn-light">Enquire about a project <ArrowUpRight size={15}/></Link></div></section>
 </>}
