import createCurrencyHandler from "@/controllers/currency/createCurrency";
import deleteCurrencyHandler from "@/controllers/currency/deleteCurrency";
import getAllCurrencyHandler from "@/controllers/currency/getAllCurrency";
import switchUserCurrencyHandler from "@/controllers/currency/switchUserCurrency";
import tradedCurrencyBalHandler from "@/controllers/currency/tradedCurrencyBal";
import updateCurrencyHandler from "@/controllers/currency/updateCurrency";
import userAuth from "@/middlewares/userAuth";
import { Router } from "express";

const router = Router();

router.post("/currency/create", userAuth, createCurrencyHandler);

router.get("/currencies", userAuth, getAllCurrencyHandler);

router.post("/currency/update", userAuth, updateCurrencyHandler);

router.post("/currency/delete", userAuth, deleteCurrencyHandler);

router.get("/currency/traded-balances", userAuth, tradedCurrencyBalHandler);

router.post("/currency/switch", userAuth, switchUserCurrencyHandler);

export default router;
