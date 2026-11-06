import Image from "next/image";
import Link from "next/link";
import {ArrowUpRight} from "lucide-react";
import {PageIntro} from "@/components/page-intro";
import {Reveal} from "@/components/reveal";
import {getServices} from "@/lib/services";

export const revalidate = 300;
export const metadata={title:"Services",description:"Interior finishing, wall panels, POP ceilings, TV feature walls, window styling and interior styling by Mike Interiors in Abraka, Delta State.",alternates:{canonical:"/services"}};
export default async function ServicesPage(){
 const services = await getServices();return <><PageIntro eyebrow="What we do" title={<>The details that<br/>make a space.</>} intro="Thoughtful interior finishing and styling, shaped around your space, your priorities and the way you want to live."/><section className="section-pad services-directory"><div className="container"><div className="services-directory-grid">{services.map((service,index)=><Reveal key={service.slug} delay={index*.04}><Link href={`/services/${service.slug}`} className="service-directory-card"><div className="service-directory-image"><Image src={service.image} alt={service.alt} fill sizes="(max-width:760px) 100vw, 50vw" className="image-cover"/></div><div className="service-directory-copy"><span className="eyebrow">{service.number} / MIKE INTERIORS</span><h2 className="serif">{service.title}</h2><p className="body-copy">{service.summary}</p><span className="service-directory-link">EXPLORE SERVICE <ArrowUpRight size={15}/></span></div></Link></Reveal>)}</div></div></section><section className="closing-cta"><div className="container closing-cta-inner"><div><span className="eyebrow">Have a project in mind?</span><h2 className="serif">Let's shape it<br/>together.</h2></div><Link href="/contact" className="btn-light">Start an enquiry <ArrowUpRight size={15}/></Link></div></section></>}
