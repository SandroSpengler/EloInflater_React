<div align='center'>
  <a href='https://react.axfert.com/swagger/'>
    <img src='https://img.shields.io/badge/React-Frontend-blue?logo=react'>
  </a>
</div>

# **Deprecated**

**This Frontend will be replaced by a version written in svelte, please refer to the following github repository: [Eloinflater_Svelte](https://github.com/SandroSpengler/Eloinflater_Svelte)**

# **Eloinflater React Frontend**

This is a frontend for the [Eloinflater](https://github.com/SandroSpengler/EloInflaterBackend) backend. The frontend allows for the search of summoners and displays rankings on the summoners.

It is written using react and exchanges data via https using the RESTful design.

## Table of Contents

- [Getting started](#Getting-started)
  - [Installation](#Installation)
  - [Docker](#Docker-Image)
- [Tests](#Tests)

## Getting started

In order to run the frontend locally you will need to clone the repository:

`git clone https://github.com/SandroSpengler/EloInflaterFrontend.git`

It was created using npm and [create-react-app](https://create-react-app.dev/). The frontend is mainly written in typescript.

### Installation

After you've checked our the repository you can install the npm packages:

`npm install`

To serve the frontend locally you should run the follow command:

`npm run start`

### Docker

The frontend is publicly available on [react.axfert.com](https://react.axfert.com). It is build and served using Docker. You can grab the offical image using the command:

`docker pull sandrospengler/eloinflater_react`

To run the image simply run:

`docker run --name react -p 80:80 -d sandrospengler/eloinflater_react`

## Tests

The project includes unit tests which are located in the directory **src/\_\_tests/\_\_**

All tests are written in Typescript and will be executed using the [Jest](https://jestjs.io/docs/getting-started) test runner. They render the component and check its functionality. To run the tests use the following command:

`npm run test`
