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
  name: 'Diseminasi Literasi Digital Pemkab Sinjai',
  groupName: 'Tim APTIKA & Siber Diskominfosan',
  topicId: 42,
  unreadCount: 38,
  participantsCount: 14,
  description: 'Koordinasi kampanye anti-hoaks & mediasi damai Alun-Alun Sinjai'
};

export const INITIAL_MESSAGES: Message[] = [
  {
    id: 101,
    sender: 'Hasir Achmad',
    senderRole: 'Kepala Dinas',
    avatarColor: '#E17076',
    avatarText: 'HA',
    text: 'Selamat pagi rekan-rekan APTIKA. Terkait persiapan rilis konten literasi digital pekan ini, bagaimana perkembangan slide mediasi & perlindungan privasi anak?',
    time: '08:15'
  },
  {
    id: 102,
    sender: 'Muhammad Takdir',
    senderRole: 'Kabid APTIKA',
    avatarColor: '#2F88E0',
    avatarText: 'MT',
    text: 'Siap Pak Kadis, untuk Slide 4 mediasi Alun-Alun sudah kita terapkan Gaussian blur halus pada seluruh wajah anak-anak & warga. Privasi terlindungi 100%.',
    time: '08:18',
    isSelf: true
  },
  {
    id: 103,
    sender: 'Rio Pratama',
    senderRole: 'Admin Jaringan MPP',
    avatarColor: '#FAA357',
    avatarText: 'RP',
    text: 'Izin menambahkan Pak, pemantauan CCTV dan link jaringan di MPP pagi ini terpantau stabil di 99.8%. Kanal pengaduan juga sudah standby.',
    time: '08:24'
  },
  {
    id: 104,
    sender: 'Sudarmin',
    senderRole: 'Infrastruktur TI',
    avatarColor: '#7BC862',
    avatarText: 'SD',
    text: 'Koordinasi dengan Telkom Sinjai untuk FO cadangan sudah terverifikasi. Kami siap menyokong live broadcast pimpinan jika diperlukan.',
    time: '08:31'
  },
  {
    id: 105,
    sender: 'Hasir Achmad',
    senderRole: 'Kepala Dinas',
    avatarColor: '#E17076',
    avatarText: 'HA',
    text: 'Bagus sekali. Pastikan dkip.sinjaikab.go.id dan humas.sinjaikab.go.id dicantumkan resmi di footer slide terakhir.',
    time: '08:40'
  },
  {
    id: 106,
    sender: 'Ahmad Staff Medsos',
    senderRole: 'Kreatif',
    avatarColor: '#65AADD',
    avatarText: 'AS',
    text: 'Format carousel 4:5 sudah kami sesuaikan untuk feed IG & FB Humas Sinjai. Naskah caption juga sudah diparaf.',
    time: '09:05'
  },
  {
    id: 107,
    sender: 'Rio Pratama',
    senderRole: 'Admin Jaringan MPP',
    avatarColor: '#FAA357',
    avatarText: 'RP',
    text: 'Tolong tim CSIRT lakukan quick review pada file zip yang akan diunggah ke Google Drive publik agar bersih dari metadata sensitif.',
    time: '09:15'
  },
  {
    id: 108,
    sender: 'Muhammad Takdir',
    senderRole: 'Kabid APTIKA',
    avatarColor: '#2F88E0',
    avatarText: 'MT',
    text: 'Sudah diaudit dan bersih dari kredensial/token. Berkas zip final v5 siap didistribusikan ke seluruh kanal resmi.',
    time: '09:22',
    isSelf: true
  }
];

export const SUMMARY_DATA: {
  title: string;
  overview: string;
  sentiment: string;
  points: SummaryPoint[];
} = {
  title: 'Ringkasan Cepat 38 Pesan Terakhir',
  overview: 'Diskusi pimpinan mengenai kesiapan rilis konten literasi digital, verifikasi sensor privasi anak Alun-Alun Sinjai, dan audit keamanan berkas publik.',
  sentiment: 'Konklusif & Siap Rilis',
  points: [
    {
      topic: 'Privasi Wajah & Revisi Slide 4',
      actionItem: 'Wajah anak-anak dan warga telah diburamkan rapi; tidak ada data identitas yang bocor.',
      targetMessageId: 102,
      highlightedSender: 'Muhammad Takdir',
      timeEstimate: '08:18'
    },
    {
      topic: 'Kesiapan Jaringan & Saluran Resmi',
      actionItem: 'Uptime jaringan MPP 99.8%; FO cadangan standby; domain resmi dkip.sinjaikab.go.id disematkan di footer.',
      targetMessageId: 104,
      highlightedSender: 'Sudarmin & Rio',
      timeEstimate: '08:31'
    },
    {
      topic: 'Keputusan Rilis & Keamanan Berkas',
      actionItem: 'Audit CSIRT tuntas tanpa kebocoran kredensial; paket final v5 disetujui Pak Kadis untuk rilis.',
      targetMessageId: 108,
      highlightedSender: 'Hasir Achmad & Takdir',
      timeEstimate: '09:22'
    }
  ]
};
