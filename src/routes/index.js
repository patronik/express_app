import express from 'express';
import path  from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

router.get('/cv', (req, res) => {
  const filePath = path.join(__dirname, '../../cv.pdf'); 

  // Set headers to prompt download
  res.download(filePath, 'CV_Vasyl_Voina.pdf', (err) => {
      if (err) {
          console.error("File download error:", err);
          res.status(500).send("Error downloading file.");
      }
  });
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