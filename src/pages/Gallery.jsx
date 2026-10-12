import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, X } from "lucide-react";
import { useSelector } from "react-redux";
const filters=["All","Nature","Coast","Culture","Adventure","City"];
export default function Gallery() {
 const places=useSelector(s=>s.destinations.items); const [filter,setFilter]=useState("All"); const [selected,setSelected]=useState(null);
 const items=useMemo(()=>places.filter(p=>filter==="All"||p.category===filter),[places,filter]);
 return <div className="inner-page"><section className="page-hero gallery-hero"><div className="page-width"><span className="eyebrow">POSTCARDS FROM EVERYWHERE</span><h1>Collect moments, <em>not things.</em></h1><p>A small visual love letter to the places that make us look twice.</p><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span> Gallery</div></div></section><section className="page-width section"><div className="filter-chips gallery-filters">{filters.map(f=><button key={f} className={filter===f?"filter-chip active":"filter-chip"} onClick={()=>setFilter(f)}>{f}</button>)}</div><div className="gallery-grid">{items.map((p,i)=><button className={`gallery-item gallery-item-${i%6}`} key={p.id} onClick={()=>setSelected(p)}><img src={p.image} alt={p.name}/><span className="gallery-overlay"><span><small>{p.country}</small><b>{p.name}</b></span><ArrowUpRight/></span></button>)}</div></section>{selected&&<div className="lightbox" role="dialog" aria-modal="true" aria-label={selected.name} onClick={()=>setSelected(null)}><button className="lightbox-close" aria-label="Close image" onClick={()=>setSelected(null)}><X/></button><img src={selected.image} alt={selected.name} onClick={e=>e.stopPropagation()}/><div><h2>{selected.name}</h2><p>{selected.country} · {selected.category}</p><Link to={`/destinations/${selected.id}`} onClick={()=>setSelected(null)}>Explore destination <ArrowUpRight size={15}/></Link></div></div>}</div>;
}
