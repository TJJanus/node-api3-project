const express = require('express');

const server = express();
const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');


server.use(express.json())
server.use('/api/posts', postRouter)
server.use('/api/users', userRouter)


server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  let method = req.method
  let url = req.url
  let date = new Date()

  let log = (`${method}, ${url}, ${date}`)

  console.log(log)
  next()

}

module.exports = server;
