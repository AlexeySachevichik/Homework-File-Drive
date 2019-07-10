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
                this.saveCredential(component, response.getReturnValue(), authorizationCode);
            }
        });
        $A.enqueueAction(action);
    },
    
    saveCredential: function(component, response, authorizationCode) {
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

    getFolderInfo: function(component, folderId) {
        component.set('v.isLoadingCredential', true);
        var action = component.get('c.getFoldersInfo');
        action.setParams({folderId});
        action.setCallback(this, function(response) {
            if (response.getState() === 'SUCCESS') {
                var result = response.getReturnValue();
                if (result == '401') {
                    this.refreshToken(component);
                } else {
                    this.showFolder(component, result);
                }
            }
        });
        $A.enqueueAction(action);
    },

    checkToken: function(component) {
        this.getFolderInfo(component, '0');
    },

    refreshToken: function(component) {
        var action = component.get('c.refreshToken');
        action.setCallback(this, function(response) {
            if (response.getState() === 'SUCCESS') {
                var result = response.getReturnValue();
                if (result == 'ERROR' || result == '400') {
                    this.eventNavigateToAuthorizationPage(component);
                } else {
                    this.saveCredential(component, result, '');
                }
            }
        });
        $A.enqueueAction(action);
    },

    showFolder: function(component, result) {
        var folderInfo = JSON.parse(result);
        console.log(folderInfo);
        component.set('v.folderName', folderInfo.name);
        this.getFoldersItems(component, folderInfo.id);
        
    },

    getFoldersItems: function(component, folderId, limit, offset) {
        var limitCount = limit || 100;
        var offsetCount = offset || 0;

        var action = component.get('c.getFoldersItems');
        action.setParams({ folderId, limitCount, offsetCount });
        action.setCallback(this, function(response) {
            if (response.getState() === 'SUCCESS') {
                var result = JSON.parse(response.getReturnValue());
                console.log(result);
                if (result.total_count) {
                    // this.setTotalCount(component, result.total_count);
                    component.set('v.totalCount', result.total_count);
                }
                if (result.entries && result.entries.length > 0) {
                    component.set('v.entries', result.entries);
                }
            }
            component.set('v.isLoadingCredential', false);
        });
        $A.enqueueAction(action);
    },
})