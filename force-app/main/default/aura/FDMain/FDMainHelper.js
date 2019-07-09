({
    getCredential: function(component, event) {
        var action = component.get('c.getCredential');
		action.setCallback(this, function(response) {
			if (response.getState() === 'SUCCESS') {
                if (JSON.stringify({}) === JSON.stringify(response.getReturnValue())) {
                    this.eventNavigateToAuthorizationPage(component);
                } else {
                    this.checkToken(component);
                }
            }
        });
		$A.enqueueAction(action);
    },

    eventNavigateToHomePage: function(component) {
        var action = component.get('c.getRedirectURI');
		action.setCallback(this, function(response) {
            if (response.getState() === 'SUCCESS') {
                this.eventNavigateTo(response.getReturnValue());
            }
        });
		$A.enqueueAction(action);
    },

    eventNavigateToAuthorizationPage: function(component) {
        var action = component.get('c.getAuthorizationCodeLink');
		action.setCallback(this, function(response) {
            if (response.getState() === 'SUCCESS') {
                this.eventNavigateTo(response.getReturnValue());
            }
        });
		$A.enqueueAction(action);
    },

    eventNavigateTo: function(url) {
        window.location.replace(url);
    },
    
    listenAuthorizationCode: function(component) {
        var search = decodeURIComponent(window.location.search);
        var authorizationCode = search.substring(6);
        if (
            search.substring(0,1) === '?' &&
            search.substring(1,5) === 'code' &&
            search.substring(5,6) === '=' &&
            authorizationCode.length > 0
        ) {
            this.getToken(component, authorizationCode);
        }
    },
        
    getToken: function(component, authorizationCode) {
        var action = component.get('c.getToken');
        action.setParams({authorizationCode});
        action.setCallback(this, function(response) {
            if (response.getState() === 'SUCCESS') {
                this.checkStatusToken(component, response.getReturnValue(), authorizationCode);
            }
        });
        $A.enqueueAction(action);
    },
    
    checkStatusToken: function(component, response, authorizationCode) {
        var result = JSON.parse(response);
        if (result.access_token && result.expires_in && result.refresh_token && result.token_type) {
            var action = component.get('c.saveCredential');
            action.setParams({
                authorizationCode,
                'accessToken': result.access_token,
                'expiresIn': result.expires_in,
                'refreshToken': result.refresh_token,
                'tokenType': result.token_type.substring(0,1).toUpperCase() + result.token_type.substring(1).toLowerCase()
            });
            action.setCallback(this, function(response) {
                if (response.getState() === 'SUCCESS') {
                    this.eventNavigateToHomePage(component);
                }
            });
            $A.enqueueAction(action);
        } else if (result.error && result.error_description) {
            this.eventNavigateToAuthorizationPage(component);
        }
    },

    checkToken: function(component) {
        component.set('v.isLoadingCredential', false);
        console.log('credential exist, check it');
        // обновим токен
    },

    // getFoldersInfo: function(component, folderId) {
    //     var action = component.get('c.getFoldersInfo');
    //     action.setParams({folderId});
    //     action.setCallback(this, function(response) {
    //         if (response.getState() === 'SUCCESS') {
    //             var result = JSON.parse(response.getReturnValue());
    //             console.log(result);

    //             if (result.item_collection && result.item_collection.entries && result.item_collection.entries.length > 0) {
    //                 component.set('v.entries', result.item_collection.entries);
    //             }
    //         }
    //     });
    //     $A.enqueueAction(action);
    // },
})