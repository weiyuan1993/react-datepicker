import React from 'react'

export type ViewPropsType = {
  onLeftButtonClick: (v: number) => void
  onRightButtonClick: (v: number) => void
  onCenterButtonClick: () => void
  onItemButtonClick: any
  selectedYear: number
  selectedMonth: number
  selectedDateObj: Date
  todayDate: number
  todayMonth: number
  todayYear: number
}

export type DayDetailsType = {
  date: number
  day: number
  month: number
  year?: number
  timestamp?: number
}
