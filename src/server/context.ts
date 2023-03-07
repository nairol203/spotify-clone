import { inferAsyncReturnType } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getServerSession } from 'next-auth';
import { authOptions } from 'src/pages/api/auth/[...nextauth]';

export async function createContext({ req, res }: CreateNextContextOptions) {
	const session = await getServerSession(req, res, authOptions);

	return {
		session,
	};
}

export type Context = inferAsyncReturnType<typeof createContext>;
