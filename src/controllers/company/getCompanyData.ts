import Company from "@/models/company";
import User from "@/models/user";
import Currency from "@/models/currency";

const getCompanyDataHandler = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.body.userId);

    let initCompany;
    const companies = await Company.find({});
    if (companies.length <= 0) {
      const newCompany = await new Company({}).save();
      initCompany = newCompany;
    } else {
      initCompany = companies[0];
    }

    initCompany.emailSetup =
      user?.role === "admin" ? initCompany.emailSetup : undefined;

    const currencies = await Currency.find({});
    if (currencies.length === 0) {
      await new Currency({
        symbol: "$",
        name: "United States Dollar",
        code: "USD",
        rate: 0.9,
      }).save();

      //clean up in dev mode - removes the extra document
      const currencies2 = await Currency.find({});
      if (currencies2.length == 2) {
        await Currency.findByIdAndDelete(currencies2[1]._id);
      }
    }

    return res.status(200).send(initCompany);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default getCompanyDataHandler;
