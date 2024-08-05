import Currency from "@/models/currency";

const getAllCurrencyHandler = async (req: any, res: any) => {
  try {
    const currencies = await Currency.find({});
    return res.status(200).send(currencies.reverse());
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default getAllCurrencyHandler;
