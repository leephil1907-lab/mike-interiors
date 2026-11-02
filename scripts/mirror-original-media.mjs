import {mkdir,writeFile} from "node:fs/promises";
import {dirname,join} from "node:path";

const origin="https://mike-interiors.netlify.app";
const assets=[
  "images/projects/thumb/tv-wall-tan-gloss.webp",
  "images/projects/thumb/living-ring-chandelier.webp",
  "images/projects/thumb/wardrobe-glass-centre.webp",
  "images/projects/thumb/tv-wall-white-gloss.webp",
  "images/projects/thumb/living-slat-wall.webp",
  "images/projects/thumb/wardrobe-open-shelves.webp",
  "images/projects/thumb/wardrobe-glass-led.webp",
  "images/projects/thumb/bed-green-boucle.webp",
  "images/projects/thumb/glass-cabinet-amber.webp",
  "images/projects/thumb/tv-wall-marble-led.webp",
  "images/projects/thumb/bedroom-led-slat.webp",
  "images/projects/thumb/curtains-grey-sheer.webp",
  "images/projects/thumb/mirror-grid.webp",
  "images/projects/thumb/mirror-diamond.webp",
  "images/projects/thumb/pop-ceiling-in-progress.webp",
  "images/projects/thumb/tv-wall-tan-grid.webp",
  "images/projects/thumb/tv-wall-tan-grid-close.webp",
  "images/projects/thumb/kitchen-blue-gloss.webp",
  "images/projects/thumb/tv-wall-smoked-glass.webp",
  "images/projects/thumb/vanity-lit-shelves.webp",
  "images/projects/thumb/wardrobe-corner-glass.webp",
  "images/projects/thumb/tv-wall-cream-wood.webp",
  "images/projects/thumb/bed-platform-wood.webp",
  "images/projects/thumb/living-mouldings.webp",
  "images/projects/thumb/sofa-curved-set.webp",
  "images/projects/thumb/kitchen-island.webp",
  "images/projects/thumb/vanity-halo.webp",
  "images/projects/thumb/tv-wall-fireplace.webp",
  "images/projects/thumb/bedroom-pop-cove.webp",
  "images/projects/full/tv-wall-tan-gloss.webp",
  "videos/walkthrough-short.mp4",
  "videos/walkthrough-full.mp4",
  "videos/walkthrough-short.webp",
  "videos/walkthrough-full.webp"
];
let failed=[];
for(const asset of assets){
  const url=`${origin}/${asset}`;
  const response=await fetch(url,{redirect:"follow"});
  if(!response.ok){failed.push(`${asset}: HTTP ${response.status}`);continue;}
  const bytes=Buffer.from(await response.arrayBuffer());
  if(!bytes.length){failed.push(`${asset}: empty response`);continue;}
  const destination=join(process.cwd(),"public",asset);
  await mkdir(dirname(destination),{recursive:true});
  await writeFile(destination,bytes);
  console.log(`Mirrored ${asset} (${bytes.length} bytes)`);
}
if(failed.length){console.error("Some media assets could not be mirrored:",failed.join("\\n"));process.exitCode=1;}
else console.log(`Successfully mirrored ${assets.length} original Mike Interiors assets.`);
