import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 *
 *
 * @param values {...(string | undefined)}
 * @returns {string}
 */
function alternatives(...values) {
  for (const value of values) {
    if (value && value.length > 0) {
      return value;
    }
  }
  return '';
}

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    STRIPE_SECRET_KEY: z.string(),
    STRIPE_APP_INFO_NAME: z.string().optional().default("GIS Stripe Test Project"),
    STRIPE_APP_INFO_VERSION: z.string().optional().default("1.0.0"),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),
    NEXT_PUBLIC_APP_URL: z.string().optional().default("http://localhost:3000"),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: alternatives(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST, process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE),
    NEXT_PUBLIC_APP_URL: alternatives(process.env.NEXT_PUBLIC_SITE_URL, process.env.NEXT_PUBLIC_VERCEL_URL),
    STRIPE_SECRET_KEY: alternatives(process.env.STRIPE_SECRET_KEY_TEST, process.env.STRIPE_SECRET_KEY_LIVE),
    STRIPE_APP_INFO_NAME: alternatives(process.env.STRIPE_APP_INFO_NAME),
    STRIPE_APP_INFO_VERSION: alternatives(process.env.STRIPE_APP_INFO_NAME),
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});