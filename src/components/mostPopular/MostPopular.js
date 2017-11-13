import React from 'react'

const MostPopular = ({ mostPopular }) => (
  <h2>
    {mostPopular.map((chain, i, arr) => {
      if (arr.length > 1 && i !== arr.length - 1) return chain + ' & ';
      if (i === arr.length - 1 && arr.length === 1) return chain + ' is ';
      if (i === arr.length - 1) return chain + ' are ';
      return chain;
    })}
    the most popular around you.
 </h2>
)

export default MostPopular;