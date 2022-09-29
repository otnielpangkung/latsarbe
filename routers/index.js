const router = require("express").Router()
const userRouter = require("./userRouter")
const databaseRouter = require("./databaseRouter")
const transaksiRouter = require("./transactionRouter")
const budgetRouter = require("./budgetRouter")
const dipaRouter = require("./dipaRouter")

router.use("/user", userRouter)
router.use("/database", databaseRouter)
router.use("/transaksi", transaksiRouter)
router.use("/budget", budgetRouter)
router.use("/dipa", dipaRouter)
module.exports = router