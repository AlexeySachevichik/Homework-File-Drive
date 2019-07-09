({
    init: function(component, event, helper) {
        helper.getCode(component);
    },

    handleClickConnectToBox: function(component, event, helper) {
        helper.firstConnection(component, event);
    },
})