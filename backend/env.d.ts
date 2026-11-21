declare namespace Cloudflare {
  interface Env {
    DB: D1Database
    PRESENCE: DurableObjectNamespace<import('./src/presence').PagePresence>
    ALLOWED_ORIGINS: string
    TEST_MIGRATIONS: import('cloudflare:test').D1Migration[]
  }
}
