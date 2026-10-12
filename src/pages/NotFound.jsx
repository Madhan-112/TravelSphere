import { Link } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";
export default function NotFound() {
 return <section className="page-width section not-found"><Compass size={42}/><span className="eyebrow">OFF THE MAP</span><h1>This page took a detour.</h1><p>We couldn’t find the page you were looking for.</p><Link className="button button-dark" to="/"><ArrowLeft size={16}/> Back to home</Link></section>;
}
