({
    init: function(component, event, helper) {
        helper.getCredential(component, event);
        helper.listenAuthorizationCode(component, event);
    },
})