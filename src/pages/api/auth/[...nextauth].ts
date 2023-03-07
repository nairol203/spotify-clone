import NextAuth, { AuthOptions } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

export const authOptions: AuthOptions = {
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID as string,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
            authorization: 'https://accounts.spotify.com/authorize?scope=user-modify-playback-state playlist-read-private user-library-read',
        }),
    ],
    callbacks: {
        jwt: async ({ token, account }) => {
            if (account) {
                return {
                    access_token: account.access_token,
                    expires_at: Math.floor(Date.now() / 1000 + (account.expires_in as number)),
                    refresh_token: account.refresh_token,
                };
            } else if (Date.now() < (token.expires_at as number) * 1000) {
                return token;
            } else {
                try {
                    const response = await fetch('https://accounts.spotify.com/api/token', {
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: new URLSearchParams({
                            client_id: process.env.SPOTIFY_CLIENT_ID as string,
                            client_secret: process.env.SPOTIFY_CLIENT_SECRET as string,
                            grant_type: 'refresh_token',
                            refresh_token: token.refresh_token as string,
                        }),
                        method: 'POST',
                    });

                    const tokens = await response.json();

                    if (!response.ok) throw tokens;

                    return {
                        ...token,
                        access_token: tokens.access_token,
                        expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
                        refresh_token: tokens.refresh_token ?? token.refresh_token,
                    };
                } catch (error) {
                    console.error('Error refreshing access token', error);
                    return { ...token, error: 'RefreshAccessTokenError' as const };
                }
            }
        },
        session: async ({ session, token }) => {
            return {
                ...session,
                refresh_token: token.refresh_token,
                access_token: token.access_token
            };
        },
    },
};

export default NextAuth(authOptions);
