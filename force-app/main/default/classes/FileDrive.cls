public with sharing class FileDrive {

    public static String login = 'alexey.sachevichik@succraft.com';
    public static String clientID = 'x4p9w9oelywkgp11xatwpzh1910r1jut';
    public static String secretCode = 'H8KsO5vFmUxr9sA1OSnhWb4jfdH5Z3DZ';
    public static String redirectURI = 'https://file-drive-developer-edition.ap8.force.com/main/s/';

    @AuraEnabled
    public static String firstConnect() {
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
}