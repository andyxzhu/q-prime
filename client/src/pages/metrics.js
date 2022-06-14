import React, { Component } from 'react';

import Navbar from '../components/navbar/Navbar';
import MetricsMain from '../components/metrics/MetricsMain';

class Metrics extends Component {
  state = {
    queueData: null
  };

  componentDidMount() {
    this.callBackendAPI()
        .then(res => {
          this.setState({ 
            queueData: res
          });
          document.title = res.title;
        })
        .catch(err => console.log(err));
  };

  // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('http://localhost:8000/metrics');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    return body;
  };

  render() {
    return (
      <div className="Metrics">
          <Navbar theme={this.props.theme} queueData={this.state.queueData}/>
          <MetricsMain theme={this.props.theme} queueData={this.state.queueData}/>
      </div>
    );
  }
}

export default Metrics;
