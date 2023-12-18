async function getSpotifyToken() {
  const encodedClientData = Buffer.from(
    `${process.env['SPOTIFY_CLIENT_ID']}:${process.env['SPOTIFY_CLIENT_SECRET']}`,
  ).toString('base64');

  const body = new URLSearchParams();
  body.set('grant_type', 'client_credentials');

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${encodedClientData}`,
      ['Content-Type']: 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: body.toString(),
  });

  if (response.status !== 200) {
    const body = await response.text();
    throw new Error(`Failed to get spotify token: ${body}`);
  }

  return response.json();
}

export async function createSpotifyTokenCookie(url: string) {
  const domain = new URL(url).hostname;
  const spotifyToken = await getSpotifyToken();
  spotifyToken.expires = Date.now() + spotifyToken.expires_in * 1000;

  return {
    name: '__session',
    domain,
    path: '/',
    value: JSON.stringify({ ['spotify-authentication-token']: JSON.stringify(spotifyToken) }),
    expires: spotifyToken.expires,
  };
}
