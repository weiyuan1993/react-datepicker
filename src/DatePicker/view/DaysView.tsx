import { Button } from '../components'
import { generateDaysOfMonth, isCurrentDay, isSelectedDay } from '../date'
import { MONTH_ARR, DAYS_ARR } from '../constants'
import { Container, Body, Header, Item, ItemButton } from '../styles'
import { FlexColumnBox, FlexWrapBox, FlexSpaceBetween } from '../../sharedStyles'
import { ViewPropsType } from '../types'

const DaysView = ({
  selected,
  today,
  onLeftButtonClick,
  onCenterButtonClick,
  onRightButtonClick,
  onItemButtonClick,
}: ViewPropsType) => {
  const calendarMarkup = (
    <FlexColumnBox>
      <FlexSpaceBetween>
        {DAYS_ARR.map((day, i) => (
          <Item key={i} rowItems={7} style={{ fontWeight: 'bold' }}>
            {day}
          </Item>
        ))}
      </FlexSpaceBetween>
      <FlexWrapBox>
        {generateDaysOfMonth(selected.year, selected.month).map((day, index) => (
          <Item key={index} rowItems={7}>
            <ItemButton
              disabled={day.month !== selected.month}
              isHighlighted={isCurrentDay(day, today)}
              isSelected={isSelectedDay(day, selected)}
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
          {MONTH_ARR[selected.month]} {selected.year}
        </Button>
        <Button onClick={onRightButtonClick}>&#62;</Button>
      </Header>
      <Body>{calendarMarkup}</Body>
    </Container>
  )
}
export default DaysView
