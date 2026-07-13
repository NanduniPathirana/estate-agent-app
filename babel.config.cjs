// Babel config used only by Jest (Vite uses its own esbuild-based
// transform for dev/build, this is separate and only needed for tests).
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
}