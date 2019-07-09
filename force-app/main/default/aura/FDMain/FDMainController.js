({
    init: function(component, event, helper) {
        helper.getCredential(component, event);
        helper.listenAuthorizationCode(component, event);
    },

    // handleClickConnectToBox: function(component, event, helper) {
    //     helper.firstConnection(component, event);
    // },

    // handleClickgetRootInformation: function(component, event, helper) {
        // helper.getFoldersInfo(component, '0');
        // helper.getFoldersInfo(component, '81389432619');
    // },
})