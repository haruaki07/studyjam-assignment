import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

export enum SubmissionStatus {
	Pending = 'pending',
	Rejected = 'rejected',
	Completed = 'completed'
}

export type Submission = {
	id: string;
	user_id: string;
	file_url: string;
	notes?: string;
	attempt: number;
	stars?: number;
	status: SubmissionStatus;
	created_at: string;
	updated_at: string;
};

export type Review = {
	id: string;
	submission_id: string;
	notes: string;
	criteria_checklist: string[];
	code_review?: any;
	created_at: string;
};
