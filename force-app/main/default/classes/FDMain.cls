public with sharing class FDMain {

    // public string valueToShow {get;set;}
    // public static String login = 'alexey.sachevichik@succraft.com';
    public static String clientID = 'x4p9w9oelywkgp11xatwpzh1910r1jut';
    // public static String secretCode = 'H8KsO5vFmUxr9sA1OSnhWb4jfdH5Z3DZ';
    public static String redirectURI = 'https://file-drive-developer-edition.ap8.force.com/main/s/';
    // public static String codeFromBox;
    // public static String accessToken;
    // public static String refreshToken;

    // public FDMain() {
    //     codeFromBox = System.currentPageReference().getParameters().get('code');
    //     if (codeFromBox == null || codeFromBox == '' ) { }
    //     else{
    //         //Try to get a token and then make an API call to Box
    //         getBoxToken();
    //     }
    // }

    public static String firstConnect() {

        // System.debug('firstConnect()');

        String url = 
            'https://account.box.com/api/oauth2/authorize' +
            '?response_type=code' +
            '&client_id=' + FDMain.clientID +
            '&redirect_uri=' + FDMain.redirectURI
            // '&state=security_token%' + 
        ;
        
        // Redirect to the OAuth page at Box so the login credentials can be entered.
        // PageReference pr = new PageReference(
        //     'https://www.box.com/api/oauth2/authorize' +
        //     '?response_type=code' +
        //     '&client_id=' + clientID +
        //     '&redirect_uri=' + redirectURI
        // );
        
        return url;
    }
    
    // private void getBoxToken() {
    //     Http h = new Http();
    //     HttpRequest req = new HttpRequest();
    //     string endPointValue = 'https://www.box.com/api/oauth2/token';
    //     req.setEndpoint(endPointValue);
    //     req.setBody(
    //         'Content-Type=' + EncodingUtil.urlEncode('application/x-www-form-urlencoded', 'UTF-8') +
    //         '&charset=' + EncodingUtil.urlEncode('UTF-8', 'UTF-8') +
    //         '&grant_type=' + EncodingUtil.urlEncode('authorization_code', 'UTF-8') +
    //         '&code=' + EncodingUtil.urlEncode(codeFromBox, 'UTF-8') +
    //         '&client_id=' + EncodingUtil.urlEncode(clientID, 'UTF-8') +
    //         '&client_secret=' + EncodingUtil.urlEncode(secretCode, 'UTF-8') +
    //         '&redirect_uri=' + EncodingUtil.urlEncode(redirectURI, 'UTF-8')
    //     );
        
    //     req.setMethod('POST');
        
    //     HttpResponse res = h.send(req);
        
    //     //Get back this… {"access_token":"RETURNED_ACCESS_TOKEN", // "expires_in":3600, // "refresh_token":"RETURNED_REFRESH_TOKEN", // "token_type":"bearer"}
        
    //     parseAuthJSON(res.getBody());
    //     if(accessToken != null & accessToken != ''){
    //         //Try to get items from a folder in Box getBoxFolder();
    //     } else {
    //         //Just some debug lines to see the request and response
    //         // valuetoShow = 'Get Authorization Code Return: ' + res.getBody() + ' end point value: ' + endPointValue + 'request: ' + req.toString() + 'request headers: ' + req.getHeader('Content-Type') + '; ' + req.getHeader('charset') + 'request body: ' + req.getBody();
    //     }
    // }
    
    // private void getBoxFolder() {
        
    //     Http h = new Http();
    //     HttpRequest req = new HttpRequest();
    //     string endPointValue = 'https://api.box.com/2.0/folders/904543862/items';
        
    //     // ?limit=5&offset=0
    //     // Returns this: {"total_count":2,"entries":[
    //     // {"type":"file","id":"8308841816","sequence_id":"0","etag":"0","sha1":"6dce26ad1a3578a00a40722ec4472abc143313cf",
    //     // "name":"Luschen Quote for West Fargo Property.pdf"},
    //     // {"type":"file","id":"8308878690","sequence_id":"1","etag":"1","sha1":"5b595457a86396ddf45318d1ab9ddd6aa3b7bc1e",
    //     // "name":"New Google Doc 1.gdoc"}
    //     // ],"offset":0,"limit":100,"order":[{"by":"type","direction":"ASC"},{"by":"name","direction":"ASC"}]}
        
    //     // This one works to get the properties for a specific file
    //     endPointValue = 'https://api.box.com/2.0/files/8308878690?fields=modified_at,path_collection,name';
    //     // Returns this {"type":"file","id":"8308878690","etag":"1","modified_at":"2013-05-25T16:08:52-07:00",
    //     // "path_collection":{"total_count":2,"entries":[
    //     // {"type":"folder","id":"0","sequence_id":null,"etag":null,"name":"All Files"},
    //     // {"type":"folder","id":"904543862","sequence_id":"1","etag":"1","name":"Buy Fargo Home"}
    //     // ]},"name":"New Google Doc 1.gdoc"}
        
    //     req.setEndpoint(endPointValue);
    //     req.setHeader('Authorization', 'Bearer ' + accessToken);
    //     req.setMethod('GET');
    //     HttpResponse res = h.send(req);
        
    //     //Now we could parse through the JSON again and get the values that we want
    //     // valuetoShow = 'Get Folder: ' + res.getBody();
    // }
    
    // private void parseAuthJSON(string JSONValue) {
        
    //     JSONParser parser = JSON.createParser(JSONValue);
    //     accessToken = '';
    //     refreshToken = '';
        
    //     while (parser.nextToken() != null) {
    //         if(parser.getCurrentToken() == JSONToken.FIELD_NAME) {
    //             if(parser.getText() == 'access_token') {
    //                 parser.nextToken();
    //                 accessToken = parser.getText();
    //             }
                
    //             if(parser.getText() == 'refresh_token') {
    //                 parser.nextToken();
    //                 refreshToken = parser.getText();
    //             }
    //         }

    //         if(accessToken != '' && refreshToken != '') { break; }
    //     }
    // }
}