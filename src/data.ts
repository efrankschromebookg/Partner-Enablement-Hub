import { RPM, Partner, TrainingResource, FieldTeamData } from './types';

export const INITIAL_RPMS: RPM[] = [
  {
    "id": "allen-dinh",
    "name": "Allen Dinh",
    "driveUrl": "https://drive.google.com/drive/folders/1-_rk3lUp_N1Z8VeE_q_9uWJAtRcSEiI9?usp=drive_link",
    "email": "adinh@google.com",
    "priorityPartners": [
      "ASUS"
    ],
    "longtailPartners": [
      "Project MGMT",
      "RC Willey",
      "NATM",
      "Electronic Exp",
      "Rent A Center",
      "Curacao",
      "Samsung",
      "MediaTek",
      "AMD"
    ],
    "avatarColor": "indigo"
  },
  {
    "id": "sagar-shah",
    "name": "Sagar Shah",
    "driveUrl": "https://drive.google.com/drive/folders/1n7nbuV9qzHT6JJLNS4PRZptuBdTuNTKc?usp=drive_link",
    "email": "sshah@google.com",
    "priorityPartners": [
      "HP",
      "Lenovo"
    ],
    "longtailPartners": [
      "Dell",
      "Staples",
      "Office Depot",
      "NEX",
      "GCX",
      "MCX",
      "B&H",
      "Qualcomm"
    ],
    "avatarColor": "emerald"
  },
  {
    "id": "kelly-granchalek",
    "name": "Kelly Granchalek",
    "driveUrl": "https://drive.google.com/drive/folders/1oNAdVSb_9g3k-ZqrEy94-_oH-ucnYz1v?usp=drive_link",
    "email": "kgranchalek@google.com",
    "priorityPartners": [
      "Acer",
      "Intel"
    ],
    "longtailPartners": [
      "Costco",
      "Sam's",
      "BJ's",
      "Disti",
      "MSI",
      "TMO",
      "VZN",
      "ATT",
      "Target",
      "Ant Online"
    ],
    "avatarColor": "amber"
  },
  {
    "id": "ren-laurenceau",
    "name": "Ren Laurenceau",
    "driveUrl": "https://drive.google.com/drive/folders/1YxZEcMT6mjGwrCK-cSavsAnMct1wnsOS?usp=drive_link",
    "email": "rlaurenceau@google.com",
    "priorityPartners": [
      "Walmart"
    ],
    "longtailPartners": [
      "QVC",
      "HSN"
    ],
    "avatarColor": "rose"
  }
];

