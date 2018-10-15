import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import {Loading} from './Loading';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: null
    }
  }
  
  handleFileUpload = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    confirm('hi');
    const files = e.target.files;
    const reader = new FileReader();
    reader.onload = e => {
      let data = JSON.parse(reader.result);
      data && data.forEach(d => {
        d.name = d.name.trim();
        d.city = d.CSZ.split(',')[0];
        d.state = d.CSZ.split(',')[1].split(' ')[1];
        d.zip = d.CSZ.split(' ')[3] ? d.CSZ.split(' ')[3] : d.CSZ.split(' ')[2];
        if (d.zip && d.zip.length === 2) d.zip = d.CSZ.split(' ')[4];
        delete d.CSZ;
        if (d.name[d.name.length - 1] === 'Â') d.name = d.name.slice(0, -1);
        if (d.zip) d.zip = d.zip.slice(0, 5);
        d.lastUpdated = new Date();
        this.props.saveVenue(d);
      });
      this.setState({ 
        data: data,
        loading: false
       });
    }
    reader.readAsBinaryString(files[0]);
    
  }
  
  render() {
    const { loading, data } = this.state;
    if (!loading) {
      return (
        <div>
          <h1>Hi</h1>
          <form >
            <input type='file' onChange={this.handleFileUpload}/>
          </form>
          {data && data.map(d => <p> {d.name} {d.city} {d.state} {d.zip}</p>)}
        </div>
      )
    } else {
      return ( <Loading /> )
    }
  }
}

export default connect(null, actions)(Upload);