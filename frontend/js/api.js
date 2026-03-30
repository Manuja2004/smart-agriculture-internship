// frontend/js/api.js — Direct port of React API service (no ES modules)
var API_BASE = 'http://localhost:5001/api';

var api = {
  profile: {
    getProfile: async function () {
      try {
        var res = await fetch(API_BASE + '/profile');
        return await res.json();
      } catch (e) {
        console.log('Using mock profile data');
        return { name: 'Ashok Farmer', location: 'Dindori Taluka, Nashik', farmSize: '12.5 acres', language: 'en' };
      }
    },
    updateProfile: async function (data) {
      try {
        var res = await fetch(API_BASE + '/profile', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        return await res.json();
      } catch (e) {
        console.log('Profile update failed - using mock');
        return { profile: data };
      }
    }
  },
  weather: {
    getWeather: async function (taluka) {
      try {
        var res = await fetch(API_BASE + '/weather/' + taluka);
        return await res.json();
      } catch (e) {
        console.log('Using mock weather data');
        return { location: taluka, temperature: { current: 28, min: 20, max: 32 }, rainfall: { probability: 30 }, humidity: 65, forecast: [{ day: 'Today', temp: 28, condition: 'Sunny' }, { day: 'Tomorrow', temp: 27, condition: 'Cloudy' }, { day: 'Day 3', temp: 26, condition: 'Rain' }] };
      }
    }
  },
  mandi: {
    getCropPrice: async function (crop) {
      try {
        var res = await fetch(API_BASE + '/mandi/' + crop);
        var data = await res.json();
        return { current: data.modalPrice || 4000, trend: data.marketSentiment === 'bullish' ? 'up' : data.marketSentiment === 'bearish' ? 'down' : 'stable', change: data.priceChange || 5, markets: [{ name: data.mandi || 'Lasalgaon', price: data.modalPrice || 4000, change: data.priceChange || 5 }], weeklyTrend: data.trend || [{ day: 'Mon', price: 3800 }, { day: 'Tue', price: 3850 }, { day: 'Wed', price: 3900 }, { day: 'Thu', price: 3950 }, { day: 'Fri', price: 4000 }, { day: 'Sat', price: 4050 }, { day: 'Sun', price: 4100 }], recommendation: { action: data.priceChange > 5 ? 'wait' : 'sellNow', days: 3, expectedPrice: data.modalPrice ? data.modalPrice * 1.05 : 4200, reason: data.benchmark || 'Market trend suggests waiting' } };
      } catch (e) {
        console.log('Using mock market data');
        var mock = getMockPriceData();
        return mock[crop] || mock.grapes;
      }
    },
    getAllPrices: async function () {
      try {
        var res = await fetch(API_BASE + '/mandi');
        return await res.json();
      } catch (e) {
        return getMockPriceData();
      }
    }
  },
  crops: {
    getCalendar: async function (crop) {
      try {
        var res = await fetch(API_BASE + '/crops/' + crop + '/calendar');
        return await res.json();
      } catch (e) { return { plantingWindow: 'November - February', harvestingWindow: 'February - April', tips: 'Plant after first winter rains' }; }
    },
    getTips: async function (crop) {
      try {
        var res = await fetch(API_BASE + '/crops/' + crop + '/tips');
        return await res.json();
      } catch (e) { return { variety: 'Local variety', water: 'Drip irrigation recommended', fertilizer: 'Apply NPK as per soil test', pests: 'Monitor regularly' }; }
    }
  },
  recommendations: {
    getPlantingAdvice: async function (crop, taluka) {
      try {
        var res = await fetch(API_BASE + '/recommendations/planting', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ crop: crop, taluka: taluka }) });
        return await res.json();
      } catch (e) { return { shouldPlant: Math.random() > 0.5, daysToWait: 5, message: 'Weather conditions are moderate', reason: 'Check soil moisture before planting' }; }
    },
    getIrrigationAdvice: async function (crop, taluka, soilMoisture) {
      soilMoisture = soilMoisture || 50;
      try {
        var res = await fetch(API_BASE + '/recommendations/irrigation', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ crop: crop, taluka: taluka, soilMoisture: soilMoisture }) });
        return await res.json();
      } catch (e) { return { shouldIrrigate: soilMoisture < 40, duration: 30, currentMoisture: soilMoisture, requiredMoisture: 70, bestTime: 'Morning 6-8 AM' }; }
    },
    getHarvestAdvice: async function (crop) {
      try {
        var res = await fetch(API_BASE + '/recommendations/harvest', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ crop: crop }) });
        return await res.json();
      } catch (e) { return { advice: 'Market prices are stable', bestTime: 'This week', confidence: 'Medium' }; }
    }
  }
};

function getMockPriceData() {
  return { grapes: { current: 4500, trend: 'up', change: 5 }, onions: { current: 2800, trend: 'down', change: -3 }, tomatoes: { current: 3500, trend: 'stable', change: 0 } };
}