export const INITIAL_PARTNERS: Partner[] = [
  {
    "id": "asus",
    "name": "ASUS",
    "rpmId": "allen-dinh",
    "tier": "Priority",
    "pocs": [
      {
        "name": "William Wong",
        "email": "william1_wong@asus.com",
        "role": "Account POC"
      }
    ],
    "trainingEngagements": [
      "ASUS Training Alignment Sync 06.12.26"
    ],
    "projects": [
      {
        "id": "proj-1780503165052",
        "title": "OEM Webinar",
        "description": "Attended by 32 ASUS team members",
        "status": "Completed",
        "url": "https://docs.google.com/presentation/d/1XMWdsNUpYmtoBGcYKVbz8ydrnQXqWKfryJWD_43UaKk/edit?usp=sharing&resourcekey=0-7JXVG57LpmSzkAxzFt6-HA",
        "lastUpdated": "2026-07-20"
      }
    ],
    "activityLevel": "Low",
    "sector": "OEM",
    "rawPocText": ""
  },
  {
    "id": "samsung",
    "name": "Samsung",
    "rpmId": "allen-dinh",
    "tier": "Longtail",
    "pocs": [],
    "rawPocText": "TBD",
    "trainingEngagements": [],
    "projects": [],
    "activityLevel": "Low",
    "sector": "OEM"
  },
  {
    "id": "mediatek",
    "name": "MediaTek",
    "rpmId": "allen-dinh",
    "tier": "Longtail",
    "pocs": [
      {
        "name": "Brian OBranovich",
        "email": "brian.obranovich@mediatek.com",
        "role": "Training POC"
      }
    ],
    "trainingEngagements": [
      "SoC chipset webinar planning session"
    ],
    "projects": [],
    "activityLevel": "Medium",
    "sector": "SoC"
  },
  {
    "id": "amd",
    "name": "AMD",
    "rpmId": "allen-dinh",
    "tier": "Longtail",
    "pocs": [],
    "rawPocText": "Awaiting POC sharing from Allen",
    "trainingEngagements": [],
    "projects": [],
    "activityLevel": "Low",
    "sector": "SoC"
  },
  {
    "id": "hp",
    "name": "HP",
    "rpmId": "sagar-shah",
    "tier": "Priority",
    "pocs": [
      {
        "name": "Julie Harrison",
        "email": "julie.cat.harrison@hp.com",
        "role": "Account POC"
      },
      {
        "name": "Oscar Correia",
        "email": "oscar.correia@hp.com",
        "role": "Account POC"
      },
      {
        "name": "Alex Botham",
        "email": "alex.botham@hp.com",
        "role": "Training POC"
      }
    ],
    "trainingEngagements": [
      "Monthly syncs",
      "HP Connect \"Main Stage\" Facilitation",
      "HP & Chromebook Advantage Series on Pulse",
      "Provided B2S FT Content on 05.21.26"
    ],
    "projects": [
      {
        "id": "proj-hp-1",
        "title": "Monthly HP Syncs",
        "status": "In Progress",
        "description": "Regular alignment on enablement assets and training opportunities.",
        "lastUpdated": "2026-06-03",
        "url": "https://docs.google.com/document/d/1sHbdeYui_-dlLFKHYWW7i4kbrgg8maw2bfS6az05aqg/edit?usp=sharing&resourcekey=0-RMOqJAitFwOH4ErGVSs6ug"
      },
      {
        "id": "proj-hp-2",
        "title": "HP Connect Video",
        "status": "Completed",
        "description": "10 minute video created for HP Connect virtual conference. The presentation was shown to 567 HP team members and received an average CSAT of 4.63 out of 5.",
        "lastUpdated": "2026-07-20",
        "url": "https://drive.google.com/file/d/1C4cgeupeEHrk3gqyQXgBv_0kVSbqbkOf/view"
      },
      {
        "id": "proj-hp-3",
        "title": "HP Pulse Series",
        "status": "Completed",
        "description": "4-part training series for the \"HP & Chromebook Advantage\" during May-June for HP's field team. +90 attendees per training, totaling +360 trained HP reps.",
        "lastUpdated": "2026-07-20",
        "url": "https://drive.google.com/drive/folders/1l7ZiivpPCmNDa1ct90UtEQW0RXw3ggk0?usp=drive_link"
      }
    ],
    "activityLevel": "High",
    "sector": "OEM",
    "rawPocText": ""
  },
  {
    "id": "lenovo",
    "name": "Lenovo",
    "rpmId": "sagar-shah",
    "tier": "Priority",
    "pocs": [
      {
        "name": "Ari Barjesteh",
        "email": "abarjesteh1@lenovo.com",
        "role": "Training POC"
      },
      {
        "name": "Isreal Cruz",
        "email": "icruz7@lenovo.com",
        "role": "Account POC"
      }
    ],
    "trainingEngagements": [
      "Met Ari 5/8, shared basics & Neo platform overview",
      "Provided B2S FT Training 05.21.26"
    ],
    "projects": [
      {
        "id": "proj-lenovo-1",
        "title": "Lenovo Meeting Minutes",
        "status": "In Progress",
        "description": "Regular alignment and Neo feedback consolidation.",
        "lastUpdated": "2026-06-03",
        "url": "https://docs.google.com/document/d/1FmYx-diTbggF5Ksm5kY4XKw4t9TLjaOwy1HlWrd36h8/edit?usp=sharing"
      },
      {
        "id": "proj-1780503269526",
        "title": "OEM Webinar",
        "description": "TBD",
        "status": "Planning",
        "url": "https://docs.google.com/presentation/d/1aDLpxeirYIgWsjUokEvZS1dey5ebEI2r49Gv01hOEpM/edit?usp=sharing&resourcekey=0-SO5j7uuocFtRuy7VIEjuog",
        "lastUpdated": "2026-06-03"
      },
      {
        "id": "proj-lenovo-2",
        "title": "B2S Field Team Training",
        "status": "Completed",
        "description": "Chromebook & Gemini back to School themed content, Trained 60 Lenovo Field Team reps",
        "url": "https://docs.google.com/presentation/d/1mJWZH1jT4jme06wB_FH37Tb3mpwzowM4y2j_prcDWbs/edit?usp=drive_link",
        "lastUpdated": "2026-07-20"
      }
    ],
    "activityLevel": "Medium",
    "sector": "OEM",
    "rawPocText": ""
  },
  {
    "id": "qualcomm",
    "name": "Qualcomm",
    "rpmId": "sagar-shah",
    "tier": "Longtail",
    "pocs": [],
    "rawPocText": "Awaiting Sagar updates",
    "trainingEngagements": [],
    "projects": [],
    "activityLevel": "Low",
    "sector": "SoC"
  },
  {
    "id": "acer",
    "name": "Acer",
    "rpmId": "kelly-granchalek",
    "tier": "Priority",
    "pocs": [],
    "rawPocText": "TBD",
    "trainingEngagements": [
      "OEM Webinar to Acer team on 05.14.26"
    ],
    "projects": [
      {
        "id": "proj-1780502840877",
        "title": "Acer OEM Webinar",
        "description": "05.14.26. Attended by 12 Acer team members.",
        "status": "Completed",
        "url": "https://docs.google.com/presentation/d/1PSsjrs9kNMvdRzu8AyearvUI0-hIdUDGlNTudakxw3w/edit?usp=sharing",
        "lastUpdated": "2026-07-20"
      }
    ],
    "activityLevel": "Low",
    "sector": "OEM"
  },
  {
    "id": "intel",
    "name": "Intel",
    "rpmId": "kelly-granchalek",
    "tier": "Priority",
    "pocs": [
      {
        "name": "Eddie Morris",
        "email": "eddie.morris@intel.com",
        "role": "Training POC (HQ)"
      },
      {
        "name": "Dan Pilkington (2020)",
        "email": "danielx.pilkington@intel.com",
        "role": "Training POC (Field Team)"
      },
      {
        "name": "Claudia Serrano",
        "email": "claudia.e.serrano@intel.com",
        "role": "Account POC"
      }
    ],
    "trainingEngagements": [
      "FT Training Sync with Dan P. 04.14.26",
      "SoC Webinar hosted on 06.01.26",
      "B2S Training Content (for FT) on 05.21.26",
      "Googlebook & iRep Planning 06.17.26 - https://docs.google.com/document/d/17fyW8LQ-RNH0pznLvrwBGu_gnUGXJ2nmS0-06QogeTo/edit?usp=sharing&resourcekey=0-bL-DLsQRUrpqwmbjl5kLcQ"
    ],
    "projects": [
      {
        "id": "proj-intel-2",
        "title": "Intel Field Team MMs",
        "status": "In Progress",
        "description": "Field team trainer guidelines and core collateral review.",
        "lastUpdated": "2026-06-03",
        "url": "https://docs.google.com/document/d/1Jch3fMlskP6QRb7JSjfCcMeg_v_psd3vRytfd0NbG1k/edit?usp=sharing&resourcekey=0-8kSi_b-WF482yBoR-DWFQg"
      },
      {
        "id": "proj-1780498202912",
        "title": "B2S Webinar for FT",
        "description": "Trained 75 Intel Field Team reps",
        "status": "Completed",
        "url": "https://docs.google.com/presentation/d/16VJ6rKhB8Aqi2Arc0eiaq3Jht2qebyOJelsqMkhwH7E/edit?usp=drive_link",
        "lastUpdated": "2026-07-20"
      },
      {
        "id": "proj-1780503065187",
        "title": "OEM/SoC Webinar for Intel",
        "description": "06.01.26 with NA & EMEA teams. Attended by 18 Intel team members.",
        "status": "Completed",
        "url": "https://docs.google.com/presentation/d/1pw_im_gr01jLPT3JG8Et84JXz-yPHcVjdwZBhH6rrRI/edit?usp=sharing",
        "lastUpdated": "2026-07-20"
      }
    ],
    "activityLevel": "High",
    "sector": "SoC",
    "rawPocText": ""
  },
  {
    "id": "walmart",
    "name": "Walmart",
    "rpmId": "ren-laurenceau",
    "tier": "Priority",
    "pocs": [
      {
        "name": "Amy Bates",
        "email": "amy.bates@walmart.com",
        "role": "Account POC (Operations)"
      },
      {
        "name": "Jason Turner",
        "email": "Jason.Turner@walmart.com",
        "role": "Training POC"
      }
    ],
    "trainingEngagements": [
      "Met Amy/Jason on 4/20, awaiting next steps from WMT",
      "Published Content via SellPro for WMT Associates (optional)"
    ],
    "projects": [
      {
        "id": "proj-1780498549429",
        "title": "Walmart SellPro Content",
        "description": "",
        "status": "In Progress",
        "lastUpdated": "2026-06-03",
        "url": "https://secure.sellpro.net/admin/courses/topic_create_edit?course_id=13418&type=8&topic_id=55537"
      },
      {
        "id": "proj-1780498573274",
        "title": "Walmart Training Content",
        "description": "Provided Foundations Series on 04.21.26\n- What is a CB\n- Recommending a CB\n- Elevating Sales\n- Why Buy Chromebook\n- Value of ChromeOS\n- What's New with Chromebook & Google AI",
        "status": "Completed",
        "lastUpdated": "2026-06-03"
      }
    ],
    "activityLevel": "Low",
    "sector": "Retailer"
  },
  {
    "id": "project-mgmt",
    "name": "Project MGMT",
    "rpmId": "allen-dinh",
    "tier": "Longtail",
    "pocs": [],
    "trainingEngagements": [],
    "projects": [],
    "activityLevel": "Low",
    "sector": "Other"
  },
  {
    "id": "rc-willey",
    "name": "RC Willey",
    "rpmId": "allen-dinh",
    "tier": "Longtail",
    "pocs": [],
    "trainingEngagements": [],
    "projects": [],
    "activityLevel": "Low",
    "sector": "Retailer"
  },
  {
    "id": "natm",
    "name": "NATM",
    "rpmId": "allen-dinh",
    "tier": "Longtail",
    "pocs": [],
    "trainingEngagements": [],
    "projects": [],
    "activityLevel": "Low",
    "sector": "Retailer"
  },
  {
    "id": "electronic-exp",
    "name": "Electronic Exp",
    "rpmId": "allen-dinh",
    "tier": "Longtail",
    "pocs": [],
    "trainingEngagements": [],
    "projects": [],
    "activityLevel": "Low",
    "sector": "Retailer"
  },
  {
    "id": "rent-a-center",
    "name": "Rent A Center",
    "rpmId": "allen-dinh",
    "tier": "Longtail",
    "pocs": [],
    "trainingEngagements": [],
    "projects": [],
    "activityLevel": "Low",
    "sector": "Retailer"
  },
  {
    "id": "curacao",
    "name": "Curacao",
    "rpmId": "allen-dinh",
    "tier": "Longtail",
    "pocs": [],
    "trainingEngagements": [],
    "projects": [],
    "activityLevel": "Low",
    "sector": "Retailer"
  },
  {
    "id": "dell",
    "name": "Dell",
    "rpmId": "sagar-shah",
    "tier": "Longtail",
    "pocs": [],
    "trainingEngagements": [],
    "projects": [],
    "activityLevel": "Low",
    "sector": "OEM"
  },
  {
    "id": "staples",
    "name": "Staples",
    "rpmId": "sagar-shah",
    "tier": "Longtail",
    "pocs": [],
    "trainingEngagements": [],
    "projects": [],
    "activityLevel": "Low",
    "sector": "Retailer"
  },
  {
    "id": "office-depot",
    "name": "Office Depot",
    "rpmId": "sagar-shah",
    "tier": "Longtail",
    "pocs": [],
    "trainingEngagements": [],
    "projects": [],
    "activityLevel": "Low",
    "sector": "Retailer"
  },
  {
    "id": "nex",
    "name": "NEX",
    "rpmId": "sagar-shah",
    "tier": "Longtail",
    "pocs": [],
    "trainingEngagements": [],
    "projects": [],
    "activityLevel": "Low",
    "sector": "Retailer"
  },
  {
    "id": "gcx",
    "name": "GCX",
    "rpmId": "sagar-shah",
    "tier": "Longtail",
    "pocs": [],
    "trainingEngagements": [],
    "projects": [],
    "activityLevel": "Low",
    "sector": "Retailer"
  },
  {
    "id": "mcx",
    "name": "MCX",
    "rpmId": "sagar-shah",
    "tier": "Longtail",
    "pocs": [],
    "trainingEngagements": [],
    "projects": [],
    "activityLevel": "Low",
    "sector": "Retailer"
  },
  {
    "id": "b-h",
    "name": "B&H",
    "rpmId": "sagar-shah",
    "tier": "Longtail",
    "pocs": [],
    "trainingEngagements": [],
    "projects": [],
    "activityLevel": "Low",
    "sector": "Retailer"
  },
  {
    "id": "costco",
    "name": "Costco",
    "rpmId": "kelly-granchalek",
    "tier": "Longtail",
    "pocs": [],
    "trainingEngagements": [],
    "projects": [],
    "activityLevel": "Low",
    "sector": "Retailer"
  },
  {
    "id": "sams",
    "name": "Sam's",
    "rpmId": "kelly-granchalek",
    "tier": "Longtail",
    "pocs": [],
    "trainingEngagements": [],
    "projects": [],
    "activityLevel": "Low",
    "sector": "Retailer"
  },
  {
    "id": "bjs",
    "name": "BJ's",
    "rpmId": "kelly-granchalek",
    "tier": "Longtail",
    "pocs": [],
    "trainingEngagements": [],
    "projects": [],
    "activityLevel": "Low",
    "sector": "Retailer"
  },
  {
    "id": "disti",
    "name": "Disti",
    "rpmId": "kelly-granchalek",
    "tier": "Longtail",
    "pocs": [],
    "trainingEngagements": [],
    "projects": [],
    "activityLevel": "Low",
    "sector": "Disti"
  },
  {
    "id": "msi",
    "name": "MSI",
    "rpmId": "kelly-granchalek",
    "tier": "Longtail",
    "pocs": [],
    "trainingEngagements": [],
    "projects": [],
    "activityLevel": "Low",
    "sector": "OEM"
  },
  {
    "id": "tmo",
    "name": "TMO",
    "rpmId": "kelly-granchalek",
    "tier": "Longtail",
    "pocs": [],
    "trainingEngagements": [],
    "projects": [],
    "activityLevel": "Low",
    "sector": "Carrier"
  },
  {
    "id": "vzn",
    "name": "VZN",
    "rpmId": "kelly-granchalek",
    "tier": "Longtail",
    "pocs": [],
    "trainingEngagements": [],
    "projects": [],
    "activityLevel": "Low",
    "sector": "Carrier"
  },
  {
    "id": "att",
    "name": "ATT",
    "rpmId": "kelly-granchalek",
    "tier": "Longtail",
    "pocs": [],
    "trainingEngagements": [],
    "projects": [],
    "activityLevel": "Low",
    "sector": "Carrier"
  },
  {
    "id": "target",
    "name": "Target",
    "rpmId": "kelly-granchalek",
    "tier": "Longtail",
    "pocs": [],
    "trainingEngagements": [],
    "projects": [],
    "activityLevel": "Low",
    "sector": "Retailer"
  },
  {
    "id": "ant-online",
    "name": "Ant Online",
    "rpmId": "kelly-granchalek",
    "tier": "Longtail",
    "pocs": [],
    "trainingEngagements": [],
    "projects": [],
    "activityLevel": "Low",
    "sector": "Retailer"
  },
  {
    "id": "qvc",
    "name": "QVC",
    "rpmId": "ren-laurenceau",
    "tier": "Longtail",
    "pocs": [],
    "trainingEngagements": [],
    "projects": [],
    "activityLevel": "Low",
    "sector": "Retailer"
  },
  {
    "id": "hsn",
    "name": "HSN",
    "rpmId": "ren-laurenceau",
    "tier": "Longtail",
    "pocs": [],
    "trainingEngagements": [],
    "projects": [],
    "activityLevel": "Low",
    "sector": "Retailer"
  }
];

