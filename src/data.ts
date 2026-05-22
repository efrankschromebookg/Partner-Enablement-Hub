import { RPM, Partner, TrainingResource } from './types';

export const INITIAL_RPMS: RPM[] = [
  {
    id: 'allen-dinh',
    name: 'Allen Dinh',
    driveUrl: 'https://drive.google.com/drive/folders/allen-dinh-records',
    email: 'adinh@google.com',
    priorityPartners: ['ASUS'],
    longtailPartners: ['Project MGMT', 'RC Willey', 'NATM', 'Electronic Exp', 'Rent A Center', 'Curacao', 'Samsung', 'MediaTek', 'AMD'],
    avatarColor: 'indigo'
  },
  {
    id: 'sagar-shah',
    name: 'Sagar Shah',
    driveUrl: 'https://drive.google.com/drive/folders/sagar-shah-records',
    email: 'sshah@google.com',
    priorityPartners: ['HP', 'Lenovo'],
    longtailPartners: ['Dell', 'Staples', 'Office Depot', 'NEX', 'GCX', 'MCX', 'B&H', 'Qualcomm'],
    avatarColor: 'emerald'
  },
  {
    id: 'kelly-granchalek',
    name: 'Kelly Granchalek',
    driveUrl: 'https://drive.google.com/drive/folders/kelly-granchalek-records',
    email: 'kgranchalek@google.com',
    priorityPartners: ['Acer', 'Intel'],
    longtailPartners: ['Costco', "Sam's", "BJ's", 'Disti', 'MSI', 'TMO', 'VZN', 'ATT', 'Target', 'Ant Online'],
    avatarColor: 'amber'
  },
  {
    id: 'ren-laurenceau',
    name: 'Ren Laurenceau',
    driveUrl: 'https://drive.google.com/drive/folders/ren-laurenceau-records',
    email: 'rlaurenceau@google.com',
    priorityPartners: ['Walmart'],
    longtailPartners: ['QVC', 'HSN'],
    avatarColor: 'rose'
  }
];

