import express from 'express';

const router = express.Router();

// Home route
router.get('/', (req, res) => {
  res.render('index', {       
      title: 'Home page' 
    }
  );
});

export default router;