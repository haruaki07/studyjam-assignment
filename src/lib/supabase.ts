export enum SubmissionStatus {
	Pending = 'pending',
	Rejected = 'rejected',
	Completed = 'completed'
}

export type Submission = {
	id: string;
	user_id: string;
	file_url: string;
	notes: string | null;
	attempt: number;
	stars: number | null;
	status: SubmissionStatus;
	created_at: string;
	updated_at: string;
};

export type Review = {
	id: string;
	submission_id: string;
	notes: string;
	criteria_checklist: string[];
	code_review_url: string | null;
	created_at: string;
};
