
import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL || "postgresql://postgres.wxniywyujrxlwraocszi:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres",
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:5173,https://your-domain.com",
      adminCors: process.env.ADMIN_CORS || "http://localhost:9000,http://localhost:7001,http://localhost:5173",
      authCors: process.env.AUTH_CORS || "http://localhost:9000,http://localhost:7001,http://localhost:5173",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  admin: {
    disable: false,
    backendUrl: process.env.MEDUSA_BACKEND_URL || "http://localhost:9000",
  },
  modules: [
    {
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/payment-stripe",
            id: "stripe",
            options: {
              apiKey: process.env.STRIPE_SECRET_KEY,
              webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
            },
          },
        ],
      },
    },
  ],
})
