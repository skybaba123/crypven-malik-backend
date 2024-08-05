import Currency from "@/models/currency";
import User from "@/models/user";

const createCurrencyHandler = async (req: any, res: any) => {
  try {
    const requester = await User.findById(req.user._id);
    if (!requester)
      return res.status(404).send({ error: "User(requester) not found" });

    if (requester.role !== "admin")
      return res.status(401).send({ error: "Unauthorized access" });

    const newCurrency = new Currency(req.body);

    const savedCurrency = await newCurrency.save();
    return res.status(200).send(savedCurrency);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default createCurrencyHandler;
