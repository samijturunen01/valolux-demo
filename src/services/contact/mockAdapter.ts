import type { ContactSubmissionAdapter } from './types';

/**
 * DEMO ADAPTER – sends nothing and stores nothing.
 *
 * It only waits briefly so the loading state can be seen, then reports
 * `{ status: 'demo' }`. The payload is deliberately not logged, persisted or
 * transmitted anywhere.
 */
export const mockAdapter: ContactSubmissionAdapter = {
  mode: 'demo',
  async submit() {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    return { status: 'demo' };
  },
};
