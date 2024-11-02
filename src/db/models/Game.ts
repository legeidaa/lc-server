import {
    Table,
    Column,
    Model,
    DataType,
    HasOne,
    HasMany,
} from "sequelize-typescript";
import { User } from "./User";

@Table({
    tableName: "games",
    timestamps: true,
})
export class Game extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    })
    declare gameId: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare gameHash: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: "player",
    })
    declare currentUserRole: string;

    @HasMany(() => User)
    declare users: number[];
}
