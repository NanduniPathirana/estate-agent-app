// Adds custom Jest matchers like toBeInTheDocument(), toHaveTextContent(),
// etc. for asserting on rendered DOM output.
import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

// jsdom (Jest's test environment) doesn't provide TextEncoder/TextDecoder,
// which react-router-dom relies on internally. Polyfilling with Node's
// built-in util module avoids "TextEncoder is not defined" errors.
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder
  global.TextDecoder = TextDecoder
}