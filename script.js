const creatures=[
['Vampire','Vampirgeschichten sind besonders aus Ost- und Südosteuropa überliefert. Berichte über Wiedergänger und die Angst vor Seuchen prägten den Glauben an blutsaugende Tote.'],
['Werwölfe','Die Vorstellung einer Verwandlung zwischen Mensch und Wolf reicht bis in die Antike zurück. Im europäischen Mittelalter verband man sie mit Flüchen, Magie und der Furcht vor Raubtieren.'],
['Sirenen','In der griechischen Mythologie lockten Sirenen Seeleute mit ihrem Gesang ins Verderben. Ursprünglich wurden sie oft als Mischwesen aus Frau und Vogel beschrieben, später auch als Meereswesen.'],
['Geister','Erzählungen über ruhelose Seelen finden sich weltweit. Sie spiegeln Vorstellungen über Tod, Ahnen, Bestattungsriten und die Hoffnung wider, dass etwas vom Menschen weiterlebt.'],
['Zombies','Der Begriff stammt aus haitianischen Glaubens- und Erzähltraditionen im Umfeld des Vodou. Das heutige Bild wandelnder Untoter wurde vor allem durch Filme und Romane geprägt.'],
['Mumien','Im alten Ägypten diente die Mumifizierung dem Jenseitsglauben. Der populäre Fluch der lebenden Mumie ist hingegen besonders eine Erfindung moderner Abenteuer- und Horrorgeschichten.'],
['Yeti','Die Erzählung vom Yeti stammt aus den Himalaya-Regionen und verbindet lokale Überlieferungen über geheimnisvolle Bergwesen mit späteren Expeditionserzählungen.'],
['BigFoot','Bigfoot, auch Sasquatch genannt, ist Teil nordamerikanischer Erzählungen. Indigene Traditionen sind vielfältig; das moderne Kryptidenbild wurde durch Berichte und Medien des 20. Jahrhunderts bekannt.'],
['Frankensteins Kreatur','Die Kreatur stammt aus Mary Shelleys Roman von 1818. Die Geschichte greift Fragen der Wissenschaft, Verantwortung und Ausgrenzung auf; Frankenstein ist der Name ihres Schöpfers.'],
['Drachen','Drachen erscheinen in vielen Kulturen. In europäischen Sagen sind sie oft gefährliche Gegner, in ostasiatischen Traditionen dagegen häufig mit Wasser, Glück und Macht verbunden.']
];
// Bildausschnitte aus der eigens generierten gotischen Gesamtillustration.
const positions=[[18,59],[29,59],[40,59],[51,59],[62,59],[18,83],[29,83],[40,83],[51,83],[62,83]];
function art(i){let [x,y]=positions[i];return `<div class="portrait" style="background-position:${x}% ${y}%"></div>`}
function card(c,i,detail=false){return `<article class="creature" ${!detail?'data-creature="'+i+'"':''}>${art(i)}<h3>${c[0]}</h3><p>${c[1]}</p></article>`}
document.querySelector('#home-creatures').innerHTML=creatures.map((c,i)=>card(c,i)).join('');document.querySelector('#all-creatures').innerHTML=creatures.map((c,i)=>card(c,i,true)).join('');document.querySelectorAll('[data-creature]').forEach(el=>el.addEventListener('click',()=>{location.hash='wesen';document.querySelectorAll('#all-creatures .creature')[+el.dataset.creature]?.scrollIntoView({behavior:'smooth',block:'center'})}));
const news=[['Dracula','Ein Schatten am Schloss','In dieser erfundenen Chronik soll zuletzt bei Mitternacht eine hochgewachsene Gestalt vor einer alten Burg in den Karpaten erschienen sein. Die Dorfbewohner berichten von verlöschenden Kerzen und einem Schwarm Fledermäuse.','Archivmeldung · Fiktion',0],['Frankensteins Kreatur','Licht im verlassenen Labor','Ein fiktiver Nachtwächter meldet elektrisches Flackern in einem verlassenen Turm. Im Morgengrauen bleiben nur schwere Fußspuren und zerbrochene Glasgefäße zurück.','Archivmeldung · Fiktion',8],['The Boogeyman','Klopfen aus dem Kinderzimmer','Der sagenhafte Boogeyman wird in einer erfundenen Geschichte zuletzt als langer Schatten hinter einer halb geöffneten Tür beschrieben. Sein Flüstern verstummt beim ersten Sonnenstrahl.','Archivmeldung · Fiktion',3],['BigFoot','Spuren im Nebelwald','In einer ausgedachten Sichtung entdecken Wanderer ungewöhnlich große Abdrücke in einem abgelegenen Wald im pazifischen Nordwesten. Zwischen den Bäumen soll ein dunkles Wesen verschwunden sein.','Archivmeldung · Fiktion',7]];
document.querySelector('#news-list').innerHTML=news.map((n,i)=>`<article class="news-card"><img class="news-illustration" src="assets/${['news-dracula.webp','news-frankenstein.webp','news-boogeyman.webp','news-bigfoot.webp'][i]}" alt="Düstere Illustration von ${n[0]} ohne Beschriftung"><div class="news-copy"><h3>${n[0]}</h3><strong>${n[1]}</strong><p>${n[2]}</p><small>${n[3]}</small></div></article>`).join('');
const cities=[['Bremen','Europe/Berlin',53.08,8.8],['London','Europe/London',51.5,-.12],['New York','America/New_York',40.7,-74],['Los Angeles','America/Los_Angeles',34,-118.2],['Tokio','Asia/Tokyo',35.7,139.7],['Sydney','Australia/Sydney',-33.9,151.2],['Kairo','Africa/Cairo',30,31.2],['Reykjavík','Atlantic/Reykjavik',64.1,-21.9]];
const clocks=document.querySelector('#clocks');clocks.innerHTML=cities.map((c,i)=>`<div class="clock"><h3>${c[0]}</h3><time id="time${i}"></time><div class="status" id="day${i}"></div></div>`).join('');
// Live-Daten: Open-Meteo Forecast API (ohne API-Schlüssel).
// Die Zeit wird aus der API-Antwort abgeleitet und zwischen den Abrufen weitergezählt.
const apiState=cities.map(()=>({utc:null,received:null,isDay:null,updated:null,error:false}));
const apiNote=document.createElement('p');apiNote.className='fine api-note';apiNote.setAttribute('role','status');clocks.after(apiNote);
const moonPhaseNames=['Neumond','Zunehmende Sichel','Erstes Viertel','Zunehmender Mond','Vollmond','Abnehmender Mond','Letztes Viertel','Abnehmende Sichel'];
const moonPhaseIcons=['🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘'];
function moonIndex(value){return Math.floor((((value%1)+1)%1)*8+0.5)%8}
function showMoon(value){const index=moonIndex(value);document.querySelector('#moon-symbol').textContent=moonPhaseIcons[index];document.querySelector('#moon-phase').textContent=moonPhaseNames[index];document.querySelector('#moon-age').textContent='Mondzyklus: '+Math.round(value*100)+' % · Daten: Open-Meteo'}
function tick(){
  const localNow=Date.now();let online=0;
  cities.forEach((city,i)=>{
    const state=apiState[i],clock=document.querySelector('#time'+i),status=document.querySelector('#day'+i);
    if(state.utc!==null){
      const apiNow=new Date(state.utc+(localNow-state.received));
      clock.textContent=new Intl.DateTimeFormat('de-DE',{timeZone:city[1],hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(apiNow);
      status.textContent=state.isDay===null?'Tag/Nacht: keine Daten':state.isDay?'☀ TAG':'☾ NACHT';
      if(localNow-state.received<900000)online++;
    }else{clock.textContent='--:--:--';status.textContent=state.error?'API nicht erreichbar':'Verbinde mit API …'}
  });
  apiNote.textContent=online===cities.length?'Live-Daten von Open-Meteo · Uhrzeit zwischen den API-Abfragen fortgeschrieben · Aktualisierung alle 5 Minuten':`${online}/${cities.length} Städte mit aktuellen API-Daten · Erneuter Abruf alle 5 Minuten`;
}
async function refreshCity(city,i){
  const state=apiState[i];
  const url=new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.set('latitude',city[2]);url.searchParams.set('longitude',city[3]);
  url.searchParams.set('timezone',city[1]);url.searchParams.set('current','is_day');
  url.searchParams.set('daily',i===0?'moon_phase,sunrise,sunset':'sunrise,sunset');
  url.searchParams.set('forecast_days','1');
  try{
    const response=await fetch(url.toString(),{cache:'no-store'});
    if(!response.ok)throw Error('HTTP '+response.status);
    const data=await response.json();
    if(!data.current||!data.current.time||!Number.isFinite(data.utc_offset_seconds))throw Error('Ungültige Zeitdaten');
    // Open-Meteo liefert die lokale Uhrzeit ohne Zeitzonen-Suffix und den UTC-Offset separat.
    const utc=Date.parse(data.current.time+'Z')-data.utc_offset_seconds*1000;
    if(!Number.isFinite(utc))throw Error('Ungültiger Zeitstempel');
    state.utc=utc;state.received=Date.now();state.isDay=Number(data.current.is_day)===1;state.updated=new Date();state.error=false;
    if(i===0){
      const phase=data.daily?.moon_phase?.[0];
      if(Number.isFinite(phase)&&phase>=0&&phase<=1){showMoon(phase)}
      else{document.querySelector('#moon-phase').textContent='Mondphase derzeit nicht verfügbar';document.querySelector('#moon-age').textContent='Die API lieferte keine Mondphase.'}
    }
  }catch(error){
    state.error=true;
    if(i===0&&state.utc===null){document.querySelector('#moon-phase').textContent='API nicht erreichbar';document.querySelector('#moon-age').textContent='Internetverbindung prüfen und Seite neu laden.'}
    console.warn('Open-Meteo konnte nicht geladen werden:',city[0],error);
  }
  tick();
}
function refreshAll(){cities.forEach((city,i)=>refreshCity(city,i))}
document.querySelector('#moon-phase').textContent='Verbinde mit astronomischer API …';
document.querySelector('#moon-age').textContent='Quelle: Open-Meteo';
tick();refreshAll();setInterval(tick,1000);setInterval(refreshAll,300000);
function route(){let id=decodeURIComponent(location.hash.slice(1))||'start';if(!document.getElementById(id)||!document.getElementById(id).classList.contains('page'))id='start';document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id===id));document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('selected',a.hash==='#'+id));window.scrollTo({top:0,behavior:'instant'})}window.addEventListener('hashchange',route);route();
