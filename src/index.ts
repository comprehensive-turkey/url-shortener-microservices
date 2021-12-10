import moleculer from "moleculer";
import UrlShortener from "./services/UrlShortener";
import mongoose from "mongoose";

const {
  TRANSPORTER = "nats://localhost:4222",
  MONGO_URI = "mongodb://localhost:27017",
  MONGO_USERNAME = "",
  MONGO_USERPASS = "",
} = process.env;

mongoose
  .connect(MONGO_URI, {
    dbName: "url-shortener",
    auth: { username: MONGO_USERNAME, password: MONGO_USERPASS },
  })
  .catch((e) => {
    throw e;
  });

const broker = new moleculer.ServiceBroker({
  transporter: TRANSPORTER,
});

broker.createService(UrlShortener);

broker.start().catch((e) => {
  throw e;
});
