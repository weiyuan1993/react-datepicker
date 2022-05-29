import { MONTH_ARR } from '../constants'
import { Button } from '../components'
import { Container, Body, Header, Item, ItemButton } from '../styles'
import { FlexWrapBox } from '../../sharedStyles'
import { ViewPropsType } from '../types'

const MonthsView = ({
  selectedYear,
  selectedMonth,
  onLeftButtonClick,
  onCenterButtonClick,
  onRightButtonClick,
  onItemButtonClick,
}: ViewPropsType) => {
  const months = MONTH_ARR.map((month, i) => {
    return (
      <Item key={i} rowItems={4}>
        <ItemButton isSelected={i === selectedMonth} onClick={() => onItemButtonClick(i)}>
          {month.slice(0, 3)}
        </ItemButton>
      </Item>
    )
  })

  return (
    <Container>
      <Header>
        <Button onClick={onLeftButtonClick}>&#60;</Button>
        <Button onClick={onCenterButtonClick}>
          {MONTH_ARR[selectedMonth]} {selectedYear}
        </Button>
        <Button onClick={onRightButtonClick}>&#62;</Button>
      </Header>
      <Body>
        <FlexWrapBox>{months}</FlexWrapBox>
      </Body>
    </Container>
  )
}

export default MonthsView
