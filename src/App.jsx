import { useState, useEffect } from "react";
import AccidentMap from "./components/AccidentMap";
import MonthlyChart from "./components/MonthlyChart";
import {
  getAccidents,
  getSummary,
  getMonthlyStats,
  getTopRankings,
  getBottomRankings,
  getHighestAccidentRateCity,
  getDresdenBicycle2024,
  getTopFatalDistricts2024,
  getZeroAccidentMunicipalitiesSaxony2023,
} from "./api";
import "./App.css";
import AccidentRatesComparisonChart from "./components/AccidentRatesComparisonChart";

function App() {
  const [accidents, setAccidents] = useState([]);
  const [count, setCount] = useState(0);
  const [monthlyData, setMonthlyData] = useState([]);
  const [topRankings, setTopRankings] = useState([]);
  const [bottomRankings, setBottomRankings] = useState([]);
  const [highestRateCity, setHighestRateCity] = useState(null);
  const [dresdenBicycle2024, setDresdenBicycle2024] = useState(null);
  const [topFatalDistricts2024, setTopFatalDistricts2024] = useState([]);
  const [showZeroMunicipalitiesPanel, setShowZeroMunicipalitiesPanel] =
    useState(false);

  const [
    zeroAccidentMunicipalitiesSaxony2023,
    setZeroAccidentMunicipalitiesSaxony2023,
  ] = useState([]);

  const [summary, setSummary] = useState({
    total: 0,
    bicycle: 0,
    pedestrian: 0,
    car: 0,
  });

  const [year, setYear] = useState("2023");
  const [stateCode, setStateCode] = useState("");
  const [month, setMonth] = useState("");
  const [category, setCategory] = useState("");

  const [bicycle, setBicycle] = useState(false);
  const [pedestrian, setPedestrian] = useState(false);
  const [car, setCar] = useState(false);

  const [showCountryOutline, setShowCountryOutline] = useState(false);
  const [showBaseMap, setShowBaseMap] = useState(true);
  const [showAccidentFrequencies, setShowAccidentFrequencies] =
    useState(false);
  const [showFatalDistrictsPanel, setShowFatalDistrictsPanel] =
    useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const yearParam = params.get("year");
    const stateParam = params.get("state_code");
    const monthParam = params.get("month");
    const categoryParam = params.get("category");

    if (yearParam) setYear(yearParam);
    if (stateParam) setStateCode(stateParam);
    if (monthParam) setMonth(monthParam);
    if (categoryParam) setCategory(categoryParam);

    setBicycle(params.get("bicycle") === "true");
    setPedestrian(params.get("pedestrian") === "true");
    setCar(params.get("car") === "true");
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();

    if (year) params.set("year", year);
    if (stateCode) params.set("state_code", stateCode);
    if (month) params.set("month", month);
    if (category) params.set("category", category);

    if (bicycle) params.set("bicycle", "true");
    if (pedestrian) params.set("pedestrian", "true");
    if (car) params.set("car", "true");

    const queryString = params.toString();
    const newUrl = queryString
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname;

    window.history.replaceState({}, "", newUrl);
  }, [year, stateCode, month, category, bicycle, pedestrian, car]);

  function resetAccidentFilters() {
    setBicycle(false);
    setPedestrian(false);
    setCar(false);
    setCategory("");
  }

  async function handleSearch() {
    const filters = {
      year,
      limit: 3000,
    };

    if (stateCode) filters.state_code = stateCode;
    if (month) filters.month = month;
    if (category) filters.category = category;
    if (bicycle) filters.bicycle = true;
    if (pedestrian) filters.pedestrian = true;
    if (car) filters.car = true;

    const result = await getAccidents(filters);

    const summaryResult = await getSummary({
      year,
      state_code: stateCode,
    });

    const monthlyResult = await getMonthlyStats({
      year,
      state_code: stateCode,
    });

    const topRankingResult = await getTopRankings(10);
    const bottomRankingResult = await getBottomRankings(10);
    const highestRateCityResult = await getHighestAccidentRateCity();
    const dresdenBicycle2024Result = await getDresdenBicycle2024();
    const topFatalDistricts2024Result = await getTopFatalDistricts2024();
    const zeroAccidentMunicipalitiesSaxony2023Result =
      await getZeroAccidentMunicipalitiesSaxony2023();

    setAccidents(result.data || []);
    setCount(result.count || 0);
    setSummary(summaryResult);
    setMonthlyData(monthlyResult);
    setTopRankings(topRankingResult || []);
    setBottomRankings(bottomRankingResult || []);
    setHighestRateCity(highestRateCityResult);
    setDresdenBicycle2024(dresdenBicycle2024Result);
    setTopFatalDistricts2024(topFatalDistricts2024Result || []);
    setZeroAccidentMunicipalitiesSaxony2023(
      zeroAccidentMunicipalitiesSaxony2023Result.municipalities || []
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h3>Unfallatlas Deutschland</h3>
      </header>

      <main className="app-main">
        <aside className="sidebar">
          <div className="sidebar-header">
            <span>Menu:</span>
            <button className="collapse-btn" type="button">
              −
            </button>
          </div>

          <div className="map-extent-row">
            <label>Year:</label>

            <select value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>

          <div className="map-extent-row">
            <label>Map Section:</label>

            <select
              value={stateCode}
              onChange={(e) => setStateCode(e.target.value)}
            >
              <option value="">Germany</option>
              <option value="01">Schleswig-Holstein</option>
              <option value="02">Hamburg</option>
              <option value="03">Niedersachsen</option>
              <option value="04">Bremen</option>
              <option value="05">Nordrhein-Westfalen</option>
              <option value="06">Hessen</option>
              <option value="07">Rheinland-Pfalz</option>
              <option value="08">Baden-Württemberg</option>
              <option value="09">Bayern</option>
              <option value="10">Saarland</option>
              <option value="11">Berlin</option>
              <option value="12">Brandenburg</option>
              <option value="13">Mecklenburg-Vorpommern</option>
              <option value="14">Sachsen</option>
              <option value="15">Sachsen-Anhalt</option>
              <option value="16">Thüringen</option>
            </select>
          </div>

          <div className="menu-box">
            <button
              className={`menu-title accident-frequency-title ${
                showAccidentFrequencies ? "open" : ""
              }`}
              type="button"
              onClick={() =>
                setShowAccidentFrequencies(!showAccidentFrequencies)
              }
            >
              <span className="arrow">
                {showAccidentFrequencies ? "⌄" : "›"}
              </span>
              <span className="orange-line"></span>
              <span>Accident frequencies (road sections)</span>
            </button>

            {showAccidentFrequencies && (
              <div className="radio-list">
                <label>
                  <input
                    type="radio"
                    name="accidentType"
                    checked={!bicycle && !pedestrian && !car && category === ""}
                    onChange={resetAccidentFilters}
                  />
                  All accidents
                </label>

                <label>
                  <input
                    type="radio"
                    name="accidentType"
                    checked={car}
                    onChange={() => {
                      setCar(true);
                      setBicycle(false);
                      setPedestrian(false);
                      setCategory("");
                    }}
                  />
                  Accidents involving passenger cars
                </label>

                <label>
                  <input
                    type="radio"
                    name="accidentType"
                    onChange={resetAccidentFilters}
                  />
                  Accidents involving goods road vehicles
                </label>

                <label>
                  <input
                    type="radio"
                    name="accidentType"
                    onChange={resetAccidentFilters}
                  />
                  Accidents involving motorcycles
                </label>

                <label>
                  <input
                    type="radio"
                    name="accidentType"
                    checked={bicycle}
                    onChange={() => {
                      setBicycle(true);
                      setCar(false);
                      setPedestrian(false);
                      setCategory("");
                    }}
                  />
                  Accidents involving bicycles
                </label>

                <label>
                  <input
                    type="radio"
                    name="accidentType"
                    checked={pedestrian}
                    onChange={() => {
                      setPedestrian(true);
                      setCar(false);
                      setBicycle(false);
                      setCategory("");
                    }}
                  />
                  Accidents involving pedestrians
                </label>

                <label>
                  <input
                    type="radio"
                    name="accidentType"
                    checked={category === "1"}
                    onChange={() => {
                      setCategory("1");
                      setBicycle(false);
                      setPedestrian(false);
                      setCar(false);
                    }}
                  />
                  Accidents with persons killed
                </label>

                <label>
                  <input
                    type="radio"
                    name="accidentType"
                    checked={category === "injury"}
                    onChange={() => {
                      setCategory("injury");
                      setBicycle(false);
                      setPedestrian(false);
                      setCar(false);
                    }}
                  />
                  Accidents with personal injury
                </label>
              </div>
            )}
          </div>

          <div className="menu-box">
            <button
              className={`menu-title accident-frequency-title ${
                showFatalDistrictsPanel ? "open" : ""
              }`}
              type="button"
              onClick={() =>
                setShowFatalDistrictsPanel(!showFatalDistrictsPanel)
              }
            >
              <span className="arrow">
                {showFatalDistrictsPanel ? "⌄" : "›"}
              </span>
              <span className="orange-line"></span>
              <span>2024 districts with fatal accidents</span>
            </button>

            {showFatalDistrictsPanel && (
              <div className="fatal-district-content">
                <table className="fatal-district-table">
                  <thead>
                    <tr>
                      <th align="left">District</th>
                      <th align="right">Fatal Accidents</th>
                    </tr>
                  </thead>

                  <tbody>
                    {topFatalDistricts2024.length > 0 ? (
                      topFatalDistricts2024.map((district) => (
                        <tr key={district._id}>
                          <td>{district._id}</td>
                          <td align="right">{district.fatal_accidents}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2">Click Search to load data.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="menu-box">
            <button
              className={`menu-title accident-frequency-title ${
                showZeroMunicipalitiesPanel ? "open" : ""
              }`}
              type="button"
              onClick={() =>
                setShowZeroMunicipalitiesPanel(!showZeroMunicipalitiesPanel)
              }
            >
              <span className="arrow">
                {showZeroMunicipalitiesPanel ? "⌄" : "›"}
              </span>
              <span className="orange-line"></span>
              <span>Zero-Accident Municipalities</span>
            </button>

            {showZeroMunicipalitiesPanel && (
              <div className="fatal-district-content">
                <p>
                  <strong>Saxony 2023:</strong>{" "}
                  {zeroAccidentMunicipalitiesSaxony2023.length}
                </p>

                <div style={{ maxHeight: "180px", overflowY: "auto" }}>
                  {zeroAccidentMunicipalitiesSaxony2023.length > 0 ? (
                    zeroAccidentMunicipalitiesSaxony2023
                      .slice(0, 20)
                      .map((item) => (
                        <p key={item.municipality_code}>
                          {item.municipality_name}
                        </p>
                      ))
                  ) : (
                    <p>Click Search to load data.</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="layer-box">
            <label>
              <input
                type="checkbox"
                checked={showCountryOutline}
                onChange={(e) => setShowCountryOutline(e.target.checked)}
              />
              Federal states (up to approx. 1:150,000)
            </label>

            <label>
              <input
                type="checkbox"
                checked={showBaseMap}
                onChange={(e) => setShowBaseMap(e.target.checked)}
              />
              Background: basemap.de
            </label>
          </div>

          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>

          <div className="summary-panel">
            <h3>Summary</h3>
            <p>Selected year: {year}</p>
            <p>Total accidents: {summary.total}</p>
            <p>Bicycle accidents: {summary.bicycle}</p>
            <p>Pedestrian accidents: {summary.pedestrian}</p>
            <p>Car accidents: {summary.car}</p>
            <p>Matching accidents: {count}</p>
            <p>Shown on map: {accidents.length}</p>
          </div>

          <div className="summary-panel">
            <h3>Additional Questions</h3>

            {dresdenBicycle2024 ? (
              <p>
                <strong>Dresden bicycle accidents 2024:</strong>{" "}
                {dresdenBicycle2024.bicycle_accidents}
              </p>
            ) : (
              <p>Dresden bicycle accidents 2024: No data loaded yet.</p>
            )}

            <p>
              <strong>Highest accident rate city:</strong>
            </p>

            {highestRateCity ? (
              <p>
                {highestRateCity.region_name}: {highestRateCity.value} accidents
                per 10,000 inhabitants
              </p>
            ) : (
              <p>No data loaded yet.</p>
            )}
          </div>

          <MonthlyChart data={monthlyData} />

          <hr />

          <AccidentRatesComparisonChart
            topRankings={topRankings}
            bottomRankings={bottomRankings}
          />
        </aside>

        <section className="map-section">
          <AccidentMap
            accidents={accidents}
            showCountryOutline={showCountryOutline}
            showBaseMap={showBaseMap}
          />
        </section>
      </main>
    </div>
  );
}

export default App;