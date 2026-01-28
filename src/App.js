import { useState, useEffect } from "react";
import Map from "./components/Map";
import Loader from './components/Loader'
import Header from "./components/Header";


function App() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setError(null);

        const res = await fetch("https://eonet.gsfc.nasa.gov/api/v3/events");

        if (!res.ok) {
          throw new Error(`HTTP ${res.status} ${res.statusText}`);
        }

        const data = await res.json();

        console.log("RAW DATA:", data);
        console.log("EVENTS:", data.events);

        setEventData(data.events || []);
      } catch (err) {
        console.error("Fetch failed:", err);
        setError(err.message);
      } finally {
        setLoading(false); 
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <Loader />;
  if (error) return <h1>Error: {error}</h1>;

  return <div>
    <Header/>
    <Map eventData={eventData}/>
    </div>;
}

export default App;
