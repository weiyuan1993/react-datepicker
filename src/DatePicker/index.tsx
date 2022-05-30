import React, { useEffect, useRef, useState } from 'react'
import { useClickOutside, useCurrentView } from './hooks'
import styled from 'styled-components'
import { DaysView, MonthsView, YearsView } from './view'
import {
  getTotalDaysOfMonth,
  transformToISO,
  parseDateInputString,
  isValidDateString,
  isValidDateProp,
  getTodayDate,
} from './date'
import { DayDetailsType, DayObj, ViewPropsType } from './types'
import { VIEW_TYPE } from './constants'
import CalendarSVG from './assets/calendar.svg'

const Wrapper = styled.div`
  width: 280px;
`
const DateInputWrapper = styled.div`
  display: flex;
  height: 20px;
  border: 1.5px solid #b8b8b8;
  border-radius: 4px;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  input {
    border: 0;
    appearance: none;
    outline: none;
  }
  width: 250px;
`

const VIEWS = {
  [VIEW_TYPE.DAYS]: DaysView,
  [VIEW_TYPE.MONTHS]: MonthsView,
  [VIEW_TYPE.YEARS]: YearsView,
}

type DatePickerType = {
  onSelect?: (date: Date) => any
  date?: Date | string
}

const { todayObj, todayDate, todayMonth, todayYear } = getTodayDate()

