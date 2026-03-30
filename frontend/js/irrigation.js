// frontend/js/irrigation.js
document.addEventListener('DOMContentLoaded', function () {
  var t = Lang.t, getText = Lang.getText, lang = Lang.getLanguage();
  var selectedCrop = 'grapes';
  var moistureChartInstance = null;

  var crops = [
    { id:'grapes',name:'Grapes',icon:'🍇',nameMr:'द्राक्षे',nameHi:'अंगूर' },
    { id:'onions',name:'Onions',icon:'🧅',nameMr:'कांदे',nameHi:'प्याज' },
    { id:'tomatoes',name:'Tomatoes',icon:'🍅',nameMr:'टोमॅटो',nameHi:'टमाटर' },
    { id:'corn',name:'Corn',icon:'🌽',nameMr:'मका',nameHi:'मक्का' },
    { id:'wheat',name:'Wheat',icon:'🌾',nameMr:'गहू',nameHi:'गेहूं' },
    { id:'soybeans',name:'Soybeans',icon:'🌱',nameMr:'सोयाबीन',nameHi:'सोयाबीन' },
    { id:'sugarcane',name:'Sugarcane',icon:'🎋',nameMr:'ऊस',nameHi:'गन्ना' },
    { id:'cotton',name:'Cotton',icon:'☁️',nameMr:'कापूस',nameHi:'कपास' },
    { id:'rice',name:'Rice',icon:'🍚',nameMr:'तांदूळ',nameHi:'चावल' },
    { id:'pomegranate',name:'Pomegranate',icon:'🍎',nameMr:'डाळिंब',nameHi:'अनार' },
    { id:'bajra',name:'Bajra',icon:'🌾',nameMr:'बाजरी',nameHi:'बाजरा' },
    { id:'groundnut',name:'Groundnut',icon:'🥜',nameMr:'भुईमूग',nameHi:'मूंगफली' }
  ];

  var irrigationData = {
    grapes:{rainProbability:40,soilMoisture:55,optimalMoisture:75,moistureStatus:'warning',temperature:28,warnings:[{severity:'safe',time:'Now',temp:24,message:'Normal range for grapes'},{severity:'warning',time:'2 PM',temp:32,message:'High temperature expected'},{severity:'critical',time:'Friday',temp:38,message:'Heat wave alert!'}],recommendation:{shouldIrrigate:true,duration:30,currentMoisture:55,requiredMoisture:70,evapotranspiration:5,windSpeed:12,bestTime:'6-8 AM or 5-7 PM'},schedule:[{crop:'Grapes',frequency:'Every 3 days',next:'Tomorrow 6 AM',icon:'🍇'}],moistureForecast:[{day:'Mon',moisture:55},{day:'Tue',moisture:52},{day:'Wed',moisture:48},{day:'Thu',moisture:45},{day:'Fri',moisture:50},{day:'Sat',moisture:55},{day:'Sun',moisture:60}],systemStatus:{drip:'active',sprinklers:'standby',waterLevel:75,pressure:2.5}},
    onions:{rainProbability:30,soilMoisture:65,optimalMoisture:70,moistureStatus:'good',temperature:26,warnings:[{severity:'safe',time:'Now',temp:26,message:'Normal range for onions'},{severity:'warning',time:'3 PM',temp:34,message:'High temperature expected'}],recommendation:{shouldIrrigate:false,duration:0,currentMoisture:65,requiredMoisture:70,evapotranspiration:3,windSpeed:8,bestTime:'Not needed today'},schedule:[{crop:'Onions',frequency:'Every 2 days',next:'Tomorrow 8 AM',icon:'🧅'}],moistureForecast:[{day:'Mon',moisture:65},{day:'Tue',moisture:63},{day:'Wed',moisture:60},{day:'Thu',moisture:58},{day:'Fri',moisture:62},{day:'Sat',moisture:65},{day:'Sun',moisture:68}],systemStatus:{drip:'active',sprinklers:'active',waterLevel:82,pressure:2.8}},
    tomatoes:{rainProbability:50,soilMoisture:45,optimalMoisture:80,moistureStatus:'critical',temperature:30,warnings:[{severity:'warning',time:'Now',temp:30,message:'High temperature for tomatoes'},{severity:'critical',time:'Thursday',temp:40,message:'Extreme heat expected'}],recommendation:{shouldIrrigate:true,duration:45,currentMoisture:45,requiredMoisture:80,evapotranspiration:7,windSpeed:15,bestTime:'Immediately'},schedule:[{crop:'Tomatoes',frequency:'Daily',next:'Now',icon:'🍅'}],moistureForecast:[{day:'Mon',moisture:45},{day:'Tue',moisture:42},{day:'Wed',moisture:40},{day:'Thu',moisture:38},{day:'Fri',moisture:45},{day:'Sat',moisture:50},{day:'Sun',moisture:55}],systemStatus:{drip:'active',sprinklers:'standby',waterLevel:60,pressure:2.2}},
    corn:{rainProbability:20,soilMoisture:60,optimalMoisture:75,moistureStatus:'warning',temperature:32,warnings:[{severity:'warning',time:'Now',temp:32,message:'Temperature rising'}],recommendation:{shouldIrrigate:true,duration:40,currentMoisture:60,requiredMoisture:75,evapotranspiration:6,windSpeed:10,bestTime:'5-7 AM'},schedule:[{crop:'Corn',frequency:'Every 3 days',next:'Tomorrow 5 AM',icon:'🌽'}],moistureForecast:[{day:'Mon',moisture:60},{day:'Tue',moisture:55},{day:'Wed',moisture:50},{day:'Thu',moisture:45},{day:'Fri',moisture:65},{day:'Sat',moisture:70},{day:'Sun',moisture:75}],systemStatus:{drip:'standby',sprinklers:'active',waterLevel:80,pressure:2.5}},
    wheat:{rainProbability:10,soilMoisture:50,optimalMoisture:60,moistureStatus:'warning',temperature:20,warnings:[{severity:'safe',time:'Now',temp:20,message:'Normal temperature'}],recommendation:{shouldIrrigate:true,duration:20,currentMoisture:50,requiredMoisture:60,evapotranspiration:4,windSpeed:8,bestTime:'8-10 AM'},schedule:[{crop:'Wheat',frequency:'Every 7 days',next:'Today 8 AM',icon:'🌾'}],moistureForecast:[{day:'Mon',moisture:50},{day:'Tue',moisture:48},{day:'Wed',moisture:45},{day:'Thu',moisture:42},{day:'Fri',moisture:60},{day:'Sat',moisture:62},{day:'Sun',moisture:65}],systemStatus:{drip:'standby',sprinklers:'active',waterLevel:70,pressure:2.0}},
    soybeans:{rainProbability:35,soilMoisture:65,optimalMoisture:70,moistureStatus:'good',temperature:28,warnings:[{severity:'safe',time:'Now',temp:28,message:'Normal range'}],recommendation:{shouldIrrigate:false,duration:0,currentMoisture:65,requiredMoisture:70,evapotranspiration:5,windSpeed:12,bestTime:'Not needed today'},schedule:[{crop:'Soybeans',frequency:'Every 4 days',next:'Day after tomorrow',icon:'🌱'}],moistureForecast:[{day:'Mon',moisture:65},{day:'Tue',moisture:62},{day:'Wed',moisture:58},{day:'Thu',moisture:55},{day:'Fri',moisture:52},{day:'Sat',moisture:48},{day:'Sun',moisture:70}],systemStatus:{drip:'active',sprinklers:'standby',waterLevel:85,pressure:2.4}},
    sugarcane:{rainProbability:25,soilMoisture:70,optimalMoisture:80,moistureStatus:'warning',temperature:30,warnings:[{severity:'warning',time:'Now',temp:30,message:'High water requirement'}],recommendation:{shouldIrrigate:true,duration:60,currentMoisture:70,requiredMoisture:80,evapotranspiration:8,windSpeed:5,bestTime:'Morning'},schedule:[{crop:'Sugarcane',frequency:'Every 5 days',next:'Today 8 AM',icon:'🎋'}],moistureForecast:[{day:'Mon',moisture:70},{day:'Tue',moisture:68},{day:'Wed',moisture:65},{day:'Thu',moisture:60},{day:'Fri',moisture:85},{day:'Sat',moisture:88},{day:'Sun',moisture:85}],systemStatus:{drip:'standby',sprinklers:'active',waterLevel:60,pressure:2.5}},
    cotton:{rainProbability:10,soilMoisture:55,optimalMoisture:60,moistureStatus:'good',temperature:35,warnings:[{severity:'safe',time:'Now',temp:35,message:'Normal for cotton'}],recommendation:{shouldIrrigate:false,duration:0,currentMoisture:55,requiredMoisture:60,evapotranspiration:6,windSpeed:8,bestTime:'Not needed'},schedule:[{crop:'Cotton',frequency:'Every 8 days',next:'In 3 days',icon:'☁️'}],moistureForecast:[{day:'Mon',moisture:55},{day:'Tue',moisture:54},{day:'Wed',moisture:52},{day:'Thu',moisture:50},{day:'Fri',moisture:48},{day:'Sat',moisture:65},{day:'Sun',moisture:62}],systemStatus:{drip:'active',sprinklers:'standby',waterLevel:75,pressure:2.2}},
    rice:{rainProbability:60,soilMoisture:95,optimalMoisture:100,moistureStatus:'good',temperature:28,warnings:[{severity:'safe',time:'Now',temp:28,message:'Keep water standing'}],recommendation:{shouldIrrigate:true,duration:120,currentMoisture:95,requiredMoisture:100,evapotranspiration:4,windSpeed:3,bestTime:'Anytime'},schedule:[{crop:'Rice',frequency:'Daily',next:'Now',icon:'🍚'}],moistureForecast:[{day:'Mon',moisture:95},{day:'Tue',moisture:90},{day:'Wed',moisture:85},{day:'Thu',moisture:100},{day:'Fri',moisture:100},{day:'Sat',moisture:95},{day:'Sun',moisture:90}],systemStatus:{drip:'standby',sprinklers:'active',waterLevel:40,pressure:2.8}},
    pomegranate:{rainProbability:5,soilMoisture:50,optimalMoisture:65,moistureStatus:'warning',temperature:32,warnings:[{severity:'warning',time:'Now',temp:32,message:'Fruit size affected if dry'}],recommendation:{shouldIrrigate:true,duration:45,currentMoisture:50,requiredMoisture:65,evapotranspiration:5,windSpeed:10,bestTime:'6 AM'},schedule:[{crop:'Pomegranate',frequency:'Every 2 days',next:'Tomorrow',icon:'🍎'}],moistureForecast:[{day:'Mon',moisture:50},{day:'Tue',moisture:68},{day:'Wed',moisture:65},{day:'Thu',moisture:60},{day:'Fri',moisture:55},{day:'Sat',moisture:50},{day:'Sun',moisture:65}],systemStatus:{drip:'active',sprinklers:'standby',waterLevel:90,pressure:2.5}},
    bajra:{rainProbability:15,soilMoisture:45,optimalMoisture:50,moistureStatus:'good',temperature:34,warnings:[{severity:'safe',time:'Now',temp:34,message:'Drought tolerant'}],recommendation:{shouldIrrigate:false,duration:0,currentMoisture:45,requiredMoisture:50,evapotranspiration:7,windSpeed:12,bestTime:'Not needed'},schedule:[{crop:'Bajra',frequency:'As needed',next:'Unknown',icon:'🌾'}],moistureForecast:[{day:'Mon',moisture:45},{day:'Tue',moisture:43},{day:'Wed',moisture:40},{day:'Thu',moisture:38},{day:'Fri',moisture:35},{day:'Sat',moisture:32},{day:'Sun',moisture:50}],systemStatus:{drip:'standby',sprinklers:'standby',waterLevel:80,pressure:2.0}},
    groundnut:{rainProbability:20,soilMoisture:55,optimalMoisture:60,moistureStatus:'good',temperature:29,warnings:[{severity:'safe',time:'Now',temp:29,message:'Ideal conditions'}],recommendation:{shouldIrrigate:false,duration:0,currentMoisture:55,requiredMoisture:60,evapotranspiration:4,windSpeed:8,bestTime:'Not needed'},schedule:[{crop:'Groundnut',frequency:'Every 6 days',next:'In 2 days',icon:'🥜'}],moistureForecast:[{day:'Mon',moisture:55},{day:'Tue',moisture:52},{day:'Wed',moisture:50},{day:'Thu',moisture:62},{day:'Fri',moisture:60},{day:'Sat',moisture:58},{day:'Sun',moisture:55}],systemStatus:{drip:'active',sprinklers:'standby',waterLevel:85,pressure:2.3}}
  };

  function cn(id){var c=crops.find(function(x){return x.id===id;});if(!c)return id;return lang==='mr'?c.nameMr:lang==='hi'?c.nameHi:c.name;}
  function statusColor(s){return s==='good'||s==='safe'?'#22C55E':s==='warning'?'#F59E0B':'#EF4444';}
  function statusBg(s){return s==='good'||s==='safe'?'badge-green-solid':s==='warning'?'badge-yellow-solid':'badge-red-solid';}
  function statusText(s){return s==='good'||s==='safe'?getText('Good','चांगले','अच्छा'):s==='warning'?getText('Warning','सावधान','चेतावनी'):getText('Critical','गंभीर','गंभीर');}

  // Translate nav
  document.getElementById('navBrand').textContent = t('agriSmart');
  document.getElementById('navHome').innerHTML='<i class="fas fa-home"></i> '+t('home');
  document.getElementById('navPlanting').innerHTML='<i class="fas fa-seedling"></i> '+t('plantingInsights');
  document.getElementById('navIrrigation').innerHTML='<i class="fas fa-water"></i> '+t('irrigationControl');
  document.getElementById('navHarvest').innerHTML='<i class="fas fa-shopping-cart"></i> '+t('harvestingUpdates');
  document.getElementById('bnHome').textContent=t('home');
  document.getElementById('bnPlanting').textContent=t('plantingInsights');
  document.getElementById('bnIrrigation').textContent=t('irrigationControl');
  document.getElementById('bnHarvest').textContent=t('harvestingUpdates');
  document.getElementById('bnProfile').textContent=t('profile');
  document.getElementById('pageTitle').textContent=getText('Irrigation Advisor','सिंचन सल्लागार','सिंचाई सलाहकार');
  document.getElementById('cropLabel').textContent=getText('Crop','पीक','फसल');

  // Populate crop select
  var sel=document.getElementById('cropSelect');
  crops.forEach(function(c){var o=document.createElement('option');o.value=c.id;o.textContent=c.icon+' '+cn(c.id);sel.appendChild(o);});
  sel.value=selectedCrop;
  sel.addEventListener('change',function(){selectedCrop=this.value;renderAll();});

  function renderAll(){
    var d=irrigationData[selectedCrop];
    // Rain gauge
    var offset=282.74*(1-d.rainProbability/100);
    document.getElementById('rainCircle').setAttribute('stroke-dashoffset',offset);
    document.getElementById('rainText').textContent=d.rainProbability+'%';
    document.getElementById('rainTitle').textContent=getText('Rain Probability','पावसाची शक्यता','बारिश की संभावना')+' - '+getText('Next 24 Hours','पुढील २४ तास','अगले २४ घंटे');
    document.getElementById('rainSummary').textContent=d.rainProbability+'% '+getText('Chance of Rain','पावसाची शक्यता','बारिश की संभावना');

    // Soil moisture
    var mPct=Math.min((d.soilMoisture/d.optimalMoisture)*100,100);
    var mColor=d.moistureStatus==='good'?'progress-green':d.moistureStatus==='warning'?'progress-yellow':'progress-red';
    document.getElementById('moistureSection').innerHTML=
      '<h2 class="text-lg font-bold text-dark mb-4 flex items-center gap-2"><i class="fas fa-tint text-green-900"></i> '+getText('Soil Moisture','माती ओलावा','मिट्टी की नमी')+' - '+cn(selectedCrop)+'</h2>'+
      '<div class="mb-4"><div class="flex justify-between mb-2"><span class="text-sm text-muted">'+getText('Current Level','सध्याची पातळी','वर्तमान स्तर')+'</span><span class="badge '+statusBg(d.moistureStatus)+'">'+statusText(d.moistureStatus)+'</span></div>'+
      '<div class="progress-bar"><div class="progress-fill '+mColor+'" style="width:'+mPct+'%"></div></div>'+
      '<div class="flex justify-between mt-2 text-sm"><span class="text-muted">'+getText('Current','सध्याचे','वर्तमान')+': '+d.soilMoisture+'%</span><span class="text-muted">'+getText('Optimal','आदर्श','आदर्श')+': '+d.optimalMoisture+'%</span></div></div>'+
      '<div class="grid grid-2 gap-3"><div class="stat-box"><p class="text-xs text-muted">'+getText('Deficit','उणीव','कमी')+'</p><p class="text-lg font-semibold text-dark">'+(d.optimalMoisture-d.soilMoisture)+'%</p></div><div class="stat-box"><p class="text-xs text-muted">'+getText('Status','स्थिती','स्थिति')+'</p><p class="text-lg font-semibold" style="color:'+statusColor(d.moistureStatus)+'">'+statusText(d.moistureStatus)+'</p></div></div>';

    // Warnings
    var wh='<h2 class="text-lg font-bold text-dark mb-4 flex items-center gap-2"><i class="fas fa-thermometer-half text-green-900"></i> '+getText('Temperature Warnings','तापमान इशारे','तापमान चेतावनी')+'</h2><div class="space-y-3">';
    d.warnings.forEach(function(w){
      var cls=w.severity==='safe'?'alert-safe':w.severity==='warning'?'alert-warning':'alert-critical';
      var ico=w.severity==='safe'?'text-green-600':w.severity==='warning'?'text-yellow-700':'text-red-700';
      var sev=w.severity==='safe'?getText('SAFE','सुरक्षित','सुरक्षित'):w.severity==='warning'?getText('WARNING','सावधान','चेतावनी'):getText('CRITICAL','गंभीर','गंभीर');
      wh+='<div class="alert-row '+cls+'"><div class="icon-box-small" style="color:'+statusColor(w.severity)+';background:rgba(0,0,0,.05);"><i class="fas fa-thermometer-half"></i></div><div class="flex-1"><div class="flex justify-between items-start"><h3 class="font-semibold '+ico+'">'+w.time+': '+w.temp+'°C</h3><span class="badge '+statusBg(w.severity)+'">'+sev+'</span></div><p class="text-sm text-dark mt-1">'+w.message+'</p></div></div>';
    });
    wh+='</div>';
    document.getElementById('warningSection').innerHTML=wh;

    // Recommendation
    var r=d.recommendation;
    var act=r.shouldIrrigate?'✅ '+getText('YES','होय','हाँ')+' - '+r.duration+' '+getText('minutes','मिनिटे','मिनट'):'❌ '+getText('NO','नाही','नहीं');
    document.getElementById('recommendSection').innerHTML=
      '<h2 class="text-xl font-bold mb-4 flex items-center gap-2"><i class="fas fa-check-circle" style="color:#FBC02D;"></i> '+getText('Daily Irrigation Recommendation','दैनिक सिंचन शिफारस','दैनिक सिंचाई सिफारिश')+'</h2>'+
      '<div class="stat-box-glass p-5" style="border-radius:var(--radius-xl);">'+
        '<div class="text-center mb-4"><p class="text-2xl font-bold mb-2">'+getText('Should I irrigate today?','आज सिंचन करावे का?','क्या आज सिंचाई करें?')+'</p><p class="text-4xl font-bold mb-2">'+act+'</p></div>'+
        '<div class="grid grid-2 gap-3 mb-4"><div class="stat-box-glass"><p class="text-xs opacity-80">'+getText('Current Moisture','सध्याचा ओलावा','वर्तमान नमी')+'</p><p class="text-lg font-semibold">'+r.currentMoisture+'%</p></div><div class="stat-box-glass"><p class="text-xs opacity-80">'+getText('Required','आवश्यक','आवश्यक')+'</p><p class="text-lg font-semibold">'+r.requiredMoisture+'%</p></div><div class="stat-box-glass"><p class="text-xs opacity-80">'+getText('Evapotranspiration','बाष्पीभवन','वाष्पीकरण')+'</p><p class="text-lg font-semibold">'+r.evapotranspiration+'mm</p></div><div class="stat-box-glass"><p class="text-xs opacity-80">'+getText('Wind Speed','वाऱ्याचा वेग','हवा की गति')+'</p><p class="text-lg font-semibold">'+r.windSpeed+' km/h</p></div></div>'+
        '<p class="text-sm text-white-80 mb-4"><i class="fas fa-clock" style="margin-right:.5rem;"></i>'+getText('Best time','सर्वोत्तम वेळ','सर्वोत्तम समय')+': '+r.bestTime+'</p>'+
        '<button class="btn btn-amber btn-full btn-lg"><i class="fas fa-water"></i> '+getText('Start Irrigation Now','आता सिंचन सुरू करा','अभी सिंचाई शुरू करें')+'</button>'+
      '</div>';

    // Schedule
    var sh='<h2 class="text-lg font-bold text-dark mb-4 flex items-center gap-2"><i class="fas fa-clock text-green-900"></i> '+getText('Irrigation Schedule','सिंचन वेळापत्रक','सिंचाई अनुसूची')+'</h2><div class="space-y-3">';
    d.schedule.forEach(function(s){
      sh+='<div class="flex items-center justify-between p-3" style="background:var(--green-50);border-radius:var(--radius-xl);"><div class="flex items-center gap-3"><span style="font-size:1.5rem;">'+s.icon+'</span><div><p class="font-medium text-dark">'+s.crop+'</p><p class="text-xs text-muted">'+s.frequency+'</p></div></div><div class="text-right"><p class="font-semibold text-green-900 text-sm">'+s.next+'</p></div></div>';
    });
    sh+='</div>';
    document.getElementById('scheduleSection').innerHTML=sh;

    // Chart
    document.getElementById('fcTitle').textContent=getText('7-Day Moisture Forecast','७ दिवसांचा ओलावा अंदाज','७ दिन का नमी पूर्वानुमान');
    if(moistureChartInstance)moistureChartInstance.destroy();
    moistureChartInstance=new Chart(document.getElementById('moistureChart'),{
      type:'line',
      data:{labels:d.moistureForecast.map(function(x){return x.day;}),datasets:[{label:getText('Moisture','ओलावा','नमी'),data:d.moistureForecast.map(function(x){return x.moisture;}),borderColor:'#1B5E20',borderWidth:3,pointBackgroundColor:'#1B5E20',pointRadius:6,fill:false,tension:0.3}]},
      options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{ticks:{color:'#546E7A',font:{size:12}}},y:{ticks:{color:'#546E7A',font:{size:12}}}}}
    });

    // System status
    var ss=d.systemStatus;
    document.getElementById('systemSection').innerHTML=
      '<h2 class="text-lg font-bold text-dark mb-4 flex items-center gap-2"><i class="fas fa-tachometer-alt text-green-900"></i> '+getText('System Status','प्रणाली स्थिती','सिस्टम स्थिति')+'</h2>'+
      '<div class="grid grid-2 gap-4">'+
        '<div class="stat-box"><p class="text-sm text-muted mb-2">'+getText('Drip Irrigation','ठिबक सिंचन','ड्रिप सिंचाई')+'</p><p class="font-semibold '+(ss.drip==='active'?'text-green-600':'text-yellow-700')+'">'+(ss.drip==='active'?'✅ '+getText('Active','सक्रिय','सक्रिय'):'⏸️ '+getText('Standby','स्टँडबाय','स्टैंडबाय'))+'</p></div>'+
        '<div class="stat-box"><p class="text-sm text-muted mb-2">'+getText('Sprinklers','फवारणी','स्प्रिंकलर')+'</p><p class="font-semibold '+(ss.sprinklers==='active'?'text-green-600':'text-yellow-700')+'">'+(ss.sprinklers==='active'?'✅ '+getText('Active','सक्रिय','सक्रिय'):'⏸️ '+getText('Standby','स्टँडबाय','स्टैंडबाय'))+'</p></div>'+
        '<div class="stat-box"><p class="text-sm text-muted mb-2">'+getText('Water Level','पाणी पातळी','जल स्तर')+'</p><p class="font-semibold text-dark">'+ss.waterLevel+'%</p></div>'+
        '<div class="stat-box"><p class="text-sm text-muted mb-2">'+getText('Pressure','दाब','दबाव')+'</p><p class="font-semibold text-dark">'+ss.pressure+' bar</p></div></div>';

    // Decision card
    var dec='';
    if(r.shouldIrrigate){
      dec='<div class="flex items-center gap-3 mb-4"><div style="background:var(--amber-500);padding:.75rem;border-radius:var(--radius-sm);"><i class="fas fa-water" style="color:#fff;font-size:1.25rem;"></i></div><h2 class="text-xl font-semibold text-dark">'+getText("Today's Irrigation Decision",'आजचा सिंचन निर्णय','आज का सिंचाई निर्णय')+'</h2></div><div class="card" style="border:none;box-shadow:none;padding:1.25rem;"><div class="flex items-center gap-4 mb-4"><span style="font-size:3rem;">💧</span><div><p class="text-2xl font-bold text-green-900">'+getText('IRRIGATE TODAY','आज सिंचन करा','आज सिंचाई करें')+'</p><p class="text-sm text-muted mt-1">'+r.duration+' '+getText('minutes recommended','मिनिटे शिफारस','मिनट सिफारिश')+'</p></div></div><p class="text-muted mb-4">'+getText('Best time: ','सर्वोत्तम वेळ: ','सर्वोत्तम समय: ')+r.bestTime+'</p><button class="btn btn-green-solid btn-full flex items-center gap-2"><i class="fas fa-bell"></i> '+getText('Set Reminder','स्मरणपत्र सेट करा','रिमाइंडर सेट करें')+'</button></div>';
    }else{
      dec='<div class="flex items-center gap-3 mb-4"><div style="background:var(--amber-500);padding:.75rem;border-radius:var(--radius-sm);"><i class="fas fa-water" style="color:#fff;font-size:1.25rem;"></i></div><h2 class="text-xl font-semibold text-dark">'+getText("Today's Irrigation Decision",'आजचा सिंचन निर्णय','आज का सिंचाई निर्णय')+'</h2></div><div class="card" style="border:none;box-shadow:none;padding:1.25rem;"><div class="flex items-center gap-4 mb-4"><span style="font-size:3rem;">✅</span><div><p class="text-2xl font-bold text-green-900">'+getText('NO IRRIGATION NEEDED','सिंचन आवश्यक नाही','सिंचाई आवश्यक नहीं')+'</p></div></div><p class="text-muted mb-4">'+getText('Soil moisture is adequate. Check again tomorrow.','मातीतील ओलावा पुरेसा आहे. उद्या पुन्हा तपासा.','मिट्टी की नमी पर्याप्त है। कल फिर जांच करें।')+'</p><button class="btn btn-green-solid btn-full flex items-center gap-2"><i class="fas fa-bell"></i> '+getText('Set Reminder','स्मरणपत्र सेट करा','रिमाइंडर सेट करें')+'</button></div>';
    }
    document.getElementById('decisionSection').innerHTML=dec;
  }

  renderAll();
});
