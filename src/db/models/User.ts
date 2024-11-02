import {
    Table,
    Column,
    Model,
    DataType,
    BelongsTo,
    ForeignKey,
} from "sequelize-typescript";
import { Game } from "./Game";

@Table({
    tableName: "users",
    timestamps: true,
})
export class User extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    })
    declare userId: number;

    @ForeignKey(() => Game)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare gameId: number;

    @BelongsTo(() => Game)
    declare game: Game;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare sex: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare role: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare hasResources: boolean;
}
