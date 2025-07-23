import { faker } from "@faker-js/faker";

import mongoose from "mongoose";
import User from "./model/user.model.js";
// Connection URL
async function seedData() {
  const uri = "mongodb://localhost:27017/testings";
  const seed_count = 5000;
  mongoose.set("strictQuery", false);
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to db");
    })
    .catch((err) => {
      console.log("error", err);
    });

  let timeSeriesData = [];
  // create 5000 fake data
  for (let i = 0; i < seed_count; i++) {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    timeSeriesData.push({ name, email, password });
  }

  const seedDB = async () => {
    await User.insertMany(timeSeriesData);
  };

  seedDB().then(() => {
    mongoose.connection.close();
    console.log("seed success");
  });
}
seedData();
