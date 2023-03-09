export function calcTime(date: Date) {
	const ms = Date.now() - date.getTime();
	const hours = Math.floor(ms / 3600000) % 24;
	const seconds = Math.floor(ms / 1000) % 60;
	const minutes = Math.floor(ms / 60000) % 60;

	if (hours > 0) return `vor ${hours} Stunde${hours === 1 ? '' : 'n'}`;
	if (minutes > 0) return `vor ${minutes} Minute${minutes === 1 ? '' : 'n'}`;
	return `vor ${seconds} Sekunde${seconds === 1 ? '' : 'n'}`;
}

export function msToString(ms: number) {
	const seconds = Math.floor(ms / 1000) % 60;
	const minutes = Math.floor(ms / 60000) % 60;

	return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
