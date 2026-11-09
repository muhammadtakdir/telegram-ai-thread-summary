export interface Message {
  id: number;
  sender: string;
  senderRole?: string;
  avatarColor: string;
  avatarText: string;
  text: string;
  time: string;
  isSelf?: boolean;
  replyTo?: { id: number; sender: string; text: string };
  badge?: string;
}

export interface SummaryPoint {
  topic: string;
  actionItem: string;
  targetMessageId: number;
  highlightedSender: string;
  timeEstimate: string;
}

export const DEMO_TOPIC = {
  name: 'Telegram Desktop 5.0 Release Coordination',
  groupName: 'Core Design & Client Team',
  topicId: 42,
  unreadCount: 38,
  participantsCount: 24,
  description: 'Design review, AI feature staging, and release branch stabilization'
};

export const INITIAL_MESSAGES: Message[] = [
  {
    id: 101,
    sender: 'Pavel Durov',
    senderRole: 'Founder',
    avatarColor: '#E17076',
    avatarText: 'PD',
    text: 'Good morning everyone. Regarding the Designers × AI initiative and our upcoming release: how is the contextual thread summary feature progressing?',
    time: '10:15'
  },
  {
    id: 102,
    sender: 'Takdir',
    senderRole: 'UI/UX & Core Engineer',
    avatarColor: '#2F88E0',
    avatarText: 'TK',
    text: 'Everything is staged nicely! The floating Summary Pill renders seamlessly above the unread arrow with native liquid glass physics and 60 fps transitions.',
    time: '10:18',
    isSelf: true
  },
  {
    id: 103,
    sender: 'Alex Romanov',
    senderRole: 'Desktop Lead',
    avatarColor: '#FAA357',
    avatarText: 'AR',
    text: 'Memory footprint looks outstanding: on-device context parsing takes under 45ms and consumes less than 1.8MB RAM on Telegram Web K & Desktop.',
    time: '10:24'
  },
  {
    id: 104,
    sender: 'Elena Voronina',
    senderRole: 'Design QA',
    avatarColor: '#7BC862',
    avatarText: 'EV',
    text: 'Tested the flyout drawer across all screen scales. Contrast ratios comply with strict WCAG AAA standards in dark and night modes.',
    time: '10:31'
  },
  {
    id: 105,
    sender: 'Pavel Durov',
    senderRole: 'Founder',
    avatarColor: '#E17076',
    avatarText: 'PD',
    text: 'Excellent work. Ensure the direct jump-to-message interaction has that signature Telegram smooth spotlight flash.',
    time: '10:40'
  },
  {
    id: 106,
    sender: 'Mark Zuckerberg-killer',
    senderRole: 'Motion Designer',
    avatarColor: '#65AADD',
    avatarText: 'MZ',
    text: 'Added cubic-bezier timing curves for both the Pill hover breathing effect and message anchor jump. Feels incredibly responsive.',
    time: '10:52'
  },
  {
    id: 107,
    sender: 'Alex Romanov',
    senderRole: 'Desktop Lead',
    avatarColor: '#FAA357',
    avatarText: 'AR',
    text: 'Zero external dependencies, clean React + TypeScript architecture ready to merge directly into the core repo.',
    time: '11:05'
  },
  {
    id: 108,
    sender: 'Takdir',
    senderRole: 'UI/UX & Core Engineer',
    avatarColor: '#2F88E0',
    avatarText: 'TK',
    text: 'Automated test suite and production build confirmed green. Full working repository and interactive demo video are ready for submission!',
    time: '11:12',
    isSelf: true
  }
];

export const SUMMARY_DATA: {
  title: string;
  overview: string;
  sentiment: string;
  points: SummaryPoint[];
} = {
  title: 'Executive Summary of 38 Unread Messages',
  overview: 'Team discussion finalizing the Contextual Thread Summary Pill for Telegram Designers × AI: verified 60fps animations, 45ms local latency, and zero-dependency TypeScript implementation.',
  sentiment: 'Ready for Merge & Release',
  points: [
    {
      topic: 'UI Mechanics & Floating Pill',
      actionItem: 'Floating pill smoothly integrated above jump-to-unread with dynamic counter and subtle breathing glow.',
      targetMessageId: 102,
      highlightedSender: 'Takdir',
      timeEstimate: '10:18'
    },
    {
      topic: 'Performance & Dark Mode Contrast',
      actionItem: 'Under 45ms parsing latency, 1.8MB memory footprint, verified WCAG AAA contrast in Telegram Dark Theme.',
      targetMessageId: 104,
      highlightedSender: 'Alex Romanov & Elena',
      timeEstimate: '10:31'
    },
    {
      topic: 'Direct Jump Navigation & Merge Approval',
      actionItem: 'Spotlight jump confirmed by Pavel Durov; clean modular code ready for immediate merge into Web K / Desktop.',
      targetMessageId: 108,
      highlightedSender: 'Pavel Durov & Takdir',
      timeEstimate: '11:12'
    }
  ]
};
