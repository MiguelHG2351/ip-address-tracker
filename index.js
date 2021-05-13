const form = document.getElementById('form');
const $ip = document.getElementById('ip')
const $location = document.getElementById('location')
const $timeZone = document.getElementById('timeZone')
const $isp = document.getElementById('isp')
const API_KEY = 'at_JJfbw5G260aOreQhUjl4i9dRCBKRn';
let lat;
let lng;
let map = L.map('map');

function _geolocation(lat, lng) {
    if(lat == undefined && lng == undefined) {
        return true
    }
}

function initMap() {

    var markerIcon = L.icon({
        iconUrl: './public/images/icon-location.svg',

        iconSize: [46, 56], // size of the icon
        iconAnchor: [23, 55], // point of the icon which will correspond to marker's location
    });

    map.setView([lat, lng], 17);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: false,
    }).addTo(map);

    L.marker([lat, lng], { icon: markerIcon }).addTo(map);
}

async function getData(ip = null) {
    // try {
        const response = await fetch(
            `https://geo.ipify.org/api/v1?apiKey=${API_KEY}&ipAddress=${ip}`
        );
        const data = await response.json();

        if('as' in data) {
            lat = data.location.lat
            lng = data.location.lng
            // Change INFO
            $ip.textContent = data.ip
            $location.textContent = `${data.location.city}, ${data.location.country} ${data.as.asn}`
            $timeZone.textContent = `UTC ${data.location.timezone}`
            $isp.textContent = `${data.isp}`
        
            if(!_geolocation(lat, lng)) {
                initMap()
            }
        }
    

}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const ip = formData.get('ip');
    const ipSplit = ip.split('.').map((element) => Number(element));
    const maxLength = ipSplit.every((currentValue) => currentValue <= 255);

    if (maxLength && ipSplit.length == 4) {
        getData(ip);
    }
});

if(_geolocation(lat, lng)) {
    getData('').then(() => {
        initMap()
    })
}