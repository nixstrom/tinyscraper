import cron from 'node-cron'
import { runCron } from './scraper'

// This schedule runs daily at midnight
// See https://crontab.guru/#0_0_*_*_* on how to set up different schedules
// If you want to see it working, you can change it to run '* * * * *' - then it will run it every minute
cron.schedule('0 0 * * *', () => {
	console.log('Running cron')

	runCron()
})
