const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'wenbin22',
    database : 'smartbino'
  }
});


const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

// const database = {
//   users: [
//     {
//       id: "123",
//       name: 'john',
//       email: 'dog@gmail.com',
//       password: 'iamadog',
//       entries: 0,
//       joined: new Date()
//     },
//     {
//       id: "124",
//       name: 'sally',
//       email: 'cat@gmail.com',
//       password: 'iamacat',
//       entries: 0,
//       joined: new Date()
//     }
//   ],
//   login: [
//     {
//
//     }
//   ]
// }
//
// app.get('/', (req,res) =>{
//   res.send(database.users);
// })

app.post('/signin', (req,res) => {signin.handleSignin(req,res,db,bcrypt)})

app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id', (req,res) => {
  const {id} = req.params;
  db.select('*').from('users')
  .where({
    id: id
  })
  .then(user => {
    if (user.length) {
      res.json(user[0]);
    } else {
      res.status(400).json('user not found')
    }
  })
  .catch(err => res.status(400).json('error in getting user'))
})

app.put('/image', (req,res) => {image.handleImage(req,res,db)})




app.listen(8080, () => {
  console.log('app is running on port 8080')
}
)



//
// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });
//
// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

//
// PLANNING THE ROUTES AND RESTFULAPI METHODS...
//
// -ROOT '/' -> RESPONSE -> THIS IS WORKING ( ON CONSOLE? OR SEND RESPONSE?)
//
// - SIGNIN '/signin' -> POST SUCCESS / FAILURE
//
// - REGISTER '/register' -> POST NEW USER
//
// - PROFILE '/profile/:userId' -> GET USER
//
// - IMAGE '/IMAGE' -> PUT USER OR COUNTER(HOW MANY PICS)
