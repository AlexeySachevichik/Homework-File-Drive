({
    locationChange: function(component, event, helper) {
        helper.addMarker(component);
    },

    jsLoaded: function(component) {
        component.set("v.location", component.get("v.location")); // force rerender
    }

})