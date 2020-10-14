# node-express-mvc-ejs-start Starter app

[![Build Status](https://travis-ci.org/denisecase/node-express-mvc-ejs-start.svg?branch=master)](https://travis-ci.org/denisecase/node-express-mvc-ejs-start)

## Links

- [Demo on Heroku](https://node-express-mvc-ejs-start-h.herokuapp.com/)
- [Demo on Google Cloud](https://node-express-mvc-ejs-start.appspot.com)
- [Source](https://github.com/denisecase/node-express-mvc-ejs-start)

## About

Use this starter app to initialize a full-stack app using:

- Node.js platform
- Express web framework
- EJS templating engine (adding Pug)
- MVC design pattern
- Mongoose MongoDB object modeling
- Lodash for JavaScript object iteration and manipulation
- jQuery library for DOM manipulation
- BootStrap Material Design framework for responsive design
- Morgan HTTP request logger
- Winston multi-level logger that transports to log files
- SQLite database
- <https://sqlitebrowser.org/>
- Cypress.io testing 

```PowerShell
choco install sqlite -y
choco install sqlitebrowser -y
npm install sqlite3

npm install cypress --save-dev
npx cypress open
npm run cypress
```

## Prerequisites

Following must be downloaded, installed, and configured according to the product directions:

- Node.js (comes with npm)
- Git version control system
- VS Code light-weight, cross-platform code editor or other IDE

## Recommended

- If Windows, TortoiseGit
- Add "Open PowerShell Here as Administrator" to context menu. Download and run file from <https://github.com/profcase/open-command-window-here-as-admin>.

## Start a new MVC full-stack project

1. Fork this repo into your own cloud account.
2. Clone your repo down to your local machine.
3. Copy .env.example to .env
4. Update .env with your information.
5. Open PowerShell in root folder and run `npm install` to install dependencies.
6. Run `node app.js` to start the server.
7. Open browser to the location displayed, e.g. <http://localhost:3004/>.

## Production Environment

1. Run MongoDB in the cloud - see <https://www.mongodb.com/cloud/atlas>

## Review Code Organization

- app.js - Starting point for the application. Defines the express server, requires routes and models. Loads everything and begins listening for events.
- controllers/ - logic for handling client requests
- data/ - seed data loaded each time the application starts
- models/ - schema descriptions for custom data types
- routes/ - route definitions for the API
- utils/ - utilities
- views/ - EJS - embedded JavaScript and HTML used to create dynamic pages

## Resources

- [Bootstrap Material Design CDN](https://mdbootstrap.com/md-bootstrap-cdn/)
- [JavaScript Standard Style Validator](https://standardjs.com/demo.html)
- [ESLint](https://eslint.org/)
- [TravisCI](https://travis-ci.org/)
- [Data Hosting with Atlas](https://www.mongodb.com/cloud/atlas)

## Choose from 2 deployment options

- [App Hosting with Heroku](https://www.heroku.com/)

OR

- [App Hosting with Google Cloud Platform](https://cloud.google.com/gcp)
- [GCP Eduction Credits for Faculty](https://edu.google.com/programs/faculty/?modal_active=none)

## Set up Heroku

1. Signup for Heroku account.
1. Install Heroku CLI.
1. Create a new app with a unique name (this will appear in your app URI).
1. Go to App / Settings / Config Vars and add an ATLAS_URI key with the value from your .env.
1. Go to App / Settings / Heroku Git URL and copy the URL to clipboard to paste in following command.
1. Create a git alias named heroku that points to this URL. Either use TortoiseGit / Settings / Remote to create heroku and set it to the URL - or open PowerShell as Admin in your root project folder and use just your Heroku app name in the command below:

```PowerShell
heroku login
heroku git:remote -a yourHerokuAppName
```

## Deploy with Heroku

After making changes, open PowerShell as Admin in your root project folder:

```PowerShell
heroku login
git push heroku master
```

## Deploy with Google Cloud Platform

1. Choose a person to host your application code.
1. Hoster should click on their Student Coupon Retrieval Link.
1. Follow instructions to get an account.
1. Install GCloud SDK
1. Enable Cloud Build API and billing.
1. Use the commands below to create a project - use your repo name.
1. Then initialize an App Engine Application in the project - it will ask for a region. Choose one nearby with free option.
1. package.json needs new dependency: @google-cloud/logging-winston
1. package.json needs to set the node entry value to "^10"
1. See app.yaml for suggested settings.
1. After the app deploy command, you will get an error. Read the error and go to the URL provided to enable billing.

```PowerShell
gcloud projects create node-express-mvc-ejs-start --set-as-default
gcloud projects describe node-express-mvc-ejs-start
gcloud app create --project=node-express-mvc-ejs-start
gcloud app deploy
gcloud app browse
```

When starting a new session, you'll have to log in again and then set the project.

```PowerShell
gcloud config set project node-express-mvc-ejs-start
```

You should get some results that include something like the following.

```PowerShell
descriptor:      C:\44563\node-express-mvc-ejs-start\app.yaml
source:          C:\44563\node-express-mvc-ejs-start
target project:  node-express-mvc-ejs-start
target url:      <https://node-express-mvc-ejs-start.appspot.com>
```

## See Also

- [More App Examples](https://profcase.github.io/web-apps-list/)
- [Add Cypress](https://www.freecodecamp.org/news/how-to-add-end-to-end-tests-to-your-project-with-cypress-a74437f6df6e/)
- [SQLite CRUD](https://blog.pagesd.info/2019/10/08/crud-with-express-sqlite-10-steps/)
