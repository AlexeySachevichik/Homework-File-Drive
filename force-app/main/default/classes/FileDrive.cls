public with sharing class FileDrive {

    public static String login = 'alexey.sachevichik@succraft.com';
    public static String clientID = 'x4p9w9oelywkgp11xatwpzh1910r1jut';
    public static String secretCode = 'H8KsO5vFmUxr9sA1OSnhWb4jfdH5Z3DZ';
    public static String redirectURI = 'https://file-drive-dev-ed.lightning.force.com/c/FDApp.app';
    
    @AuraEnabled
    public static Box_Credential__c getCredential() {
        Box_Credential__c boxCredential = new Box_Credential__c();
        List<Box_Credential__c> listBoxCredential = [
            SELECT Id, Authorization_Code__c, Access_Token__c, Expires_In__c, Refresh_Token__c, Token_Type__c,
                   Login__c, Client_Id__c, Secret_Code__c, Redirect_URI__c
            FROM Box_Credential__c
            WHERE Name='BoxCredential'
            LIMIT 1
        ];
        if (listBoxCredential.size() == 1) boxCredential = listBoxCredential[0];
        return boxCredential;
    }

    @AuraEnabled
    public static String getRedirectURI() {
        return FileDrive.redirectURI;
    }

    @AuraEnabled
    public static String getAuthorizationCodeLink() {
        return 'https://account.box.com/api/oauth2/authorize' +
               '?response_type=code' +
               '&client_id=' + FileDrive.clientID +
               '&redirect_uri=' + FileDrive.redirectURI;
    }

    @AuraEnabled
    public static String getToken(String authorizationCode) {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://api.box.com/oauth2/token');
        request.setBody(
            'Content-Type=' + EncodingUtil.urlEncode('application/x-www-form-urlencoded', 'UTF-8') +
            '&charset=' + EncodingUtil.urlEncode('UTF-8', 'UTF-8') +
            '&grant_type=' + EncodingUtil.urlEncode('authorization_code', 'UTF-8') +
            '&code=' + EncodingUtil.urlEncode(authorizationCode, 'UTF-8') +
            '&client_id=' + EncodingUtil.urlEncode(FileDrive.clientID, 'UTF-8') +
            '&client_secret=' + EncodingUtil.urlEncode(FileDrive.secretCode, 'UTF-8') +
            '&redirect_uri=' + EncodingUtil.urlEncode(FileDrive.redirectURI, 'UTF-8')
        );
        request.setMethod('POST');
        HttpResponse response = http.send(request);
        return response.getBody();
    }

    @AuraEnabled
    public static void saveCredential(String authorizationCode, String accessToken, String expiresIn, String refreshToken, String tokenType) {
        List<Box_Credential__c> listBoxCredential = [SELECT Id FROM Box_Credential__c];
        if (listBoxCredential.size() > 0) delete listBoxCredential;

        Box_Credential__c boxCredential = new Box_Credential__c(
            Name = 'BoxCredential',
            Login__c = FileDrive.login,
            Client_Id__c = FileDrive.clientID,
            Secret_Code__c = FileDrive.secretCode,
            Redirect_URI__c = FileDrive.redirectURI,
            Authorization_Code__c = authorizationCode,
            Access_Token__c = accessToken,
            Expires_In__c = expiresIn,
            Refresh_Token__c = refreshToken,
            Token_Type__c = tokenType
        );

        insert boxCredential;
    }

    public static String sendHttpResponse(String endpoint, String authorization, String method) {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(endpoint);
        request.setHeader('Authorization', authorization);
        request.setMethod(method);
        HttpResponse response = http.send(request);

        if (response.getStatusCode() == 200) {
            return response.getBody();
        } else {
            return String.valueOf(response.getStatusCode());
        }
    }

    @AuraEnabled
    public static String getFoldersInfo(String folderId) {
        Box_Credential__c boxCredential = FileDrive.getCredential();
        if (boxCredential.Token_Type__c != null && boxCredential.Access_Token__c != null) {
            return FileDrive.sendHttpResponse(
                'https://api.box.com/2.0/folders/' + folderId,
                boxCredential.Token_Type__c + ' ' + boxCredential.Access_Token__c,
                'GET'
            );
        }
        return 'ERROR';
    }

    @AuraEnabled
    public static String refreshToken() {
        Box_Credential__c boxCredential = FileDrive.getCredential();
        if (boxCredential.Refresh_Token__c != null && boxCredential.Client_Id__c != null && boxCredential.Secret_Code__c != null) {
            Http http = new Http();
            HttpRequest request = new HttpRequest();
            request.setEndpoint('https://api.box.com/oauth2/token');
            request.setBody(
                'Content-Type=' + EncodingUtil.urlEncode('application/x-www-form-urlencoded', 'UTF-8') +
                '&charset=' + EncodingUtil.urlEncode('UTF-8', 'UTF-8') +
                '&grant_type=' + EncodingUtil.urlEncode('refresh_token', 'UTF-8') +
                '&refresh_token=' + EncodingUtil.urlEncode(boxCredential.Refresh_Token__c, 'UTF-8') +
                '&client_id=' + EncodingUtil.urlEncode(boxCredential.Client_Id__c, 'UTF-8') +
                '&client_secret=' + EncodingUtil.urlEncode(boxCredential.Secret_Code__c, 'UTF-8')
            );
            request.setMethod('POST');
            HttpResponse response = http.send(request);

            if (response.getStatusCode() == 200) {
                return response.getBody();
            } else {
                return String.valueOf(response.getStatusCode());
            }
        }
        return 'ERROR'; 
    }

    @AuraEnabled
    public static String getFoldersItems(String folderId, Integer limitCount, Integer offsetCount) {
        Box_Credential__c boxCredential = FileDrive.getCredential();
        if (boxCredential.Token_Type__c != null && boxCredential.Access_Token__c != null) {
            return FileDrive.sendHttpResponse(
                'https://api.box.com/2.0/folders/' + folderId + '/items?limit=' + limitCount + '&offset=' + offsetCount,
                boxCredential.Token_Type__c + ' ' + boxCredential.Access_Token__c,
                'GET'
            );
        }
        return 'ERROR';
    }
}