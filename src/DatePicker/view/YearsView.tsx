import { Button } from '../components'
import { Container, Body, Header, Item, ItemButton } from '../styles'
import { FlexWrapBox } from '../../sharedStyles'
import { ViewPropsType } from '../types'

const YearsView = ({
  selected,
  onLeftButtonClick,
  onCenterButtonClick,
  onRightButtonClick,
  onItemButtonClick,
}: ViewPropsType) => {
  const startYear = selected.year - (selected.year % 10)
  const endYear = startYear + 9

  const years = new Array(12).fill(null).map((year, i) => {
    const displayYear = startYear + i - 1
    return (
      <Item key={displayYear} rowItems={4}>
        <ItemButton
          isSelected={displayYear === selected.year}
          onClick={() => onItemButtonClick(displayYear)}
        >
          {displayYear}
        </ItemButton>
      </Item>
    )
  })

  return (
    <Container>
      <Header>
        <Button onClick={onLeftButtonClick}>&#60;</Button>
        <Button onClick={onCenterButtonClick}>
          {startYear}-{endYear}
        </Button>
        <Button onClick={onRightButtonClick}>&#62;</Button>
      </Header>
      <Body>
        <FlexWrapBox>{years}</FlexWrapBox>
      </Body>
    </Container>
  )
}

export default YearsView
