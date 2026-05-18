import { useSyncExternalStore } from 'react'

const COMPACT_LAYOUT_QUERY = '(max-width: 1023px)'

function subscribe(onStoreChange: () => void) {
  const mq = window.matchMedia(COMPACT_LAYOUT_QUERY)
  mq.addEventListener('change', onStoreChange)
  return () => mq.removeEventListener('change', onStoreChange)
}

function getSnapshot() {
  return window.matchMedia(COMPACT_LAYOUT_QUERY).matches
}

function getServerSnapshot() {
  return false
}

export function useCompactLayout(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
