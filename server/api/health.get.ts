/**
 * Health check endpoint for Kubernetes liveness and readiness probes
 */
export default defineEventHandler(() => {
  return {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: 'personal-site',
  }
})
