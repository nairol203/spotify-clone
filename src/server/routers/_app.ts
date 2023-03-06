import getAccessToken from '@lib/spotify';
import { useSession } from 'next-auth/react';
import { z } from 'zod';
import { procedure, router } from '../trpc';

export const API_ENDPOINT = 'https://api.spotify.com/v1';
export const SPOTIFY_RANGE = z.enum(['short_term', 'medium_term', 'long_term']);

export const appRouter = router({
    topTracks: procedure
        .input(
            z.object({
                access_token: z.string(),
                range: SPOTIFY_RANGE,
                limit: z.optional(z.string()),
            })
        )
        .query(async ({ input }) => {
            const res = await fetch(`${API_ENDPOINT}/me/top/tracks?limit=${input.limit || 50}&time_range=${input.range}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${input.access_token}`,
                    'Content-Type': 'application/json',
                },
            });

            return (await res.json()) as SpotifyApi.UsersTopTracksResponse;
        }),
    topArtists: procedure
        .input(
            z.object({
                access_token: z.string(),
                range: SPOTIFY_RANGE,
                limit: z.optional(z.string()),
            })
        )
        .query(async ({ input }) => {
            const res = await fetch(`${API_ENDPOINT}/me/top/artists?limit=${input.limit || 50}&time_range=${input.range}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${input.access_token}`,
                    'Content-Type': 'application/json',
                },
            });

            return (await res.json()) as SpotifyApi.UsersTopArtistsResponse;
        }),
    recentlyPlayed: procedure
        .input(
            z.object({
                access_token: z.string(),
            })
        )
        .query(async ({ input }) => {
            const res = await fetch(`${API_ENDPOINT}/me/player/recently-played?limit=50`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${input.access_token}`,
                    'Content-Type': 'application/json',
                },
            });

            return (await res.json()) as SpotifyApi.UsersRecentlyPlayedTracksResponse;
        }),
    currentlyPlaying: procedure
        .input(
            z.object({
                access_token: z.string(),
            })
        )
        .query(async ({ input }) => {
            const res = await fetch(`${API_ENDPOINT}/me/player/currently-playing`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${input.access_token}`,
                    'Content-Type': 'application/json',
                },
            });

            return (await res.json()) as SpotifyApi.CurrentlyPlayingResponse;
        }),
    playbackState: procedure
        .input(
            z.object({
                access_token: z.string(),
            })
        )
        .query(async ({ input }) => {
            const res = await fetch(`${API_ENDPOINT}/me/player`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${input.access_token}`,
                    'Content-Type': 'application/json',
                },
            });

            return (await res.json());
        }),
    pause: procedure
        .input(
            z.object({
                access_token: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const res = await fetch(`${API_ENDPOINT}/me/player/pause`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${input.access_token}`,
                    'Content-Type': 'application/json',
                },
            });

			console.log(res.statusText)

            return (await res.json());
        }),
    play: procedure
        .input(
            z.object({
                access_token: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const res = await fetch(`${API_ENDPOINT}/me/player/play`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${input.access_token}`,
                    'Content-Type': 'application/json',
                },
            });

			console.log(res.statusText)

            return (await res.json());
        }),
    next: procedure
        .input(
            z.object({
                access_token: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const res = await fetch(`${API_ENDPOINT}/me/player/next`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${input.access_token}`,
                    'Content-Type': 'application/json',
                },
            });

			console.log(res.statusText)

            return (await res.json());
        }),
    previous: procedure
        .input(
            z.object({
                access_token: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const res = await fetch(`${API_ENDPOINT}/me/player/previous`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${input.access_token}`,
                    'Content-Type': 'application/json',
                },
            });

			console.log(res.statusText)

            return (await res.json());
        }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
