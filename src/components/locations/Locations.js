import React from 'react';
import { Table } from './locations.styled';
import Location from '../location/Location';

const Results = ({ locations }) => (
  <Table>
    <thead>
      <tr>
        {['Name', 'Address', 'Distance'].map(header => <th key={header}>{header}</th>)}
      </tr>
    </thead>
    <tbody>
      {locations.map(location => (
        <Location location={location} key={location.address} />
      ))}
    </tbody>
  </Table>
)

export default Results;