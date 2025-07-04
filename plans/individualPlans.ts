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
      "Try AI tools",
    ],
    price: "$0/mo",
  },
  {
    id: "solo_plus",
    name: "Solo Plus",
    audience: "individual",
    description: "For focused freelancers and makers.",
    features: ["Up to 5 projects", "Solo use only", "AI task generation"],
    price: "$4.95/mo",
  },
  {
    id: "duo",
    name: "Duo",
    audience: "team",
    description: "Built for two-person teams or partnerships.",
    features: [
      "Up to 5 projects",
      "2 team members",
      "AI task generation",
      "Shared project dashboard",
    ],
    price: "$7.95/mo",
    highlight: "Most Popular",
  },
  {
    id: "team_pro",
    name: "Team Pro",
    audience: "team",
    description: "For small teams building together.",
    features: [
      "Unlimited projects",
      "Up to 10 team members",
      "AI + voice-based task input",
    ],
    price: "$14.95/mo",
  },
];
