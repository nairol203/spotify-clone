import { z } from 'zod';
import { procedure, router } from '../trpc';

export const API_ENDPOINT = 'https://api.spotify.com/v1';
export const SPOTIFY_RANGE = z.enum(['short_term', 'medium_term', 'long_term']);

export const appRouter = router({
    topTracks: procedure
        .input(
            z.object({
                range: SPOTIFY_RANGE,
                limit: z.optional(z.string()),
            })
        )
        .query(async ({ ctx, input }) => {
            const res = await fetch(`${API_ENDPOINT}/me/top/tracks?limit=${input.limit || 50}&time_range=${input.range}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${ctx.session?.user?.access_token}`,
                    'Content-Type': 'application/json',
                },
            });

            return (await res.json()) as SpotifyApi.UsersTopTracksResponse;
        }),
    topArtists: procedure
        .input(
            z.object({
                range: SPOTIFY_RANGE,
                limit: z.optional(z.string()),
            })
        )
        .query(async ({ ctx, input }) => {
            const res = await fetch(`${API_ENDPOINT}/me/top/artists?limit=${input.limit || 50}&time_range=${input.range}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${ctx.session?.user?.access_token}`,
                    'Content-Type': 'application/json',
                },
            });

            return (await res.json()) as SpotifyApi.UsersTopArtistsResponse;
        }),
    recentlyPlayed: procedure.query(async ({ ctx }) => {
        console.log(ctx)
        const res = await fetch(`${API_ENDPOINT}/me/player/recently-played?limit=50`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${ctx.session?.user?.access_token}`,
                'Content-Type': 'application/json',
            },
        });
        
        return (await res.json()) as SpotifyApi.UsersRecentlyPlayedTracksResponse;
    }),
    currentlyPlaying: procedure.query(async ({ ctx }) => {
        const res = await fetch(`${API_ENDPOINT}/me/player/currently-playing`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${ctx.session?.user?.access_token}`,
                'Content-Type': 'application/json',
            },
        });

        return (await res.json()) as SpotifyApi.CurrentlyPlayingResponse;
    }),
    playlists: procedure.query(async ({ ctx }) => {
        const res = await fetch(`${API_ENDPOINT}/me/playlists`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${ctx.session?.user?.access_token}`,
                'Content-Type': 'application/json',
            },
        });

        return (await res.json()) as SpotifyApi.ListOfUsersPlaylistsResponse;
    }),
    playlist: procedure
        .input(
            z.object({
                playlist_id: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            const res = await fetch(`${API_ENDPOINT}/playlists/${input.playlist_id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${ctx.session?.user?.access_token}`,
                    'Content-Type': 'application/json',
                },
            });

            return (await res.json()) as SpotifyApi.PlaylistObjectFull;
        }),
    savedTracks: procedure.query(async ({ ctx, input }) => {
        const res = await fetch(`${API_ENDPOINT}/me/tracks`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${ctx.session?.user?.access_token}`,
                'Content-Type': 'application/json',
            },
        });

        return (await res.json()) as SpotifyApi.UsersSavedTracksResponse;
    }),
    pause: procedure.mutation(async ({ ctx, input }) => {
        const res = await fetch(`${API_ENDPOINT}/me/player/pause`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${ctx.session?.user?.access_token}`,
                'Content-Type': 'application/json',
            },
        });

        return await res.json();
    }),
    play: procedure.mutation(async ({ ctx, input }) => {
        const res = await fetch(`${API_ENDPOINT}/me/player/play`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${ctx.session?.user?.access_token}`,
                'Content-Type': 'application/json',
            },
        });

        return await res.json();
    }),
    next: procedure.mutation(async ({ ctx }) => {
        const res = await fetch(`${API_ENDPOINT}/me/player/next`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${ctx.session?.user?.access_token}`,
                'Content-Type': 'application/json',
            },
        });

        return await res.json();
    }),
    previous: procedure.mutation(async ({ ctx }) => {
        const res = await fetch(`${API_ENDPOINT}/me/player/previous`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${ctx.session?.user?.access_token}`,
                'Content-Type': 'application/json',
            },
        });

        return await res.json();
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
