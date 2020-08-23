import axios from 'axios'
import db from './db'

// This function takes a symbol as an argument, and returns the current market price for that instrument.
// By default, it falls back to "BTC-USD" (Bitcoin) if nothing is provided.
export const getTickerPrice = async (symbol = 'BTC-USD') => {
	const { data } = await axios.get(
		`https://query1.finance.yahoo.com/v7/finance/quote?&symbols=${symbol}&fields=regularMarketPrice`
	)

	// Return only the current price - there are much more data available,
	// if you inspect the network response in the DevTools in your browser
	return data.quoteResponse.result[0].regularMarketPrice
}

export const runCron = async () => {
	const symbol = 'ETH-USD'

	// Get the price for the provided symbol (in this case "ETH-USD")
	const price = await getTickerPrice(symbol)

	// Create a new entry in the file-db, containing the price, symbol and current time stamp
	db.get('tickers')
		.push({
			price,
			symbol,
			timestamp: Date.now(),
		})
		.write()
}
