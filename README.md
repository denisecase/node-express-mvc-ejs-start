# node-express-mvc-ejs-start Starter app

[![Build Status](https://travis-ci.org/denisecase/node-express-mvc-ejs-start.svg?branch=master)](https://travis-ci.org/denisecase/node-express-mvc-ejs-start)

## Links

- [Demo](https://denisecase.github.io/node-express-mvc-ejs-start/)
- [Source](https://github.com/denisecase/node-express-mvc-ejs-start)

## About

Use this starter app to initialize a full-stack app using:

- Node.js platform
- Express web framework
- EJS templating engine
- MVC design pattern
- Mongoose MongoDB object modeling
- Lodash for JavaScript object iteration and manipulation
- jQuery library for DOM manipulation
- BootStrap Material Design framework for responsive design
- Morgan HTTP request logger
- Winston multi-level logger that transports to log files

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
6. Run `nodemon app.js` to start the server.
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

## See Also

- [More App Examples](https://profcase.github.io/web-apps-list/)
