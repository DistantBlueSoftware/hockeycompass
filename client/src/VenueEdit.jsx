import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import requireAuth from './requireAuth';
import { Redirect } from 'react-router-dom'
// Components
import InputField from './components/InputField'

const mapStateToProps = state => {
  return { ...state };
}


class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {}
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
    const confirm = window.confirm('Are you ready to submit your changes?')
    if (confirm === true) {
      venue._id = this.props.selectedVenue._id;
      this.props.editVenue(venue);
      this.props.redirect('/venues');
    }
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
    const fields = venueProperties.map((property, i) =>
      <InputField key={i.toString()}
        title={property.charAt(0).toUpperCase() + property.slice(1)}
        name={property}
        type="String"
        name={property}
        defaultValue={this.props.selectedVenue[property]}
        handleChange={this.handleChange}
      />
    )

    return (
      <form onSubmit={this.handleSubmit}>
        {fields}
        <button type='submit' className='btn btn-primary'>Submit</button>
      </form>
    )
  }
}

class EditVenue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      redirectTo: null,
    }
  }

  redirect = (redirectTo) => {
    this.setState({
      redirectTo: redirectTo
    })
  }

  render() {
    const { errorMessage } = this.state;
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />
    } else {
      return (
        <div>
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
          <Form redirect={this.redirect}
            {...this.props}/>
        </div>
      )
    }
  }
}
export default connect(mapStateToProps, actions)(requireAuth(EditVenue));
