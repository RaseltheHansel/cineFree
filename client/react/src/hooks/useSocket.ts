import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import type { TrendingPayload } from '../types'

const baseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:5000'

export const useSocketTrending = (enabled: boolean) => {
  const [data, setData] = useState<TrendingPayload | null>(null)

  useEffect(() => {
    if (!enabled) return

    const socket: Socket = io(baseUrl, { transports: ['websocket'] })
    socket.on('trending:update', (payload: TrendingPayload) => {
      setData(payload)
    })

    return () => {
      socket.disconnect()
    }
  }, [enabled])

  return data
}
