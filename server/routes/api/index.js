const router = require('express').Router()
const uploadListing = require('./uploadListing')

router.use('/uploadListing', uploadListing)

module.exports = router