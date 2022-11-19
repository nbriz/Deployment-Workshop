const express = require('express')
const router = express.Router()
const fs = require('fs')

// this function gets the data stored in the "database.json" file
function getDatabase () {
  const users = fs.readFileSync(`${__dirname}/database.json`, 'utf8')
  const db = JSON.parse(users)
  return db
}

// this functino updates the data in the "database.json" file
function updateDatabase (data) {
  const str = JSON.stringify(data)
  fs.writeFileSync(`${__dirname}/database.json`, str)
}

// API ENDPOINTS ---------------------------------------------------------------

// this is the POST endpoint for adding new users to the database
router.post('/api/new-user', async (req, res) => {
  if (req.body.username) {
    const db = getDatabase()
    db.push(req.body.username)
    updateDatabase(db)
    res.json({ success: 'user added' })
  } else {
    res.json({ error: 'no username submitted' })
  }
})

// this is the GET endpoint for getting the list of users in the database
router.get('/api/users', async (req, res) => {
  const db = getDatabase()
  res.json(db)
})

module.exports = router
