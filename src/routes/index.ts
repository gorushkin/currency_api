import express from 'express';
const router = express.Router();

router.get('/current', (req, res) => {
  return res.status(200).json({ message: 'current' });
});

export { router };
