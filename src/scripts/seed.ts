import { v4 as uuidv4 } from "uuid";
import { Database } from "../infrastructure/database/sequelize/sequelize";
import { CompanyModel } from "../infrastructure/database/sequelize/models/company";
import { UserModel } from "../infrastructure/database/sequelize/models/user";
import { RoleEnum } from "../domain/enums/role-enum";

async function main() {
  try {
    await Database.connect();

    const [company] = await CompanyModel.findOrCreate({
      where: { cpfCnpj: "00000000000" },
      defaults: {
        id: uuidv4(),
        name: "Empresa Padrao",
        cpfCnpj: "00000000000",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    });

    await UserModel.findOrCreate({
      where: { email: "tomasitrabalho@gmail.com" },
      defaults: {
        id: uuidv4(),
        companyId: company.id,
        name: "manager",
        email: "tomasitrabalho@gmail.com",
        role: RoleEnum.manager,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    });

    console.log("Seed completed successfully");
  } catch (err) {
    console.error("Seed failed", err);
  } finally {
    await Database.disconnect();
  }
}

main();
