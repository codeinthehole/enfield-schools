interface RadiusHistory {
    2020: float;
    2021: float;
    2022: float;
    2023: float;
}

interface School {
  center: google.maps.LatLngLiteral;
  name: string;
  radius_in_miles: RadiusHistory;
}

const schools: Record<string, School> = {
  edmonton_county: {
    center: { lat: 51.63528, lng: -0.06758 },
    name: "Edmonton County",
    radius_in_miles: {
        2020: 1.145,
        // Suspicious as same as 2020
        2021: 1.145,
        2022: 1.255,
        2023: 1.844,
    }
  },
  kingsmead: {
    center: { lat: 51.65137, lng: -0.06122 },
    name: "Kingsmead",
    radius_in_miles: {
        2020: 0.916,
        // Suspicious as same as 2020
        2021: 0.916,
        2022: 0.873,
        2023: 0.889,
    }
  },
  winchmore: {
    center: { lat: 51.62921, lng: -0.09142 },
    name: "Winchmore",
    radius_in_miles: {
        2020: 0.836,
        2021: 1.001,
        2022: 0.987,
        2023: 0.751,
    }
  },
  highlands: {
    center: { lat: 51.64872, lng: -0.10816 },
    name: "Highlands",
    radius_in_miles: {
        2020: 0.843,
        2021: 0.966,
        2022: 0.904,
        2023: 0.851,
    }
  },
  ashmole: {
    center: { lat: 51.63269, lng: -0.13618 },
    name: "Ashmole",
    radius_in_miles: {
        // Taken from Barnet site. E.g.
        // https://www.barnet.gov.uk/sites/default/files/Allocation%20Table%202023.pdf
        2020: 0.598,
        2021: 0.555, 
        2022: 0.578, 
        2023: 0.517, 
    }
  },
  southgate: {
    center: { lat: 51.64694, lng: -0.14074 },
    name: "Southgate",
    radius_in_miles: {
        2020: 1.996,
        2021: 2.647,
        2022: 2.868,
        2023: 2.459,
    }
  },
};

function initMap(): void {
  const year = 2023;

  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 13,
      // Bush Hill Park - via https://www.freemaptools.com/convert-uk-postcode-to-lat-lng.htm
      center: { lat: 51.6365, lng: -0.06955 },
      mapTypeId: "terrain"
    }
  );

  for (const school in schools) {
    const schoolCircle = new google.maps.Circle({
      map,
      strokeColor: "#0000FF",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#0000FF",
      fillOpacity: 0.35,
      center: schools[school].center,
      // Convert miles to metres.
      radius: schools[school].radius_in_miles[year] * 1609,
    });
    const schoolMarker = new google.maps.Marker({
      map,
      position: schools[school].center,
      title: schools[school].name,
      label: schools[school].name,
    });
  }

  // A marker for where we live
  new google.maps.Marker({
      map,
      position: { lat: 51.6365, lng: -0.06955 },
      icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      }
  });
}

console.log(initMap);

