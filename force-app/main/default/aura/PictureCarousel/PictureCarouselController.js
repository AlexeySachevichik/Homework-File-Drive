({
    next: function(component) {
    	var slideIndex = component.get("v.slideIndex");
    	var slides = component.get("v.slides");
        if (slideIndex + 1 < slides.length) {
            slideIndex = slideIndex + 1;
	        component.set("v.slideIndex", slideIndex);
        }
	},

    prev: function(component) {
       	var slideIndex = component.get("v.slideIndex");
        if (slideIndex > 0) {
            slideIndex = slideIndex - 1;
	        component.set("v.slideIndex", slideIndex);
        }
    },

    doneRendering: function (component) {
        //Commenting out for now. Crashes when rendering component inside App Builder
        //var slideWidth = component.find("gallery").getElement().offsetWidth;
        //component.set("v.slideWidth", slideWidth);
    }

})