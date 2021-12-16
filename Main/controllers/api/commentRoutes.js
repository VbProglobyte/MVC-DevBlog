// server ///////////////////////////////
const router = require('express').Router();
// comment path for models
const { Comment } = require('../../models');
// auth helper - for sign in
const withAuth = require('../../utils/auth');
// get all comments
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
        },
      ],
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one comment
router.get('/:id', async (req, res) => {
  try {
    const commentData = await Comment.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
        },
      ],
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a comment
router.post('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// ///////////////////////////////////////////////////////////////////////

// GET comments route

// router.get('/', (req, res) => {
//     Comment.findAll()
//     // return json 
//     .then(dbCommentData => res.json(dbCommentData))
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });
// // specific comments : ID
// router.get('/:id', (req, res) => {
//   Comment.findAll({
//           where: {
//               id: req.params.id
//           }
//       })
//       .then(dbCommentData => res.json(dbCommentData))
//       .catch(err => {
//           console.log(err);
//           res.status(500).json(err);
//       })
// });

// //  post comments 
// router.post('/', withAuth, (req, res) => {
//   // check and create comment 
//   if (req.session) {
//     Comment.create({
//       comment_text: req.body.comment_text,
//       post_id: req.body.post_id,
//       // use the user id from the session
//       user_id: req.session.user_id
//     })
//       .then(dbCommentData => res.json(dbCommentData))
//       .catch(err => {
//         console.log(err);
//         res.status(400).json(err);
//       });
//   }
// });

// // delete comments 
// router.delete('/:id', withAuth, async (req, res) => {
//     try {
//       const commentData = await Comment.destroy({
//         where: {
//           id: req.params.id,
//           user_id: req.session.user_id,
//         },
//       });
  
//       if (!commentData) {
//         res.status(404).json({ message: 'No comment found with this id!' });
//         return;
//       }
  
//       res.status(200).json(commentData);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

module.exports = router;