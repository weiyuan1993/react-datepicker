/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react'

export const useClickOutside = (ref: any, callback: any) => {
  const handleClick = (e: any) => {
    if (ref.current && !e.path.find((p: any) => p === ref.current)) {
      callback()
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  })
}
