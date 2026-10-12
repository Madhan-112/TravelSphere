import { useMemo, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Search, SlidersHorizontal, X } from "lucide-react";
import { useSelector } from "react-redux";
import DestinationCard from "../components/DestinationCard";

const options = ["All", "Coast", "Nature", "Culture", "Adventure", "City"];

export default function Destinations() {
  const places = useSelector(s => s.destinations.items);
  const [params, setParams] = useSearchParams();
  const searchRef = useRef(null);
  const query = params.get("q") || "";
  const category = params.get("category") || "All";
  const sort = params.get("sort") || "featured";
  const setParam = (key, value) => { const next = new URLSearchParams(params); value && value !== "All" && value !== "featured" ? next.set(key,value) : next.delete(key); setParams(next); };
  const filtered = useMemo(() => {
    let list = places.filter(p => `${p.name} ${p.country} ${p.description}`.toLowerCase().includes(query.toLowerCase()));
    if (category !== "All") list = list.filter(p => p.category === category);
    if (sort === "budget") list = [...list].sort((a,b) => a.budget-b.budget);
    if (sort === "rating") list = [...list].sort((a,b) => b.rating-a.rating);
    if (sort === "name") list = [...list].sort((a,b) => a.name.localeCompare(b.name));
    return list;
  }, [places, query, category, sort]);
  return <div className="inner-page">
    <section className="page-hero destination-hero"><div className="page-width"><span className="eyebrow">A WORLD WAITING</span><h1>Places that <em>stay with you.</em></h1><p>From slow coastal mornings to mountain air that takes your breath away. Start somewhere.</p><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span> Destinations</div></div></section>
    <section className="page-width section destinations-content">
      <div className="explore-toolbar"><div><span className="eyebrow">THE COLLECTION</span><h2>Find your kind of place <span className="count-pill">{filtered.length}</span></h2></div><button className="button button-outline" onClick={() => { setParams({}); searchRef.current?.focus(); }}><X size={16}/> Reset filters</button></div>
      <div className="filter-panel"><label className="search-field"><Search size={18}/><input ref={searchRef} value={query} onChange={e => setParam("q", e.target.value)} placeholder="Search a place, country or feeling..."/>{query && <button onClick={() => setParam("q","")} aria-label="Clear search"><X size={15}/></button>}</label><div className="filter-select"><SlidersHorizontal size={16}/><select value={sort} onChange={e => setParam("sort",e.target.value)} aria-label="Sort destinations"><option value="featured">Featured</option><option value="budget">Budget: low to high</option><option value="rating">Top rated</option><option value="name">Name A–Z</option></select></div></div>
      <div className="filter-chips">{options.map(o=><button key={o} className={category===o ? "filter-chip active" : "filter-chip"} onClick={() => setParam("category",o)}>{o}</button>)}</div>
      {filtered.length ? <div className="destination-grid">{filtered.map(p=><DestinationCard key={p.id} place={p}/>)}</div> : <div className="empty-state"><span>⌕</span><h3>No places found just yet</h3><p>Try another search or clear your filters.</p><button className="button button-dark" onClick={() => setParams({})}>Show all destinations</button></div>}
      <p className="demo-note">Destination information is for inspiration. Budgets are illustrative estimates in USD, not live prices.</p>
    </section>
  </div>;
}
