// index.tsx
const schools = {
  edmonton_county: {
    center: {lat: 51.63528, lng: -0.06758},
    name: "Edmonton County",
    radius_in_miles: 1.145
  },
  kingsmead: {
    center: {lat: 51.65137, lng: -0.06122},
    name: "Kingsmead",
    radius_in_miles: 0.916
  },
  winchmore: {
    center: {lat: 51.62921, lng: -0.09142},
    name: "Winchmore",
    radius_in_miles: 0.836
  },
  highlands: {
    center: {lat: 51.64872, lng: -0.10816},
    name: "Highlands",
    radius_in_miles: 0.843
  },
  ashmole: {
    center: {lat: 51.63269, lng: -0.13618},
    name: "Ashmole",
    radius_in_miles: 0.4
  },
  southgate: {
    center: {lat: 51.64694, lng: -0.14074},
    name: "Southgate",
    radius_in_miles: 1.996
  }
};
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: {lat: 51.6365, lng: -0.06955},
    mapTypeId: "terrain"
  });
  for (const school in schools) {
    const schoolCircle = new google.maps.Circle({
      map,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      center: schools[school].center,
      radius: schools[school].radius_in_miles * 1609
    });
    const schoolMarker = new google.maps.Marker({
      map,
      position: schools[school].center,
      title: schools[school].name,
      label: schools[school].name
    });
  }
  new google.maps.Marker({
    map,
    position: {lat: 51.6365, lng: -0.06955},
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
    }
  });
}
console.log(initMap);
