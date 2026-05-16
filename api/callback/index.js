const https = require('https');

function post(url, data) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'User-Agent': 'mainframetech-portfolio',
      },
    };
    const req = https.request(url, options, (res) => {
      let raw = '';
      res.on('data', (chunk) => (raw += chunk));
      res.on('end', () => {
        try { resolve(JSON.parse(raw)); }
        catch (e) { reject(new Error('Failed to parse response')); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function html(script) {
  return `<!DOCTYPE html><html><body><script>${script}</script></body></html>`;
}

module.exports = async function (context, req) {
  const { code } = req.query;

  if (!code) {
    context.res = { status: 400, body: 'Missing code parameter' };
    return;
  }

  try {
    const data = await post('https://github.com/login/oauth/access_token', {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    });

    if (data.error || !data.access_token) {
      const msg = JSON.stringify({ error: data.error || 'No token returned' });
      context.res = {
        status: 200,
        headers: { 'Content-Type': 'text/html' },
        body: html(`window.opener.postMessage('authorization:github:error:${msg}','*');window.close();`),
      };
      return;
    }

    const payload = JSON.stringify({ token: data.access_token, provider: 'github' });
    context.res = {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
      body: html(`window.opener.postMessage('authorization:github:success:${payload}','*');window.close();`),
    };
  } catch (err) {
    context.res = { status: 500, body: err.message };
  }
};
