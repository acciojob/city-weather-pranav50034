
import React, {useState} from "react";
import './../styles/App.css';
import instance from "./instance/instance";
import { WiDegrees } from "react-icons/wi";

const App = () => {

  // api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}

  let [city, setCity] = useState("")
  let [data, setData] = useState("")
  let [error, setError] = useState("")

  function getData(e) {
    e.preventDefault();
     instance.get("/weather", {
        params: {
           q: city,
           appid: "8c48dec99ef0f494f3a51cc7f47bd5ad",
        },
     })
     .then(response=> setData(response.data))
     .catch(err=>{
      setData("")
      setError("No city found")
    });

     setError("")
  }

  return (
     <div>
        {/* Do not remove the main div */}
        <form onSubmit={getData}>
           <input className="search"
              onChange={(e) => setCity(e.target.value)}
              type="text"
              placeholder="Enter a city"
           />
           <button type="submit">Search</button>
        </form>
        <div className="weather">
           {data && (
              <div>
                 <h2>{data.name}</h2>
                 <h1>
                    {data.main.temp}
                    <WiDegrees /> F
                 </h1>
                 <h3>{data.weather[0].description}</h3>
              </div>
           )}
           {error && <p>{error}</p>}
        </div>
     </div>
  );
}

export default App
