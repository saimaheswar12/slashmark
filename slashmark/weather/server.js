require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const API_KEY = process.env.WEATHER_API_KEY;

console.log("✅ Using API Key:", API_KEY); // Debugging log

app.get("/weather", async (req, res) => {
  const { city } = req.query;
  if (!city) {
    return res.status(400).json({ error: "City parameter is required" });
  }

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;
  console.log("🌍 Fetching from URL:", url); // Debug log

  try {
    const response = await axios.get(url);
    res.json({
      city: response.data.city.name,
      forecast: response.data.list.slice(0, 5),
    });
  } catch (error) {
    console.error("❌ Error fetching weather data:", error.response?.data || error.message);
    res.status(500).json({
      error: "Error fetching weather data",
      details: error.response?.data || error.message,
    });
  }
});

app.listen(5000, () => console.log("✅ Backend running on port 5000"));
