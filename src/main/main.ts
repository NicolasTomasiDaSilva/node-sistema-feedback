import "dotenv/config";
import { app } from "../presentation/server";

const PORT = process.env.PORT;

async function bootstrap() {
  try {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start the server:", err);
    process.exit(1);
  }
}

bootstrap();
