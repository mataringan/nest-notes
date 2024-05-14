import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import { Exclude } from "@nestjs/class-transformer";

export abstract class AppBase {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    public id: string;

    @ApiProperty()
    @CreateDateColumn()
    public createdAt: Date;

    @Column({type: 'varchar', length: 255, nullable: true})
    @Exclude()
    public createdBy: string;

    @Column({type: 'uuid', nullable: true})
    @Exclude()
    public createdById: string;

    @ApiProperty()
    @UpdateDateColumn()
    public updatedAt: Date;

    @Column({nullable: true})
    @Exclude()
    public updatedBy: string;

    @Column({type: 'uuid', nullable: true})
    @Exclude()
    public updatedById: string;

    @ApiProperty()
    @DeleteDateColumn()
    public deletedAt: Date;

    @Column({nullable: true})
    @Exclude()
    public deletedBy: string;

    @Column({type: 'uuid', nullable: true})
    @Exclude()
    public deletedById: string;
}
