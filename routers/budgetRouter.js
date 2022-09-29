const transaksiRouter = require('express').Router();
const UserController = require("../controllers/userController")
const BudgetController = require("../controllers/budgetController")

const authenticate = require("../middleware/authentication")

// Realisasi
transaksiRouter.get("/", authenticate, BudgetController.getBudget)
transaksiRouter.post("/", BudgetController.addBudget)
transaksiRouter.delete("/:id", BudgetController.deleteBudget)
transaksiRouter.put("/:id", BudgetController.editBudget)


module.exports = transaksiRouter