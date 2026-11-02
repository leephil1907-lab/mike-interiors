import type {MetadataRoute} from "next";
export default function sitemap():MetadataRoute.Sitemap{return ["/","/work","/design-ideas","/videos","/about","/contact"].map(path=>({url:"https://mike-interiors.netlify.app"+path,lastModified:new Date(),changeFrequency:"monthly",priority:path==="/"?1:.7}))}
