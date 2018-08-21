import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { newGame } from './actions';

const mapStateToProps = state => {
  return {...state};
}
const mapDispatchToProps = dispatch => {
  return {
    newGame: game => dispatch(newGame(game))
  }
}

class NewGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format('YYYY-MM-DD'),
      type: 'public'
    }
  }

  handleChange = (e) => {
    const target = e.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      this.setState({
        [name]: value
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let game = this.state;
    game.host = this.props.user.name;
    this.props.newGame(game);
    this.props.history.push('/games');
  }

  render() {
    const { user } = this.props;
   return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='date'>Date: </label>
            <input className='form-control' type='date' name='date' id='date' defaultValue={this.state.date} onChange={this.handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='location'>Location: </label>
            <select className='form-control' name='location' id='location' onChange={this.handleChange} >
              <option></option>
              <option>Nokomis</option>
              <option>Kennedy Ice Rink</option>
              <option>Ice Rink J</option>
              <option>West Arena</option>
              <option>Highland Ice</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='name'>Game Name: </label>
            <input className='form-control' type='text' name='name' id='name' onChange={this.handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='creator'>Game Host: </label>
            <input className='form-control' type='text' name='host' id='host' value={user.name} readOnly />
          </div>
          <div className='form-group'>
            <label htmlFor='maxPlayers'>Player Cap: </label>
            <input className='form-control' type='number' name='maxPlayers' id='maxPlayers' onChange={this.handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='type'>Type: </label>
            <select className='form-control' name='type' id='type' onChange={this.handleChange} >
              <option>Public</option>
              <option>Private</option>
            </select>
          </div>
          <button type='submit' className='btn btn-primary'>Create Game</button>
        </form>
      </div>
    )
  }
}
export default connect (mapStateToProps, mapDispatchToProps)(NewGame);
