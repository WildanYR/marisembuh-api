import { Global, Module } from '@nestjs/common';
import { MYSQL_PROVIDER } from 'src/constants';
import { MysqlProvider } from './mysql.provider';

@Global()
@Module({
  providers: [
    {
      provide: MYSQL_PROVIDER,
      useClass: MysqlProvider,
    },
  ],
  exports: [MYSQL_PROVIDER],
})
export class DatabaseModule {}
