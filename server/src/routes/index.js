import express from "express";
import { providers, Contract, utils, getDefaultProvider } from "ethers";
import abi from "../abis/FETestTask";

const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("index", { title: "Securrency API-Gateway" });
});

router.get("/ping", function (req, res, next) {
  res.status(200).send("pong");
});

router.get("/worker", async function (req, res, next) {
  const {
    INFURA_PROJECT_ID,
    INFURA_PROJECT_SECRET,
    INFURA_NETWORK,
    APP_CONTRACT_ADDRESS,
  } = process.env;

  const provider = new providers.InfuraProvider(INFURA_NETWORK, {
    projectId: INFURA_PROJECT_ID,
    projectSecret: INFURA_PROJECT_SECRET,
  });

  const block = await provider.getBlockNumber();

  const contract = new Contract(APP_CONTRACT_ADDRESS, abi, provider);
  console.log("Contract address: ", contract.address);

  const mapCitizen = (event) => {
    const [id, age, city, name] = event.args;

    return {
      id: Number(utils.formatUnits(id, "wei")),
      age: utils.formatUnits(age, "wei"),
      name: name,
      event,
    };
  };

  const events = await contract.queryFilter(contract.filters.Citizen());
  const topics = events.map(mapCitizen);

  // ********************************************
  // here we need to see other events
  // ********************************************

  // const city = decodedEvents.map(event => event["values"]["city"]);

  // const notes = await contract.getNoteByCitizenId(1);
  // console.log("🚀 ~ file: index.js ~ line 61 ~ notes", notes);

  // const cityLogs = await provider.getLogs({
  //   address: APP_CONTRACT_ADDRESS,
  //   topics: [
  //     "0x42fae273ea147f4212fa0a61b4e202a89aae256d29144500f84cfafcf96201bd",
  //   ],
  // });
  // console.log("🚀 ~ file: index.js ~ line 66 ~ cityLogs", cityLogs);

  // const topics = events.map((event) => ({
  //   topics: event.topics,
  //   name: Buffer.from(event.topics[3], "hex"),
  // }));

  //   filter = {
  //     address: "dai.tokens.ethers.eth",
  //     topics: [
  //         utils.id("Transfer(address,address,uint256)")
  //     ]
  // }
  // provider.on(filter, (log, event) => {
  //     // Emitted whenever a DAI token transfer occurs
  // })

  res.status(200).json(topics);
});

module.exports = router;
