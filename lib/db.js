import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

// Create a new file called "db.json", and use that as a file database
const adapter = new FileSync('db.json')
const db = low(adapter)

// Set the default data - in this case, just an empty list called "tickers"
db.defaults({ tickers: [] }).write()

export default db
