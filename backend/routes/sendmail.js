import express from 'express';  
import sendEmail from '../utils/sendmail';  
const router = express.Router();


router.post('/send-email', async (req, res) => {
  const { to, subject, message } = req.body;

  
  try {
    const result = await sendEmail(to, subject, message);
    if (result.success) {
      res.json(result);  
    } else {
      res.status(500).json(result);  
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error processing the request.' });
  }
});

export default router;  