export const INITIAL_PARTNERS: Partner[] = [
  // Allen Dinh Priority Partners
  {
    id: 'asus',
    name: 'ASUS',
    rpmId: 'allen-dinh',
    tier: 'Priority',
    pocs: [
      { name: 'Noah Goldfarb', email: 'noah_goldfarb@asus.com', role: 'Training POC' }
    ],
    trainingEngagements: ['Scheduled initial Chromebook Q2 Sync', 'OEM Training alignment sync'],
    projects: [
      { id: 'proj-asus-1', title: 'ASUS Meeting Minutes', status: 'In Progress', description: 'Reviewing current retail model training checklist.', lastUpdated: '2026-05-18' },
      { id: 'proj-asus-2', title: 'ASUS Data Tracking', status: 'In Progress', description: 'ChromeOS spec alignment and course performance indices.', lastUpdated: '2026-05-20' }
    ],
    activityLevel: 'High',
    sector: 'OEM'
  },
  {
    id: 'samsung',
    name: 'Samsung',
    rpmId: 'allen-dinh',
    tier: 'Longtail',
    pocs: [],
    rawPocText: 'TBD',
    trainingEngagements: [],
    projects: [],
    activityLevel: 'Low',
    sector: 'OEM'
  },
  {
    id: 'mediatek',
    name: 'MediaTek',
    rpmId: 'allen-dinh',
    tier: 'Longtail',
    pocs: [
      { name: 'Brian OBranovich', email: 'brian.obranovich@mediatek.com', role: 'Training POC' }
    ],
    trainingEngagements: ['SoC chipset webinar planning session'],
    projects: [],
    activityLevel: 'Medium',
    sector: 'SoC'
  },
  {
    id: 'amd',
    name: 'AMD',
    rpmId: 'allen-dinh',
    tier: 'Longtail',
    pocs: [],
    rawPocText: 'Awaiting POC sharing from Allen',
    trainingEngagements: [],
    projects: [],
    activityLevel: 'Low',
    sector: 'SoC'
  },

  // Sagar Shah Priority Partners
  {
    id: 'hp',
    name: 'HP',
    rpmId: 'sagar-shah',
    tier: 'Priority',
    pocs: [
      { name: 'Julie Harrison', email: 'julie.cat.harrison@hp.com', role: 'Training POC' },
      { name: 'Oscar Correia', email: 'oscar.correia@hp.com', role: 'Training POC' }
    ],
    trainingEngagements: [
      'Monthly syncs',
      'HP Pulse (3 sessions in Q2, 1 session in Q3)',
      'HP Connect overview briefing'
    ],
    projects: [
      { id: 'proj-hp-1', title: 'HP Meeting Minutes', status: 'In Progress', description: 'Regular alignment on Pulse portal assets.', lastUpdated: '2026-05-15' },
      { id: 'proj-hp-2', title: 'HP Connect Vid Outline', status: 'In Progress', description: 'Outline for upcoming video assets on HP laptops.', lastUpdated: '2026-05-19' },
      { id: 'proj-hp-3', title: 'HP Pulse Demo Proposal', status: 'Completed', description: 'Pilot course outline accepted for retail advocates.', lastUpdated: '2026-05-10' },
      { id: 'proj-hp-4', title: 'HP Data Tracking', status: 'In Progress', description: 'Tracking training completion metrics for sales staff.', lastUpdated: '2026-05-21' },
      { id: 'proj-hp-5', title: 'Spring Assortment SKUs - Lenovo & HP', status: 'In Progress', description: 'Shared project mapping Chromebook and Premium Laptop retail lineups.', lastUpdated: '2026-05-12' }
    ],
    activityLevel: 'High',
    sector: 'OEM'
  },
  {
    id: 'lenovo',
    name: 'Lenovo',
    rpmId: 'sagar-shah',
    tier: 'Priority',
    pocs: [
      { name: 'Ari Barjesteh', email: 'abarjesteh1@lenovo.com', role: 'Training POC' }
    ],
    trainingEngagements: [
      'Met Ari 5/8, shared basics & Neo platform overview'
    ],
    projects: [
      { id: 'proj-lenovo-1', title: 'Lenovo Meeting Minutes', status: 'In Progress', description: 'Regular alignment and Neo feedback consolidation.', lastUpdated: '2026-05-08' },
      { id: 'proj-lenovo-2', title: 'Spring Assortment SKUs - Lenovo & HP', status: 'In Progress', description: 'Shared project mapping Chromebook and Premium Laptop retail lineups.', lastUpdated: '2026-05-12' }
    ],
    activityLevel: 'High',
    sector: 'OEM'
  },
  {
    id: 'qualcomm',
    name: 'Qualcomm',
    rpmId: 'sagar-shah',
    tier: 'Longtail',
    pocs: [],
    rawPocText: 'Awaiting Sagar updates',
    trainingEngagements: [],
    projects: [],
    activityLevel: 'Low',
    sector: 'SoC'
  },

  // Kelly Granchalek Priority Partners
  {
    id: 'acer',
    name: 'Acer',
    rpmId: 'kelly-granchalek',
    tier: 'Priority',
    pocs: [],
    rawPocText: 'waiting on Kelly',
    trainingEngagements: [],
    projects: [],
    activityLevel: 'Medium',
    sector: 'OEM'
  },
  {
    id: 'intel',
    name: 'Intel',
    rpmId: 'kelly-granchalek',
    tier: 'Priority',
    pocs: [
      { name: 'Eddie Morris', email: 'eddie.morris@intel.com', role: 'Training POC (HQ)' },
      { name: 'Dan P (FT)', email: 'danielx.pilkington@intel.com', role: 'Training POC (Field Team)' }
    ],
    trainingEngagements: [
      'Meeting Eddie (HQ) 4/24',
      'Meeting Dan (FT) 4/24'
    ],
    projects: [
      { id: 'proj-intel-1', title: 'Intel Meeting Minutes', status: 'In Progress', description: 'Bi-weekly Intel processor feature messaging updates.', lastUpdated: '2026-04-24' },
      { id: 'proj-intel-2', title: 'Intel Field Team MMs', status: 'In Progress', description: 'Field team trainer guidelines and core collateral review.', lastUpdated: '2026-04-24' },
      { id: 'proj-intel-3', title: 'Intel Data Tracking', status: 'In Progress', description: 'Tracking completion of Core Ultra series micro-lessons.', lastUpdated: '2026-05-02' }
    ],
    activityLevel: 'High',
    sector: 'SoC'
  },

  // Ren Laurenceau Priority Partners
  {
    id: 'walmart',
    name: 'Walmart',
    rpmId: 'ren-laurenceau',
    tier: 'Priority',
    pocs: [
      { name: 'Amy Bates', email: 'amy.bates@walmart.com', role: 'Training POC' },
      { name: 'Jason Turner', email: 'Jason.Turner@walmart.com', role: 'Training POC' }
    ],
    trainingEngagements: [
      'Met Amy/Jason on 4/20, awaiting next steps from WMT'
    ],
    projects: [
      { id: 'proj-walmart-1', title: 'Walmart Meeting Minutes', status: 'In Progress', description: 'WMT retail learning path coordination.', lastUpdated: '2026-04-20' }
    ],
    activityLevel: 'Medium',
    sector: 'Retailer'
  },

  // Longtail seed definitions
  // --- Allen Dinh longtail ---
  { id: 'project-mgmt', name: 'Project MGMT', rpmId: 'allen-dinh', tier: 'Longtail', pocs: [], trainingEngagements: [], projects: [], activityLevel: 'Low', sector: 'Other' },
  { id: 'rc-willey', name: 'RC Willey', rpmId: 'allen-dinh', tier: 'Longtail', pocs: [], trainingEngagements: [], projects: [], activityLevel: 'Low', sector: 'Retailer' },
  { id: 'natm', name: 'NATM', rpmId: 'allen-dinh', tier: 'Longtail', pocs: [], trainingEngagements: [], projects: [], activityLevel: 'Low', sector: 'Retailer' },
  { id: 'electronic-exp', name: 'Electronic Exp', rpmId: 'allen-dinh', tier: 'Longtail', pocs: [], trainingEngagements: [], projects: [], activityLevel: 'Low', sector: 'Retailer' },
  { id: 'rent-a-center', name: 'Rent A Center', rpmId: 'allen-dinh', tier: 'Longtail', pocs: [], trainingEngagements: [], projects: [], activityLevel: 'Low', sector: 'Retailer' },
  { id: 'curacao', name: 'Curacao', rpmId: 'allen-dinh', tier: 'Longtail', pocs: [], trainingEngagements: [], projects: [], activityLevel: 'Low', sector: 'Retailer' },

  // --- Sagar Shah longtail ---
  { id: 'dell', name: 'Dell', rpmId: 'sagar-shah', tier: 'Longtail', pocs: [], trainingEngagements: [], projects: [], activityLevel: 'Low', sector: 'OEM' },
  { id: 'staples', name: 'Staples', rpmId: 'sagar-shah', tier: 'Longtail', pocs: [], trainingEngagements: [], projects: [], activityLevel: 'Low', sector: 'Retailer' },
  { id: 'office-depot', name: 'Office Depot', rpmId: 'sagar-shah', tier: 'Longtail', pocs: [], trainingEngagements: [], projects: [], activityLevel: 'Low', sector: 'Retailer' },
  { id: 'nex', name: 'NEX', rpmId: 'sagar-shah', tier: 'Longtail', pocs: [], trainingEngagements: [], projects: [], activityLevel: 'Low', sector: 'Retailer' },
  { id: 'gcx', name: 'GCX', rpmId: 'sagar-shah', tier: 'Longtail', pocs: [], trainingEngagements: [], projects: [], activityLevel: 'Low', sector: 'Retailer' },
  { id: 'mcx', name: 'MCX', rpmId: 'sagar-shah', tier: 'Longtail', pocs: [], trainingEngagements: [], projects: [], activityLevel: 'Low', sector: 'Retailer' },
  { id: 'b-h', name: 'B&H', rpmId: 'sagar-shah', tier: 'Longtail', pocs: [], trainingEngagements: [], projects: [], activityLevel: 'Low', sector: 'Retailer' },

  // --- Kelly Granchalek longtail ---
  { id: 'costco', name: 'Costco', rpmId: 'kelly-granchalek', tier: 'Longtail', pocs: [], trainingEngagements: [], projects: [], activityLevel: 'Low', sector: 'Retailer' },
  { id: 'sams', name: "Sam's", rpmId: 'kelly-granchalek', tier: 'Longtail', pocs: [], trainingEngagements: [], projects: [], activityLevel: 'Low', sector: 'Retailer' },
  { id: 'bjs', name: "BJ's", rpmId: 'kelly-granchalek', tier: 'Longtail', pocs: [], trainingEngagements: [], projects: [], activityLevel: 'Low', sector: 'Retailer' },
  { id: 'disti', name: 'Disti', rpmId: 'kelly-granchalek', tier: 'Longtail', pocs: [], trainingEngagements: [], projects: [], activityLevel: 'Low', sector: 'Disti' },
  { id: 'msi', name: 'MSI', rpmId: 'kelly-granchalek', tier: 'Longtail', pocs: [], trainingEngagements: [], projects: [], activityLevel: 'Low', sector: 'OEM' },
  { id: 'tmo', name: 'TMO', rpmId: 'kelly-granchalek', tier: 'Longtail', pocs: [], trainingEngagements: [], projects: [], activityLevel: 'Low', sector: 'Carrier' },
  { id: 'vzn', name: 'VZN', rpmId: 'kelly-granchalek', tier: 'Longtail', pocs: [], trainingEngagements: [], projects: [], activityLevel: 'Low', sector: 'Carrier' },
  { id: 'att', name: 'ATT', rpmId: 'kelly-granchalek', tier: 'Longtail', pocs: [], trainingEngagements: [], projects: [], activityLevel: 'Low', sector: 'Carrier' },
  { id: 'target', name: 'Target', rpmId: 'kelly-granchalek', tier: 'Longtail', pocs: [], trainingEngagements: [], projects: [], activityLevel: 'Low', sector: 'Retailer' },
  { id: 'ant-online', name: 'Ant Online', rpmId: 'kelly-granchalek', tier: 'Longtail', pocs: [], trainingEngagements: [], projects: [], activityLevel: 'Low', sector: 'Retailer' },

  // --- Ren Laurenceau longtail ---
  { id: 'qvc', name: 'QVC', rpmId: 'ren-laurenceau', tier: 'Longtail', pocs: [], trainingEngagements: [], projects: [], activityLevel: 'Low', sector: 'Retailer' },
  { id: 'hsn', name: 'HSN', rpmId: 'ren-laurenceau', tier: 'Longtail', pocs: [], trainingEngagements: [], projects: [], activityLevel: 'Low', sector: 'Retailer' }
];

export const INITIAL_RESOURCES: TrainingResource[] = [
  {
    id: 'res-library',
    name: '[EXT] Training Resources Library',
    type: 'Library',
    url: 'https://docs.google.com/spreadsheets/d/mock-trix-resources',
    lastUpdated: 'May 8th',
    status: 'Updated',
    audience: 'External Shared',
    description: 'Central trix repository featuring shared enablement models and training resources.'
  },
  {
    id: 'res-oem-deck',
    name: 'OEM/SoC Webinar Deck',
    type: 'Deck',
    url: 'https://docs.google.com/presentation/d/mock-oem-soc-webinar-deck',
    lastUpdated: 'WIP',
    status: 'WIP',
    audience: 'External Shared',
    description: 'Webinar slides highlighting OEM integrations and SoC platform benefits.'
  },
  {
    id: 'res-strategy-deck',
    name: 'Partner Training Strategy Deck',
    type: 'Deck',
    url: 'https://docs.google.com/presentation/d/mock-partner-training-strategy-deck',
    lastUpdated: 'May 1st',
    status: 'FINAL',
    audience: 'Internal Only',
    description: 'Core strategy deck outlining Q2-Q3 partner training models, execution parameters, and metrics.'
  }
];
