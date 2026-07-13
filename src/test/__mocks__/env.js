// Test double for src/utils/env.js - used instead of the real file (which
// contains import.meta.env, not supported under Jest) via jest.config.cjs's
// moduleNameMapper.
export const BASE_URL = '/'