({
    init: function(component, event, helper) {
        helper.getCredential(component, event);
        helper.listenAuthorizationCode(component, event);
    },

    handleClickOnRow: function(component, event, helper) {
        component.set('v.isFileInformation', false);

        var id = event.target.parentNode.getAttribute('data-id');
        var type = event.target.parentNode.getAttribute('data-type');

        if (type == 'folder') {
            component.set('v.isLoadingTable', true);
            helper.getFolderInfo(component, id);
        } else if (type == 'file') {
            helper.showFileInfo(component, id);
        }
    },

    handleClickOnBreadCrumb: function(component, event, helper) {
        component.set('v.isFileInformation', false);
        component.set('v.isLoadingTable', true);
        
        var id = event.target.getAttribute('data-id');
        helper.getFolderInfo(component, id);
    },
    
    handleClickCreateNewFolder: function(component, event, helper) {
        component.set('v.isShowModalAddFolder', true);
        component.set('v.isDisabledButtonNewFolderSave', true);
        component.set('v.inputNewFolderName', '');
    },

    handleChangeInputNewFolder: function(component, event, helper) {
        var value = event.target.value;
        component.set('v.inputNewFolderName', value);
        if (value.length > 0) {
            component.set('v.isDisabledButtonNewFolderSave', false);
        } else {
            component.set('v.isDisabledButtonNewFolderSave', true);
        }
    },

    handleClickHideModalNewFolder: function(component, event, helper) {
        helper.hideModalNewFolder(component);
    },

    handleClickModalCreateNewFolder: function(component, event, helper){
        helper.createNewFolder(
            component,
            component.get('v.inputNewFolderName'),
            component.get('v.folderInfo').id
        );
    },

})