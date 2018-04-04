# TradeView

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

A app which shows a simple trade view for a crypto market place. All the back end is mocked so the state resets when the server app is restarted.

To run this project you will need a LTS version of [nodejs](https://nodejs.org) installed and also the latest
version of [yarn](https://yarnpkg.com) package manager

## Installation

After cloning the repository you have to run the `yarn install` command inside the project root directory.
This will install all the dependencies.

## Development

For development you will need to start two applications. Client is started with `yarn run start` 
and server is started with `yarn run start:server`.

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

You can build and start the server app with the command 'yarn run start:all'. App will be build in dist folder 
and you can navigate to `http://localhost:3000/` to use the app.