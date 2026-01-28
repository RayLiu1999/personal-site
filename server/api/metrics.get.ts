/**
 * Prometheus metrics endpoint
 * Provides basic application metrics in Prometheus format
 */
export default defineEventHandler(() => {
  const uptime = process.uptime()
  const memoryUsage = process.memoryUsage()
  
  // Convert to Prometheus format
  const metrics = `# HELP nodejs_process_uptime_seconds Process uptime in seconds
# TYPE nodejs_process_uptime_seconds gauge
nodejs_process_uptime_seconds ${uptime}

# HELP nodejs_memory_heap_used_bytes Memory heap used in bytes
# TYPE nodejs_memory_heap_used_bytes gauge
nodejs_memory_heap_used_bytes ${memoryUsage.heapUsed}

# HELP nodejs_memory_heap_total_bytes Total heap memory in bytes
# TYPE nodejs_memory_heap_total_bytes gauge
nodejs_memory_heap_total_bytes ${memoryUsage.heapTotal}

# HELP nodejs_memory_rss_bytes Resident set size in bytes
# TYPE nodejs_memory_rss_bytes gauge
nodejs_memory_rss_bytes ${memoryUsage.rss}

# HELP nodejs_memory_external_bytes External memory in bytes
# TYPE nodejs_memory_external_bytes gauge
nodejs_memory_external_bytes ${memoryUsage.external}

# HELP personal_site_info Application information
# TYPE personal_site_info gauge
personal_site_info{version="1.0.0",nodejs_version="${process.version}"} 1
`

  // Set content type to plain text for Prometheus scraping
  return metrics
})
