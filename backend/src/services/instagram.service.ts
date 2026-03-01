import { env } from '../config/env.js';
import { encryptToken } from '../utils/crypto.js';

const META_OAUTH_URL = 'https://www.facebook.com/v19.0/dialog/oauth';
const META_TOKEN_URL = 'https://graph.facebook.com/v19.0/oauth/access_token';

export function getInstagramAuthUrl(state: string) {
  const params = new URLSearchParams({
    client_id: env.metaClientId,
    redirect_uri: env.metaRedirectUri,
    state,
    response_type: 'code',
    scope: 'instagram_basic,instagram_manage_insights,pages_show_list,business_management'
  });

  return `${META_OAUTH_URL}?${params.toString()}`;
}

export async function exchangeCodeForToken(code: string) {
  const params = new URLSearchParams({
    client_id: env.metaClientId,
    client_secret: env.metaClientSecret,
    redirect_uri: env.metaRedirectUri,
    code
  });

  const response = await fetch(`${META_TOKEN_URL}?${params.toString()}`);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Meta token exchange failed: ${text}`);
  }

  const payload = (await response.json()) as { access_token: string; expires_in: number };
  return {
    encryptedAccessToken: encryptToken(payload.access_token),
    expiresIn: payload.expires_in
  };
}
