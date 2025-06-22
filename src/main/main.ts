import "dotenv/config";
import { app } from "../presentation/server";
import { Database } from "../infrastructure/database/sequelize/sequelize";

const PORT = process.env.PORT || 3333;

async function bootstrap() {
  try {
    await Database.connect();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });

    process.on("SIGINT", async () => {
      console.log("🛑 Encerrando servidor...");
      await Database.disconnect();
      process.exit(0);
    });
  } catch (err) {
    console.error("❌ Failed to start the server:", err);
    process.exit(1);
  }
}

bootstrap();
