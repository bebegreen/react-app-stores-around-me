import React, { Component } from 'react';
import stores from '../../stores';
import Search from '../search/Search';
import Locations from '../locations/Locations';
import MostPopular from '../mostPopular/MostPopular';
import sortLocations, { getMostPopularStore, addDistanceToLocation } from '../../helpers/locations';
import Api from '../../helpers/api';
import { Main, Title } from './app.styled';
const API = new Api();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      mostPopular: '',
      loading: false,
      success: false,
      failure: false,
      locationsWithDistance: ''
    };
    this.handleLocationPick = this.handleLocationPick.bind(this);
    this.setUsersAddress = this.setUsersAddress.bind(this);
  }

  setUsersAddress(location) {
    this.setState({ location });
  }

  getDistances() {
    const origin = [this.state.location];
    const destinations = stores.reduce((address, store) => address.concat(store.branches), []);
    return API.getDistances(origin, destinations);
  }

  async handleLocationPick(e) {
    e.preventDefault();
    this.setState({ loading: true, failure: false, locationsWithDistance: '', mostPopular: '' })

    try {
      if (this.state.location) {
        let distances = await this.getDistances();
        const locationsWithDistance = [];

        // flatten all  addresses to one array
        const addressesArray = stores.reduce((arr, store) => arr.concat(store.branches), []);
        stores.forEach((store, storeIndex) => {
          addDistanceToLocation(store, distances, locationsWithDistance, addressesArray);
        })

        sortLocations(locationsWithDistance);

        const mostPopular = getMostPopularStore(locationsWithDistance);
        this.setState({ locationsWithDistance, mostPopular, loading: false });
      } else throw new Error(400);
    }
    catch (err) {
      this.setState({ failure: true, loading: false })
    }
  }

  render() {
    const { locationsWithDistance: locations, loading, failure, mostPopular } = this.state;
    return (
      <Main>
        <Title>Type in your address to get supermarkets around you.</Title>
        <Search
          onchange={this.setUsersAddress}
          onpick={this.handleLocationPick}
        />
        {mostPopular.length > 0 && <MostPopular mostPopular={mostPopular} />}
        {locations && <Locations locations={locations} />}
        {loading && <h1>Loading...</h1>}
        {failure && <h1>Error Occured, please try again</h1>}
      </Main>
    );
  }
}

export default App;
