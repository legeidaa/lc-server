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
    tableName: "expectations",
    timestamps: true,
})
export class Expectation extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    })
    declare expectationId: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare title: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare userId: number;

    @BelongsTo(() => User)
    declare user: User;
}
