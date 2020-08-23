import express from 'express'
import { getTickerPrice } from './lib/scraper'
import db from './lib/db'
import './lib/cron'

// Create a new web application
const app = express()

// When visiting the "root" of your website, it will simply return whatever data is stored
app.get('/', async (req, res, next) => {
	res.json(db)
})

// When visiting "/scrape" in the browser, it will forcefully scrape.
// It's the same as the scheduled task, however it runs only once.
// Note that the code is duplicated, so when changing the scheduled task,
// you might want to update the code here as well.
//
// Ideally, we could abstract this duplication out,
// but we're not here to learn about code architecture 😛
app.get('/scrape', async (req, res, next) => {
	const symbol = 'ETH-USD'
	// get the price of "ETH-USD"
	const price = await getTickerPrice(symbol)

	// store new entry in db, containing the price, symbol and timestamp
	db.get('tickers')
		.push({
			price,
			symbol,
			timestamp: Date.now(),
		})
		.write()

	// Print the result on the page for good measure
	res.json({ symbol, price })
})

// Run the app locally (you can now visit it in your browser)
app.listen('1337', () => console.log('App running on http://localhost:1337'))
