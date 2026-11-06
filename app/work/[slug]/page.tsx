import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import {ArrowLeft,ArrowRight,ArrowUpRight} from "lucide-react";
import {PageIntro} from "@/components/page-intro";
import {getProjects,imageSrc} from "@/lib/projects";
type Props={params:Promise<{slug:string}>};
export const revalidate = 300;

export async function generateStaticParams(){
 const projects = await getProjects();
 return projects.map(project=>({slug:project.slug}));
}
export async function generateMetadata({params}:Props){
 const {slug}=await params;
 const projects = await getProjects();
 const project=projects.find(item=>item.slug===slug);
 if(!project)return {title:"Project not found"};
 const src = imageSrc(project.image, "");
 return {
  title: project.title,
  description: project.description,
  alternates: { canonical: `/work/${project.slug}` },
  openGraph: {
   type: "article",
   title: `${project.title} | Mike Interiors`,
   description: project.description,
   images: src ? [{ url: src, alt: project.alt }] : undefined
  }
 };
}
export default async function ProjectDetail({params}:Props){
 const {slug}=await params;
 const projects = await getProjects();
 const index=projects.findIndex(item=>item.slug===slug);if(index<0)notFound();
 const project=projects[index],previous=projects[(index-1+projects.length)%projects.length],next=projects[(index+1)%projects.length];
 const related=projects.filter(item=>item.category===project.category&&item.slug!==project.slug).slice(0,3);
 const words=project.title.split(" "),cut=Math.ceil(words.length/2);
 return <><PageIntro eyebrow={`Project ${project.id} / ${project.category}`} title={<>{words.slice(0,cut).join(" ")}<br/>{words.slice(cut).join(" ")}</>} intro={project.description}/>
 <section className="project-detail-hero"><div className="project-detail-image"><Image src={imageSrc(project.image, "")} alt={project.alt} fill priority sizes="100vw" className="image-cover"/></div><div className="project-detail-image-caption"><span>MIKE INTERIORS · ABRAKA, NIGERIA</span><span>{project.status==="progress"?"INSTALLATION IN PROGRESS":"SELECTED PROJECT"}</span></div></section>
 <section className="project-detail-story section-pad"><div className="container project-detail-story-grid"><div><span className="eyebrow">The details</span><h2 className="serif">Thoughtful choices.<br/>A considered finish.</h2></div><div><p className="body-copy">{project.description} This project is part of the Mike Interiors portfolio, showcasing the role of materials, proportion, lighting and finishing details in shaping a welcoming space.</p><p className="body-copy" style={{marginTop:18}}>Interested in a similar direction for your own space? Tell us about your project and we can discuss the possibilities.</p><Link href="/contact" className="btn-line" style={{marginTop:22}}>Discuss your project <ArrowUpRight size={15}/></Link></div></div></section>
 <section className="project-detail-gallery"><div className="container"><div className="project-detail-gallery-heading"><span className="eyebrow">More from the portfolio</span><Link href="/work" className="btn-line">All projects <ArrowUpRight size={14}/></Link></div><div className="project-detail-related">{related.map(item=><Link href={`/work/${item.slug}`} key={item.slug} className="project-related-card"><div><Image src={imageSrc(item.image, "")} alt={item.alt} fill sizes="(max-width:700px) 85vw, 30vw" className="image-cover"/></div><span>{item.category}</span><h3 className="serif">{item.title}</h3></Link>)}</div></div></section>
 <nav className="project-detail-pagination container" aria-label="Project navigation"><Link href={`/work/${previous.slug}`}><ArrowLeft size={16}/><span><small>PREVIOUS PROJECT</small>{previous.title}</span></Link><Link href={`/work/${next.slug}`}><span><small>NEXT PROJECT</small>{next.title}</span><ArrowRight size={16}/></Link></nav></>;
}
