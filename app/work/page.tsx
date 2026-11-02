import {PageIntro} from "@/components/page-intro";
import {EditorialPortfolio} from "@/components/editorial-portfolio";
export const metadata={title:"Portfolio",description:"Explore selected interior finishing work by Mike Interiors in Abraka, Delta State."};
export default function Work(){return <><PageIntro eyebrow="Selected projects" title={<>Spaces shaped<br/>with intention.</>} intro="A considered collection of interior details, finishes and spaces. Each project is presented with care and an eye for the details that matter."/><EditorialPortfolio/></>}
