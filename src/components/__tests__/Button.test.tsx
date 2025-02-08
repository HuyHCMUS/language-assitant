import React from 'react'
import { render, screen } from '@testing-library/react'
import Button from '../common/Button'

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('applies primary variant styles by default', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toHaveClass('bg-primary-600')
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Click me</Button>)
    expect(screen.getByText('Click me')).toHaveClass('custom-class')
  })
}) 