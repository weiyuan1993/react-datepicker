import { ReactNode } from 'react'
import styled, { CSSProperties } from 'styled-components'

const ButtonWrapper = styled.button<ButtonProps>`
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  border-radius: 5px;
  :hover {
    background: #eeee;
  }
  font-size: 14px;
  font-weight: bold;
  ${(props) => ({ ...props.style })}
  ${(props) =>
    !props.onClick
      ? ':hover { background: transparent; } pointer-events: none; cursor: default;'
      : ''}
`

type ButtonProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (params: any) => any
  children: string | number | ReactNode
  style?: CSSProperties
}

const Button = (props: ButtonProps) => {
  const { onClick, children, style } = props
  return (
    <ButtonWrapper onClick={onClick} style={style}>
      {children}
    </ButtonWrapper>
  )
}
export default Button
