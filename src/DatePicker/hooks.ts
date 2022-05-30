import { useState, useEffect, useCallback, Dispatch, SetStateAction } from 'react'
import { VIEW_TYPE } from './constants'

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
/**
 *  When click on the center button of the DatePicker, it will switch the view to days or months, or years
 *  In Safari, the target will not show in the datepicker wrapper's ref 
 *  it's been changed to the new center button of the new view
 *  Added a timeout to delay setState action to solve it.
 *  Let clickOutside trigger first then switch the view later
 */
export const useCurrentView = (initialViewType: VIEW_TYPE) => {
  const [currentViewType, setAction] = useState(initialViewType)
  const waitForClickOutsideCheck = (fn: Dispatch<SetStateAction<VIEW_TYPE>>, timeout = 10) => {
    return (viewType: VIEW_TYPE) =>
      setTimeout(() => {
        fn(viewType)
      }, timeout)
  }
  const delaySetCurrentView = (viewType: VIEW_TYPE) =>
    waitForClickOutsideCheck(setAction)(viewType)
  const memorizedCallback = useCallback(delaySetCurrentView, [currentViewType])

  return { currentViewType, setCurrentViewType: memorizedCallback }
}
