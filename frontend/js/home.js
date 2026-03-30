// frontend/js/home.js
document.addEventListener('DOMContentLoaded', function () {
  var t = Lang.t, getText = Lang.getText, lang = Lang.getLanguage();

  // ---------- Translate static text ----------
  document.getElementById('navBrand').textContent = t('agriSmart');
  document.getElementById('navHome').innerHTML = '<i class="fas fa-home"></i> ' + t('home');
  document.getElementById('navPlanting').innerHTML = '<i class="fas fa-seedling"></i> ' + t('plantingInsights');
  document.getElementById('navIrrigation').innerHTML = '<i class="fas fa-water"></i> ' + t('irrigationControl');
  document.getElementById('navHarvest').innerHTML = '<i class="fas fa-shopping-cart"></i> ' + t('harvestingUpdates');
  document.getElementById('weatherTitle').textContent = t('weatherForecast');
  document.getElementById('fcPlantTitle').textContent = t('plantingInsights');
  document.getElementById('fcPlantDesc').textContent = t('bestCrops');
  document.getElementById('fcPlantLink').innerHTML = t('viewRecommendations') + ' <i class="fas fa-chevron-right text-xs"></i>';
  document.getElementById('fcHarvestTitle').textContent = t('harvestingUpdates');
  document.getElementById('fcHarvestDesc').textContent = t('cropMaturity');
  document.getElementById('fcHarvestLink').innerHTML = t('checkYield') + ' <i class="fas fa-chevron-right text-xs"></i>';
  document.getElementById('fcIrrigTitle').textContent = t('irrigationControl');
  document.getElementById('fcIrrigDesc').textContent = t('soilMoisture');
  document.getElementById('fcIrrigLink').innerHTML = t('manageWatering') + ' <i class="fas fa-chevron-right text-xs"></i>';
  document.getElementById('marketTitle').textContent = t('marketInsights');
  document.getElementById('pieTitle').textContent = t('cropDistribution');
  document.getElementById('pieSubtitle').textContent = t('acresTotal');
  document.getElementById('lineTitle').textContent = t('priceTrends');
  document.getElementById('barTitle').textContent = t('yieldComparison');
  document.getElementById('ctaTitle').textContent = t('aiTitle');
  document.getElementById('ctaDesc').textContent = t('aiDescription');
  document.getElementById('ctaBtn').innerHTML = t('exploreDashboard') + ' <i class="fas fa-chevron-right"></i>';
  document.getElementById('ftAbout').textContent = t('about');
  document.getElementById('ftAboutText').textContent = t('aboutText');
  document.getElementById('ftQuickLinks').textContent = t('quickLinks');
  document.getElementById('ftHome').textContent = t('home');
  document.getElementById('ftPlanting').textContent = t('plantingInsights');
  document.getElementById('ftIrrigation').textContent = t('irrigationControl');
  document.getElementById('ftHarvest').textContent = t('harvestingUpdates');
  document.getElementById('ftProfile').textContent = t('profile');
  document.getElementById('ftSupport').textContent = t('support');
  document.getElementById('ftContact').textContent = t('contactUs');
  document.getElementById('ftFaq').textContent = t('faq');
  document.getElementById('ftPrivacy').textContent = t('privacyPolicy');
  document.getElementById('ftTerms').textContent = t('termsOfService');
  document.getElementById('ftConnect').textContent = t('connect');
  document.getElementById('ftBrand').textContent = t('agriSmart');
  document.getElementById('ftRights').textContent = t('allRightsReserved');

  // Responsive grids
  var featureCards = document.getElementById('featureCards');
  featureCards.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
  var chartsGrid = document.getElementById('chartsGrid');
  chartsGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(320px, 1fr))';
  var footerGrid = document.querySelector('#footer > .grid');
  if (footerGrid) footerGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';

  // ---------- Profile / Username ----------
  api.profile.getProfile().then(function (data) {
    if (data && data.name) {
      document.getElementById('welcomeText').textContent = t('welcomeBack') + ' ' + data.name;
    }
  });
  document.getElementById('welcomeSub').innerHTML = t('farmHealthy') + ' <span class="text-amber font-semibold">3</span> ' + t('notifications');

  // ---------- Weather ----------
  var weatherDateStr = new Date().toLocaleDateString(
    lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-GB',
    { weekday: 'long', day: 'numeric', month: 'long' }
  );
  document.getElementById('weatherDate').textContent = weatherDateStr;

  function getCondition(code) {
    if (code === 0) return { key: 'sunny', icon: '☀️' };
    if (code >= 1 && code <= 3) return { key: 'cloudy', icon: '⛅' };
    if (code >= 45 && code <= 48) return { key: 'foggy', icon: '🌫️' };
    if (code >= 51 && code <= 65) return { key: 'rainy', icon: '🌧️' };
    if (code >= 71 && code <= 77) return { key: 'snowy', icon: '❄️' };
    if (code >= 95) return { key: 'stormy', icon: '⛈️' };
    return { key: 'sunny', icon: '☀️' };
  }

  function renderWeather(weatherRes, locName) {
    var daysEn = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    if (weatherRes) {
      var cond = getCondition(weatherRes.current.weather_code);
      document.getElementById('weatherTemp').textContent = Math.round(weatherRes.current.temperature_2m) + '°C';
      document.getElementById('weatherIcon').textContent = cond.icon;
      document.getElementById('weatherCond').textContent = t(cond.key);
      document.getElementById('weatherLoc').textContent = locName || t('location');
      // Inline forecast
      var inlineHtml = '';
      var gridHtml = '';
      for (var i = 1; i <= 5; i++) {
        var dateObj = new Date(weatherRes.daily.time[i]);
        var dayKey = daysEn[dateObj.getDay()];
        var fc = getCondition(weatherRes.daily.weather_code[i]);
        var tmp = Math.round(weatherRes.daily.temperature_2m_max[i]);
        inlineHtml += '<div class="text-center"><p class="text-xs opacity-80">' + t(dayKey) + '</p><p class="font-semibold text-sm">' + tmp + '°</p></div>';
        gridHtml += '<div class="forecast-tile"><p class="text-muted text-sm font-medium">' + t(dayKey) + '</p><p class="text-2xl my-1">' + fc.icon + '</p><p class="font-semibold text-dark">' + tmp + '°C</p></div>';
      }
      document.getElementById('weatherForecastInline').innerHTML = inlineHtml;
      document.getElementById('forecastGrid').innerHTML = gridHtml;
    } else {
      document.getElementById('weatherTemp').textContent = '28°C';
      document.getElementById('weatherIcon').textContent = '☀️';
      document.getElementById('weatherCond').textContent = t('sunny');
      document.getElementById('weatherLoc').textContent = locName || t('location');
      var fallback = [
        { k: 'mon', temp: 28, icon: '☀️' }, { k: 'tue', temp: 27, icon: '⛅' },
        { k: 'wed', temp: 26, icon: '☁️' }, { k: 'thu', temp: 25, icon: '🌧️' },
        { k: 'fri', temp: 27, icon: '☀️' }
      ];
      var ih = '', gh = '';
      fallback.forEach(function (d) {
        ih += '<div class="text-center"><p class="text-xs opacity-80">' + t(d.k) + '</p><p class="font-semibold text-sm">' + d.temp + '°</p></div>';
        gh += '<div class="forecast-tile"><p class="text-muted text-sm font-medium">' + t(d.k) + '</p><p class="text-2xl my-1">' + d.icon + '</p><p class="font-semibold text-dark">' + d.temp + '°C</p></div>';
      });
      document.getElementById('weatherForecastInline').innerHTML = ih;
      document.getElementById('forecastGrid').innerHTML = gh;
    }
  }

  function fetchWeather(lat, lon, locName) {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon + '&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,precipitation_probability_max&timezone=auto')
      .then(function (r) { return r.json(); })
      .then(function (data) { renderWeather(data, locName); })
      .catch(function () { renderWeather(null, locName); });
  }

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function (pos) {
      var lat = pos.coords.latitude, lon = pos.coords.longitude;
      fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + lon)
        .then(function (r) { return r.json(); })
        .then(function (data) {
          var locName = (data.address && (data.address.city || data.address.town || data.address.village || data.address.suburb || data.address.county)) || t('location');
          fetchWeather(lat, lon, locName);
        })
        .catch(function () { fetchWeather(20.0059, 73.7903, ''); });
    }, function () { fetchWeather(20.0059, 73.7903, ''); });
  } else {
    fetchWeather(20.0059, 73.7903, '');
  }

  // ---------- Charts ----------
  var cropDistData = [
    { name: t('grapes'), value: 45, color: '#4CAF50' },
    { name: t('onions'), value: 35, color: '#FBC02D' },
    { name: t('tomatoes'), value: 20, color: '#1B5E20' }
  ];
  // Pie chart
  new Chart(document.getElementById('pieChart'), {
    type: 'doughnut',
    data: {
      labels: cropDistData.map(function (d) { return d.name; }),
      datasets: [{ data: cropDistData.map(function (d) { return d.value; }), backgroundColor: cropDistData.map(function (d) { return d.color; }), borderWidth: 0 }]
    },
    options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false } }, cutout: '55%' }
  });
  // Pie legend
  var legendHtml = '';
  cropDistData.forEach(function (c) {
    legendHtml += '<div class="flex items-center justify-between"><div class="flex items-center gap-2"><div style="width:.75rem;height:.75rem;border-radius:50%;background:' + c.color + '"></div><span class="text-dark">' + c.name + '</span></div><span class="text-green-900 font-semibold">' + c.value + '%</span></div>';
  });
  document.getElementById('pieLegend').innerHTML = legendHtml;

  // Line chart
  var months = [t('jan'), t('feb'), t('mar'), t('apr'), t('may'), t('jun')];
  new Chart(document.getElementById('lineChart'), {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        { label: t('grapes'), data: [85, 90, 75, 60, 50, 45], borderColor: '#4CAF50', borderWidth: 2, pointBackgroundColor: '#4CAF50', fill: false, tension: 0.3 },
        { label: t('onions'), data: [22, 18, 15, 25, 30, 35], borderColor: '#FBC02D', borderWidth: 2, pointBackgroundColor: '#FBC02D', fill: false, tension: 0.3 },
        { label: t('tomatoes'), data: [15, 12, 10, 18, 25, 30], borderColor: '#1B5E20', borderWidth: 2, pointBackgroundColor: '#1B5E20', fill: false, tension: 0.3 }
      ]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: true } }, scales: { x: { ticks: { color: '#546E7A', font: { size: 12 } } }, y: { ticks: { color: '#546E7A', font: { size: 12 } } } } }
  });

  // Bar chart
  var yieldCrops = [t('grapes'), t('onions'), t('tomatoes')];
  new Chart(document.getElementById('barChart'), {
    type: 'bar',
    data: {
      labels: yieldCrops,
      datasets: [
        { label: t('current'), data: [95, 82, 75], backgroundColor: '#4CAF50', borderRadius: 4, barPercentage: 0.5 },
        { label: t('projected'), data: [98, 88, 85], backgroundColor: '#FBC02D', borderRadius: 4, barPercentage: 0.5 }
      ]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: true } }, scales: { x: { ticks: { color: '#546E7A', font: { size: 12 } } }, y: { ticks: { color: '#546E7A', font: { size: 12 } } } } }
  });
});
