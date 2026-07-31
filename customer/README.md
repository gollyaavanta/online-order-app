# Gollya Avanta e-commerce site

## Deploy configuration

The application is configured for Netlify and runs with `npm run build`.

Before deploying, set these environment variables in Netlify:

- `RESEND_API_KEY` for the contact form email service.
- `NEXT_PUBLIC_API_URL` for the existing authentication service.

Copy `.env.example` to `.env.local` for local development. Never commit real keys.

The storefront, catalog, cart, checkout, customer dashboard and admin dashboard are ready to build. Payments, courier tracking, invoice generation, WhatsApp sending and authentication require their selected provider credentials and server-side integrations before accepting real orders.
