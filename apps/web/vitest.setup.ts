// These must be set before any test file imports the routers, because
// @repo/env validates environment variables at module import time.
// Values are obviously-fake placeholders; never copy values from a real .env file.
process.env.POSTGRES_URL ??= "postgresql://test:test@localhost:5432/test";
process.env.RECAPTCHA_SECRET_KEY ??= "test-recaptcha-secret";
process.env.EMAIL_USER ??= "test@example.com";
process.env.EMAIL_PASS ??= "test-pass";
process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ??= "test-recaptcha-site-key";
