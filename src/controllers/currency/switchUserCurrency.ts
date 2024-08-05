import Currency from "@/models/currency";
import User from "@/models/user";

const switchUserCurrencyHandler = async (req: any, res: any) => {
  try {
    const currency = await Currency.findById(req.body.currencyId);
    if (!currency) return res.status(404).send({ error: "No currency found" });

    await User.findByIdAndUpdate(req.user._id, {
      currencyId: currency._id.toString(),
    });

    return res.status(200).send(currency);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default switchUserCurrencyHandler;
