// server ///////////////////////////////
const router = require('express').Router();
// comment path for models
const { Comment } = require('../../models');
// auth helper
const withAuth = require('../../utils/auth');

// GET comments route
router.get('/', (req, res) => {
    Comment.findAll()
    // return json 
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//  post comments 
router.post

// delete comments 
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const projectData = await Project.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!projectData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
  
      res.status(200).json(projectData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;