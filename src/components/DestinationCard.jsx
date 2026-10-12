import { Heart, MapPin, ArrowUpRight, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function DestinationCard({ place, compact = false }) {
  const [saved, setSaved] = useState(false);
  return <article className={compact ? "destination-card compact-card" : "destination-card"}>
    <div className="card-image-wrap">
      <img src={place.image} alt={place.name} loading="lazy" onError={e => { e.currentTarget.src = "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=80"; }}/>
      <span className="image-tag">{place.category}</span>
      <button className={saved ? "save-button saved" : "save-button"} aria-label={saved ? "Unsave destination" : "Save destination"} onClick={() => setSaved(v => !v)}><Heart size={17} fill={saved ? "currentColor" : "none"}/></button>
    </div>
    <div className="destination-card-body">
      <div className="card-location"><MapPin size={13}/>{place.country}</div>
      <div className="card-title-row"><h3>{place.name}</h3><span className="rating">★ {place.rating || "4.8"}</span></div>
      {!compact && <p>{place.description}</p>}
      <div className="card-meta"><span><Clock3 size={14}/>{place.days || "3–4 days"}</span><span>From <b>${Number(place.budget || 400)}</b></span></div>
      <Link className="text-link" to={`/destinations/${place.id}`}>Explore place <ArrowUpRight size={15}/></Link>
    </div>
  </article>;
}
