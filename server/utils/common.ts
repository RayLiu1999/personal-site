export function getClientIP(event: any): string {
  const forwardedFor = event.req.headers['x-forwarded-for']
  if (forwardedFor) {
    const ips = (forwardedFor as string).split(',').map(ip => ip.trim())
    return ips[0] // 返回第一個 IP 地址
  }
  return event.req.socket.remoteAddress || 'Unknown'
}