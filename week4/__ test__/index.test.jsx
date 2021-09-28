import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import Entry from '../pages/[id].js'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /List of Names/i,
    })

    expect(heading).toBeInTheDocument()
  })
})


describe('Entry', () => {
  it('renders a card', () => {
    render(<Entry />)

    const heading1 = screen.getByRole('heading', {
      name: /Data:/i,
    })

    expect(heading1).toBeInTheDocument()
  })
})

