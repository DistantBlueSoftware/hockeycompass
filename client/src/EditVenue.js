import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import * as actions from './actions';
import requireAuth from './requireAuth';

const mapStateToProps = state => {
  return { ...state };
}

const InputField = (props) => {
  const handleChange = (event) => {
    props.handleChange(event);
  }
  return (
    <div className='form-group'>
      <label htmlFor={props.name}>{props.title} </label>
      <input className='form-control' type={props.type} name={props.name} defaultValue={props.defaultValue} onChange={handleChange} />
    </div>
  )
}

class EditVenue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    }
  }

  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let venue = this.state;
    let needsConfirmation = false;
    let confirmText = '';
    venue.lastUpdated = moment().format('YYYY-MM-DD');

  }

  render() {
    const { user, venues } = this.props;
    const { errorMessage } = this.state;
    // last updated is added automatically in the handleSubmit function
    // These will be the field names for the edit venue form
    const venueProperties = ['name',
      'address',
      'phone',
      'city',
      'state',
      'zip',
      'url'
    ]
    // Creating a separate field for each venue field.  InputField defined above
    const fields = venueProperties.map((property, i) => {
      <InputField key={i.toString()}
        name={property}
        type="String"
        name={property}
        defaultValue={''}
        handleChange={this.handleChange}
      />
    })

    return (
      <div>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <form onSubmit={this.handleSubmit}>
          {fields}
          <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
      </div>
    )
  }
}
export default connect(mapStateToProps, actions)(requireAuth(EditVenue));
