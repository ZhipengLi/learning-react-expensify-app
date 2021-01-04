import * as firebase from 'firebase';
//import * as expensesActions from '../actions/expenses';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER,
    appId: "1:768167700089:web:48a08fb12f2b7ec44496a8"
  };
  
  firebase.initializeApp(config);
  
  const database = firebase.database();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {firebase, googleAuthProvider, database as default };

//   database.ref('expenses').on('child_removed', (snapshot) => {
//       console.log(snapshot.key, snapshot.val());
//   });
//   database.ref('expenses').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_added', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });
//   database.ref('expenses')
//     .once('value')
//     .then((snapshot) => {
//         //console.log(snapshot.val());
//         const expenses = [];
//         snapshot.forEach((childSnapshot) => {
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             });
//         })
//         console.log(expenses);
//     });

// database.ref('expenses').on('value', (snapshot) => {
//     const expenses = [];
//     snapshot.forEach((childSnapshot) => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         });
//     })
//     console.log(expenses);
// }, (e)=>{
//     console.log('failed:', e);
// });

//   database.ref('expenses').push(
//       {
//       descrioption: 'water bill',
//       note: 'note for water bill',
//       amount: 1000,
//       createdAt: '1/1/2020'
//   });

  //database.ref('notes/MPrZRhAA3EtJwpsQx53').remove();

//   database.ref('notes').push({
//       title: 'Course topics',
//       body: 'new notes'
//   });

//   const firebaseNotes = {
//       notes: {

//       }
//   };
//   const notes = [{
//       id: '12',
//       title: 'First note!',
//       body: 'This is my note'
//   },{
//     id: '13',
//     title: 'Second note!',
//     body: 'This is my second note'
// }];

// database.ref('notes').set(notes);
//   const onValueChange = database.ref().on('value', (snapshot) => {
//     console.log(snapshot.val());
//   }, (e) => {
//       console.log('Errro with data fetching', e);
//   });

//   setTimeout(() => {
//       database.ref('age').set(28);
//   }, 3500);

//   setTimeout(() => {
//     database.ref().off(onValueChange);    
// }, 7500);  

//     setTimeout(() => {
//     database.ref('age').set(30);
// }, 10500);

// database.ref().on('value', (snapshot) => {
//     const val = snapshot.val();
//     //const name = snapshot.name, title = snapshot.job.title, company = snapshot.job.company;
//     const desc = `${val.name} is a ${val.job.title} at ${val.job.company}`;
//     console.log(desc);
// }, (e) => {
//     console.log('Error with data fetching', e);
// });

//   database
//     .ref('location/city')
//     .once('value')
//     .then((snapshot) => {
//         const val = snapshot.val();
//         console.log(val);
//     })
//     .catch(
//         (e) => {
//             console.log('Error fetching data', e)
//         }
//     );
// database.ref().set(
//        {
//            name: 'test name',
//            age: 26,
//            stressLevel: 6,
//            job: {
//                title: 'Softwre Engineer',
//                company: 'Google'
//            },
//            location: {
//                city: 'Philadelphia',
//                country: 'United States'
//            }
//        }
//    ).then(() => {
//        console.log('Data is saved!');
//    }).catch((e) => {
//      console.log('This failed.', e);
//    });

//    database.ref().update({
//        stressLevel: 9,
//        'job/company': 'Amazon',
//        'location/city': 'Seattle'
//    });
