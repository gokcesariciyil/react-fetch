import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import places from "./places.json";
import axios from 'axios';
import LeftSide from './LeftSide';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    axios.get('https://api.myjson.com/bins/9amsj')
      .then(response => {
        console.log(response)
        if (response.status === 200 && response != null) {
          this.setState({
            data: response.data.Data
          });
        } else {
          console.log('problem');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }


  render() {
    console.log(this.state.data)
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
          </div>
          <div className="col-md-9">
            <Map
              title='map'
              center={{ lat: 39.9519093, lng: 32.83077530000003 }}
              zoom={9}
              places={places}
            />
          </div>
        </div>
      </div>
    )
  }
}
