const express = require('express');
const Users = require('./userDb')
const Posts = require('../posts/postDb');
const router = express.Router();


router.post('/', validateUser, (req, res) => {
  // do your magic!
  Users.insert(req.body)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(error => {
    console.log(error)
    res.status(404).json({ message: 'Could not add the user'})
  })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  const postInfo = {...req.body, user_id: req.params.id};

  Posts.insert(postInfo)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: 'Could not post data'})
    })

});

router.get('/api/users', (req, res) => {
  Users.get(req.query)
    .then(users => {
      res.status(200).json(users)
    })
})



router.get('/', (req, res) => {
  // do your magic!
  Users.get()
    .then(users => {
      res.status(200).json({users})
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: 'error retrieving the users'})
    })

});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  // const id = req.params;
  Users.getById(req.params.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({message: 'Could not get retrieve the user'})
    })
});




router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
   const { id } = req.params
  Users.getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: 'Could not get the posts'})
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  // const id = req.params
  Users.remove(req.params.id)
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({message: 'The user could not be removed'})
    })

});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  
  Users.insert(req.params.id, req.body)
    .then(user => {
      if(user){
        res.status(200).json(user);
      } else {
        res.status(400).json({message: 'The user could not be updated'})
      }
    })
    .catch(error => {
      console.log(error)
    })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params
  Users.getById(id)
    .then(user => {
      if(user) {
        req.user = user;
        next()
      } else {
        res.status(400).json({ message: 'invalid user id'})
      }
    })
    .catch(error => {
      console.log(error)
    })
    
}

function validateUser(req, res, next) {
  // do your magic!
  const userData = req.body;
  if(!userData) {
    res.status(400).json({ message: "missing user data" })
  } else if (!userData.name){
    res.status(400).json({ message: "missing required name field" })
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  const newPost = req.body;
  if(!newPost){
    res.status(400).json({ message: 'missing post data'})
  } else if (!newPost.text){
    res.status(400).json({ message: 'missing required text field'})
  } else {
    next();
  }
}

module.exports = router;
