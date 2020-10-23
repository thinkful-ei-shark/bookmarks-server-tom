const express = require('express');
const { v4: uuid } = require('uuid');
const logger = require('../logging.js')
const bookmarkRouter = express.Router()
const bookmarks = require('../store.js')



bookmarkRouter.route('/bookmarks').get((req, res) => {
    res
        .json(bookmarks)
})



module.exports = bookmarkRouter