const quickStats = document.querySelector('#quickStats');
const featureGrid = document.querySelector('#featureGrid');
const serviceGrid = document.querySelector('#serviceGrid');
const cityRow = document.querySelector('#cityRow');
const imageStrip = document.querySelector('#imageStrip');
const content = {
  quickStats: [{value:'50K+',label:'happy riders'},{value:'99.2%',label:'uptime promise'},{value:'0',label:'tailpipe emissions'}],
  features: [
    {icon:'✺',title:'Clean by design',copy:'Every FlexRide replaces a noisy, polluting trip with clean electric energy.',link:'Our impact',target:'#impact'},
    {icon:'⌁',title:'Always in motion',copy:'24/7 roadside help, proactive service and intelligent battery support keep you moving.',link:'Get support',target:'#contact',dark:true},
    {icon:'◎',title:'One simple app',copy:'Choose a plan, unlock a ride, locate charging and manage everything in one place.',link:'See how it works',target:'#get-started'}
  ],
  services: [
    {lead:true,kicker:'FOR RIDERS & BUSINESSES',title:'Built for every kind of movement.'},
    {number:'01',icon:'↗',title:'EV Rentals',copy:'Flexible daily, weekly and monthly plans that bend with your needs.'},
    {number:'02',icon:'↻',title:'Battery Swapping',copy:'Fast power swaps through a growing partner station network.'},
    {number:'03',icon:'⌘',title:'Fleet Operations',copy:'Reliable deployment, live support and uptime for growing teams.'},
    {number:'04',icon:'✦',title:'On-road Assistance',copy:'Real people and practical help, whenever you need it.'}
  ],
  cities:[['Hyderabad','LIVE'],['Bengaluru','LIVE'],['Pune','LIVE'],['Delhi','LIVE'],['Chennai','SOON']],
  images:[
    {alt:'Electric scooter charging in the city',src:'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80'},
    {alt:'Electric scooter on a quiet road',src:'https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=900&q=80'},
    {alt:'Modern city commute',src:'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80'}
  ]
};
const addContent = () => {
  quickStats.innerHTML = content.quickStats.map(stat => `<div class="reveal"><strong data-count="${stat.value}">${stat.value}</strong><span>${stat.label}</span></div>`).join('');
  featureGrid.innerHTML = content.features.map(item => `<article class="reveal ${item.dark?'dark-card':''}"><span class="icon">${item.icon}</span><h3>${item.title}</h3><p>${item.copy}</p><a href="${item.target}">${item.link} <b>→</b></a></article>`).join('');
  serviceGrid.innerHTML = content.services.map(item => item.lead ? `<article class="service-main reveal"><p>${item.kicker}</p><h3>${item.title}</h3><div class="abstract-lines"></div></article>` : `<article class="reveal"><span>${item.number}</span><i class="service-icon">${item.icon}</i><h3>${item.title}</h3><p>${item.copy}</p><b>↗</b></article>`).join('');
  cityRow.innerHTML = content.cities.map(([city,status]) => `<span class="reveal">${city} <b>${status}</b></span>`).join('');
  imageStrip.innerHTML = content.images.map((image,index) => `<figure class="reveal image-card image-${index+1}"><img loading="lazy" decoding="async" src="${image.src}" alt="${image.alt}"></figure>`).join('');
};
addContent();
const observer = new IntersectionObserver(entries => entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('is-visible'); observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
const fields = ['distance','fuel','mileage'];
const format = new Intl.NumberFormat('en-IN');
function calculate(){
  const distance=+distanceEl.value, fuel=+fuelEl.value, mileage=+mileageEl.value;
  distanceValue.textContent=distance+' km'; fuelValue.textContent='₹ '+fuel+'/L'; mileageValue.textContent=mileage+' km/L';
  const litres=Math.round(distance*30/mileage); const money=litres*fuel; const co2=Math.round(litres*1.65);
  litresEl.textContent=litres+' L'; moneyEl.textContent='₹ '+format.format(money); co2El.textContent=co2+' kg';
}
const distanceEl=document.querySelector('#distance'),fuelEl=document.querySelector('#fuel'),mileageEl=document.querySelector('#mileage');
const distanceValue=document.querySelector('#distanceValue'),fuelValue=document.querySelector('#fuelValue'),mileageValue=document.querySelector('#mileageValue');
const litresEl=document.querySelector('#litres'),moneyEl=document.querySelector('#money'),co2El=document.querySelector('#co2');
fields.forEach(name=>document.querySelector('#'+name).addEventListener('input',calculate)); calculate();
document.querySelector('#formButton').addEventListener('click',()=>{document.querySelector('#formNote').textContent='Thanks — your FlexRide EV enquiry is ready to send.'});
