import React from 'react'
import PropTypes from 'prop-types'

const Login = ({ authenticate }) => (
  <nav className="login">
    <h2>Login</h2>
    <p>Sign in to manage your stores inventory.</p>
    <button className="twitter" onClick={() => authenticate('Twitter')}>
      Log In With Twitter
    </button>
    <button className="facebook" onClick={() => authenticate('Facebook')}>
      Log In With Facebook
    </button>
  </nav>
)

Login.propTypes = {
  authenticate: PropTypes.func.isRequired,
}

export default Login
