import { useEffect, useRef, useState } from 'react'
import { useClickOutside } from '../hooks'
import styled from 'styled-components'
import { DaysView, MonthsView, YearsView } from './view'
import { getTotalDaysOfMonth } from './date'
import { ViewPropsType } from './types'

const Wrapper = styled.div``

enum VIEW_TYPE {
  DAYS = 'DAYS',
  MONTHS = 'MONTHS',
  YEARS = 'YEARS',
}

const VIEWS = {
  [VIEW_TYPE.DAYS]: DaysView,
  [VIEW_TYPE.MONTHS]: MonthsView,
  [VIEW_TYPE.YEARS]: YearsView,
}

type DatePickerType = {
  onSelect?: (date: Date) => any
  date?: Date | string
}

const DatePicker = (props: DatePickerType) => {
  const wrapperRef = useRef(null)
  // const inputRef = useRef(null)
  const [showDatePicker, setShowDatePicker] = useState(true)
  // const onChangeDateInput = () => {
  //   const selectedDate = inputRef.current.value
  //   console.log(selectedDate)
  // }
  useClickOutside(wrapperRef, () => setShowDatePicker(false))

  const todayObj = new Date()
  const todayDate = todayObj.getDate()
  const todayMonth = todayObj.getMonth()
  const todayYear = todayObj.getFullYear()

  const [initialDateObj, setInitialDateObj] = useState(
    props.date ? new Date(props.date) : new Date()
  )

  const initialDate = initialDateObj.getDate()
  const initialMonth = initialDateObj.getMonth()
  const initialYear = initialDateObj.getFullYear()
  useEffect(() => {
    // only update when it is a valid date obj or string
    if (
      props.date &&
      (typeof props.date === 'string' || typeof props.date.getDate === 'function')
    ) {
      setInitialDateObj(new Date(props.date))
    }
  }, [props.date])

  const [selectedMonth, setSelectedMonth] = useState(initialMonth)
  const [selectedDateObj, setSelectedDateObj] = useState(initialDateObj)
  const [selectedYear, setSelectedYear] = useState(initialYear)
  const [currentViewType, setCurrentViewType] = useState(VIEW_TYPE.DAYS)

  const onDateClick = ({ date, month, year }: { date: number; month: number; year: number }) => {
    const newDate = new Date(year, month, date)
    setSelectedDateObj(newDate)
    // setDateToInput(day.timestamp);
    if (props.onSelect) props.onSelect(newDate)
  }

  const setDate = (offset: number) => {
    let newDate = selectedDateObj.getDate() + offset
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
    setSelectedDateObj(new Date(newYear, newMonth, newDate))
    setSelectedMonth(newMonth)
    setSelectedYear(newYear)
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
    [VIEW_TYPE.YEARS]: () => {},
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
    selectedYear,
    selectedMonth,
    selectedDateObj,
    todayDate,
    todayMonth,
    todayYear,
  }
  const CurrentView = VIEWS[currentViewType]
  return (
    <Wrapper id="date-picker-wrapper" ref={wrapperRef}>
      {/* <div onClick={() => setShowDatePicker(true)}>
        <input type="date" ref={inputRef} onChange={onChangeDateInput} />
      </div> */}
      {showDatePicker && <CurrentView {...currentViewProps} />}
    </Wrapper>
  )
}
export default DatePicker
