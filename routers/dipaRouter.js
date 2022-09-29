const dipaRouter = require('express').Router();
const DipaController = require("../controllers/dipaController")

const authenticate = require("../middleware/authentication")

// Realisasi
dipaRouter.get("/kegiatan",  DipaController.getKegiatan)
dipaRouter.get("/jumlah",  DipaController.getJumlah)


module.exports = dipaRouter