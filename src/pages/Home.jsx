import { Link } from "react-router-dom";
import { ArrowDownRight, ArrowRight, Compass, Globe2, Leaf, MapPinned, Sparkles } from "lucide-react";
import { useSelector } from "react-redux";
import DestinationCard from "../components/DestinationCard";
import SectionHeading from "../components/SectionHeading";

const categories = [
  { icon: "◒", name: "Coast", caption: "Salt in the air" },
  { icon: "⌁", name: "Nature", caption: "Find your wild" },
  { icon: "⌂", name: "Culture", caption: "Stories & soul" },
  { icon: "↟", name: "Adventure", caption: "Go a little further" }
];

export default function Home() {
  const places = useSelector(s => s.destinations.items);
  return <>
    <section className="hero">
      <div className="hero-image"></div><div className="hero-shade"></div>
      <div className="hero-content page-width">
        <div className="hero-kicker"><span className="kicker-line"></span> A WORLD OF POSSIBILITIES</div>
        <h1>Find your<br/><em>somewhere.</em></h1>
        <p className="hero-copy">Less scrolling. More soul-stirring places.<br/>Your next story starts out there.</p>
        <div className="hero-actions"><Link className="button button-light" to="/destinations">Explore destinations <ArrowRight size={17}/></Link><Link className="hero-secondary" to="/planner">Build your itinerary <ArrowDownRight size={17}/></Link></div>
        <div className="hero-note"><span className="avatar-stack"><i>✦</i><i>✧</i><i>◈</i></span><span>For the curious, the unhurried<br/><b>and the always-wondering.</b></span></div>
      </div>
      <div className="hero-side-note">01 — DISCOVER THE EXTRAORDINARY</div>
      <div className="hero-bottom page-width"><span>SCROLL TO WANDER</span><span>01 / 04 <i></i> THE WORLD IS YOURS</span></div>
    </section>
    <section className="intro-strip page-width"><div className="intro-label"><span className="eyebrow">THE ART OF GETTING LOST</span><span className="intro-symbol">✳</span></div><p>We believe the best journeys aren’t measured in miles, but in <em>moments that stay with you.</em> Discover places that change your perspective.</p><Link className="circle-link" to="/about" aria-label="About TravelSphere"><ArrowDownRight size={21}/></Link></section>
    <section className="section page-width"><SectionHeading eyebrow="PICK YOUR PACE" title="Where to next?" text="A few places to make your heart beat a little faster." action={<Link className="text-link" to="/destinations">All destinations <ArrowRight size={16}/></Link>}/><div className="destination-grid">{places.slice(0,3).map(p => <DestinationCard key={p.id} place={p}/>)}</div></section>
    <section className="category-section"><div className="page-width"><SectionHeading eyebrow="FOLLOW YOUR FEELING" title="Travel your way" text="No one kind of adventure. Just the one that feels like you."/><div className="category-grid">{categories.map((c,i)=><Link className={`category-tile cat-${i}`} to={`/destinations?category=${c.name}`} key={c.name}><span className="category-icon">{c.icon}</span><span className="category-title">{c.name}</span><span className="category-caption">{c.caption}</span><ArrowDownRight size={19}/></Link>)}</div></div></section>
    <section className="quote-section page-width"><span className="eyebrow">A LITTLE REMINDER</span><p>“We travel not to escape life, but for life not to escape us.”</p><span className="quote-author">— ROBYN YOUNG</span><div className="quote-decoration">✳</div></section>
    <section className="planner-cta page-width"><div><span className="eyebrow">YOUR NEXT CHAPTER</span><h2>Dream it.<br/><em>Map it out.</em></h2><p>Collect the places you love, sketch a day-by-day plan and make that someday feel a little closer.</p><Link className="button button-dark" to="/planner">Start a trip plan <ArrowRight size={17}/></Link></div><div className="planner-visual"><img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85" alt="Sunlit mountain landscape"/><div className="floating-note"><MapPinned size={20}/><span><b>Your next adventure</b><small>Somewhere worth remembering</small></span></div><div className="visual-stamp"><Compass size={24}/><span>GO<br/>WANDER</span></div></div></section>
    <section className="stats-strip page-width"><div><Globe2/><b>8+</b><span>places to start</span></div><div><Leaf/><b>0 bookings</b><span>just inspiration</span></div><div><Sparkles/><b>Your pace</b><span>your kind of journey</span></div></section>
  </>;
}
