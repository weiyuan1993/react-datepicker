// @ts-nocheck
import { useEffect } from 'react'

export const useClickOutside = (ref, callback) => {
  const handleClick = (e) => {
    if (ref.current && !e.path.find((p) => p === ref.current)) {
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
