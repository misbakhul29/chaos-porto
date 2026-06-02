export class RateLimiter {
  private store = new Map<string, { count: number; resetTime: number }>();
  private windowMs: number;
  private maxRequests: number;

  constructor(windowMs: number, maxRequests: number) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  public check(ip: string): boolean {
    const now = Date.now();
    const record = this.store.get(ip);

    if (!record) {
      this.store.set(ip, { count: 1, resetTime: now + this.windowMs });
      return true;
    }

    if (now > record.resetTime) {
      record.count = 1;
      record.resetTime = now + this.windowMs;
      return true;
    }

    if (record.count >= this.maxRequests) {
      return false;
    }

    record.count += 1;
    return true;
  }
}

// Global instance for the application
// 5 requests per minute
export const apiRateLimiter = new RateLimiter(60 * 1000, 5);
