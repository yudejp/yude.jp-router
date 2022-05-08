addEventListener('fetch', function (event) {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  if (request.method !== 'GET') return MethodNotAllowed(request);
  const url = new URL(request.url);
  const userAgent = request.headers.get('User-Agent') || '';
  const date = new Date();
  const fmt_datetime = date.toLocaleString();
  const curl_res = ""
    + "yude.jp へようこそ!\n"
    + "現在の日時は " + fmt_datetime + " です。\n"
    + "\n"
    + "Web: https://yude.jp\n"
    + "GitHub: https://github.com/yudejp\n"
    + "Twitter: https://twitter.com/yudejp\n"
    + "電子メール: admin@yude.jp\n"
    + "\n"
    + "上記を表示している仕組みは、以下のリポジトリから閲覧できます。\n"
    + "https://github.com/yudejp/yude.jp-routing\n"
    + "\n";

  if (userAgent.includes('curl')) {
    return new Response(curl_res, { status: 200 });
  } else {
    return fetch(`https://yude.pages.dev` + url.pathname);
  }
}

function MethodNotAllowed(request) {
  return new Response(`Method ${request.method} not allowed.`, {
    status: 405,
    headers: {
      Allow: 'GET',
    },
  });
}
