const databaseRouter = require('express').Router();
const DatabaseController = require("../controllers/databaseController")
const authenticate = require("../middleware/authentication")
const AdminAutenticate = require("../middleware/AdminAutenticate")

// Kegiatan
databaseRouter.get("/kegiatan", authenticate, DatabaseController.getKegiatan)
databaseRouter.post("/kegiatan", AdminAutenticate, DatabaseController.addKegiatan)
databaseRouter.put("/kegiatan/:id", AdminAutenticate, DatabaseController.editKegiatan )
databaseRouter.delete("/kegiatan/:id", AdminAutenticate, DatabaseController.deleteKegiatan )

databaseRouter.get("/kegiatankro", authenticate, DatabaseController.getKegiatanKro)


// Kro
databaseRouter.get("/kro", authenticate, DatabaseController.getKro)
databaseRouter.post("/kro", AdminAutenticate, DatabaseController.addKro )
databaseRouter.put("/kro/:id", AdminAutenticate, DatabaseController.editKro )
databaseRouter.delete("/kro/:id", AdminAutenticate, DatabaseController.deleteKro )

databaseRouter.get("/kroro", authenticate, DatabaseController.getKroRo)

// Ro
databaseRouter.get("/ro", authenticate, DatabaseController.getRo)
databaseRouter.post("/ro", AdminAutenticate, DatabaseController.AddRo )
databaseRouter.put("/ro/:id", AdminAutenticate, DatabaseController.editRo )
databaseRouter.delete("/ro/:id", AdminAutenticate, DatabaseController.deleteRo )

databaseRouter.get("/rokomponen", authenticate, DatabaseController.getRoKomponen)


// Komponen
databaseRouter.get("/komponen", authenticate, DatabaseController.getKomponen)
databaseRouter.post("/komponen", AdminAutenticate, DatabaseController.addKomponen )
databaseRouter.put("/komponen/:id", AdminAutenticate, DatabaseController.editKomponen )
databaseRouter.delete("/komponen/:id", AdminAutenticate, DatabaseController.deleteKomponen )

databaseRouter.get("/komreal", authenticate, DatabaseController.getKomReal)




module.exports = databaseRouter