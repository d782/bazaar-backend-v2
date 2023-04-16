import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './core/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'.environment.env'
    }),
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      useFactory:async (config:ConfigService)=>(
        {
        uri:config.get('DB'),
        }
      ),
      inject:[ConfigService]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
