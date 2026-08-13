/**
 * Web3Forms backend for the interest form.
 *
 * `WEB3FORMS_ENDPOINT` is the fixed API URL; the form is identified by
 * `WEB3FORMS_ACCESS_KEY` sent in the request body. The access key is a public
 * alias for the recipient email (safe to ship in client code).
 *
 * Leave the access key empty to disable submission — the form validates input
 * and shows a friendly "not configured yet" message instead of posting, so no
 * submission is silently lost.
 */
export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

// Read from an env var at build time (VITE_ prefix exposes it to the client),
// falling back to the literal key. `import.meta.env` is loosely typed, which
// keeps the empty-string guard in the form meaningful if the key is removed.
export const WEB3FORMS_ACCESS_KEY: string =
  (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined) ??
  '90c624a5-0166-4079-bc15-c57c21a7c57d'
