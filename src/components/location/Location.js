import React from 'react'
import {Td} from './location.styled'; 

const Location = ({ location }) => {
  return (
    <tr key={location.address}>
      <Td>{location.chain}</Td>
      <Td>{location.address}</Td>
      <Td>{location.text}</Td>
    </tr>
  )
}

export default Location;