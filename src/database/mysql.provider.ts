import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import entities from 'src/entities';

@Injectable()
export class MysqlProvider {
  private sequelize?: Sequelize;

  constructor(private configService: ConfigService) {
    if (!this.sequelize) {
      this.sequelize = new Sequelize({
        dialect: 'mysql',
        host: this.configService.get('database.host'),
        port: this.configService.get('database.port'),
        username: this.configService.get('database.username'),
        password: this.configService.get('database.password'),
        database: this.configService.get('database.database'),
        define: {
          freezeTableName: true,
        },
        timezone: this.configService.get('app.timezone'),
      });
      this.sequelize.addModels(entities());
    } else {
      this.sequelize.connectionManager.initPools();
      if (this.sequelize.connectionManager.hasOwnProperty('getConnection')) {
        delete this.sequelize.connectionManager.getConnection;
      }
    }
  }

  async transaction(): Promise<Transaction> {
    return await this.sequelize.transaction();
  }
}
