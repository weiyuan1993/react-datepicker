import { DayDetailsType } from './types'

export const getTotalDaysOfMonth = (year: number, month: number) =>
  32 - new Date(year, month, 32).getDate()

export const generateDaysOfMonth = (year: number, month: number): DayDetailsType[] => {
  // find the start day of the month
  const startDayOfMonth = new Date(year, month).getDay()
  const prevMonthValue = month - 1
  const preMonth = prevMonthValue < 0 ? 11 : prevMonthValue // convert negative value to the last year
  const preYearOfPrevMonth = prevMonthValue < 0 ? year - 1 : year
  const totalDaysOfPrevMonth = getTotalDaysOfMonth(preYearOfPrevMonth, preMonth)
  const totalDays = getTotalDaysOfMonth(year, month)
  let date = 1
  const result: DayDetailsType[] = []
  for (let row = 0; row <= 5; row++) {
    for (let day = 0; day <= 6; day++) {
      // from sun to sat
      let dayDetail  = {} as DayDetailsType
      // for previous month
      if (row === 0 && day < startDayOfMonth) {
        dayDetail = {
          month: preMonth,
          date: totalDaysOfPrevMonth - startDayOfMonth + date,
          day,
        }
      } else if (date > totalDays) {
        // for next month
        dayDetail = {
          month: month + 1,
          date: date % totalDays,
          day,
        }
      } else {
        if (row === 0 && day === startDayOfMonth) date = 1
        // for current month
        dayDetail = {
          month,
          date,
          day,
          timestamp: new Date(year, month, date).getTime(),
          year,
        }
      }
      date++
      result.push(dayDetail)
    }
  }
  return result
}

export const isCurrentDay = (
  { date, month, year }: DayDetailsType,
  { todayDate, todayMonth, todayYear }: { todayDate: number; todayMonth: number; todayYear: number }
) => {
  return date === todayDate && month === todayMonth && year === todayYear
}

export const isSelectedDay = (
  { date, month, year }: DayDetailsType,
  selectedDate: Date
) =>
  date === selectedDate.getDate() &&
  month === selectedDate.getMonth() &&
  year === selectedDate.getFullYear()
