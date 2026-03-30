// frontend/js/planting.js
document.addEventListener('DOMContentLoaded', function () {
  var t = Lang.t, getText = Lang.getText, lang = Lang.getLanguage();
  var selectedCrop = 'grapes';
  var selectedSeason = 'kharif';

  var seasons = [
    { id:'kharif', name:'Kharif', nameMr:'खरीप', nameHi:'खरीफ' },
    { id:'rabi', name:'Rabi', nameMr:'रब्बी', nameHi:'रबी' },
    { id:'zaid', name:'Zaid', nameMr:'उन्हाळी', nameHi:'ज़ैद' }
  ];

  var crops = [
    { id:'grapes',name:'Grapes',icon:'🍇',nameMr:'द्राक्षे',nameHi:'अंगूर',seasons:['kharif','rabi','zaid'] },
    { id:'onions',name:'Onions',icon:'🧅',nameMr:'कांदे',nameHi:'प्याज',seasons:['kharif','rabi','zaid'] },
    { id:'tomatoes',name:'Tomatoes',icon:'🍅',nameMr:'टोमॅटो',nameHi:'टमाटर',seasons:['kharif','rabi','zaid'] },
    { id:'corn',name:'Corn',icon:'🌽',nameMr:'मका',nameHi:'मक्का',seasons:['kharif','rabi'] },
    { id:'wheat',name:'Wheat',icon:'🌾',nameMr:'गहू',nameHi:'गेहूं',seasons:['rabi'] },
    { id:'soybeans',name:'Soybeans',icon:'🌱',nameMr:'सोयाबीन',nameHi:'सोयाबीन',seasons:['kharif'] },
    { id:'sugarcane',name:'Sugarcane',icon:'🎋',nameMr:'ऊस',nameHi:'गन्ना',seasons:['kharif','rabi','zaid'] },
    { id:'cotton',name:'Cotton',icon:'☁️',nameMr:'कापूस',nameHi:'कपास',seasons:['kharif'] },
    { id:'rice',name:'Rice',icon:'🍚',nameMr:'तांदूळ',nameHi:'चावल',seasons:['kharif','zaid'] },
    { id:'pomegranate',name:'Pomegranate',icon:'🍎',nameMr:'डाळिंब',nameHi:'अनार',seasons:['kharif','rabi','zaid'] },
    { id:'bajra',name:'Bajra',icon:'🌾',nameMr:'बाजरी',nameHi:'बाजरा',seasons:['kharif','zaid'] },
    { id:'groundnut',name:'Groundnut',icon:'🥜',nameMr:'भुईमूग',nameHi:'मूंगफली',seasons:['kharif','rabi','zaid'] }
  ];

  var cropData = {
    grapes:{plantingWindow:{start:'15 March',end:'30 April',startMr:'१५ मार्च',endMr:'३० एप्रिल',startHi:'१५ मार्च',endHi:'३० अप्रैल',successRate:85,idealTemp:'20-28°C',soilMoisture:'Optimal',daysRemaining:12},timeline:{jan:'best',feb:'best',mar:'best',apr:'best',may:'okay',jun:'not',jul:'not',aug:'not',sep:'not',oct:'not',nov:'not',dec:'not'},tips:['Use disease-resistant varieties','Maintain 6-8ft plant spacing','Apply organic mulch','Install drip irrigation','Prune regularly for better yield'],soilRequirements:{ph:'6.0-7.0',nitrogen:'Medium',phosphorus:'High',potassium:'High'}},
    onions:{plantingWindow:{start:'1 January',end:'31 July',startMr:'१ जानेवारी',endMr:'३१ जुलै',startHi:'१ जनवरी',endHi:'३१ जुलाई',successRate:80,idealTemp:'15-25°C',soilMoisture:'Moderate',daysRemaining:45},timeline:{jan:'best',feb:'best',mar:'best',apr:'best',may:'best',jun:'best',jul:'best',aug:'not',sep:'not',oct:'not',nov:'not',dec:'not'},tips:['Plant in well-drained soil','Add nitrogen-rich fertilizer','Water regularly','Remove weeds early','Harvest when tops fall over'],soilRequirements:{ph:'6.2-6.8',nitrogen:'High',phosphorus:'Medium',potassium:'Medium'}},
    tomatoes:{plantingWindow:{start:'1 March',end:'31 July',startMr:'१ मार्च',endMr:'३१ जुलै',startHi:'१ मार्च',endHi:'३१ जुलाई',successRate:82,idealTemp:'18-27°C',soilMoisture:'Optimal',daysRemaining:25},timeline:{jan:'not',feb:'not',mar:'best',apr:'best',may:'best',jun:'best',jul:'best',aug:'okay',sep:'okay',oct:'not',nov:'not',dec:'not'},tips:['Stake plants for support','Water at base not leaves','Mulch to retain moisture','Rotate crops yearly','Remove suckers for better growth'],soilRequirements:{ph:'6.0-6.8',nitrogen:'Medium',phosphorus:'High',potassium:'High'}},
    corn:{plantingWindow:{start:'15 June',end:'15 July',startMr:'१५ जून',endMr:'१५ जुलै',startHi:'१५ जून',endHi:'१५ जुलाई',successRate:85,idealTemp:'25-30°C',soilMoisture:'Moderate',daysRemaining:30},timeline:{jan:'not',feb:'not',mar:'not',apr:'not',may:'okay',jun:'best',jul:'best',aug:'okay',sep:'not',oct:'not',nov:'not',dec:'not'},tips:['Sow in rows','Ensure adequate drainage','Apply balanced NPK'],soilRequirements:{ph:'5.8-7.0',nitrogen:'High',phosphorus:'Medium',potassium:'Medium'}},
    wheat:{plantingWindow:{start:'1 Nov',end:'30 Nov',startMr:'१ नोव्हे',endMr:'३० नोव्हे',startHi:'१ नवं',endHi:'३० नवं',successRate:90,idealTemp:'15-20°C',soilMoisture:'Moderate',daysRemaining:150},timeline:{jan:'okay',feb:'not',mar:'not',apr:'not',may:'not',jun:'not',jul:'not',aug:'not',sep:'not',oct:'okay',nov:'best',dec:'best'},tips:['Prepare fine seedbed','Treat seeds before sowing','Irrigate at CR stage'],soilRequirements:{ph:'6.0-7.0',nitrogen:'Medium',phosphorus:'Medium',potassium:'Medium'}},
    soybeans:{plantingWindow:{start:'15 June',end:'15 July',startMr:'१५ जून',endMr:'१५ जुलै',startHi:'१५ जून',endHi:'१५ जुलाई',successRate:88,idealTemp:'25-30°C',soilMoisture:'Moderate',daysRemaining:30},timeline:{jan:'not',feb:'not',mar:'not',apr:'not',may:'okay',jun:'best',jul:'best',aug:'okay',sep:'not',oct:'not',nov:'not',dec:'not'},tips:['Inoculate with Rhizobium','Maintain weed-free','Ensure good drainage'],soilRequirements:{ph:'6.0-6.8',nitrogen:'Low',phosphorus:'High',potassium:'Medium'}},
    sugarcane:{plantingWindow:{start:'15 Jan',end:'15 Feb',startMr:'१५ जाने',endMr:'१५ फेब्रु',startHi:'१५ जन',endHi:'१५ फर',successRate:90,idealTemp:'25-35°C',soilMoisture:'High',daysRemaining:60},timeline:{jan:'best',feb:'best',mar:'not',apr:'not',may:'not',jun:'not',jul:'not',aug:'not',sep:'not',oct:'not',nov:'not',dec:'okay'},tips:['Use disease free sets','Apply organic manure'],soilRequirements:{ph:'6.5-7.5',nitrogen:'High',phosphorus:'High',potassium:'High'}},
    cotton:{plantingWindow:{start:'1 May',end:'30 Jun',startMr:'१ मे',endMr:'३० जून',startHi:'१ मई',endHi:'३० जन',successRate:85,idealTemp:'20-30°C',soilMoisture:'Moderate',daysRemaining:30},timeline:{jan:'not',feb:'not',mar:'not',apr:'not',may:'best',jun:'best',jul:'okay',aug:'not',sep:'not',oct:'not',nov:'not',dec:'not'},tips:['Sow in ridges','Maintain weed-free for 45 days'],soilRequirements:{ph:'6.0-8.0',nitrogen:'High',phosphorus:'Medium',potassium:'Medium'}},
    rice:{plantingWindow:{start:'1 Jun',end:'30 Jul',startMr:'१ जून',endMr:'३० जुलै',startHi:'१ जून',endHi:'३० जुलाई',successRate:88,idealTemp:'20-35°C',soilMoisture:'High',daysRemaining:45},timeline:{jan:'not',feb:'not',mar:'not',apr:'not',may:'okay',jun:'best',jul:'best',aug:'okay',sep:'not',oct:'not',nov:'not',dec:'not'},tips:['Maintain standing water','Apply balanced NPK'],soilRequirements:{ph:'5.5-6.5',nitrogen:'High',phosphorus:'Low',potassium:'Low'}},
    pomegranate:{plantingWindow:{start:'1 Jul',end:'30 Aug',startMr:'१ जुलै',endMr:'३० ऑगस्ट',startHi:'१ जुलाई',endHi:'३० अगस्त',successRate:80,idealTemp:'25-30°C',soilMoisture:'Moderate',daysRemaining:60},timeline:{jan:'not',feb:'not',mar:'not',apr:'not',may:'not',jun:'okay',jul:'best',aug:'best',sep:'okay',oct:'not',nov:'not',dec:'not'},tips:['Ensure good drainage','Requires regular pruning'],soilRequirements:{ph:'6.5-7.5',nitrogen:'Medium',phosphorus:'High',potassium:'High'}},
    bajra:{plantingWindow:{start:'15 Jun',end:'15 Jul',startMr:'१५ जून',endMr:'१५ जुलै',startHi:'१५ जून',endHi:'१५ जुलाई',successRate:92,idealTemp:'25-35°C',soilMoisture:'Low',daysRemaining:30},timeline:{jan:'not',feb:'not',mar:'not',apr:'not',may:'okay',jun:'best',jul:'best',aug:'okay',sep:'not',oct:'not',nov:'not',dec:'not'},tips:['Sow in shallow depth','Requires less water'],soilRequirements:{ph:'6.0-8.0',nitrogen:'Low',phosphorus:'Medium',potassium:'Low'}},
    groundnut:{plantingWindow:{start:'15 Jun',end:'15 Jul',startMr:'१५ जून',endMr:'१५ जुलै',startHi:'१५ जून',endHi:'१५ जुलाई',successRate:85,idealTemp:'25-30°C',soilMoisture:'Moderate',daysRemaining:30},timeline:{jan:'not',feb:'not',mar:'not',apr:'not',may:'okay',jun:'best',jul:'best',aug:'okay',sep:'not',oct:'not',nov:'not',dec:'not'},tips:['Add gypsum','Ensure loose soil for pod formation'],soilRequirements:{ph:'6.0-6.5',nitrogen:'Low',phosphorus:'Medium',potassium:'High'}}
  };

  var weatherRisks = [
    {period:'Next 7 Days',periodMr:'पुढील ७ दिवस',periodHi:'अगले ७ दिन',risk:'high',message:'Heavy rain expected (40mm)',messageMr:'जोरदार पाऊस अपेक्षित (४० मिमी)',messageHi:'भारी बारिश की संभावना (४० मिमी)',action:'Delay planting by 5 days',actionMr:'लागवड ५ दिवस लांबणीवर टाका',actionHi:'रोपण ५ दिन विलंबित करें'},
    {period:'Week 2',periodMr:'दुसरा आठवडा',periodHi:'दूसरा सप्ताह',risk:'moderate',message:'Temperature fluctuation',messageMr:'तापमानात चढउतार',messageHi:'तापमान में उतार-चढ़ाव',action:'Monitor soil conditions',actionMr:'मातीची स्थिती तपासा',actionHi:'मिट्टी की स्थिति की निगरानी करें'},
    {period:'Week 3-4',periodMr:'तिसरा-चौथा आठवडा',periodHi:'तीसरा-चौथा सप्ताह',risk:'low',message:'Ideal conditions',messageMr:'आदर्श परिस्थिती',messageHi:'आदर्श स्थितियाँ',action:'Best time to start planting',actionMr:'लागवड सुरू करण्यासाठी सर्वोत्तम वेळ',actionHi:'रोपण शुरू करने का सबसे अच्छा समय'}
  ];

  var monthKeys=['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
  var monthNames={en:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],mr:['जाने','फेब्रु','मार्च','एप्रि','मे','जून','जुलै','ऑग','सप्टें','ऑक्टो','नोव्हें','डिसें'],hi:['जन','फर','मार्च','अप्रै','मई','जून','जुला','अग','सितं','अक्तू','नवं','दिसं']};

  function cn(id){var c=crops.find(function(x){return x.id===id;});if(!c)return id;return lang==='mr'?c.nameMr:lang==='hi'?c.nameHi:c.name;}
  function sn(id){var s=seasons.find(function(x){return x.id===id;});if(!s)return id;return lang==='mr'?s.nameMr:lang==='hi'?s.nameHi:s.name;}
  function mn(i){return (monthNames[lang]||monthNames.en)[i];}

  // Translate nav
  document.getElementById('navBrand').textContent=t('agriSmart');
  document.getElementById('navHome').innerHTML='<i class="fas fa-home"></i> '+t('home');
  document.getElementById('navPlanting').innerHTML='<i class="fas fa-seedling"></i> '+t('plantingInsights');
  document.getElementById('navIrrigation').innerHTML='<i class="fas fa-water"></i> '+t('irrigationControl');
  document.getElementById('navHarvest').innerHTML='<i class="fas fa-shopping-cart"></i> '+t('harvestingUpdates');
  document.getElementById('bnHome').textContent=t('home');
  document.getElementById('bnPlanting').textContent=t('plantingInsights');
  document.getElementById('bnIrrigation').textContent=t('irrigationControl');
  document.getElementById('bnHarvest').textContent=t('harvestingUpdates');
  document.getElementById('bnProfile').textContent=t('profile');
  document.getElementById('pageTitle').textContent=getText('Planting Advisor','लागवड सल्लागार','रोपण सलाहकार');
  document.getElementById('seasonLabel').textContent=getText('Season','हंगाम','मौसम');
  document.getElementById('cropGridTitle').textContent=getText('Select Crop','पीक निवडा','फसल चुनें');

  // Populate season select
  var sSel=document.getElementById('seasonSelect');
  seasons.forEach(function(s){var o=document.createElement('option');o.value=s.id;o.textContent=sn(s.id);sSel.appendChild(o);});
  sSel.value=selectedSeason;
  sSel.addEventListener('change',function(){selectedSeason=this.value;var avail=crops.filter(function(c){return c.seasons.includes(selectedSeason);});if(!avail.find(function(c){return c.id===selectedCrop;})&&avail.length)selectedCrop=avail[0].id;renderAll();});

  function renderCropGrid(){
    var avail=crops.filter(function(c){return c.seasons.includes(selectedSeason);});
    var h='';
    avail.forEach(function(c){
      h+='<button class="crop-btn crop-btn-lg'+(c.id===selectedCrop?' active':'')+'" data-crop="'+c.id+'"><span class="crop-icon">'+c.icon+'</span><span class="crop-name">'+cn(c.id)+'</span></button>';
    });
    document.getElementById('cropGrid').innerHTML=h;
    document.querySelectorAll('#cropGrid .crop-btn').forEach(function(btn){
      btn.addEventListener('click',function(){selectedCrop=this.dataset.crop;renderAll();});
    });
  }

  function renderCalendar(){
    var d=cropData[selectedCrop];
    var h='<div class="flex justify-between items-center mb-4"><h2 class="text-lg font-bold text-dark flex items-center gap-2"><i class="fas fa-calendar-alt text-green-900"></i> '+getText('Seasonal Calendar','हंगामी कॅलेंडर','मौसमी कैलेंडर')+'</h2><span class="badge badge-gray">'+getText('Planting Season','लागवड हंगाम','रोपण मौसम')+'</span></div>';
    // Month labels
    h+='<div class="grid grid-12 gap-1 mb-4">';
    monthKeys.forEach(function(m,i){h+='<div class="text-center"><span class="text-xs font-medium text-muted">'+mn(i)+'</span></div>';});
    h+='</div>';
    // Timeline
    h+='<div class="flex items-center gap-2"><span style="width:4rem;" class="text-sm font-medium text-dark">'+cn(selectedCrop)+'</span><div class="flex-1 grid grid-12 gap-1">';
    monthKeys.forEach(function(m){
      var st=d.timeline[m];
      var cls=st==='best'?'timeline-best':st==='okay'?'timeline-okay':'timeline-not';
      h+='<div class="timeline-bar '+cls+'" title="'+m+': '+st+'"></div>';
    });
    h+='</div></div>';
    // Legend
    h+='<div class="flex items-center gap-4 mt-4 text-sm"><div class="flex items-center gap-2"><div style="width:.75rem;height:.75rem;border-radius:.25rem;background:var(--green-900);"></div><span class="text-dark">'+getText('Best Window','सर्वोत्तम','सर्वोत्तम')+'</span></div><div class="flex items-center gap-2"><div style="width:.75rem;height:.75rem;border-radius:.25rem;background:var(--amber-500);"></div><span class="text-dark">'+getText('Okay Window','ठीक आहे','ठीक है')+'</span></div><div class="flex items-center gap-2"><div style="width:.75rem;height:.75rem;border-radius:.25rem;background:var(--gray-200);"></div><span class="text-dark">'+getText('Not Recommended','शिफारस नाही','अनुशंसित नहीं')+'</span></div></div>';
    document.getElementById('calendarSection').innerHTML=h;
  }

  function renderPlantingWindow(){
    var d=cropData[selectedCrop];
    var pw=d.plantingWindow;
    var dateStart=lang==='mr'?pw.startMr:lang==='hi'?pw.startHi:pw.start;
    var dateEnd=lang==='mr'?pw.endMr:lang==='hi'?pw.endHi:pw.end;
    var h='<div class="flex items-start justify-between mb-4" style="flex-wrap:wrap;gap:.5rem;"><h2 class="text-xl font-bold flex items-center gap-2"><i class="fas fa-seedling"></i> '+getText('Best Planting Window','सर्वोत्तम लागवड कालावधी','सर्वोत्तम रोपण अवधि')+' - '+cn(selectedCrop)+'</h2></div>';
    h+='<div class="grid gap-6" style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr));">';
    h+='<div><p class="text-white-80 text-sm mb-1">'+getText('Optimal Period','सर्वोत्तम कालावधी','सर्वोत्तम अवधि')+'</p><p class="text-2xl font-bold mb-2">'+dateStart+' - '+dateEnd+'</p><p class="text-white-90 flex items-center gap-2"><i class="fas fa-check-circle" style="color:#FBC02D;"></i> '+pw.successRate+'% '+getText('Success Rate','यश दर','सफलता दर')+'</p></div>';
    h+='<div class="grid grid-2 gap-3"><div class="stat-box-glass" style="border-radius:var(--radius-xl);padding:.75rem;"><i class="fas fa-thermometer-half" style="font-size:1.5rem;margin-bottom:.5rem;display:block;"></i><p class="text-xs opacity-80">'+getText('Ideal Temp','आदर्श तापमान','आदर्श तापमान')+'</p><p class="font-semibold">'+pw.idealTemp+'</p></div><div class="stat-box-glass" style="border-radius:var(--radius-xl);padding:.75rem;"><i class="fas fa-tint" style="font-size:1.5rem;margin-bottom:.5rem;display:block;"></i><p class="text-xs opacity-80">'+getText('Soil Moisture','माती ओलावा','मिट्टी नमी')+'</p><p class="font-semibold">'+pw.soilMoisture+'</p></div></div>';
    h+='</div>';
    if(pw.daysRemaining>0){
      h+='<div class="stat-box-glass mt-4" style="border-radius:var(--radius-xl);padding:.75rem;"><p class="text-sm">'+getText(pw.daysRemaining+' days remaining for planting','लागवडीसाठी '+pw.daysRemaining+' दिवस शिल्लक','रोपण के लिए '+pw.daysRemaining+' दिन शेष')+'</p></div>';
    }
    document.getElementById('plantingWindow').innerHTML=h;
  }

  function renderRisks(){
    var h='<h2 class="text-lg font-bold text-dark mb-4 flex items-center gap-2"><i class="fas fa-exclamation-triangle" style="color:var(--amber-500);"></i> '+getText('Weather Risk Alerts','हवामान जोखीम सूचना','मौसम जोखिम चेतावनी')+'</h2><div class="space-y-3">';
    weatherRisks.forEach(function(r){
      var cls=r.risk==='high'?'alert-critical':r.risk==='moderate'?'alert-warning':'alert-safe';
      var tc=r.risk==='high'?'text-red-700':r.risk==='moderate'?'text-yellow-700':'text-green-700';
      var bc=r.risk==='high'?'badge-red-solid':r.risk==='moderate'?'badge-yellow-solid':'badge-green-solid';
      var lbl=r.risk==='high'?getText('HIGH','उच्च','उच्च'):r.risk==='moderate'?getText('MODERATE','मध्यम','मध्यम'):getText('LOW','कमी','कम');
      h+='<div class="alert-row '+cls+'" style="display:block;"><div class="flex justify-between items-start"><div><p class="font-semibold '+tc+'">'+(lang==='mr'?r.periodMr:lang==='hi'?r.periodHi:r.period)+'</p><p class="text-sm text-dark mt-1">'+(lang==='mr'?r.messageMr:lang==='hi'?r.messageHi:r.message)+'</p><p class="text-xs text-muted mt-1">'+(lang==='mr'?r.actionMr:lang==='hi'?r.actionHi:r.action)+'</p></div><span class="badge '+bc+'">'+lbl+'</span></div></div>';
    });
    h+='</div>';
    document.getElementById('riskSection').innerHTML=h;
  }

  function renderTips(){
    var d=cropData[selectedCrop];
    var h='<h2 class="text-lg font-bold text-dark mb-4 flex items-center gap-2"><i class="fas fa-info-circle text-green-900"></i> '+getText('Crop Tips','पीक टिप्स','फसल टिप्स')+' - '+cn(selectedCrop)+'</h2><ul class="space-y-3">';
    d.tips.forEach(function(tip){h+='<li class="flex items-start gap-3"><span class="text-green-900 font-bold text-lg">•</span><span class="text-dark text-sm">'+tip+'</span></li>';});
    h+='</ul>';
    document.getElementById('tipsSection').innerHTML=h;
  }

  function renderSoil(){
    var d=cropData[selectedCrop].soilRequirements;
    document.getElementById('soilSection').innerHTML=
      '<h2 class="text-lg font-bold text-dark mb-4 flex items-center gap-2"><i class="fas fa-flask text-green-900"></i> '+getText('Soil Health Metrics','माती आरोग्य मेट्रिक्स','मिट्टी स्वास्थ्य मेट्रिक्स')+'</h2>'+
      '<div class="grid grid-2 gap-4">'+
        '<div class="stat-box"><p class="text-sm text-muted mb-1">pH Level</p><p class="text-2xl font-bold text-dark">'+d.ph+'</p><p class="text-xs text-green-600 mt-1">'+getText('Optimal','आदर्श','आदर्श')+'</p></div>'+
        '<div class="stat-box"><p class="text-sm text-muted mb-1">'+getText('Nitrogen','नायट्रोजन','नाइट्रोजन')+'</p><p class="text-2xl font-bold text-dark">'+d.nitrogen+'</p></div>'+
        '<div class="stat-box"><p class="text-sm text-muted mb-1">'+getText('Phosphorus','फॉस्फरस','फास्फोरस')+'</p><p class="text-2xl font-bold text-dark">'+d.phosphorus+'</p></div>'+
        '<div class="stat-box"><p class="text-sm text-muted mb-1">'+getText('Potassium','पोटॅशियम','पोटैशियम')+'</p><p class="text-2xl font-bold text-dark">'+d.potassium+'</p></div>'+
      '</div>';
  }

  function renderDecision(){
    document.getElementById('decisionSection').innerHTML=
      '<h2 class="text-xl font-bold text-dark mb-4 flex items-center gap-2"><i class="fas fa-leaf text-green-900"></i> '+getText("Today's Planting Decision",'आजचा लागवड निर्णय','आज का रोपण निर्णय')+'</h2>'+
      '<div class="card" style="border:none;box-shadow:none;"><p class="text-lg font-medium text-dark mb-3">'+getText('Should I plant now?','आता लागवड करावी का?','क्या अब रोपण करें?')+'</p>'+
      '<div class="flex items-center gap-4 mb-4"><div style="background:#FEE2E2;color:#DC2626;padding:.75rem 1.5rem;border-radius:var(--radius-xl);font-weight:700;font-size:1.25rem;">⚠️ '+getText('WAIT 5 days','प्रतीक्षा करा ५ दिवस','प्रतीक्षा करें ५ दिन')+'</div></div>'+
      '<p class="text-muted mb-4">'+getText('Heavy rain expected. Best window: 20-30 March','जोरदार पावसाची शक्यता आहे. सर्वोत्तम कालावधी: २०-३० मार्च','भारी बारिश की संभावना है। सर्वोत्तम अवधि: २०-३० मार्च')+'</p>'+
      '<button class="btn btn-green-solid flex items-center gap-2"><i class="fas fa-bell"></i> '+getText('Set Reminder','स्मरणपत्र सेट करा','रिमाइंडर सेट करें')+'</button></div>';
  }

  function renderRecent(){
    document.getElementById('recentSection').innerHTML=
      '<h2 class="text-lg font-bold text-dark mb-4 flex items-center gap-2"><i class="fas fa-chart-line text-green-900"></i> '+getText('Recent Planting Activities','अलीकडील लागवड क्रियाकलाप','हाल की रोपण गतिविधियाँ')+'</h2>'+
      '<div class="space-y-3">'+
        '<div class="flex items-center justify-between p-3" style="background:var(--green-50);border-radius:var(--radius-xl);"><span class="text-dark">🍅 '+getText('Tomatoes','टोमॅटो','टमाटर')+'</span><span class="font-semibold text-green-900">120 '+getText('farmers','शेतकरी','किसान')+'</span></div>'+
        '<div class="flex items-center justify-between p-3" style="background:var(--green-50);border-radius:var(--radius-xl);"><span class="text-dark">🧅 '+getText('Onions','कांदे','प्याज')+'</span><span class="font-semibold text-green-900">85 '+getText('farmers','शेतकरी','किसान')+'</span></div>'+
        '<div class="flex items-center justify-between p-3" style="background:var(--green-50);border-radius:var(--radius-xl);"><span class="text-dark">🍇 '+getText('Grapes','द्राक्षे','अंगूर')+'</span><span class="font-semibold text-green-900">200 '+getText('acres','एकर','एकड़')+'</span></div>'+
      '</div>';
  }

  function renderAll(){renderCropGrid();renderCalendar();renderPlantingWindow();renderRisks();renderTips();renderSoil();renderDecision();renderRecent();}
  renderAll();
});
