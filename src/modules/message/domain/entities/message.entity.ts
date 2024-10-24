import { Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('tb_menssage')
export class Message {
    @PrimaryGeneratedColumn()
    id: number;
    text: string;
    from: string;
    to: string;
    isRead: boolean;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}