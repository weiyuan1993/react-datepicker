import styled from 'styled-components'
import { FlexCenterBox } from '../sharedStyles'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 280px;
  max-height: 330px;
  padding: 10px;
  box-shadow: 2px 2px 2px #eee;
`

export const Body = styled.div`
  display: flex;
  flex-direction: column;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  > button {
    height: 35px;
  }
  > button:nth-child(1) {
    flex: 1;
  }
  > button:nth-child(2) {
    flex: 3;
  }
  > button:nth-child(3) {
    flex: 1;
  }
  margin-bottom: 10px;
`

export const Item = styled(FlexCenterBox)`
  flex: ${(props: { rowItems: number }) => Math.round(100 / props.rowItems)}%;
`
export const ItemButton = styled.button<{
  disabled?: boolean
  isHighlighted?: boolean
  isSelected?: boolean
}>`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background: transparent;
  border: 0;
  cursor: pointer;
  :hover {
    background: #eeee;
  }
  ${(props) => {
    const { disabled, isHighlighted, isSelected } = props
    let additionalStyles = ''
    if (disabled) additionalStyles += 'pointer-events: none;'
    if (isHighlighted) additionalStyles += 'color: red;'
    if (isSelected) additionalStyles += 'background: red; color: white;:hover{ background: red };'
    return additionalStyles
  }}
`
