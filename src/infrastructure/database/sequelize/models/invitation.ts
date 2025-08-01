import { DataTypes, Model, Sequelize } from "sequelize";
import { RoleEnum } from "../../../../domain/enums/role-enum";
import { CompanyModel } from "./company";

/* ─────────── Colunas da tabela ─────────── */
export interface InvitationAttributes {
  id: string;
  companyId: string;
  name: string;
  phone: string | null;
  cpf: string;
  role: RoleEnum;
  isAccepted: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class InvitationModel
  extends Model<InvitationAttributes>
  implements InvitationAttributes
{
  /* ─────────── Colunas da tabela ─────────── */
  declare id: string;
  declare companyId: string;
  declare name: string;
  declare phone: string | null;
  declare cpf: string;
  declare role: RoleEnum;
  declare isAccepted: boolean;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date | null;

  static initModel(sequelize: Sequelize) {
    InvitationModel.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
        },
        companyId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        cpf: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.ENUM(...Object.values(RoleEnum)),
          allowNull: false,
        },
        isAccepted: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: { type: DataTypes.DATE, allowNull: true },
      },
      {
        sequelize,
        tableName: "invitations",
        timestamps: true,
        paranoid: true,
      }
    );
  }

  static associate() {
    InvitationModel.belongsTo(CompanyModel, {
      foreignKey: "companyId",
      as: "company",
    });
  }
}
