import type { PageLoad } from './$types';

const tabs = ['pengantar', 'kriteria', 'pengujian', 'saran', 'lainnya'] as const;
type Tab = (typeof tabs)[number];

export const load: PageLoad = async ({ url }) => {
	let tab = url.searchParams.get('tab') as Tab | null;
	if (!tab || !tabs.includes(tab)) {
		tab = tabs[0];
	}

	return { tab, tabs };
};
