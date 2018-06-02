import Rebase from 're-base'
import firebase from 'firebase'

export const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBvHie9Y_bs6I1PIua2mtNnGPoAy6HNvvs',
  authDomain: 'catch-of-the-day-8ba7b.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-8ba7b.firebaseio.com',
})

const base = Rebase.createClass(firebaseApp.database())
export default base
