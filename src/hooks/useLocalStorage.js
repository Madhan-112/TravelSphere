import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function useLocalStorageSync() {
  const destinations = useSelector(state => state.destinations.items);
  const plan = useSelector(state => state.plan);
  useEffect(() => {
    try { localStorage.setItem("travelsphere-destinations", JSON.stringify(destinations)); } catch {}
  }, [destinations]);
  useEffect(() => {
    try { localStorage.setItem("travelsphere-plan", JSON.stringify(plan)); } catch {}
  }, [plan]);
}
