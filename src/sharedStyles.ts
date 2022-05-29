import styled, { css } from 'styled-components'

export const PrimaryColor = '#db3d44'
export const FadeColor = '#eeeeee'

export const flexbox = css`
  display: flex;
`
export const flexJustifyCenter = css`
  justify-content: center;
`
export const flexAlignCenter = css`
  align-items: center;
`
export const flexJustifySpaceBetween = css`
  justify-content: space-between;
`
export const flexColumn = css`
  flex-direction: column;
`
export const flexWrap = css`
  flex-wrap: wrap;
`
export const FlexCenterBox = styled.div`
  ${flexbox}
  ${flexAlignCenter}
  ${flexJustifyCenter}
`
export const FlexColumnBox = styled.div`
  ${flexbox}
  ${flexColumn}
`
export const FlexWrapBox = styled.div`
  ${flexbox}
  ${flexWrap}
`
export const FlexSpaceBetween = styled.div`
  ${flexbox}
  ${flexJustifySpaceBetween}
`
