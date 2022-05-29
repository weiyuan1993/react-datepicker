import { Button } from '../components'
import { generateDaysOfMonth, isCurrentDay, isSelectedDay } from '../date'
import { MONTH_ARR, DAYS_ARR } from '../constants'
import { Container, Body, Header, Item, ItemButton } from '../styles'
import { FlexColumnBox, FlexWrapBox, FlexSpaceBetween } from '../../sharedStyles'
import { ViewPropsType } from '../types'

const DaysView = ({
  selectedYear,
  selectedMonth,
  selectedDateObj,
  onLeftButtonClick,
  onCenterButtonClick,
  onRightButtonClick,
  onItemButtonClick,
  todayDate,
  todayMonth,
  todayYear,
}: ViewPropsType) => {
  const calendarMarkup = (
    <FlexColumnBox>
      <FlexSpaceBetween>
        {DAYS_ARR.map((day, i) => (
          <Item key={i} rowItems={7}>
            {day}
          </Item>
        ))}
      </FlexSpaceBetween>
      <FlexWrapBox>
        {generateDaysOfMonth(selectedYear, selectedMonth).map((day, index) => (
          <Item key={index} rowItems={7}>
            <ItemButton
              disabled={day.month !== selectedMonth}
              isHighlighted={isCurrentDay(day, { todayDate, todayMonth, todayYear })}
              isSelected={isSelectedDay(day, selectedDateObj)}
              onClick={() => onItemButtonClick(day)}
            >
              {day.date}
            </ItemButton>
          </Item>
        ))}
      </FlexWrapBox>
    </FlexColumnBox>
  )
  return (
    <Container>
      <Header>
        <Button onClick={onLeftButtonClick}>&#60;</Button>
        <Button onClick={onCenterButtonClick}>
          {MONTH_ARR[selectedMonth]} {selectedYear}
        </Button>
        <Button onClick={onRightButtonClick}>&#62;</Button>
      </Header>
      <Body>{calendarMarkup}</Body>
    </Container>
  )
}
export default DaysView
