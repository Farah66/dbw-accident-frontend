# DBW Accident Frontend – Germany Road Traffic Accident Analysis Platform

A **React-based web application** for visualizing and analyzing road traffic accidents in Germany. The platform enables users to explore accident locations on an interactive map, filter accident data using multiple criteria, and analyze traffic accident statistics through charts, rankings, and summary dashboards.

---

## Technologies Used

### Frontend

* React.js
* Vite
* React Leaflet
* Recharts
* Axios
* CSS

### Backend

* Node.js
* Express.js
* REST API

### Database

* MongoDB

### Dataset

* Official German **Unfallatlas** traffic accident datasets (2022–2024)
* Regional accident indicator datasets
* German municipality and federal state reference datasets

---

# DBW Accident Frontend – Feature List

## 1. Interactive Accident Map

* Displays accident locations across Germany using **React Leaflet** and **OpenStreetMap**.
* Accident locations are displayed as **color-coded markers**:

  * 🔵 Minor accidents
  * 🟡 Serious injury accidents
  * 🔴 Fatal accidents
* Clicking a marker displays accident details including:

  * Year
  * Month
  * Severity

---

## 2. Accident Year Selection

Users can switch between official accident datasets for:

* 2022
* 2023
* 2024

The displayed accident locations, statistics, and charts update according to the selected year.

---

## 3. Federal State Filtering

Users can filter accident data by German federal state.

Available regions include:

* Germany (all states)
* Baden-Württemberg
* Bavaria
* Berlin
* Brandenburg
* Bremen
* Hamburg
* Hessen
* Mecklenburg-Vorpommern
* Lower Saxony
* North Rhine-Westphalia
* Rhineland-Palatinate
* Saarland
* Saxony
* Saxony-Anhalt
* Schleswig-Holstein
* Thuringia

---

## 4. Accident Category Filtering

Users can visualize specific accident types:

* All accidents
* Accidents involving passenger cars
* Accidents involving bicycles
* Accidents involving pedestrians
* Fatal accidents
* Personal injury accidents

Each selection updates the interactive map accordingly.

---

## 5. Interactive City Search

Users can search for any German city.

The application automatically:

* Locates the city using OpenStreetMap Nominatim
* Centers the map on the selected location
* Allows users to inspect nearby accident locations

---

## 6. Summary Dashboard

The dashboard provides an overview of the selected dataset including:

* Total accidents
* Bicycle accidents
* Pedestrian accidents
* Passenger car accidents
* Number of matching accident records
* Number of displayed map locations

---

## 7. Monthly Accident Statistics

Accident data is aggregated by month and displayed as an interactive line chart.

The visualization allows users to identify:

* Monthly accident trends
* Seasonal variations
* Year-specific accident patterns

---

## 8. Accident Rate Comparison

The application compares accident rates between German regions.

Features include:

* Top 10 accident rates
* Bottom 10 accident rates
* Interactive comparison chart
* Ranked regional visualization

---

## 9. Highest Accident Rate Region

Displays the German region with the highest recorded accident rate per 10,000 inhabitants.

---

## 10. Fatal Accident Districts

Displays the districts with the highest number of fatal accidents for the selected dataset.

Results are presented in an expandable ranking table.

---

## 11. Zero-Accident Municipalities

Identifies municipalities with zero recorded accidents for the selected analysis.

The feature helps identify regions with exceptionally low accident occurrence.

---

## 12. Map Layer Controls

Users can customize the map display by enabling or disabling:

* Federal state boundaries
* OpenStreetMap background layer

---

## 13. Interactive Legend

A built-in legend explains the accident marker colors:

* Blue – Accident location
* Yellow – Serious injury accident
* Red – Fatal accident

---

## 14. REST API Integration

The frontend communicates with the backend REST API to retrieve:

* Accident records
* Summary statistics
* Monthly statistics
* Regional rankings
* Fatal accident rankings
* Zero-accident municipality information
* Accident rate indicators

---

## Project Structure

```
src/
│
├── components/
│   ├── AccidentMap.jsx
│   ├── MonthlyChart.jsx
│   ├── AccidentRatesComparisonChart.jsx
│
├── data/
│   └── germany-states.geojson
│
├── api.js
├── App.jsx
├── App.css
└── main.jsx
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/Farah66/dbw-accident-frontend.git
```

Navigate to the project

```bash
cd dbw-accident-frontend
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

## Backend Repository

The backend REST API is available in the companion repository:

https://github.com/Farah66/dbw-accident-backend

---

## Data Source

The application uses official German road traffic accident data provided by:

**Unfallatlas Deutschland**

https://unfallatlas.statistikportal.de/

Additional regional indicator datasets are provided by the German statistical offices.

---

## Author

**Farahnaz Qasimi**

Master's Student

Technische Universität Chemnitz

---

## License

This project was developed as part of the **Database and Web-Based Systems (DBW)** course at **Technische Universität Chemnitz** and is intended for academic purposes.
