import React,{ useContext } from 'react'

import noteContext from '../context/notes/noteContext'
const about = () => {
  const a = useContext(noteContext)
  return (
    <div>
      hello{a.Name};
    </div>
  )
}

export default about
