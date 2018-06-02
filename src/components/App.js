import React, { Component } from 'react'
import PropTypes from 'prop-types'
import sampleFishes from '../sample-fishes'
import Header from './Header'
import Inventory from './Inventory'
import Order from './Order'
import Fish from './Fish'
import base from '../base'

class App extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }).isRequired,
  }
  state = {
    fishes: {},
    order: {},
  }

  componentDidMount() {
    const { params } = this.props.match
    const localStorageRef = localStorage.getItem(params.storeId)
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) })
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
    })
  }

  componentDidUpdate() {
    const { params } = this.props.match
    localStorage.setItem(params.storeId, JSON.stringify(this.state.order))
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  addFish = fish => {
    const fishes = { ...this.state.fishes }
    fishes[`fish${Date.now()}`] = fish
    this.setState({ fishes })
  }

  updateFish = (key, updatedFish) => {
    const fishes = { ...this.state.fishes }
    fishes[key] = updatedFish
    this.setState({ fishes })
  }

  deleteFish = key => {
    const fishes = { ...this.state.fishes }
    fishes[key] = null
    this.setState({ fishes })
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes })
  }

  addToOrder = key => {
    const order = { ...this.state.order }
    order[key] = order[key] + 1 || 1
    this.setState({ order })
  }

  removeFromOrder = key => {
    const order = { ...this.state.order }
    delete order[key]
    this.setState({ order })
  }

  render() {
    const { fishes, order } = this.state
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seasfood Market" />
          <ul className="fishes">
            {Object.keys(fishes).map(key => (
              <Fish key={key} index={key} details={fishes[key]} addToOrder={this.addToOrder} />
            ))}
          </ul>
        </div>
        <Order fishes={fishes} order={order} removeFromOrder={this.removeFromOrder} />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={fishes}
        />
      </div>
    )
  }
}

export default App
