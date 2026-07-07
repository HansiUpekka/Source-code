require("dotenv").config();

const app = require("./app");
const { waitForDatabase } = require("./config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await waitForDatabase();

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

startServer().catch(error => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
