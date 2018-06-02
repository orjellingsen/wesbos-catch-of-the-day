import React, { Component } from 'react'
import firebase from 'firebase'
import PropTypes from 'prop-types'
import AddFishForm from './AddFishForm'
import EditFishForm from './EditFishForm'
import Login from './Login'
import base, { firebaseApp } from '../base'

class Inventory extends Component {
  static propTypes = {
    fishes: PropTypes.shape({}).isRequired,
    addFish: PropTypes.func.isRequired,
    loadSampleFishes: PropTypes.func.isRequired,
    updateFish: PropTypes.func.isRequired,
    deleteFish: PropTypes.func.isRequired,
    storeId: PropTypes.string.isRequired,
  }

  state = {
    uid: null,
    owner: null,
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user })
      }
    })
  }

  authHandler = async authData => {
    const store = await base.fetch(this.props.storeId, { context: this })
    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, { data: authData.user.uid })
    }
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    })
  }

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]()
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler)
  }

  logOut = async () => {
    await firebase.auth().signOut()
    this.setState({ uid: null })
  }

  render() {
    const LogOut = <button onClick={this.logOut}>Log Out!</button>
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />
    }

    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you are not the owner</p>
          {LogOut}
        </div>
      )
    }
    const { fishes, addFish, loadSampleFishes, updateFish, deleteFish } = this.props
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {LogOut}
        {Object.keys(fishes).map(key => (
          <EditFishForm
            key={key}
            index={key}
            fish={fishes[key]}
            updateFish={updateFish}
            deleteFish={deleteFish}
          />
        ))}
        <AddFishForm addFish={addFish} />
        <button onClick={loadSampleFishes}>Load Sample Fishes!</button>
      </div>
    )
  }
}

export default Inventory
