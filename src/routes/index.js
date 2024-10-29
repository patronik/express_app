import express from 'express';

const router = express.Router();

// Home route
router.get('/', (req, res) => {
  res.render('index', {       
      title: 'Voinatech | Vasyl\'s Voina Personal Website | Home' 
    }
  );
});

router.get('/about', (req, res) => {
  res.render('about', {       
      title: 'Voinatech | Vasyl\'s Voina Personal Website | About' 
    }
  );
});

router.get('/projects', (req, res) => {
  res.render('projects', {       
      title: 'Voinatech | Vasyl\'s Voina Personal Website | Projects' 
    }
  );
});

router.get('/contact', (req, res) => {
  res.render('contact', {       
      title: 'Voinatech | Vasyl\'s Voina Personal Website | Contact' 
    }
  );
});

export default router;