import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('menssage')
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 255 })
  text: string

  @Column({ type: 'varchar', length: 50 })
  from: string

  @Column({ type: 'varchar', length: 50 })
  to: string

  @Column({ default: false })
  isRead: boolean

  @CreateDateColumn()
  createdAt?: Date

  @UpdateDateColumn()
  updatedAt?: Date
}
