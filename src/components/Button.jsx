import React from 'react'

export default function Button({ children, onClick, active = false }) {
  return (
    <button
      className={`top-button${active ? ' active' : ''}`}
      onClick={onClick}
      aria-pressed={active}
    >
      {children}
    </button>
  )
}
// ...exis