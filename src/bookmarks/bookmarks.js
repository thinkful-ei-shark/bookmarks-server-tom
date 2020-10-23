const express = require('express');
const { v4: uuid } = require('uuid');
const logger = require('../logging.js');
const bookmarks = require('../store.js');
const { PORT } = require('../config');
const bookmarkRouter = express.Router();
const bodyParser = express.json();

bookmarkRouter
    .route('/bookmarks')
    .get((req, res) => {
        res.json(bookmarks);
    })
    .post(bodyParser, (req, res) => {
        const { url, title, rating = 1, description = '' } = req.body;

        if (!url) {
            logger.error('Need URL')
            return res.status(404).send('Invalid Data');
        }

        if (!title) {
            logger.error('Need title')
            return res.status(404).send('Invalid Data');
        }

        const id = uuid();
        const newBookmark = {
            url,
            title,
            rating,
            description,
        };

        logger.info(`New Bookmark ${newBookmark} created`)
        bookmarks.push(newBookmark);

        return res
            .status(201)
            .location(`http://localhost:${PORT}/bookmarks/${id}`)
            .json(newBookmark);
    });

bookmarkRouter
    .route('/bookmarks/:id')
    .get((req, res) => {
        const { id } = req.params;
        if (!id) {
            logger.error('id not found');
            return res.status(404).send('Invalid data');
        }

        const index = bookmarks.findIndex(
            (bookmark) => String(bookmark.id) === String(id)
        );

        if (index === -1) {
            logger.error(`Could not find id: ${id}`);
            return res.status(404).send('Invalid data');
        }

        res.json(bookmarks[index]);
    })
    .delete((req, res) => {
        const { id } = req.params;
        if (!id) {
            logger.error('id not found');
            return res.status(404).send('Invalid data');
        }

        const index = bookmarks.findIndex(
            (bookmark) => String(bookmark.id) === String(id)
        );

        if (index === -1) {
            logger.error(`Could not find id: ${id}`);
            return res.status(404).send('Invalid data');
        }

        bookmarks.splice(index, 1);

        logger.info(`Deleted bookmark with id: ${id}`);

        res.status(204).end();
    });

module.exports = bookmarkRouter;
