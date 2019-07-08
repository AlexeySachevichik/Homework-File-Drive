({
    doInit: function(component, event, helper) {
        var main = component.find('main');
        var recID = component.get("v.recordId");
        $A.util.removeClass(main, 'small');
        $A.util.addClass(main, component.get("v.designHeight"));
        helper.getLocalList(component, recID);
    },
    updateSearch: function(component, event, helper) {
        var recID = component.get("v.recordId");
        helper.getLocalList(component, recID);
    },
    showDetails: function(component, event) {
        var closeItem = component.get('v.openItem');
        if (closeItem) {
            closeItem = closeItem.querySelector('[data-details]');
            $A.util.addClass(closeItem, 'slds-hide');
        }
        var selectedItem = event.currentTarget;
        component.set('v.openItem', selectedItem);
        var itemDetails = selectedItem.querySelector('[data-details]');
        $A.util.removeClass(itemDetails, 'slds-hide');
    }
})