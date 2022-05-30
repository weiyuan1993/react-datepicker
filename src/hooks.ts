import { useEffect } from 'react'

// polyfill for IE11
if (!('path' in Event.prototype)) {
  Object.defineProperty(Event.prototype, 'path', {
    get: function () {
      const path = []
      let currentElem = this.target
      while (currentElem) {
        path.push(currentElem)
        currentElem = currentElem.parentElement
      }
      if (path.indexOf(window) === -1 && path.indexOf(document) === -1) path.push(document)
      if (path.indexOf(window) === -1) path.push(window)
      return path
    },
  })
}

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
