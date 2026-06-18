require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Koneksi ke database
async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');
        await sequelize.sync(); // Buat tabel jika belum ada
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }
}
connectDB();

// ==========================================
//  Endpoint Wajib dari Instruksi Tugas
// ==========================================

// GET /health — Cek status backend & database
app.get('/health', async (req, res) => {
    try {
        await sequelize.authenticate();
        res.json({
            status: "success",
            message: "Backend is running",
            database: "connected",
            student: {
                name: process.env.STUDENT_NAME,
                nim: process.env.STUDENT_NIM
            }
        });
    } catch (error) {
        res.json({
            status: "error",
            message: "Backend is running, but database is not connected",
            database: "disconnected",
            student: {
                name: process.env.STUDENT_NAME,
                nim: process.env.STUDENT_NIM
            }
        });
    }
});

// GET /schema — Kirim konfigurasi schema ke Frontend
app.get('/schema', (req, res) => {
    res.json({
        student: {
            name: process.env.STUDENT_NAME,
            nim: process.env.STUDENT_NIM
        },
        resource: {
            name: "events",
            label: "Data Event Kampus",
            description: "Aplikasi untuk mengelola pendataan acara atau event kampus"
        },
        fields: [
            { name: "title",       label: "Judul Event",         type: "text",     required: true,  showInTable: true  },
            { name: "organizer",   label: "Penyelenggara",        type: "text",     required: true,  showInTable: true  },
            { name: "event_date",  label: "Tanggal Pelaksanaan",  type: "date",     required: true,  showInTable: true  },
            { name: "location",    label: "Lokasi",               type: "text",     required: true,  showInTable: true  },
            { name: "quota",       label: "Kuota",                type: "number",   required: true,  showInTable: true  },
            { name: "description", label: "Deskripsi Acara",      type: "textarea", required: false, showInTable: false }
        ],
        endpoints: {
            list:   "/events",
            detail: "/events/{id}",
            create: "/events",
            update: "/events/{id}",
            delete: "/events/{id}"
        }
    });
});

// ==========================================
//  CRUD Routes (menggunakan routes/controllers)
// ==========================================
app.use('/events', eventRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Backend Server is running on http://localhost:${PORT}`);
});
