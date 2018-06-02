import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getFunName } from '../helpers'

class StorePicker extends Component {
  static propTypes = {
    history: PropTypes.func.isRequired,
  }

  state = {
    storeName: getFunName(),
  }

  myInput = React.createRef()

  goToStore = e => {
    e.preventDefault()
    this.props.history.push(`/store/${this.state.storeName}`)
  }

  handleChange = e => {
    this.setState({ [e.currentTarget.name]: e.target.value })
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input
          type="text"
          value={this.state.storeName}
          onChange={this.handleChange}
          name="storeName"
          required
          placeholder="Store Name"
        />
        <button type="submit">Visit Store →</button>
      </form>
    )
  }
}

export default StorePicker
