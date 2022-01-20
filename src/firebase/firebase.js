// import * as firebase from 'firebase'  // it gets all named exports as 'firebase'
// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
import 'firebase/compat/database'
const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENTID
}

firebase.initializeApp(config)

const database = firebase.database()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export { firebase, googleAuthProvider, database as default }

// database.ref('expenses').push({
//   description: 'abcd',
//   note: 'qwer',
//   amount: 1,
//   createdAt: 2
// })
// database.ref('expenses').push({
//   description: 'qwer',
//   note: 'adsf',
//   amount: 3,
//   createdAt: 4
// })
// database.ref('expenses').push({
//   description: 'rtyu',
//   note: 'fghj',
//   amount: 5,
//   createdAt: 6
// })

// database.ref('expenses').on('value', (snapshot) => {
//   const expenses = []
//   snapshot.forEach((childSnapshot) => {
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     })
//   })
//   console.log(expenses)
// })

// database.ref().set({
//   name: 'Manas Purohit',
//   age: 19,
//   stressLevel: 6,
//   isSingle: true,
//   location: {
//     city: 'Ahemdabad',
//     country: 'India'
//   }
// }).then(() => {
//   console.log('Data saved')
// }).catch((e) => {
//   console.log('Failed -->', e)
// })

// database.ref().on('value', (snapshot) => {
//   console.log(snapshot.val())
// })

// database.ref('location/city').once('value').then((snapshot) => {
//   console.log(snapshot.val())
// })

// setTimeout(() => {
//   database.ref().update({
//     name: 'Purohit Manas Rajeshbhai',
//     'location/city': 'Khadagda',
//     stressLevel: null,
//     stamina: 100
//   })
// }, 1000);

// database.ref().on('value', (snapshot) => {
//   const val = snapshot.val()
//   console.log(`${val.name} is at ${val.location.city}`)
// })

// database.ref().remove()  // ref() with no argument will get it to root directory, so all data will be deleted
// database.ref().set(null)  // this will also delete all data