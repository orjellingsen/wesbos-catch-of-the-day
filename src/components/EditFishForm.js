import React, { Component } from 'react'
import PropTypes from 'prop-types'

class EditFishForm extends Component {
  static propTypes = {
    fish: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      desc: PropTypes.string,
      status: PropTypes.string,
    }).isRequired,
    updateFish: PropTypes.func.isRequired,
    deleteFish: PropTypes.func.isRequired,
    index: PropTypes.string.isRequired,
  }
  handleChange = e => {
    const { fish, updateFish, index } = this.props
    const updatedFish = {
      ...fish,
      [e.currentTarget.name]: e.target.value,
    }
    updateFish(index, updatedFish)
  }

  render() {
    const { index, fish, deleteFish } = this.props
    return (
      <div className="fish-edit">
        <input value={fish.name} onChange={this.handleChange} name="name" type="text" />
        <input value={fish.price} onChange={this.handleChange} name="price" type="number" />
        <select value={fish.status} onChange={this.handleChange} name="status">
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea value={fish.desc} onChange={this.handleChange} name="desc" type="text" />
        <input value={fish.image} onChange={this.handleChange} name="image" type="text" />
        <button onClick={() => deleteFish(index)} type="submit">
          - Remove Fish
        </button>
      </div>
    )
  }
}

export default EditFishForm
