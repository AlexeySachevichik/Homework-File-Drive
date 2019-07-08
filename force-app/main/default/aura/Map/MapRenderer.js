({
    rerender: function (component, helper) {

        var nodes = this.superRerender();

        // If the Leaflet library is not yet loaded, we can't draw the map: return
        if (!L) {
            return nodes;
        }

        // Draw the map if it hasn't been drawn yet
	    if (!component.map) {
		    	var mapElement = component.find("map").getElement();
		    	component.map = L.map(mapElement, {zoomControl: true}).setView([42.356045, -71.085650], 13);
		    	component.map.scrollWheelZoom.disable();
		    	L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {attribution: 'Tiles © Esri'}).addTo(component.map);
	        // If we had received a location before Leaflet was loaded, add a marker for this location
	        helper.addMarker(component);
	    }

        return nodes;

    }
})