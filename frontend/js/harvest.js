// frontend/js/harvest.js
document.addEventListener('DOMContentLoaded', function () {
  var t = Lang.t, getText = Lang.getText, lang = Lang.getLanguage();
  var selectedCrop = 'grapes';
  var trendChartInstance = null;

  var crops = [
    { id:'grapes', name:'Grapes', icon:'🍇', nameMr:'द्राक्षे', nameHi:'अंगूर' },
    { id:'onions', name:'Onions', icon:'🧅', nameMr:'कांदे', nameHi:'प्याज' },
    { id:'tomatoes', name:'Tomatoes', icon:'🍅', nameMr:'टोमॅटो', nameHi:'टमाटर' },
    { id:'corn', name:'Corn', icon:'🌽', nameMr:'मका', nameHi:'मक्का' },
    { id:'wheat', name:'Wheat', icon:'🌾', nameMr:'गहू', nameHi:'गेहूं' },
    { id:'soybeans', name:'Soybeans', icon:'🌱', nameMr:'सोयाबीन', nameHi:'सोयाबीन' },
    { id:'sugarcane', name:'Sugarcane', icon:'🎋', nameMr:'ऊस', nameHi:'गन्ना' },
    { id:'cotton', name:'Cotton', icon:'☁️', nameMr:'कापूस', nameHi:'कपास' },
    { id:'rice', name:'Rice', icon:'🍚', nameMr:'तांदूळ', nameHi:'चावल' },
    { id:'pomegranate', name:'Pomegranate', icon:'🍎', nameMr:'डाळिंब', nameHi:'अनार' },
    { id:'bajra', name:'Bajra', icon:'🌾', nameMr:'बाजरी', nameHi:'बाजरा' },
    { id:'groundnut', name:'Groundnut', icon:'🥜', nameMr:'भुईमूग', nameHi:'मूंगफली' }
  ];

  var priceData = {
    grapes:{current:4500,trend:'up',change:5,markets:[{name:'Lasalgaon',price:4500,change:5},{name:'Pimpalgaon',price:4450,change:4},{name:'Nashik',price:4400,change:3}],weeklyTrend:[{day:'Mon',price:4200},{day:'Tue',price:4250},{day:'Wed',price:4300},{day:'Thu',price:4350},{day:'Fri',price:4400},{day:'Sat',price:4450},{day:'Sun',price:4500}],recommendation:{action:'wait',days:3,expectedPrice:4800,reason:'Price expected to rise'}},
    onions:{current:2800,trend:'down',change:-3,markets:[{name:'Lasalgaon',price:2800,change:-3},{name:'Pimpalgaon',price:2850,change:-2},{name:'Nashik',price:2750,change:-4}],weeklyTrend:[{day:'Mon',price:2950},{day:'Tue',price:2920},{day:'Wed',price:2900},{day:'Thu',price:2880},{day:'Fri',price:2850},{day:'Sat',price:2820},{day:'Sun',price:2800}],recommendation:{action:'sell',days:0,expectedPrice:2800,reason:'Ideal selling window now'}},
    tomatoes:{current:3500,trend:'stable',change:0,markets:[{name:'Lasalgaon',price:3500,change:0},{name:'Pimpalgaon',price:3480,change:-1},{name:'Nashik',price:3520,change:1}],weeklyTrend:[{day:'Mon',price:3400},{day:'Tue',price:3420},{day:'Wed',price:3450},{day:'Thu',price:3480},{day:'Fri',price:3500},{day:'Sat',price:3500},{day:'Sun',price:3500}],recommendation:{action:'sellNow',days:0,expectedPrice:3500,reason:'Price peak reached'}},
    corn:{current:2200,trend:'up',change:2,markets:[{name:'Lasalgaon',price:2200,change:2},{name:'Pimpalgaon',price:2150,change:1},{name:'Nashik',price:2250,change:3}],weeklyTrend:[{day:'Mon',price:2100},{day:'Tue',price:2120},{day:'Wed',price:2150},{day:'Thu',price:2180},{day:'Fri',price:2190},{day:'Sat',price:2200},{day:'Sun',price:2200}],recommendation:{action:'wait',days:5,expectedPrice:2400,reason:'Demand is increasing'}},
    wheat:{current:2800,trend:'stable',change:0,markets:[{name:'Lasalgaon',price:2800,change:0},{name:'Pimpalgaon',price:2780,change:-1},{name:'Nashik',price:2820,change:1}],weeklyTrend:[{day:'Mon',price:2750},{day:'Tue',price:2780},{day:'Wed',price:2800},{day:'Thu',price:2800},{day:'Fri',price:2800},{day:'Sat',price:2800},{day:'Sun',price:2800}],recommendation:{action:'wait',days:10,expectedPrice:2900,reason:'Prices are stable'}},
    soybeans:{current:4200,trend:'down',change:-2,markets:[{name:'Lasalgaon',price:4200,change:-2},{name:'Pimpalgaon',price:4250,change:-1},{name:'Nashik',price:4150,change:-3}],weeklyTrend:[{day:'Mon',price:4400},{day:'Tue',price:4350},{day:'Wed',price:4300},{day:'Thu',price:4250},{day:'Fri',price:4200},{day:'Sat',price:4200},{day:'Sun',price:4200}],recommendation:{action:'sell',days:0,expectedPrice:4200,reason:'Prices are going down rapidly'}},
    sugarcane:{current:310,trend:'stable',change:0,markets:[{name:'Lasalgaon',price:310,change:0},{name:'Pimpalgaon',price:305,change:-1},{name:'Nashik',price:315,change:1}],weeklyTrend:[{day:'Mon',price:310},{day:'Tue',price:310},{day:'Wed',price:310},{day:'Thu',price:310},{day:'Fri',price:310},{day:'Sat',price:310},{day:'Sun',price:310}],recommendation:{action:'wait',days:15,expectedPrice:320,reason:'Govt FRP expected to increase'}},
    cotton:{current:7200,trend:'up',change:3,markets:[{name:'Lasalgaon',price:7200,change:3},{name:'Pimpalgaon',price:7150,change:2},{name:'Nashik',price:7250,change:4}],weeklyTrend:[{day:'Mon',price:7000},{day:'Tue',price:7050},{day:'Wed',price:7100},{day:'Thu',price:7150},{day:'Fri',price:7180},{day:'Sat',price:7200},{day:'Sun',price:7200}],recommendation:{action:'sellNow',days:0,expectedPrice:7200,reason:'Good export demand driving prices'}},
    rice:{current:5500,trend:'stable',change:1,markets:[{name:'Lasalgaon',price:5500,change:1},{name:'Pimpalgaon',price:5450,change:0},{name:'Nashik',price:5550,change:2}],weeklyTrend:[{day:'Mon',price:5450},{day:'Tue',price:5480},{day:'Wed',price:5500},{day:'Thu',price:5500},{day:'Fri',price:5500},{day:'Sat',price:5500},{day:'Sun',price:5500}],recommendation:{action:'wait',days:5,expectedPrice:5600,reason:'Stable demand'}},
    pomegranate:{current:8500,trend:'down',change:-4,markets:[{name:'Lasalgaon',price:8500,change:-4},{name:'Pimpalgaon',price:8600,change:-3},{name:'Nashik',price:8400,change:-5}],weeklyTrend:[{day:'Mon',price:8900},{day:'Tue',price:8800},{day:'Wed',price:8700},{day:'Thu',price:8600},{day:'Fri',price:8500},{day:'Sat',price:8500},{day:'Sun',price:8500}],recommendation:{action:'sell',days:0,expectedPrice:8500,reason:'New arrivals increasing, prices dropping'}},
    bajra:{current:2100,trend:'up',change:2,markets:[{name:'Lasalgaon',price:2100,change:2},{name:'Pimpalgaon',price:2050,change:1},{name:'Nashik',price:2150,change:3}],weeklyTrend:[{day:'Mon',price:2000},{day:'Tue',price:2020},{day:'Wed',price:2050},{day:'Thu',price:2080},{day:'Fri',price:2090},{day:'Sat',price:2100},{day:'Sun',price:2100}],recommendation:{action:'wait',days:3,expectedPrice:2200,reason:'Steady upward trend'}},
    groundnut:{current:6800,trend:'stable',change:0,markets:[{name:'Lasalgaon',price:6800,change:0},{name:'Pimpalgaon',price:6750,change:-1},{name:'Nashik',price:6850,change:1}],weeklyTrend:[{day:'Mon',price:6800},{day:'Tue',price:6800},{day:'Wed',price:6800},{day:'Thu',price:6800},{day:'Fri',price:6800},{day:'Sat',price:6800},{day:'Sun',price:6800}],recommendation:{action:'wait',days:7,expectedPrice:7000,reason:'Festival demand upcoming'}}
  };

  function cn(id) { var c = crops.find(function(x){return x.id===id;}); if(!c) return id; return lang==='mr'?c.nameMr:lang==='hi'?c.nameHi:c.name; }
  function trendIcon(tr) { return tr==='up'?'<i class="fas fa-arrow-up"></i>':tr==='down'?'<i class="fas fa-arrow-down"></i>':'<i class="fas fa-minus"></i>'; }
  function trendColor(tr) { return tr==='up'?'text-green-600':tr==='down'?'text-red':'text-muted'; }
  function badgeClass(ch) { return ch>0?'badge-green':ch<0?'badge-red':'badge-gray'; }

  // Translate nav
  document.getElementById('navBrand').textContent = t('agriSmart');
  document.getElementById('navHome').innerHTML = '<i class="fas fa-home"></i> ' + t('home');
  document.getElementById('navPlanting').innerHTML = '<i class="fas fa-seedling"></i> ' + t('plantingInsights');
  document.getElementById('navIrrigation').innerHTML = '<i class="fas fa-water"></i> ' + t('irrigationControl');
  document.getElementById('navHarvest').innerHTML = '<i class="fas fa-shopping-cart"></i> ' + t('harvestingUpdates');
  document.getElementById('bnHome').textContent = t('home');
  document.getElementById('bnPlanting').textContent = t('plantingInsights');
  document.getElementById('bnIrrigation').textContent = t('irrigationControl');
  document.getElementById('bnHarvest').textContent = t('harvestingUpdates');
  document.getElementById('bnProfile').textContent = t('profile');
  document.getElementById('pageTitle').textContent = getText('Market Updates','काढणी व बाजार','कटाई और बाजार');
  document.getElementById('selectCropTitle').textContent = getText('Select Crop','पीक निवडा','फसल चुनें');

  // Load location
  api.profile.getProfile().then(function(d){ if(d&&d.location) document.getElementById('userLoc').textContent='📍 '+d.location.split(',')[0]; });

  // Crop grid
  function renderCropGrid() {
    var h = '';
    crops.forEach(function(c) {
      h += '<button class="crop-btn' + (c.id===selectedCrop?' active':'') + '" data-crop="'+c.id+'"><span class="crop-icon">'+c.icon+'</span><span class="crop-name">'+cn(c.id)+'</span></button>';
    });
    document.getElementById('cropGrid').innerHTML = h;
    document.querySelectorAll('#cropGrid .crop-btn').forEach(function(btn) {
      btn.addEventListener('click', function() { selectedCrop = this.dataset.crop; renderAll(); });
    });
  }

  // Price cards
  function renderPriceCards() {
    var h = '';
    crops.forEach(function(c) {
      var d = priceData[c.id];
      h += '<div class="price-card'+(c.id===selectedCrop?' active':'')+'" data-crop="'+c.id+'"><div class="flex items-center justify-between"><div class="flex items-center gap-2"><span style="font-size:1.5rem;">'+c.icon+'</span><div><p class="font-semibold text-dark text-sm">'+cn(c.id)+'</p></div></div><div class="text-right"><p class="text-lg font-bold text-dark">₹'+d.current+'</p><p class="text-xs flex items-center gap-1 justify-end '+trendColor(d.trend)+'">'+trendIcon(d.trend)+d.change+'%</p></div></div></div>';
    });
    document.getElementById('priceCards').innerHTML = h;
    document.getElementById('mandiTitle').textContent = getText("Today's Mandi Prices",'आजचे बाजार भाव','आज के मंडी भाव') + ' - ' + document.getElementById('userLoc').textContent.replace('📍 ','');
    document.querySelectorAll('#priceCards .price-card').forEach(function(card) {
      card.addEventListener('click', function() { selectedCrop = this.dataset.crop; renderAll(); });
    });
  }

  // Chart
  function renderChart() {
    var d = priceData[selectedCrop];
    document.getElementById('trendTitle').textContent = getText('7-Day Price Trend','७ दिवसांचा किंमत ट्रेंड','७ दिन का मूल्य रुझान') + ' - ' + cn(selectedCrop);
    if (trendChartInstance) trendChartInstance.destroy();
    trendChartInstance = new Chart(document.getElementById('trendChart'), {
      type: 'line',
      data: { labels: d.weeklyTrend.map(function(x){return x.day;}), datasets: [{ label: cn(selectedCrop), data: d.weeklyTrend.map(function(x){return x.price;}), borderColor: '#1B5E20', borderWidth: 3, pointBackgroundColor: '#1B5E20', pointRadius: 6, fill: false, tension: 0.3 }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x:{ticks:{color:'#546E7A',font:{size:12}}}, y:{ticks:{color:'#546E7A',font:{size:12}}} } }
    });
  }

  // Sell card
  function renderSellCard() {
    var d = priceData[selectedCrop];
    var r = d.recommendation;
    var actionText = '';
    if (r.action==='sell') actionText = '✅ ' + getText('SELL NOW','आता विका','अभी बेचें');
    else if (r.action==='wait') actionText = '⏳ ' + getText('WAIT','प्रतीक्षा करा','प्रतीक्षा करें') + ' ' + r.days + ' ' + getText('days','दिवस','दिन');
    else actionText = '⚠️ ' + getText('SELL NOW','आता विका','अभी बेचें');

    document.getElementById('sellCard').innerHTML =
      '<h2 class="text-xl font-bold mb-4 flex items-center gap-2"><i class="fas fa-check-circle" style="color:#FBC02D;"></i> '+getText('Best Time to Sell','विक्रीसाठी सर्वोत्तम वेळ','बेचने का सर्वोत्तम समय')+' - '+cn(selectedCrop)+'</h2>' +
      '<div class="stat-box-glass" style="padding:1.25rem;border-radius:.75rem;">' +
        '<div class="text-center mb-4"><p class="text-3xl font-bold mb-2">'+actionText+'</p><p class="text-white-90">'+getText('Expected Price','अपेक्षित किंमत','अपेक्षित कीमत')+': ₹'+r.expectedPrice+'</p><p class="text-sm text-white-80 mt-2">'+r.reason+'</p></div>' +
        '<div class="grid grid-2 gap-3"><div class="stat-box-glass"><p class="text-xs opacity-80">'+getText('Current Price','सध्याची किंमत','वर्तमान कीमत')+'</p><p class="text-lg font-semibold">₹'+d.current+'</p></div><div class="stat-box-glass"><p class="text-xs opacity-80">'+getText('Change','बदल','बदलाव')+'</p><p class="text-lg font-semibold '+(d.trend==='up'?'':d.trend==='down'?'style="color:#FCA5A5;"':'')+'">'+d.change+'%</p></div></div>' +
      '</div>';
  }

  // Comparison table
  function renderTable() {
    var d = priceData[selectedCrop];
    document.getElementById('compTitle').textContent = getText('Market Comparison','बाजार तुलना','बाजार तुलना') + ' - ' + cn(selectedCrop);
    var h = '<thead><tr><th>'+getText('Market','बाजार','बाजार')+'</th><th class="text-right">'+getText('Price (₹)','किंमत (₹)','कीमत (₹)')+'</th><th class="text-right">'+getText('Change','बदल','बदलाव')+'</th></tr></thead><tbody>';
    d.markets.forEach(function(m) {
      h += '<tr><td class="font-medium">'+m.name+'</td><td class="text-right font-semibold">₹'+m.price+'</td><td class="text-right"><span class="badge '+badgeClass(m.change)+'">'+trendIcon(m.change>0?'up':m.change<0?'down':'stable')+' '+Math.abs(m.change)+'%</span></td></tr>';
    });
    h += '</tbody>';
    document.getElementById('compTable').innerHTML = h;
  }

  function renderAll() { renderCropGrid(); renderPriceCards(); renderChart(); renderSellCard(); renderTable(); }
  renderAll();
});
