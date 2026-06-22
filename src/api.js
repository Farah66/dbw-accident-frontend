import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export async function getAccidents(filters) {
  const res = await axios.get(`${API_BASE}/accidents`, {
    params: filters,
  });

  return res.data;
}

export async function getSummary(filters) {
  const res = await axios.get(`${API_BASE}/aggregates/summary`, {
    params: filters,
  });

  return res.data;
}

export async function getMonthlyStats(filters) {
  const res = await axios.get(`${API_BASE}/aggregates/monthly`, {
    params: filters,
  });

  return res.data;
}
export async function getTopRankings(limit = 10) {
  const res = await axios.get(`${API_BASE}/rankings/top`, {
    params: { limit },
  });

  return res.data;
}

export async function getBottomRankings(limit = 10) {
  const res = await axios.get(`${API_BASE}/rankings/bottom`, {
    params: { limit },
  });

  return res.data;
}
export async function getHighestAccidentRateCity() {
  const res = await axios.get(`${API_BASE}/rankings/highest-accident-rate-city`);
  return res.data;
}

export async function getDresdenBicycle2024() {
  const res = await axios.get(`${API_BASE}/aggregates/dresden-bicycle-2024`);
  return res.data;
}

export async function getTopFatalDistricts2024() {
  const res = await axios.get(`${API_BASE}/aggregates/top-fatal-districts-2024`);
  return res.data;
}

export async function getZeroAccidentMunicipalitiesSaxony2023() {
  const res = await fetch(
    `${API_BASE}/aggregates/zero-accident-municipalities-saxony-2023`
  );

  return res.json();
}