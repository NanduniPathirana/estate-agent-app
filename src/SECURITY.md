# Security Measures

This app implements two client-side security measures, as required by the coursework spec.

## 1. Content Security Policy (CSP)

Defined as a `<meta http-equiv="Content-Security-Policy">` tag in `index.html`.

It restricts which sources the browser is allowed to load content from:
- `default-src 'self'` — only load resources from this app by default
- `script-src 'self'` — only run scripts bundled with the app; blocks inline
  `<script>` tags and any injected third-party script, which is the main
  defense against XSS payloads that try to execute JavaScript
- `style-src 'self' 'unsafe-inline'` — app styles plus the small amount of
  inline styling used internally by the react-widgets library
- `img-src 'self' data: https:` — property images served from this app
  (and https: images if real photos are swapped in later)
- `frame-src https://www.google.com` — the only external content allowed to
  be embedded is the Google Maps iframe on the property page
- `object-src 'none'` — blocks plugins/Flash entirely
- `base-uri 'self'` — prevents an injected `<base>` tag from redirecting
  relative URLs to an attacker-controlled domain
- `form-action 'self'` — forms can only submit back to this site

## 2. Automatic HTML/JSX Encoding

React escapes all values rendered inside JSX expressions (`{ }`) by
default. Any text that ends up on the page — search input, property
descriptions, locations, etc. — is automatically converted to safe text
rather than being interpreted as HTML, which prevents cross-site scripting
(XSS) via user input or property data.

This app never uses `dangerouslySetInnerHTML` anywhere, which is the only
way React would allow raw/unescaped HTML to be injected into the DOM. All
dynamic content in this project goes through normal JSX interpolation and
is therefore automatically encoded.