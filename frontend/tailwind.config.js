/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060D17',
          900: '#0B192C', // Deep Navy
          800: '#132238', // Navy
          700: '#1E293B',
          600: '#334155',
        },
        primary: {
          DEFAULT: '#0B192C',
          blue: '#1E40AF',
          action: '#2563EB',
          light: '#EFF6FF',
        },
        clinical: {
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          border: '#E2E8F0',
          borderSubtle: '#F1F5F9',
          text: '#334155',
          muted: '#64748B',
          heading: '#0B192C',
        },
        semantic: {
          success: '#059669',
          successLight: '#ECFDF5',
          successBorder: '#A7F3D0',
          warning: '#D97706',
          warningLight: '#FFFBEB',
          warningBorder: '#FDE68A',
          risk: '#DC2626',
          riskLight: '#FEF2F2',
          riskBorder: '#FECACA',
          info: '#2563EB',
          infoLight: '#EFF6FF',
          infoBorder: '#BFDBFE',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)',
        'card-hover': '0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)',
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
      },
    },
  },
  plugins: [],
}
