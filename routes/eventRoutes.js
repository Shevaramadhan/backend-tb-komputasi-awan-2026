const express = require('express');
const router = express.Router();
const {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
} = require('../controllers/eventController');

// GET  /events        → Ambil semua data
// POST /events        → Buat data baru
router.route('/')
    .get(getAllEvents)
    .post(createEvent);

// GET    /events/:id  → Ambil detail data
// PUT    /events/:id  → Update data
// DELETE /events/:id  → Hapus data
router.route('/:id')
    .get(getEventById)
    .put(updateEvent)
    .delete(deleteEvent);

module.exports = router;
