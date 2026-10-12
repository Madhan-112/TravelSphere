import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock3, Heart, MapPin, Wallet } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toggleDestination } from "../redux/planSlice";
import { useState } from "react";
import useCountryInfo from "../hooks/useCountryInfo";

export default function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const place = useSelector(s => s.destinations.items.find(p => String(p.id) === id));
  const saved = useSelector(s => s.plan.destinationIds.includes(Number(id)) || s.plan.destinationIds.includes(id));
  const [added, setAdded] = useState(false);
  const { info: countryInfo, loading: countryLoading, error: countryError } = useCountryInfo(place?.country);
  if (!place) return <section className="page-width section not-found"><span className="eyebrow">PLACE NOT FOUND</span><h1>That destination wandered off.</h1><Link className="button button-dark" to="/destinations">Back to destinations</Link></section>;
  return <div className="inner-page details-page">
    <div className="details-image" style={{backgroundImage:`linear-gradient(90deg,rgba(9,34,41,.68),rgba(9,34,41,.05)),url("${place.image}")`}}><div className="page-width details-title"><div className="breadcrumbs light"><Link to="/">Home</Link><span>/</span><Link to="/destinations">Destinations</Link><span>/</span>{place.name}</div><span className="eyebrow">{place.category} · {place.country}</span><h1>{place.name}<em>, {place.country}</em></h1><p>{place.description}</p><div className="details-meta"><span><MapPin size={16}/>{place.country}</span><span><Clock3 size={16}/>{place.days}</span><span>★ {place.rating} traveler rating</span></div></div></div>
    <section className="page-width details-layout"><div className="details-main"><span className="eyebrow">A FEELING, NOT JUST A PLACE</span><h2>Make room for <em>wonder.</em></h2><p className="lead-text">{place.description} Take your time, leave room for detours, and let the place surprise you.</p><h3>Little moments to look for</h3><div className="highlight-list">{(place.highlights || []).map((h,i)=><div key={h}><span>0{i+1}</span><p>{h}</p><Check size={17}/></div>)}</div><div className="details-actions"><button className={saved ? "button button-dark" : "button button-outline"} onClick={() => {dispatch(toggleDestination(place.id));setAdded(true);}}><Heart size={16} fill={saved ? "currentColor" : "none"}/>{saved ? "Saved to your plan" : "Add to trip plan"}</button><button className="button button-light-alt" onClick={() => navigate("/planner")}>Open trip planner <ArrowRight size={16}/></button></div>{added && <p className="success-note">Your planner has been updated. You can organize this place in Trip Planner.</p>}</div><aside className="quick-facts"><span className="eyebrow">GOOD TO KNOW</span><div><CalendarDays/><span><small>Best time to visit</small><b>{place.bestTime || "Spring or early autumn"}</b></span></div><div><Clock3/><span><small>Suggested time</small><b>{place.days}</b></span></div><div><Wallet/><span><small>Estimated budget</small><b>${place.budget} / person</b></span></div>{countryLoading && <p>Loading live country facts…</p>}{countryError && <p>{countryError}</p>}{countryInfo && <div className="country-facts">{countryInfo.flags?.svg && <img src={countryInfo.flags.svg} alt={countryInfo.flags.alt || `${place.country} flag`} />}<span><small>Capital</small><b>{countryInfo.capital?.[0] || "Not listed"}</b></span><span><small>Region</small><b>{countryInfo.region || "Not listed"}</b></span><span><small>Population</small><b>{Number(countryInfo.population || 0).toLocaleString()}</b></span></div>}<p>Budget is a rough planning estimate, not a live quote. Check local guidance before you go.</p><Link className="text-link" to="/guides">Read travel guides <ArrowRight size={15}/></Link></aside></section>
  </div>;
}
