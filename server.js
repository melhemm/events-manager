const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')
const port = process.env.PORT || 8080;

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use(express.static(__dirname + "/dist/"));

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API.'
  })
})

app.get('/.*', function(req, res){
  res.sendFile(__dirname + "/dist/index.html")
})

app.get('/login', (req, res) => {
  res.sendFile(__dirname + "/dist/index.html")
})

app.get('/register', (req, res) => {
  res.sendFile(__dirname + "/dist/index.html")
})

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", '*');
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
//   next();
// });

app.get('/', verifyToken, (req, res) => {
  jwt.verify(req.token, 'the_secret_key', err => {
    if (err) {
      res.sendStatus(401)
    } else {
      res.json({
        events: events
      })
    }
  })
})

app.get('/events', (req, res) => {
  res.send(events)
})

app.post('/register', (req, res) => {
  if (req.body) {
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }

    const data = JSON.stringify(user, null, 2)
    var dbUserEmail = require('./db.json').email
    var errorsToSend = []
    if (dbUserEmail === user.email) {
      errorsToSend.push('An account with this email already exists')
      console.log('An account with this email already exists');
    } 
    if(errorsToSend.length > 0) {
      res.status(400).json({errors: errorsToSend})
    }
    else {
      fs.writeFile('./db.json', data, err => {
        if (err) {
          console.log(err + data)
        } else {
          const token = jwt.sign({ user }, 'the_secret_key')
          res.json({
            token,
            email: user.email,
            name: user.name
          })
        }
      })
    }
  } else {
    res.sendStatus(400)
  }
})

app.post('/login', (req, res) => {
  const userDB = fs.readFileSync('./db.json')
  const userInfo = JSON.parse(userDB)
  if (
    req.body &&
    req.body.email === userInfo.email &&
    req.body.password === userInfo.password
  ) {
    const token = jwt.sign({ userInfo }, 'the_secret_key')
    res.json({
      token,
      email: userInfo.email,
      name: userInfo.name
    })
  } else {
    res.status(401).json({error: 'Invalid login. Please try again.'})
  }
})

// MIDDLEWARE
function verifyToken (req, res, next) {
  const bearerHeader = req.headers['authorization']

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    req.token = bearerToken
    next()
  } else {
    res.sendStatus(401)
  }
}

app.listen(port, () => {
  console.log('Server started')
})
