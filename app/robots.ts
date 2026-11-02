import type {MetadataRoute} from "next";
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:"*",allow:"/"},sitemap:"https://mike-interiors.netlify.app/sitemap.xml"}}
