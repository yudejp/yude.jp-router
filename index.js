const someHost = 'https://yude.pages.dev/';

async function gatherResponse(response) {

  const { headers } = response;
  const contentType = headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return JSON.stringify(await response.json());
  } else if (contentType.includes('application/text')) {
    return response.text();
  } else if (contentType.includes('text/html')) {
    return response.text();
  } else {
    return response.text();
  }
}

async function handleRequest(request) {
  // Return a new Response based on a URL's hostname
  const url = new URL(request.url);

  const init = {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  };
  const response = await fetch(url, init);
  const results = await gatherResponse(response);

  const userAgent = request.headers.get('User-Agent') || '';
  if (userAgent.includes('bot')) {
    return new Response('Block User Agent containing curl', { status: 403 });
  } else {
    return new Response(results, init);
  }

  console.error(
    "Getting Client's IP address, device type, and ASN are not supported in playground. Must test on a live worker"
  );
  return fetch(request);
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});
