export type ViewPropsType = {
  onLeftButtonClick: (v: number) => void
  onRightButtonClick: (v: number) => void
  onCenterButtonClick: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onItemButtonClick: any
  selected: DayObj
  today: DayObj
}

export type DayObj = {
  date: number
  month: number
  year: number
}

export type DayDetailsType = {
  date: number
  day: number
  month: number
  year: number
  timestamp?: number
}