export const INITIAL_RESOURCES: TrainingResource[] = [
  {
    "id": "res-library",
    "name": "[EXT] Training Resources Library",
    "type": "Library",
    "url": "https://sites.google.com/google.com/partner-training-resources/home",
    "lastUpdated": "June 3rd",
    "status": "Updated",
    "audience": "External Shared",
    "description": "Central trix repository featuring shared enablement models and training resources."
  },
  {
    "id": "res-oem-deck",
    "name": "OEM/SoC Webinar Deck",
    "type": "Deck",
    "url": "https://docs.google.com/presentation/d/1gvAl5rHBWCJSEQIoOfxRTJTG48vTXftJLMYmEYIamh4/edit?usp=sharing",
    "lastUpdated": "June 1",
    "status": "FINAL",
    "audience": "External Shared",
    "description": "Webinar slides highlighting OEM integrations and SoC platform benefits."
  },
  {
    "id": "res-strategy-deck",
    "name": "Partner Training Strategy Deck",
    "type": "Deck",
    "url": "https://docs.google.com/presentation/d/1hpIT_T-92P13pgmoWFAzQfiPwk6feIXPu7CGg5XiVGQ/edit?usp=sharing&resourcekey=0-fc0hhWfxUGxqyV9g1DEFkQ",
    "lastUpdated": "May 1st",
    "status": "FINAL",
    "audience": "Internal Only",
    "description": "Core strategy deck outlining Q2-Q3 partner training models, execution parameters, and metrics."
  }
];

