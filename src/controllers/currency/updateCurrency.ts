import Currency from "@/models/currency";
import User from "@/models/user";

const updateCurrencyHandler = async (req: any, res: any) => {
  try {
    const currency = await Currency.findById(req.body.currencyId);
    if (!currency) return res.status(404).send({ error: "currency not found" });

    const requester = await User.findById(req.user._id);
    if (!requester)
      return res.status(404).send({ error: "No User:Requester Found" });

    if (requester.role !== "admin")
      return res.status(401).send({ error: "Unauthorized access" });

    for (const key in req.body) {
      if (key !== "currencyId") {
        (currency as any)[key] = req.body[key];
      }
    }

    const updatedBank = await currency.save();
    return res.status(200).send(updatedBank);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default updateCurrencyHandler;
