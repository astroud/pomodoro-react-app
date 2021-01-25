import { render, screen } from '@testing-library/react'
import Settings from './settings'

it('renders the settings pane', () => {
  render(<Settings visible={true} />)
  const settingsPane = screen.getByText(/settings/i)
  expect(settingsPane).toBeInTheDocument()
})