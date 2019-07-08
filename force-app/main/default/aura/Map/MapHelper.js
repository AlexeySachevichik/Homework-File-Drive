({
    addMarker: function(component) {

        if (!component.map) {
            return;
        }

        var location = component.get('v.location');

        if (!location) {
            return;
        }

        var latLng = [location.Location__Latitude__s, location.Location__Longitude__s];
        L.marker(latLng).addTo(component.map);
        component.map.setView(latLng);

    }
})