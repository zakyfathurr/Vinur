export const STAGES = [
  {
    id: 1,
    name: 'Mengenal 1–3',
    icon: 'looks_one',
    color: '#e2165f',
    bgColor: '#ffd9de',
    borderColor: '#ffb2be',
    ageRange: '2–4 tahun',
    purpose:
      'Anak belajar mengenali simbol angka 1, 2, dan 3 serta mencocokkannya dengan jumlah benda secara visual. Ini adalah fondasi terpenting sebelum belajar angka yang lebih besar.',
    skills: ['Pengenalan simbol angka', 'Korespondensi satu-satu', 'Diskriminasi visual angka'],
    levels: [
      { id: 1, type: 'tap-number', prompt: 'Tap angka 1!', options: [2, 1, 3, 0], answer: 1 },
      { id: 2, type: 'tap-number', prompt: 'Tap angka 2!', options: [1, 3, 2, 0], answer: 2 },
      { id: 3, type: 'tap-number', prompt: 'Tap angka 3!', options: [0, 2, 3, 1], answer: 3 },
      { id: 4, type: 'count-dots', prompt: 'Ada berapa titik?', count: 1, options: [1, 2, 3, 4], answer: 1 },
      { id: 5, type: 'count-dots', prompt: 'Ada berapa titik?', count: 2, options: [1, 2, 3, 4], answer: 2 },
      { id: 6, type: 'count-dots', prompt: 'Ada berapa titik?', count: 3, options: [1, 2, 3, 4], answer: 3 },
    ],
  },
  {
    id: 2,
    name: 'Mengenal 4–6',
    icon: 'looks_4',
    color: '#b80049',
    bgColor: '#ffdad6',
    borderColor: '#ffb2be',
    ageRange: '3–5 tahun',
    purpose:
      'Anak memperluas kemampuan mengenal angka ke 4, 5, dan 6 melalui latihan menghitung benda. Kuantitas yang lebih besar mulai diperkenalkan secara visual.',
    skills: ['Pengenalan angka 4–6', 'Menghitung objek', 'Perbandingan jumlah dasar'],
    levels: [
      { id: 1, type: 'tap-number', prompt: 'Tap angka 4!', options: [4, 5, 6, 3], answer: 4 },
      { id: 2, type: 'tap-number', prompt: 'Tap angka 5!', options: [6, 4, 5, 3], answer: 5 },
      { id: 3, type: 'tap-number', prompt: 'Tap angka 6!', options: [4, 6, 5, 7], answer: 6 },
      { id: 4, type: 'count-dots', prompt: 'Ada berapa titik?', count: 4, options: [3, 4, 5, 6], answer: 4 },
      { id: 5, type: 'count-dots', prompt: 'Ada berapa titik?', count: 5, options: [4, 5, 6, 7], answer: 5 },
      { id: 6, type: 'count-dots', prompt: 'Ada berapa titik?', count: 6, options: [4, 5, 6, 7], answer: 6 },
    ],
  },
  {
    id: 3,
    name: 'Mengenal 7–9',
    icon: 'looks_7',
    color: '#4b6700',
    bgColor: '#f0ffd0',
    borderColor: '#b9f61d',
    ageRange: '4–6 tahun',
    purpose:
      'Anak mengenali angka 7, 8, dan 9 — angka yang lebih besar dan sering menjadi hambatan. Latihan menghitung benda dalam kelompok banyak dilakukan secara bertahap.',
    skills: ['Pengenalan angka 7–9', 'Menghitung banyak benda', 'Subitizing visual'],
    levels: [
      { id: 1, type: 'tap-number', prompt: 'Tap angka 7!', options: [7, 8, 9, 6], answer: 7 },
      { id: 2, type: 'tap-number', prompt: 'Tap angka 8!', options: [7, 9, 8, 6], answer: 8 },
      { id: 3, type: 'tap-number', prompt: 'Tap angka 9!', options: [7, 8, 6, 9], answer: 9 },
      { id: 4, type: 'count-dots', prompt: 'Ada berapa titik?', count: 7, options: [6, 7, 8, 9], answer: 7 },
      { id: 5, type: 'count-dots', prompt: 'Ada berapa titik?', count: 8, options: [6, 7, 8, 9], answer: 8 },
      { id: 6, type: 'count-dots', prompt: 'Ada berapa titik?', count: 9, options: [6, 7, 8, 9], answer: 9 },
    ],
  },
  {
    id: 4,
    name: 'Urutan Angka',
    icon: 'format_list_numbered',
    color: '#775447',
    bgColor: '#ffdbcf',
    borderColor: '#ebbcac',
    ageRange: '4–7 tahun',
    purpose:
      'Anak belajar memahami bahwa angka memiliki urutan tertentu. Kemampuan ini penting untuk mengerti konsep "sebelum" dan "sesudah" dalam barisan bilangan.',
    skills: ['Urutan bilangan', 'Pola angka', 'Logika sequence'],
    levels: [
      { id: 1, type: 'sequence', prompt: '1 ,  _ ,  3', options: [2, 4, 0, 5], answer: 2 },
      { id: 2, type: 'sequence', prompt: '2 ,  3 ,  _', options: [4, 1, 5, 6], answer: 4 },
      { id: 3, type: 'sequence', prompt: '_ ,  5 ,  6', options: [4, 3, 7, 2], answer: 4 },
      { id: 4, type: 'sequence', prompt: '5 ,  6 ,  _', options: [7, 4, 8, 9], answer: 7 },
      { id: 5, type: 'sequence', prompt: '7 ,  _ ,  9', options: [8, 6, 5, 10], answer: 8 },
      { id: 6, type: 'sequence', prompt: '1 ,  2 ,  _ ,  4', options: [3, 0, 5, 6], answer: 3 },
    ],
  },
  {
    id: 5,
    name: 'Besar & Kecil',
    icon: 'compare_arrows',
    color: '#926c5e',
    bgColor: '#ffdbcf',
    borderColor: '#ebbcac',
    ageRange: '5–8 tahun',
    purpose:
      'Anak belajar membandingkan dua angka untuk menentukan mana yang lebih besar atau lebih kecil. Ini adalah dasar untuk operasi matematika seperti penjumlahan dan pengurangan.',
    skills: ['Perbandingan angka', 'Konsep lebih besar/kecil', 'Diskriminasi kuantitas'],
    levels: [
      { id: 1, type: 'compare', prompt: 'Mana yang\nlebih BESAR?', options: [3, 5], answer: 5 },
      { id: 2, type: 'compare', prompt: 'Mana yang\nlebih KECIL?', options: [7, 4], answer: 4 },
      { id: 3, type: 'compare', prompt: 'Mana yang\nlebih BESAR?', options: [2, 8], answer: 8 },
      { id: 4, type: 'compare', prompt: 'Mana yang\nlebih KECIL?', options: [6, 1], answer: 1 },
      { id: 5, type: 'compare', prompt: 'Mana yang\nlebih BESAR?', options: [4, 9], answer: 9 },
      { id: 6, type: 'compare', prompt: 'Mana yang\nlebih KECIL?', options: [5, 3], answer: 3 },
    ],
  },
]

export const initProgress = () => ({
  solved: 0,
  attempts: 0,
  maxLevel: 0,
  timeSpent: 0,
  startedAt: null,
  completedAt: null,
})

export const getSuccessRate = (p) =>
  p.attempts === 0 ? 0 : Math.round((p.solved / p.attempts) * 100)

export const formatTime = (seconds) => {
  if (!seconds || seconds === 0) return '—'
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  if (m === 0) return `${s} dtk`
  if (s === 0) return `${m} mnt`
  return `${m} mnt ${s} dtk`
}
