export const individualPlans = [
  {
    id: "free",
    name: "Free",
    audience: "individual",
    description: "Best for solo devs starting their journey.",
    features: [
      "1 project",
      "No team access",
      "Basic task features",
      "Try Basic AI tools",
    ],
    prices: {
      monthly: "$0/mo",
      yearly: "$0/yr",
    },
  },
  {
    id: "solo_plus",
    name: "Solo Plus",
    audience: "individual",
    description: "Freelancers and makers.",
    features: [
      "Up to 5 projects",
      "Solo use only",
      "AI task generation",
      "Try Extended AI tools",
    ],
    prices: {
      monthly: "$4.95/mo",
      yearly: "$49/yr",
    },
  },
  {
    id: "duo",
    name: "Duo",
    audience: "team",
    description: "Two-person teams.",
    features: [
      "Up to 5 projects",
      "2 team members",
      "AI task generation",
      "Shared project dashboard",
    ],
    prices: {
      monthly: "$7.95/mo",
      yearly: "$79/yr",
    },
    highlight: "Most Popular",
  },
  {
    id: "team_pro",
    name: "Team Pro",
    audience: "team",
    description: "Small teams.",
    features: [
      "Unlimited projects",
      "Up to 10 team members",
      "AI + voice-based task input",
    ],
    prices: {
      monthly: "$14.95/mo",
      yearly: "$149/yr",
    },
  },
];
