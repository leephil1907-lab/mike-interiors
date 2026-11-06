import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import {ArrowLeft,ArrowUpRight} from "lucide-react";
import {PageIntro} from "@/components/page-intro";
import {getServices,getService} from "@/lib/services";
import {imageSrc} from "@/lib/projects";

export const revalidate = 300;
type Props={params:Promise<{slug:string}>};
export async function generateStaticParams(){
 const services = await getServices();
 return services.map(service=>({slug:service.slug}));
}
export async function generateMetadata({params}:Props){
 const {slug}=await params;
 const service=await getService(slug);
 if(!service)return {title:"Service not found"};
 return {
  title: service.title,
  description: service.summary,
  alternates: { canonical: `/services/${service.slug}` },
  openGraph: {
   title: `${service.title} | Mike Interiors`,
   description: service.summary,
   images: service.image ? [{ url: service.image, alt: service.alt }] : undefined
  }
 };
}
export default async function ServiceDetail({params}:Props){
 const {slug}=await params;
 const services = await getServices();
 const index=services.findIndex(item=>item.slug===slug);
 if(index<0)notFound();
 const service=services[index];return <><PageIntro eyebrow={`Our services / ${service.number}`} title={<>{service.title.split(" ").slice(0,2).join(" ")}<br/>{service.title.split(" ").slice(2).join(" ")}</>} intro={service.summary}/><section className="service-detail-hero"><div className="service-detail-image"><Image src={service.image} alt={service.alt} fill priority sizes="100vw" className="image-cover"/></div></section><section className="section-pad service-detail-content"><div className="container service-detail-grid"><div><span className="eyebrow">A considered approach</span><h2 className="serif">{service.note}</h2></div><div><p className="body-copy">{service.description}</p><h3 className="service-scope-title">What this can include</h3><ul className="service-scope-list">{service.scope.map(item=><li key={item}>{item}</li>)}</ul><Link href="/contact" className="btn-line" style={{marginTop:28}}>Discuss this service <ArrowUpRight size={15}/></Link></div></div></section><section className="service-detail-bottom"><div className="container service-detail-bottom-inner"><Link href="/services" className="btn-line"><ArrowLeft size={15}/> All services</Link><div><span className="eyebrow">Ready to begin?</span><h2 className="serif">Tell us about<br/>your space.</h2><Link href="/contact" className="btn-light">Make an enquiry <ArrowUpRight size={15}/></Link></div></div></section></>}