export const FIELD_TEAM_DATA: Record<string, FieldTeamData> = {
  acer: {
    hasFieldTeam: false,
  },
  asus: {
    hasFieldTeam: false,
  },
  dell: {
    hasFieldTeam: true,
    agency: "2020 Companies",
    size: "110",
    laborType: "Brand Advocacy & Assisted Sales",
    doorCoverage: "480 BBY total doors",
    lms: "Unknown",
  },
  hp: {
    hasFieldTeam: true,
    agency: "2020 Companies",
    size: "590",
    laborType: "Brand Advocacy & Assisted Sales",
    doorCoverage: "700 BBY total doors | +2k total doors (BBY, Costco, Staples, MC)",
    lms: "SellPro",
  },
  lenovo: {
    hasFieldTeam: true,
    agency: "PRS",
    size: "60",
    laborType: "Brand Advocacy & Assisted Sales",
    doorCoverage: "560 BBY total doors",
    lms: "Lenovo Training Portal",
  },
  intel: {
    hasFieldTeam: true,
    agency: "2020 Companies",
    size: "68",
    laborType: "Brand Advocacy & Assisted Sales",
    doorCoverage: "784 total doors (513 Best Buy, 1 B&H Photo, 250 Costco, 20 MC)",
    lms: "iREP",
  },
  qualcomm: {
    hasFieldTeam: true,
    agency: "BDS",
    size: "640 (US+CA)",
    laborType: "Brand Advocacy & Assisted Sales",
    doorCoverage: "640 BBY & Costco total doors (US+CA)",
    lms: "Snapdragon Experts",
  },
};

export function getFieldTeamInfo(partnerName: string): FieldTeamData | null {
  if (!partnerName) return null;
  const key = partnerName.toLowerCase().trim();
  if (FIELD_TEAM_DATA[key]) {
    return FIELD_TEAM_DATA[key];
  }
  // Try partial match
  for (const [k, v] of Object.entries(FIELD_TEAM_DATA)) {
    if (key.includes(k) || k.includes(key)) {
      return v;
    }
  }
  return null;
}

