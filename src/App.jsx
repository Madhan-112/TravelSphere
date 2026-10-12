import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import DestinationDetails from "./pages/DestinationDetails";
import DestinationRouteLayout from "./components/DestinationRouteLayout";
import Planner from "./pages/Planner";
import Guides from "./pages/Guides";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import useLocalStorageSync from "./hooks/useLocalStorage";

function AppContent() {
  useLocalStorageSync();
  return <Routes>
    <Route element={<Layout/>}>
      <Route path="/" element={<Home/>}/>
      <Route path="/destinations" element={<DestinationRouteLayout/>}>
        <Route index element={<Destinations/>}/>
        <Route path=":id" element={<DestinationDetails/>}/>
      </Route>
      <Route path="/planner" element={<Planner/>}/>
      <Route path="/guides" element={<Guides/>}/>
      <Route path="/gallery" element={<Gallery/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/admin" element={<Admin/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Route>
  </Routes>;
}
export default function App() { return <AppContent/>; }
