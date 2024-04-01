
import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

const tabs = ["pengantar", "kriteria", "pengujian", "saran", "lainnya"] as const
type Tab = typeof tabs[number];

export const load: PageLoad = async ({ url }) => {
    const tab = url.searchParams.get('tab') as Tab;
    if (!tab || !tabs.includes(tab)) {
        url.searchParams.set("tab", tabs[0]);
        redirect(303, url);
    }

    return { tab, tabs }
};