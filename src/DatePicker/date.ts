import { DayDetailsType, DayObj } from './types'

/**
 *  The function to retrieve total days of a month
 *  new Date(year, month, date) will automatically transform to the correct date
 *  when the date value provided is larger than the total days of the month
 *  We use a number that larger than 31 to caculate the total days of the month
 *  example: new Date(2022, 5, 32) is 2022-07-02, then we use 32 to minus 2, we get 30.
 *  Which means that June has 30 days
 * */
export const getTotalDaysOfMonth = (year: number, month: number) =>
  32 - new Date(year, month, 32).getDate()

export const generateDaysOfMonth = (year: number, month: number): DayDetailsType[] => {
  // find the start day of the month
  const startDayOfMonth = new Date(year, month).getDay()

  const preMonthValue = month - 1
  const nextMonthValue = month + 1
  const preMonth = preMonthValue < 0 ? 11 : preMonthValue // convert negative value to the last year
  const yearOfPrevMonth = preMonthValue < 0 ? year - 1 : year
  const yearOfNextMonth = nextMonthValue === 12 ? year + 1 : year

  const totalDaysOfPrevMonth = getTotalDaysOfMonth(yearOfPrevMonth, preMonth)
  const totalDays = getTotalDaysOfMonth(year, month)
  let date = 1
  const result: DayDetailsType[] = []
  for (let row = 0; row <= 5; row++) {
    for (let day = 0; day <= 6; day++) {
      // from sun to sat
      let dayDetail = {} as DayDetailsType
      // for previous month
      if (row === 0 && day < startDayOfMonth) {
        dayDetail = {
          month: preMonth,
          date: totalDaysOfPrevMonth - startDayOfMonth + date,
          day,
          year: yearOfPrevMonth,
        }
      } else if (date > totalDays) {
        // for next month
        dayDetail = {
          month: month + 1,
          date: date % totalDays,
          day,
          year: yearOfNextMonth,
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

export const isCurrentDay = ({ date, month, year }: DayObj, today: DayObj) => {
  return date === today.date && month === today.month && year === today.year
}

export const isSelectedDay = ({ date, month, year }: DayObj, selected: DayObj) =>
  date === selected.date && month === selected.month && year === selected.year

export const transformToISO = ({ date, month, year }: DayObj) => {
  let displayMonth = (month + 1).toString()
  let displayDate = date.toString()
  displayMonth = padZero(displayMonth)
  displayDate = padZero(displayDate)
  return `${year}-${displayMonth}-${displayDate}`
}

export const padZero = (numStr: string) => (Number(numStr) <= 9 ? `0${numStr}` : numStr)

export const parseDateInputString = (dateInputStr: string) => dateInputStr.split('-').map(Number)

export const isValidDateString = (dateString: string) => {
  // eslint-disable-next-line prefer-const
  let [year, month, date] = parseDateInputString(dateString)
  const isAllNumber = [year, month, date].every(Number.isInteger)
  if (!isAllNumber) return false
  // check invalid range
  let isValid = true
  if (year >= 3000 || year < 1000) isValid = false
  if (month > 12 || month < 1) isValid = false
  if (date > 31 || date < 1) isValid = false
  month--
  return isValid
}

export const isValidDateProp = (dateProp?: Date | string) => {
  return (
    (typeof dateProp === 'string' && isValidDateString(dateProp)) ||
    typeof (dateProp as Date).getDate === 'function'
  )
}

export const getTodayDate = () => {
  const todayObj = new Date()
  const todayDate = todayObj.getDate()
  const todayMonth = todayObj.getMonth()
  const todayYear = todayObj.getFullYear()
  return {
    todayObj,
    todayDate,
    todayMonth,
    todayYear,
  }
}
