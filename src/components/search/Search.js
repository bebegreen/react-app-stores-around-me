import React, { Component } from 'react';
import { SearchField, Input, Icon, Submit } from './search.styled';
const google = window.google;

export default class Search extends Component {
  state = {}

  componentDidMount() {
    const input = this.input;
    let autocomplete = new google.maps.places.Autocomplete((input), {
      types: ['geocode'],
    });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      this.props.onchange(input.value);
    })
  }

  render() {
    const { onchange, onpick } = this.props;
    return (
      <SearchField >
        <Input
          onChange={() => { onchange(this.input.value) }}
          placeholder='Enter your location'
          innerRef={(el) => { this.input = el }}
        />
        <Submit onClick={onpick}>
          <Icon>
            <i className="fa fa-shopping-cart" aria-hidden="true" />
          </Icon>
        </Submit>
      </SearchField>
    );
  }
}




