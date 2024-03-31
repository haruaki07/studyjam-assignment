
import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

const tabs = ["criteria", "recommendation"] as const
type Tab = typeof tabs[number];

export const load: PageLoad = async ({ url }) => {
    const tab = url.searchParams.get('tab') as Tab;
    if (!tab || !tabs.includes(tab)) {
        url.searchParams.set("tab", "criteria");
        redirect(303, url);
    }

    return { tab, tabs }
};