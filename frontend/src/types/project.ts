export type Link = {
  name?: string;
  url: string;
  icon?: string;
  type?: 'github' | 'live_demo' | 'other';
  classes?: string;
};

export type ProjectDetails = {
  challenge: string,
  objective: string,
  impact: string
};

export type Project = {
  id?: number;
  name?: string;
  description?: string;
  year?: number;
  tech_stack?: string[];
  links?: Link[];
  images?: string[];
  details?: ProjectDetails;
  is_featured?: boolean;
};
