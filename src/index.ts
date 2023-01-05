
export default {
	async fetch(request: Request) {

	const url = new URL(request.url)
  
    const headers = {
    	headers: {
        	"content-type": "application/json;charset=UTF-8",
        	"Access-Control-Allow-Origin": "*",
		}
    }
    
    const serverJson = {
    	"m.server": "matrix.helderferreira.io:443"
    }
  
    const clientJson = {
        "m.homeserver": {
            "base_url": "https://matrix.helderferreira.io"
        },
        "m.identity_server": {
            "base_url": "https://vector.im"
        }
    }

	const baseDestinationURL = 'https://mastodon.helderferreira.io'
    
    var msg
  
    if (url.pathname.startsWith("/.well-known/matrix/server")) {
      	msg  = JSON.stringify(serverJson)
    }
  
    if (url.pathname.startsWith("/.well-known/matrix/client")) {
      	msg = JSON.stringify(clientJson)
    }

	if (url.pathname.startsWith("/.well-known/webfinger")) {
        const { pathname, search } = url;
        const destinationURL = baseDestinationURL + pathname + search;
		return Response.redirect(destinationURL, 301);
	}
	
  
    if (msg) {
      return new Response( msg , headers);
    } else {
      return new Response('Not Found.', { status: 404 })
    }

	},
};