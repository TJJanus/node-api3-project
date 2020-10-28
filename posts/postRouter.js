const express = require('express');
const Posts = require('./postDb')


const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  Posts.get(req.query)
    .then(posts => {
      res.status(200).json(posts)
    })
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  Posts.getById(id)
    .then(posts => {
      res.status(200).json(posts)
    })
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  const { id } = req.params
  Posts.remove(id)
    .then(posts => {
      res.status(200).json(posts)
    })
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  const { id } = req.params
  const changes = req.body

  Posts.update(id, changes)
    .then(posts => {
      res.status(200).json(posts)
    })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const { id } = req.params
  Posts.getById(id)
    .then(post => {
      if(!post){
        res.status(500).json({message: 'Could not find your post'})
        
      } else {
        next()
      }
    })
    .catch(error => {
      console.log(error)
    })
  
}



// function validateUserId(req, res, next) {
//   // do your magic!
//   const { id } = req.params
//   Users.getById(id)
//     .then(user => {
//       if(user) {
//         req.user = user;
//         next()
//       } else {
//         res.status(400).json({ message: 'invalid user id'})
//       }
//     })
//     .catch(error => {
//       console.log(error)
//     })
    
// }

module.exports = router;
