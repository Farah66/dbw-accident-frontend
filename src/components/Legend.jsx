import "./Legend.css";

function Legend() {
  return (
    <div className="map-legend">
      <h4>Legend</h4>

      <div className="legend-row">
        <span className="legend-dot accident"></span>
        <span>Accident location</span>
      </div>

      <div className="legend-row">
        <span className="legend-dot serious"></span>
        <span>Serious injury accident</span>
      </div>

      <div className="legend-row">
        <span className="legend-dot fatal"></span>
        <span>Fatal accident</span>
      </div>
    </div>
  );
}

export default Legend;