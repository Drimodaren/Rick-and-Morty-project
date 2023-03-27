import React from 'react'

export default function Button ({children,color='red',...props}) {
  return (
    <button {...props} style={{color}}>{children}</button>
  )
}
