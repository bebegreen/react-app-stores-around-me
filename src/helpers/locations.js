import { RADIUS } from './constants';

export default function sortLocations(locations) {
  locations = locations.sort((a, b) => (
    a.distance - b.distance
  ))
}

export function getMostPopularStore(locations) {
  const locationsInRadius = mapLocationsByFrequency(locations);
  const mostPopular = calculateMostPopular(locationsInRadius);
  return mostPopular;
}


export function addDistanceToLocation(store, locations, locationsWithDistance, addressesArray) {
  store.branches.forEach((address, addressIndex) => {
    const index = addressesArray.indexOf(address)
    const location = locations[index].distance;
    locationsWithDistance.push({
      chain: store.chain,
      address: address,
      distance: location.value,
      text: location.text
    })
  })
}

function mapLocationsByFrequency(locations) {
  return locations.reduce((result, location) => {
    if (location.distance / 1000 < RADIUS) {
      const { chain } = location;
      result[chain] = chain in result ? result[chain] + 1 : 1;
    }
    return result;
  }, {})
}

function calculateMostPopular(locationsInRadius) {
  let mostPopular = [], mostBranches = 0;
  for (let location in locationsInRadius) {
    const currentBranches = locationsInRadius[location]; 
    if (currentBranches > mostBranches) {
      mostBranches = currentBranches; 
      mostPopular.splice(0, mostPopular.length, location) 
    } else if (currentBranches === mostBranches) { 
      mostPopular.push(location); 
    }
  }  
  return mostPopular; 
}
