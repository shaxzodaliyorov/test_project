import { delay } from 'msw'

export const MSW_ARTIFICIAL_DELAY_MS = 600

export async function mswLatency(): Promise<void> {
  await delay(MSW_ARTIFICIAL_DELAY_MS)
}
