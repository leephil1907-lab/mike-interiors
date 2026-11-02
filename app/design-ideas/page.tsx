import Image from "next/image";
import {PageIntro} from "@/components/page-intro";
export const metadata={title:"Design Ideas",description:"Interior design concepts and finish inspiration from Mike Interiors in Abraka, Delta State."};
const ideas=[
  {
    "title": "Kitchen in blue-grey gloss",
    "description": "A contemporary kitchen concept with glass-front cabinetry, practical task lighting and a clean work surface.",
    "image": "kitchen-blue-gloss.webp",
    "alt": "L-shaped kitchen in blue-grey gloss with glass-front dish cabinets, under-cabinet lighting and a white worktop"
  },
  {
    "title": "Smoked-glass feature wall",
    "description": "A dramatic TV wall concept using smoked glass, fluted texture and illuminated display shelving.",
    "image": "tv-wall-smoked-glass.webp",
    "alt": "Dark glass TV wall framed by LED lines, a fluted panel and a column of lit display shelves"
  },
  {
    "title": "Floating vanity and lit shelves",
    "description": "A compact dressing area with warm timber, a softly shaped mirror and integrated shelf lighting.",
    "image": "vanity-lit-shelves.webp",
    "alt": "Floating wood vanity with a half-round mirror and a tall shelving column lit by warm LED strips"
  },
  {
    "title": "Corner glass wardrobe",
    "description": "A storage concept that uses a corner layout, dark-framed glazing and integrated lighting.",
    "image": "wardrobe-corner-glass.webp",
    "alt": "L-shaped corner wardrobe with black-framed glass doors, hanging rails, lighting and drawers"
  },
  {
    "title": "Cream gloss and timber TV wall",
    "description": "A balanced combination of light gloss surfaces, timber display niches and concealed LED lighting.",
    "image": "tv-wall-cream-wood.webp",
    "alt": "Cream gloss TV wall with tall wood display shelves lit by LED, a slatted strip and a floating console"
  },
  {
    "title": "Walnut platform bedroom",
    "description": "Warm timber, floating bedside storage and glass pendants create a calm bedroom direction.",
    "image": "bed-platform-wood.webp",
    "alt": "Low walnut platform bed with a wood headboard wall, floating bedside units and two glass pendant lights"
  },
  {
    "title": "Living room with wall mouldings",
    "description": "A classic wall treatment paired with soft upholstery and a considered lighting feature.",
    "image": "living-mouldings.webp",
    "alt": "Living room with white wall mouldings, a ring pendant light, grey and taupe sofas and a panelled TV wall"
  },
  {
    "title": "Curved lounge arrangement",
    "description": "Sculptural seating and rounded forms bring softness to an open living area.",
    "image": "sofa-curved-set.webp",
    "alt": "Two curved cream sofas, two brown lounge chairs and nesting marble coffee tables on a polished floor"
  },
  {
    "title": "Gloss kitchen with island",
    "description": "A practical kitchen layout with a central island, high-gloss cabinetry and generous storage.",
    "image": "kitchen-island.webp",
    "alt": "Tan high-gloss kitchen with a granite-topped island, glass-front wall cabinets and a black cooker hood"
  },
  {
    "title": "Vanity with halo mirror",
    "description": "A compact vanity idea with a halo-lit mirror, useful drawers and a soft neutral palette.",
    "image": "vanity-halo.webp",
    "alt": "White vanity desk with a drawer unit, a halo-lit round mirror, black pendants and a cream chair"
  },
  {
    "title": "TV wall with linear fireplace",
    "description": "A feature wall concept that combines timber, panel detailing and a linear fireplace.",
    "image": "tv-wall-fireplace.webp",
    "alt": "Cream panelled TV wall with wood side panels and a linear fireplace below the screen"
  },
  {
    "title": "Bedroom with POP cove",
    "description": "Layered ceiling lighting and a soft upholstered bed form a warm bedroom scheme.",
    "image": "bedroom-pop-cove.webp",
    "alt": "Bedroom with a POP ceiling drop and amber cove light, a cluster pendant, an upholstered bed and a pill-shaped mirror"
  }
];
const base="https://mike-interiors.netlify.app/images/projects/thumb/";
export default function Ideas(){return <><PageIntro eyebrow="The inspiration edit" title={<>Ideas for living<br/>beautifully.</>} intro="Design references and concepts from the original Mike Interiors collection. These images are inspiration—not a claim that every pictured space is a completed client project."/><section className="section-pad"><div className="container"><div className="ideas-editorial-grid">{ideas.map((idea,index)=><article className={`ideas-editorial-card ideas-card-${index%4}`} key={idea.image}><div className="ideas-image-frame"><Image src={base+idea.image} alt={idea.alt} fill sizes="(max-width:700px) 100vw, 50vw" className="image-cover"/></div><div className="ideas-card-copy"><span className="eyebrow">INSPIRATION / {String(index+1).padStart(2,"0")}</span><h2 className="serif">{idea.title}</h2><p className="body-copy">{idea.description}</p></div></article>)}</div></div></section></>}
