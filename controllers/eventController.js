const Event = require('../models/Event');

// GET semua event
const getAllEvents = async (req, res) => {
    try {
        const events = await Event.findAll();
        res.json({
            status: "success",
            message: "Data retrieved successfully",
            data: events,
            items: events // Tambahan untuk mengatasi bug pada frontend asisten
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

// GET satu event by ID
const getEventById = async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (event) {
            res.json({
                status: "success",
                message: "Data retrieved successfully",
                data: event
            });
        } else {
            res.status(404).json({ status: "error", message: "Data not found" });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

// POST buat event baru
const createEvent = async (req, res) => {
    try {
        const event = await Event.create(req.body);
        res.json({
            status: "success",
            message: "Data created successfully",
            data: event
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

// PUT update event
const updateEvent = async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (event) {
            await event.update(req.body);
            res.json({
                status: "success",
                message: "Data updated successfully",
                data: event
            });
        } else {
            res.status(404).json({ status: "error", message: "Data not found" });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

// DELETE hapus event
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (event) {
            await event.destroy();
            res.json({
                status: "success",
                message: "Data deleted successfully"
            });
        } else {
            res.status(404).json({ status: "error", message: "Data not found" });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

module.exports = { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent };
