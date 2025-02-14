import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";
import { User } from "./User";

@Table({
    tableName: "actions",
    timestamps: true,
})
export class Action extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    })
    declare actionId: number;

    @Column({
        type: DataType.INTEGER,
    })
    declare estimate: number;

    @Column({
        type: DataType.INTEGER,
    })
    declare partnerEstimate: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare title: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        values: ["green", "yellow", "blue", "gray "],
    })
    declare type: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare userId: number;

    @BelongsTo(() => User)
    declare user: User;
}
