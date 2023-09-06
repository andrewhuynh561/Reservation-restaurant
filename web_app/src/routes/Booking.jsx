import { useState } from 'react'
import {useParams} from 'react-router-dom'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'

function Booking() {
  const { id } = useParams();

  const [count, setCount] = useState(0)

  return (
    <>
      <div> //select date feature
        <select></select>
      </div>
    </>
  )
}

export default Booking
