import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  GeoJSON,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import germanyStates from "../data/germany-states.geojson";

function getAccidentColor(category) {
  if (String(category) === "1") return "#e60000"; // Fatal accident
  if (String(category) === "2") return "#f2c300"; // Serious injury

  return "#3388ff"; // All other accidents
}

function CitySearch() {
  const map = useMap();
  const [query, setQuery] = useState("");

  async function handleSearch(e) {
    e.preventDefault();

    if (!query.trim()) return;

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      query + ", Germany"
    )}&limit=1`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.length > 0) {
      const lat = Number(data[0].lat);
      const lon = Number(data[0].lon);

      map.setView([lat, lon], 12);
    } else {
      alert("City not found");
    }
  }

  return (
    <form className="city-search" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">🔍</button>
    </form>
  );
}

function Legend() {
  return (
    <div className="map-legend">
      <h4>Legend:</h4>

      <div className="legend-row">
        <span className="legend-line minor"></span>
        <span>Accident location</span>
      </div>

      <div className="legend-row">
        <span className="legend-line serious"></span>
        <span>Serious injury</span>
      </div>

      <div className="legend-row">
        <span className="legend-line fatal"></span>
        <span>Fatal accident</span>
      </div>
    </div>
  );
}

function AccidentMap({ accidents, showCountryOutline, showBaseMap }) {
  return (
    <MapContainer
      center={[51.1657, 10.4515]}
      zoom={6}
      minZoom={6}
      maxZoom={12}
      maxBounds={[
        [47.0, 5.5],
        [55.5, 15.5],
      ]}
      maxBoundsViscosity={1.0}
      style={{ height: "100%", width: "100%" }}
    >
      {showBaseMap && (
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      )}

      {showCountryOutline && (
        <GeoJSON
          data={germanyStates}
          style={{
            color: "#333",
            weight: 1.2,
            fillOpacity: 0,
          }}
        />
      )}

      {accidents.map((accident) => {
        const color = getAccidentColor(accident.category);

        return (
          <CircleMarker
            key={accident._id}
            center={[accident.lat, accident.lon]}
            radius={4}
            pathOptions={{
              color,
              fillColor: color,
              fillOpacity: 0.6,
            }}
          >
            <Popup>
              <b>Accident</b>
              <br />
              Year: {accident.year}
              <br />
              Month: {accident.month}
              <br />
              Severity: {accident.category}
            </Popup>
          </CircleMarker>
        );
      })}

      <CitySearch />
      <Legend />
    </MapContainer>
  );
}

export default AccidentMap;