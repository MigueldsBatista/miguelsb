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

/**
 * Responsive image with optional mobile/tablet variants
 * - src: Default/desktop image (recommended: 1920x1080 or 1600x900)
 * - srcMobile: Mobile variant (recommended: 640x360 to 800x450)
 * - srcTablet: Optional tablet variant (recommended: 1024x576 to 1280x720)
 * - alt: Optional alt text override
 */
export type ProjectImage = {
  src: string;
  srcMobile?: string;
  srcTablet?: string;
  alt?: string;
};

export type Project = {
  id?: number;
  name?: string;
  description?: string;
  year?: number;
  tech_stack?: string[];
  links?: Link[];
  /** Supports both plain strings (backward compat) and ProjectImage objects */
  images?: string[];
  details?: ProjectDetails;
  is_featured?: boolean;
};
