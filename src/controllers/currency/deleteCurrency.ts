import Currency from "@/models/currency";
import ImageTrash from "@/models/imageTrash";
import User from "@/models/user";

const deleteCurrencyHandler = async (req: any, res: any) => {
  try {
    const currency = await Currency.findById(req.body.currencyId);
    if (!currency) return res.status(404).send({ error: "Currency not found" });

    const requester = await User.findById(req.user._id);
    if (!requester) return res.status(404).send({ error: "No User Found" });

    if (requester.role !== "admin")
      return res.status(401).send({ error: "Unauthorized access" });

    const deletedCurrency = await Currency.findByIdAndDelete(currency._id);
    return res.status(200).send(deletedCurrency);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default deleteCurrencyHandler;
