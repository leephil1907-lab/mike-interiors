import { pageOg } from "@/lib/social";
import {PageIntro} from "@/components/page-intro";
import {getProjects} from "@/lib/projects";

export const revalidate = 300;
import {EditorialPortfolio} from "@/components/editorial-portfolio";
export const metadata={title:"Portfolio",description:"Explore selected interior finishing work by Mike Interiors in Abraka, Delta State — feature walls, wardrobes, ceilings and finishing details.",alternates:{canonical:"/work"},...pageOg({title:"Portfolio",description:"Explore selected interior finishing work by Mike Interiors in Abraka, Delta State — feature walls, wardrobes, ceilings and finishing details.",path:"/work"})};
export default async function Work(){
 const projects = await getProjects();return <><PageIntro eyebrow="Selected projects" title={<>Spaces shaped<br/>with intention.</>} intro="A considered collection of interior details, finishes and spaces. Each project is presented with care and an eye for the details that matter."/><EditorialPortfolio projects={projects}/></>}
