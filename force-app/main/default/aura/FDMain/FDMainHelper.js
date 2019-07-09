({
    // handleClickConnectToBox: function(component, event, helper) {

    //     var url = 'https://account.box.com/api/oauth2/authorize';
    //     url += '?response_type=code';

    //     if (component.get('v.CLIENT_ID').length > 0) {
    //         url += '&client_id=' + component.get('v.CLIENT_ID');
    //     }
    //     if (component.get('v.REDIRECT_URI').length > 0) {
    //         url += '&redirect_uri=' + component.get('v.REDIRECT_URI');
    //     }
    //     if (component.get('v.CLIENT_SECRET').length > 0) {
    //         url += '&state=security_token%' + component.get('v.CLIENT_SECRET');
    //     }
    //     if (component.get('v.LOGIN').length > 0) {
    //         url += '&box_login=' + component.get('v.LOGIN');
    //     }

    //     // console.log(url);

    //     var urlEvent = $A.get("e.force:navigateToURL");
    //     urlEvent.setParams({'url': url});
    //     urlEvent.fire();
    // },

    firstConnection: function(component, event) {
        var action = component.get('c.firstConnect');
		action.setCallback(this, function(response) {
			if (response.getState() === 'SUCCESS') {
                var urlEvent = $A.get("e.force:navigateToURL");
                urlEvent.setParams({'url': response.getReturnValue()});
                urlEvent.fire();
            }
        });
		$A.enqueueAction(action);
    },

    getCode: function(component, event) {
        var authorizationCode = decodeURIComponent(window.location.search.substring(6));
        if (authorizationCode.length > 0) {
            var action = component.get('c.getToken');
            action.setParams({'authorizationCode': authorizationCode});
            action.setCallback(this, function(response) {
                if (response.getState() === 'SUCCESS') {
                    var result = JSON.parse(response.getReturnValue());
                    console.log(result);
                    // console.log(response.getReturnValue());
                }
            });
            $A.enqueueAction(action);
        }
    },
})