// Isolates Vite's import.meta.env in its own module. Components import
// BASE_URL from here instead of using import.meta.env directly, so that in
// Jest tests this single file can be swapped for a mock (Jest doesn't run
// under Vite, so import.meta isn't available there).
export const BASE_URL = import.meta.env.BASE_URL