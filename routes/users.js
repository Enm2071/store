const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  console.log('Time-users:', Date.now());
  next();
});

router.get('/', (req, res) => {
  const {limit, offset} = req.query;
  if (limit && offset) {
    res.json({
      users: [
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' },
        { id: 3, name: 'User 3' },
      ],
      limit,
      offset,
    });
  } else {
    res.json({
      users: [
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' },
      ],
    });
  }
});


module.exports = router;
