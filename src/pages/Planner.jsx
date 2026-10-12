import { useMemo, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearPlan, toggleDestination, updatePlan } from "../redux/planSlice";
import { CalendarDays, Check, ClipboardList, Download, MapPin, Minus, Plus, Trash2, Wallet } from "lucide-react";

const initialCheckout = { travelers: 1, pace: "Balanced", transport: "Public transport" };
function settingsReducer(state, action) {
  switch (action.type) {
    case "travelers": return { ...state, travelers: Math.max(1, Math.min(12, action.value)) };
    case "pace": return { ...state, pace: action.value };
    case "transport": return { ...state, transport: action.value };
    case "reset": return initialCheckout;
    default: return state;
  }
}
export default function Planner() {
  const dispatch = useDispatch();
  const places = useSelector(s => s.destinations.items);
  const plan = useSelector(s => s.plan);
  const selected = useMemo(() => places.filter(p => plan.destinationIds.includes(p.id)), [places, plan.destinationIds]);
  const [settings, send] = useReducer(settingsReducer, initialCheckout);
  const [notice, setNotice] = useState("");
  const estimate = selected.reduce((sum,p)=>sum + Number(p.budget || 0),0) * settings.travelers;
  const update = (key,value) => dispatch(updatePlan({[key]:value}));
  const exportPlan = () => {
    const content = `${plan.title}\n${plan.days} days · ${settings.travelers} traveler(s)\n\n${selected.map((p,i)=>`${i+1}. ${p.name}, ${p.country} — estimate $${p.budget}/person`).join("\n")}\n\nEstimated destination budget: $${estimate}\nTravel pace: ${settings.pace}\nTransport preference: ${settings.transport}\n\nNotes: ${plan.notes || "No notes yet"}`;
    const blob = new Blob([content], {type:"text/plain"});
    const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href=url; a.download="travelsphere-itinerary.txt"; a.click(); URL.revokeObjectURL(url);
    setNotice("Your itinerary file has been prepared.");
  };
  return <div className="inner-page"><section className="page-hero planner-hero"><div className="page-width"><span className="eyebrow">MAKE IT YOURS</span><h1>Dreams into <em>day plans.</em></h1><p>Collect places, sketch out the details and make a plan that feels like you.</p><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span> Trip planner</div></div></section>
    <section className="page-width section planner-layout"><div className="planner-main"><div className="planner-panel"><div className="panel-title"><ClipboardList/><div><h2>Your itinerary</h2><p>Give your next adventure a name.</p></div></div><label className="form-label">Trip name<input value={plan.title} onChange={e=>update("title",e.target.value)} placeholder="e.g. Summer in the Alps" maxLength={70}/></label><div className="planner-two"><label className="form-label">Trip length<select value={plan.days} onChange={e=>update("days",Number(e.target.value))}>{[1,2,3,4,5,6,7,10,14].map(n=><option key={n} value={n}>{n} {n===1?"day":"days"}</option>)}</select></label><label className="form-label">Travel pace<select value={settings.pace} onChange={e=>send({type:"pace",value:e.target.value})}><option>Slow & mindful</option><option>Balanced</option><option>See it all</option></select></label></div><label className="form-label">Your notes<textarea rows="3" value={plan.notes} onChange={e=>update("notes",e.target.value)} placeholder="Places to eat, people to meet, things to remember..."/></label></div>
      <div className="planner-panel"><div className="panel-title"><MapPin/><div><h2>Places on your list <span className="count-pill">{selected.length}</span></h2><p>Choose destinations from the collection below.</p></div></div>{selected.length ? <div className="selected-list">{selected.map((p,i)=><div className="selected-place" key={p.id}><img src={p.image} alt=""/><div><small>STOP {String(i+1).padStart(2,"0")}</small><b>{p.name}</b><span>{p.country} · ${p.budget} est.</span></div><button className="icon-button" aria-label={`Remove ${p.name}`} onClick={()=>dispatch(toggleDestination(p.id))}><Trash2 size={16}/></button></div>)}</div> : <div className="empty-inline"><span>✳</span><b>Your itinerary is a blank page.</b><p>Add a place below to get started.</p></div>}<div className="add-places-grid">{places.filter(p=>!plan.destinationIds.includes(p.id)).slice(0,4).map(p=><button className="add-place" key={p.id} onClick={()=>dispatch(toggleDestination(p.id))}><img src={p.image} alt=""/><span><b>{p.name}</b><small>{p.country}</small></span><Plus size={16}/></button>)}</div></div>
      <div className="planner-panel"><div className="panel-title"><CalendarDays/><div><h2>Travel details</h2><p>Small choices help shape your trip.</p></div></div><label className="form-label">Number of travelers<div className="stepper"><button onClick={()=>send({type:"travelers",value:settings.travelers-1})} aria-label="Fewer travelers"><Minus size={16}/></button><b>{settings.travelers}</b><button onClick={()=>send({type:"travelers",value:settings.travelers+1})} aria-label="More travelers"><Plus size={16}/></button></div></label><label className="form-label">Preferred transport<select value={settings.transport} onChange={e=>send({type:"transport",value:e.target.value})}><option>Public transport</option><option>Walking & cycling</option><option>Rental car</option><option>Mixed / undecided</option></select></label></div></div>
      <aside className="planner-summary"><span className="eyebrow">YOUR TRIP AT A GLANCE</span><h2>A little plan.<br/><em>A lot to look forward to.</em></h2><div className="summary-line"><span><MapPin size={16}/> Destinations</span><b>{selected.length}</b></div><div className="summary-line"><span><CalendarDays size={16}/> Duration</span><b>{plan.days} days</b></div><div className="summary-line"><span><Wallet size={16}/> Travelers</span><b>{settings.travelers}</b></div><div className="summary-total"><span>Estimated destination budget</span><b>${estimate.toLocaleString("en-US")}</b><small>Illustrative only · excludes transport, lodging and meals.</small></div><button className="button button-dark button-full" onClick={exportPlan}><Download size={16}/> Export itinerary</button><button className="button button-outline button-full" onClick={()=>{dispatch(clearPlan());send({type:"reset"});setNotice("Your plan has been cleared.");}}>Start fresh</button>{notice && <p className="success-note"><Check size={15}/>{notice}</p>}<p className="summary-foot">Your plan is saved in this browser on this device.</p></aside></section>
  </div>;
}
