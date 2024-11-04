import express from 'express';
import path  from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import { body, validationResult }  from 'express-validator';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (
    process.env.CONTACT_EMAIL_ADDRESS == undefined || 
    process.env.CONTACT_EMAIL_PASSWORD == undefined
  ) {
      throw new Error('Email configuration is missing.');
  }

// Configure Nodemailer transport (example using Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.CONTACT_EMAIL_ADDRESS, 
      pass: process.env.CONTACT_EMAIL_PASSWORD    
  }
});

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
     // Retrieve and clear the message from the session
  const confirmMessage = req.session.confirmMessage;
  const errorMessage = req.session.errorMessage;
  req.session.confirmMessage = null;
  req.session.errorMessage = null;

  res.render('contact', {       
      title: 'Voinatech | Vasyl\'s Voina Personal Website | Contact',
      confirmMessage,
      errorMessage,
    }
  );
});

// POST endpoint to receive contact message and forward via email
router.post('/send-message',
  // Validation checks
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').notEmpty().withMessage('Message is required'),
  (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, message } = req.body;

      // Mail options
      const mailOptions = {
          from: `Voinatech <${process.env.CONTACT_EMAIL_ADDRESS}>`, 
          to: process.env.CONTACT_EMAIL_ADDRESS, 
          replyTo: email,
          subject: `New message from ${name}`,
          text: `You have received a new message:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.error("Email sending error:", error);              
              // Save confirmation message in the session
              req.session.errorMessage = 'Error sending email.';
          } else {
            console.log("Email sent:", info.response);
            // Save confirmation message in the session
            req.session.confirmMessage = 'Your message has been sent successfully!';
          }          

          // Redirect back to the referrer page
          const referer = req.headers.referer || '/';
          res.redirect(referer);          
      });
  }
);

export default router;