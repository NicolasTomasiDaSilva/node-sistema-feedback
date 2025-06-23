import { QueryInterface, DataTypes } from "sequelize";
import { RoleEnum } from "../../../../domain/enums/role-enum";

export async function up(query: QueryInterface) {
  await query.createTable("users", {
    id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM(...Object.values(RoleEnum)),
      allowNull: false,
    },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
    deletedAt: { type: DataTypes.DATE, allowNull: true },
  });
}

export async function down(query: QueryInterface) {
  await query.dropTable("users");
}
