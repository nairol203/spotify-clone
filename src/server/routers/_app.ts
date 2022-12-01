import getAccessToken from '@lib/spotify';
import { z } from 'zod';
import { procedure, router } from '../trpc';

export const API_ENDPOINT = 'https://api.spotify.com/v1';

export const appRouter = router({
	topTracks: procedure
		.input(
			z.object({
				range: z.enum(['short_term', 'medium_term', 'long_term']),
				limit: z.optional(z.string()),
			})
		)
		.query(async ({ input }) => {
			const { access_token } = await getAccessToken();

			const res = await fetch(`${API_ENDPOINT}/me/top/tracks?limit=${input.limit || 50}&time_range=${input.range}`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${access_token}`,
					'Content-Type': 'application/json',
				},
			});

			return (await res.json()) as SpotifyApi.UsersTopTracksResponse;
		}),
	topArtists: procedure
		.input(
			z.object({
				range: z.enum(['short_term', 'medium_term', 'long_term']),
				limit: z.optional(z.string()),
			})
		)
		.query(async ({ input }) => {
			const { access_token } = await getAccessToken();

			const res = await fetch(`${API_ENDPOINT}/me/top/artists?limit=${input.limit || 50}&time_range=${input.range}`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${access_token}`,
					'Content-Type': 'application/json',
				},
			});

			return (await res.json()) as SpotifyApi.UsersTopArtistsResponse;
		}),
	recentlyPlayed: procedure.query(async () => {
		const { access_token } = await getAccessToken();

		const res = await fetch(`${API_ENDPOINT}/me/player/recently-played?limit=50`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${access_token}`,
				'Content-Type': 'application/json',
			},
		});

		return (await res.json()) as SpotifyApi.UsersRecentlyPlayedTracksResponse;
	}),
	currentlyPlaying: procedure.query(async () => {
		const { access_token } = await getAccessToken();

		const res = await fetch(`${API_ENDPOINT}/me/player/currently-playing`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${access_token}`,
				'Content-Type': 'application/json',
			},
		});

		return (await res.json()) as SpotifyApi.CurrentlyPlayingResponse;
	}),
});

// export type definition of API
export type AppRouter = typeof appRouter;
