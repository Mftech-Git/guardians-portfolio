module.exports = async function (context, req) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const redirectUri = `${proto}://${host}/api/callback`;

  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo%2Cuser`;

  context.res = {
    status: 302,
    headers: { Location: url },
  };
};
