export type Wearable = {
  id: string;
  name: string;
  sync: string;
  color: string;
  glyph: string;
  live?: boolean;
};

export type Vitals = {
  hr: { value: number; unit: string; delta: string; positive: boolean; series: number[] };
  bp: { value: number; unit: string; delta: string; positive: boolean; series: number[] };
  sleep: { value: number; unit: string; delta: string; positive: boolean; series: number[] };
  steps: { value: number; unit: string; delta: string; positive: boolean; series: number[] };
};

export type ScoreFactor = { label: string; value: number; hint: string };

export type Mood = { id: string; emoji: string; label: string };

export type Medication = {
  id: string;
  name: string;
  dose: string;
  frequency: string;
  duration: string;
  pillColor: string;
};

export const mockUser = {
  firstName: 'Amara',
  lastName: 'Okonkwo',
  initials: 'AO',
  date: 'Apr 19',
};

export const mockHealthScore = 84;
export const mockHealthScoreDelta = '+3 this week';
export const mockHealthHeadline = 'thriving';
export const mockHealthSubhead = 'Best score in 2 weeks.';

export const mockScoreFactors: ScoreFactor[] = [
  { label: 'Sleep',     value: 78, hint: '7.2h avg' },
  { label: 'Activity',  value: 92, hint: '8.4k steps' },
  { label: 'Adherence', value: 88, hint: '12-day streak' },
  { label: 'Vitals',    value: 76, hint: 'BP trending up' },
];

export const mockMoods: Mood[] = [
  { id: 'great',  emoji: '🌿', label: 'Great' },
  { id: 'okay',   emoji: '☁️', label: 'Okay' },
  { id: 'tired',  emoji: '🌧', label: 'Tired' },
  { id: 'unwell', emoji: '🔥', label: 'Unwell' },
  { id: 'pain',   emoji: '⚡️', label: 'In pain' },
];

export const mockWearables: Wearable[] = [
  { id: 'apple',  name: 'Apple Health', sync: 'Live',     color: '#FF3B57', glyph: '♥', live: true },
  { id: 'galaxy', name: 'Galaxy Watch', sync: '2m ago',   color: '#1428A0', glyph: '⌚' },
  { id: 'oura',   name: 'Oura',         sync: '12m ago',  color: '#0D1414', glyph: '◯' },
];

export const mockVitals: Vitals = {
  hr:    { value: 72,   unit: 'bpm',   delta: '-4',   positive: true,  series: [76, 78, 75, 80, 74, 72, 73, 70, 72, 72] },
  bp:    { value: 118,  unit: 'mmHg',  delta: '+2',   positive: false, series: [115, 116, 118, 117, 120, 119, 118, 121, 118, 118] },
  sleep: { value: 7.2,  unit: 'h',     delta: '+0.3', positive: true,  series: [6.5, 7.0, 6.8, 7.5, 7.2, 6.9, 7.1, 7.2, 7.4, 7.2] },
  steps: { value: 8400, unit: '/day',  delta: '+12%', positive: true,  series: [6500, 7200, 8000, 7500, 8400, 8200, 8900, 9100, 8400, 8400] },
};

export const mockAIInsight = {
  badge: 'Hive AI · Noticed a pattern',
  copyLead: "You've checked in",
  copyAccent: 'tired',
  copyTrail: '3 days in a row, and your sleep dropped to 6.1h last night.',
  body: 'This can signal early infection, stress, or low iron. Want to rule it out?',
};

export const mockMedications: Medication[] = [
  { id: 'm1', name: 'Amoxicillin', dose: '500mg', frequency: '3× daily', duration: '7 days',  pillColor: '#FFB8DB' },
  { id: 'm2', name: 'Ibuprofen',   dose: '200mg', frequency: 'as needed', duration: '14 days', pillColor: '#8BE0FF' },
];
