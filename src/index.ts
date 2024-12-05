import express from "express";
import { getUserBalance, getPayouts, userBalanceExists } from "./api/balances";
import { triggerTransactionFetch } from "./api/transactions";

const app = express();
const port = 3000;

app.use("/balance/:user_id", async (req, res) => {
  const userIdParam = req.params.user_id;

  if (userBalanceExists(userIdParam)) {
    const userCurrentBalance = getUserBalance(userIdParam);
    res.json(userCurrentBalance);
  } else {
    res.status(404).json({ code: "user_not_found", message: "User not found" });
  }
});

app.use("/payouts", async (req, res) => {
  const payouts = getPayouts();

  res.json(payouts);
});

app.listen(port, () => {
  console.log(`server listening on port ${port}!`);
  triggerTransactionFetch();
});
