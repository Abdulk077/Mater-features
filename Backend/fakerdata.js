import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import Product from "./model/products.model.js"; // Adjust the path as necessary
// Mongoose Product Schema

// Seeder function
async function seedData() {
  const uri = "mongodb://localhost:27017/testings";
  const seed_count = 20000;

  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to DB");
  } catch (err) {
    console.log("❌ DB connection error:", err);
    return;
  }

  const products = [];

  for (let i = 0; i < seed_count; i++) {
    products.push({
      name: faker.commerce.productName(),
      brand: faker.company.name(),
      category: faker.commerce.department(), // ✅ using faker-generated category
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price({ min: 100, max: 2000 })),
      stock: faker.number.int({ min: 0, max: 100 }),
      imageUrl: faker.image.urlPicsumPhotos(),
      rating: parseFloat((Math.random() * 5).toFixed(1)),
      numReviews: faker.number.int({ min: 0, max: 500 }),
    });
  }

  try {
    await Product.deleteMany(); // Optional: clear old data
    await Product.insertMany(products);
    console.log(`✅ Seeded ${seed_count} products successfully`);
  } catch (err) {
    console.error("❌ Seeding error:", err);
  } finally {
    mongoose.connection.close();
  }
}

seedData();
