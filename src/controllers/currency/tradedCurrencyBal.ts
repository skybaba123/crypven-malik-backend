import Currency from "@/models/currency";
import Transaction from "@/models/transaction";

const tradedCurrencyBalHandler = async (req: any, res: any) => {
  try {
    const currencies = await Currency.find({});

    const userTransactions = await Transaction.find({
      ownerId: req.user._id,
    });

    const successfulTransactions = userTransactions.filter(
      (tran) => tran.status === "successful"
    );

    const balanceList = currencies.map((currency) => {
      const currencyTransactions = [...successfulTransactions].filter(
        (tran) => tran.currencyId === currency._id.toString()
      );

      const totalBalance = currencyTransactions.reduce(
        (acc, cur) => acc + cur.payoutCurrency.amount,
        0
      );

      return {
        name: currency.name,
        symbol: currency.symbol,
        code: currency.code,
        rate: currency.rate,
        amountTraded: totalBalance,
        currencyId: currency._id,
      };
    });

    return res.status(200).send(balanceList);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default tradedCurrencyBalHandler;
