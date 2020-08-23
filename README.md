# tinyscraper

Tinyscraper is an example project, which demonstrates a very simple web scraper. It simply grabs the current price of BTC (from Yahoo!), and stores that value in a JSON file. That file can then be used in a static site generator, or the scraper can be modified to store in a database, like MongoDB.

This project also demonstrates a cron job - that is, running the scraper at an interval.

## Prerequisites

-  [Node.js](https://nodejs.org/en/)
-  [Yarn](https://yarnpkg.com/cli/install) (or npm, included with Yarn)
-  [Git](https://git-scm.com/downloads) (optional)

## Installation

After installing the prerequisites, you need to get your hands on the code. There are two ways of doing that.

#### Using Git

Open up your terminal, and navigate to the folder in which you would like to keep the code (for example, `/Projects`).

```bash
git clone https://github.com/nixstrom/tinyscraper
```

This will download this repository into a new directory named `/tinyscraper`.

#### Downloading from the browser

Optionally, you can also download a zipped version of this repository and unzip it wherever you want. There should be a big green button saying "Code" somewhere on this page.

### Usage

Regardless of the approach, navigate into the project folder in your terminal, and install all dependencies by running the following command:

```bash
yarn
```

(Optionally, you can also run `npm install`).

You can then start the application itself by running:

```bash
yarn dev # optionally, npm run dev
```

This will start a new local web server, which will start running the scraper on whatever schedule you have set it to. If you go to [http://localhost:1337](http://localhost:1337), you should be able to see some data. It doesn't auto-update, so you will have to refresh once in a while.

Since the data is stored in a file, you can also open that file directly (`db.json`).

### Modifying

This project has only a few interesting files. All other files can be safely ignored.

#### main.js

This is the entrypoint to all other files. It's where the webserver is created and started (using [Express](http://expressjs.com/))

#### lib/db.js

This file creates and initialises the "database" - although, it's not actually a database, as all data is simply stored in a JSON file (using [Lowdb](https://github.com/typicode/lowdb)).

#### lib/scraper.js

This file has two functions.

-  `getTickerPrice` will fetch the data for a given financial instrument, and return the price.
-  `runCron` is just a helper function, used for `cron.js`. It calls `getTickerPrice` and stores the result in the "database".

#### lib/cron.js

This file is the cron job (using [node-cron](https://github.com/node-cron/node-cron)). It's where you set up the scheduled task(s).

### Limitations

-  This scraper only gets the price of a single instrument. However, the API does actually support returning data from multiple instruments at the same time, so we could easily change our implementation to store the data from a list of instruments rather than just a single one. For the sake of simplicity, this was left out in this implementation.
-  We are concerned about the fetching and storing of data only. There is no UI to actually display that data. Seeing a the data is currently stored in a JSON file, one simple way to display it would be to use something like a static site generator, where we would generate static HTML pages based on the data in that file. Then we would need to rebuild the site whenever the data changes (or set up an automatic schedule to do so) - but we would not have to deal with databases.
-  There is some code duplication and sub-optimal architecture. This is for educational purposes, of course. :)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[Unlicense](https://unlicense.org/)
