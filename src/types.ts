export interface PartnerProject {
  id: string;
  title: string;
  status: 'In Progress' | 'Completed' | 'Stalled' | 'Planning';
  category?: string;
  description?: string;
  lastUpdated?: string;
  url?: string;
}

export interface POC {
  name: string;
  email: string;
  role?: string;
}

export interface Partner {
  id: string;
  name: string;
  rpmId: string; // The ID of the owning RPM
  tier: 'Priority' | 'Longtail';
  pocs: POC[];
  rawPocText?: string; // Original spreadsheet POC text
  trainingEngagements: string[];
  projects: PartnerProject[];
  activityLevel: 'High' | 'Medium' | 'Low' | 'Planned';
  sector?: 'OEM' | 'SoC' | 'Retailer' | 'Disti' | 'Carrier' | 'Other';
}

export interface RPM {
  id: string;
  name: string;
  driveUrl?: string;
  priorityPartners: string[]; // Partner Names
  longtailPartners: string[]; // Partner Names
  email?: string;
  avatarColor?: string; // TailWind color class
}

export interface TrainingResource {
  id: string;
  name: string;
  type: 'Site Link' | 'Deck' | 'Webinar' | 'Library' | 'Other';
  url: string;
  lastUpdated?: string;
  status: 'FINAL' | 'WIP' | 'Draft' | 'Updated';
  audience: 'External Shared' | 'Internal Only';
  description?: string;
}
