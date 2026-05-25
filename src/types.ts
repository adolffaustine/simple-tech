export interface BusinessMatch {
  name: string;
  category: string;
  description: string;
  phone: string;
  address: string;
  matchScore: number;
  accentColor: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'batlein';
  text: string;
  matches?: BusinessMatch[];
  timestamp: Date;
}

export interface CustomBlueprint {
  recommendedStack: string[];
  keyArchitectureSteps: string[];
  estimatedHardwareCost: string;
  networkingSecurityPlan: string;
  simpleTechValueAdd: string;
}

export interface TechCapability {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge: string;
  specs: string[];
}

export interface TechProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  interactiveType: 'ecowater' | 'batlein' | 'netsentry' | 'aifix';
  longDescription: string;
}
