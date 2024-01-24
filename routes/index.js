const router = require('express').Router();

const notesRouter = require('./tips');

router.use('/notes', notesRouter);

module.exports = router;