const DatePicker = (props: DatePickerType) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [showDatePicker, setShowDatePicker] = useState(false)
  const initialDateObj = props.date && isValidDateProp(props.date) ? new Date(props.date) : todayObj

  const [dateInputValue, setDateInputValue] = useState('')
  const [selectedMonth, setSelectedMonth] = useState(initialDateObj.getMonth())
  const [selectedDate, setSelectedDate] = useState(initialDateObj.getDate())
  const [selectedYear, setSelectedYear] = useState(initialDateObj.getFullYear())

  useClickOutside(wrapperRef, () => setShowDatePicker(false))
  const { currentViewType, setCurrentViewType } = useCurrentView(VIEW_TYPE.DAYS)

  // update date from 'date' prop, only update when it is a valid date obj or string
  useEffect(() => {
    if (props.date && isValidDateProp(props.date)) {
      const newDateProp = new Date(props.date)
      updateDate({
        date: newDateProp.getDate(),
        month: newDateProp.getMonth(),
        year: newDateProp.getFullYear(),
      })
    }
  }, [props.date])

  // update selected value from DatePicker to dateInput
  useEffect(() => {
    setDateInputValue(
      transformToISO({ date: selectedDate, month: selectedMonth, year: selectedYear })
    )
  }, [selectedDate, selectedMonth, selectedYear])

  const onChangeDateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value
    setDateInputValue(selectedDate)
  }

  const trimDateInput = (event: React.KeyboardEvent) => {
    // if key was backspace or delete, don't trim
    if (['Backspace', 'Delete'].includes(event.key)) return
    event.preventDefault()

    if (event.key === 'Enter') return updateDateInputToDatePicker()

    let newDateInputValue = inputRef?.current?.value || ''
    // replace non-digit char
    const value = dateInputValue.replace(/\D/g, '').slice(0, 8)
    if (value.length >= 6) {
      newDateInputValue = `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6)}`
    } else if (value.length >= 4) {
      newDateInputValue = `${value.slice(0, 4)}-${value.slice(4)}`
    }
    setDateInputValue(newDateInputValue)
  }

  const updateDateInputToDatePicker = () => {
    const [year, month, date] = parseDateInputString(dateInputValue)
    isValidDateString(dateInputValue) && updateDate({ year, month: month - 1, date })
  }

  const updateDate = ({ date, month, year }: DayObj) => {
    setSelectedDate(date)
    setSelectedMonth(month)
    setSelectedYear(year)
  }

  const onDateClick = (dayDetails: DayDetailsType) => {
    const { date, month, year } = dayDetails
    const newDate = new Date(year, month, date)
    updateDate({ date, month, year })
    setDateInputValue(transformToISO(dayDetails))
    if (props.onSelect) props.onSelect(newDate)
  }

  const setDate = (offset: number) => {
    let newDate = selectedDate + offset
    let newMonth = selectedMonth
    let newYear = selectedYear
    const totalDaysOfMonth = getTotalDaysOfMonth(selectedYear, selectedMonth)
    if (newDate > totalDaysOfMonth) {
      newMonth++
      newDate %= totalDaysOfMonth
      if (newMonth === 12) {
        newMonth = 0
        newYear++
      }
    } else if (newDate === 0) {
      // set to prev month
      newMonth--
      if (newMonth === -1) {
        newMonth = 11
        newYear--
      }
      const totalDaysOfPrevMonth = getTotalDaysOfMonth(newYear, newMonth)
      newDate = totalDaysOfPrevMonth
    }
    updateDate({ date: newDate, month: newMonth, year: newYear })
  }

  const setMonth = (newMonth: number) => {
    let month = newMonth
    let year = selectedYear
    if (month === 12) {
      month = 0
      year++
    } else if (month === -1) {
      month = 11
      year--
    }
    setSelectedMonth(month)
    setSelectedYear(year)
  }

  const setYear = (newYear: number) => {
    setSelectedYear(newYear)
  }

  const LEFT_BUTTON_CLICK_MAP = {
    [VIEW_TYPE.DAYS]: () => setDate(-1),
    [VIEW_TYPE.MONTHS]: () => setMonth(selectedMonth - 1),
    [VIEW_TYPE.YEARS]: () => setYear(selectedYear - 10),
  }
  const RIGHT_BUTTON_CLICK_MAP = {
    [VIEW_TYPE.DAYS]: () => setDate(1),
    [VIEW_TYPE.MONTHS]: () => setMonth(selectedMonth + 1),
    [VIEW_TYPE.YEARS]: () => setYear(selectedYear + 10),
  }
  const CENTER_BUTTON_CLICK_MAP = {
    [VIEW_TYPE.DAYS]: () => setCurrentViewType(VIEW_TYPE.MONTHS),
    [VIEW_TYPE.MONTHS]: () => setCurrentViewType(VIEW_TYPE.YEARS),
    [VIEW_TYPE.YEARS]: () => setCurrentViewType(VIEW_TYPE.DAYS),
  }
  const ITEM_BUTTON_CLICK_MAP = {
    [VIEW_TYPE.DAYS]: onDateClick,
    [VIEW_TYPE.MONTHS]: (v: number) => {
      setMonth(v)
      setCurrentViewType(VIEW_TYPE.DAYS)
    },
    [VIEW_TYPE.YEARS]: (v: number) => {
      setYear(v)
      setCurrentViewType(VIEW_TYPE.MONTHS)
    },
  }
  const currentViewProps: ViewPropsType = {
    onLeftButtonClick: LEFT_BUTTON_CLICK_MAP[currentViewType],
    onRightButtonClick: RIGHT_BUTTON_CLICK_MAP[currentViewType],
    onCenterButtonClick: CENTER_BUTTON_CLICK_MAP[currentViewType],
    onItemButtonClick: ITEM_BUTTON_CLICK_MAP[currentViewType],
    selected: {
      year: selectedYear,
      month: selectedMonth,
      date: selectedDate,
    },
    today: {
      year: todayYear,
      month: todayMonth,
      date: todayDate,
    },
  }
  const CurrentView = VIEWS[currentViewType]
  return (
    <Wrapper id="date-picker-wrapper" ref={wrapperRef}>
      <DateInputWrapper onClick={() => setShowDatePicker(true)}>
        <CalendarSVG onClick={updateDateInputToDatePicker} width="20px" style={{ margin: '5px' }} />
        <input
          ref={inputRef}
          id="date-picker-input"
          value={dateInputValue}
          onChange={onChangeDateInput}
          onKeyUp={trimDateInput}
          onBlur={updateDateInputToDatePicker}
          placeholder="yyyy-mm-dd"
        />
      </DateInputWrapper>
      {showDatePicker && <CurrentView {...currentViewProps} />}
    </Wrapper>
  )
}
export default DatePicker
