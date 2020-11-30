  <h1 align="center"> :trumpet: pangaea :computer: </h1>


<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [License](#license)



<!-- ABOUT THE PROJECT -->
## About The Project

This challenge will be recreating a pub/sub system using HTTP requests.

### Built With

* [Node js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.org)
* [RabbitMQ](https://www.rabbitmq.com)
* [Redis](https://www.redis.io)


<!-- GETTING STARTED -->
## Getting Started

To successfully use this repository, please follow the guide below.

### Prerequisites

You should have a working installation of node, redis, an amqp-compliant message broker and MongoDB prior to cloning this project.


* To verify the installation your node installation, run the command:
```sh
$ nodejs --version
```
```
Output
# Subject to version installed

v12.19.0
```
* To be able to download npm packages, you also need to install npm, the Node.js package manager.
Verify the npm by typing:

```sh
$ npm --version
```
```
Output:
# Subject to version installed

6.14.8
```

### Installation

* Clone the repo
```sh
git clone https://github.com/parkerthegeniuschild/pangaea.git
```
* Install NPM packages
```sh
npm install
```
*  cd into the project folder
```sh
cd pangaea
```
* You wll find an `env.example` file in the root directory of the project. Rename this file to `.env` and `add your own environment variables`.

```JS
# NODE
NODE_ENV=
PORT=

# MONGODB
MONGODB_DEVELOPMENT_URI=
MONGODB_TEST_URI=
MONGODB_PRODUCTION_URI=

# REDIS
REDIS_DEVELOPMENT_URL=
REDIS_TEST_URL=
REDIS_PRODUCTION_URL=

# AMQP
AMQP_CONNECTION_URI=

```
* You should modify the start script, `start-server.sh` file, to your environment. Look up the `package.json` file for each environment command. Then run the command below to
start the server.
```sh
$ ./start-server.sh
```

* Bob's your Uncle, at this stage you're a :rocket: :rocket: :rocket:

* In `production` mode, please run a build with `npm run build` or modify `start-server.sh` to perform this step prior to ignition.



## License
```
Monday, 30. November 2020 03:10 AM 
ISC License

Copyright (c) [2020] MITCHELL PATRICK]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
and associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute, 
sublicense, and/or sell copies of the Software, and to permit persons to whom the 
Software isfurnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in allcopies or 
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING 
BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES 
OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF 
OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```



