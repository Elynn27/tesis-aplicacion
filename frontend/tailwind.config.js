module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./projects/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: { primary: '#3B82F6',
        secondary: '#64748B',
        success: '#10B981',
        danger: '#EF4444',
        warning: '#F59E0B',
        info: '#06B6D4'
      },
      boxShadow: {
        'soft': '0 4px 24px rgba(0,0,0,0.05)'
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}