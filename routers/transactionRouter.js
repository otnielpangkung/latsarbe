const transaksiRouter = require('express').Router();
const UserController = require("../controllers/userController")
const TransactionController = require("../controllers/transactionController")

const authenticate = require("../middleware/authentication")

// Realisasi
transaksiRouter.get("/", authenticate, TransactionController.getTransaksi)
transaksiRouter.post("/",authenticate, TransactionController.addTransaksion)
transaksiRouter.delete("/:id", TransactionController.deleteTransaksi)



module.exports = transaksiRouter