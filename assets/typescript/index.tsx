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

interface MapState {
    map: google.maps.Map;
    circles: google.maps.Circle[];
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
        center: { lat: 51.651535486738105, lng: -0.06105348872082594 },
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
        center: { lat: 51.62851044827965, lng: -0.09199524084400414 },
        name: "Winchmore",
        radius_in_miles: {
            2020: 0.836,
            2021: 1.001,
            2022: 0.987,
            2023: 0.751,
        }
    },
    highlands: {
        center: { lat: 51.65047031143983, lng: -0.10660718726045863 },
        name: "Highlands",
        radius_in_miles: {
            2020: 0.843,
            2021: 0.966,
            2022: 0.904,
            2023: 0.851,
        }
    },
    ashmole: {
        center: { lat: 51.62951079682404, lng: -0.13354444712882804 },
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
        center: { lat: 51.647354943219106, lng: -0.14157293210330354 },
        name: "Southgate",
        radius_in_miles: {
            2020: 1.996,
            2021: 2.647,
            2022: 2.868,
            2023: 2.459,
        }
    },
};

function updateMapForYear(mapState: MapState, year: int): void {
    // Remove all existing circles.
    mapState.circles.forEach((circle) => circle.setMap(null));
    mapState.circles = []

    for (const school in schools) {
        const schoolCircle = new google.maps.Circle({
            map: mapState.map,
            strokeColor: "#0000FF",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#0000FF",
            fillOpacity: 0.35,
            center: schools[school].center,
            // Convert miles to metres.
            radius: schools[school].radius_in_miles[year] * 1609,
        });
        mapState.circles.push(schoolCircle)
    }

    // Update year.
    const yearElement = document.getElementById("active_year");
    yearElement.textContent = year.toString();
}

function handleYearClick(mapState: MapState, event: Event): void {
    event.preventDefault();

    // Extract year from anchor text.
    const year = parseInt(event.target.textContent)

    // Update map.
    updateMapForYear(mapState, year)
}

function initMap(): void {
    // Create map object.
    const mapState: MapState = {
        map: new google.maps.Map(
            document.getElementById("map") as HTMLElement,
            {
                zoom: 13,
                // Bush Hill Park - via https://www.freemaptools.com/convert-uk-postcode-to-lat-lng.htm
                center: { lat: 51.6365, lng: -0.06955 },
                mapTypeId: "terrain"
            }
        ),
        circles: []
    }

    // Show schools.
    for (const school in schools) {
        const schoolMarker = new google.maps.Marker({
            map: mapState.map,
            position: schools[school].center,
            title: schools[school].name,
            label: schools[school].name,
        });
    }

    // Default to 2023.
    updateMapForYear(mapState, 2023)

    // Bind functions to buttons.
    const links = document.getElementsByClassName("year");
    Array.from(links).forEach(link => {
        link.addEventListener('click', handleYearClick.bind(null, mapState));
    });

}

window.initMap = initMap;
