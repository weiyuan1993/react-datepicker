import styled from 'styled-components'
import { FlexCenterBox, PrimaryColor, FadeColor } from '../sharedStyles'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  max-height: 350px;
  padding: 10px;
  box-shadow: 2px 2px 2px ${FadeColor};
  border: 0.5px solid ${FadeColor};
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
  flex: ${(props: { rowItems: number }) => Math.round(100 / props.rowItems) - 1}%;
  ${(props) => ({ ...props.style })}
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
    background: ${FadeColor};
  }
  ${(props) => {
    const { disabled, isHighlighted, isSelected } = props
    let additionalStyles = ''
    if (disabled) additionalStyles += `pointer-events: none; color: ${FadeColor};`
    if (isHighlighted) additionalStyles += `color: ${PrimaryColor};`
    if (isSelected)
      additionalStyles += `background: ${PrimaryColor}; color: white; :hover{ background: red };`
    return additionalStyles
  }}
`
