import styled from 'styled-components'
import DatePicker from './DatePicker'
import { FlexCenterBox } from './sharedStyles'

const AppWrapper = styled(FlexCenterBox)`
  * {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
      Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }
  display: flex;
  flex-direction: column;
`

function App() {
  return (
    <AppWrapper>
      <h1>React DatePicker</h1>
      <DatePicker onSelect={(date: Date) => console.log(date)} />
    </AppWrapper>
  )
}

export default App
