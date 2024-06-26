const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')

const databasePath = path.join(__dirname, 'cricketMatchDetails.db')

const app = express()

app.use(express.json())

let database = null

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    })

    app.listen(3000, () =>
      console.log('Server Running at http://localhost:3000/'),
    )
  } catch (error) {
    console.log(`DB Error: ${error.message}`)
    process.exit(1)
  }
}

initializeDbAndServer()
//const converttoobj = decline => {
//return {
//playerId: decline.player_id,
//playerName: decline.player_name,
//}
//}
app.get('/players/', async (request, response) => {
  const sqlquery = `SELECT player_id AS playerid,player_name AS playerName FROM player_details;`
  const qwe = await database.all(sqlquery)
  response.send(qwe)
})
module.exports = app
