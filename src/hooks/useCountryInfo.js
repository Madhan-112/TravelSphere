import { useEffect, useState } from "react";

export default function useCountryInfo(country) {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!country) return;
    const controller = new AbortController();
    setLoading(true);
    setError("");
    fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(country)}?fields=name,capital,population,region,flags`, { signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error("Country details are currently unavailable."); return response.json(); })
      .then(data => setInfo(data[0] || null))
      .catch(err => { if (err.name !== "AbortError") setError("Live country facts could not be loaded. You can still explore the destination details below."); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [country]);

  return { info, loading, error };
}
