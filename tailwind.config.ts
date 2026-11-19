import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './data/**/*.ts'],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--canvas)', surface: 'var(--surface)', soft: 'var(--soft)',
        ink: 'var(--ink)', brand: 'var(--brand)', tint: 'var(--tint)',
        accent: 'var(--accent)', muted: 'var(--muted)',
      },
      borderRadius: {
        pill: '9999px', field: '12px', icon: '16px', card: 'var(--card-radius)', panel: 'var(--panel-radius)',
      },
      fontFamily: { display: ['var(--font-sora)', 'sans-serif'], sans: ['var(--font-inter)', 'sans-serif'] },
    },
  },
  plugins: [],
} satisfies Config;
