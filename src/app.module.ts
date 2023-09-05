import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { FileModule } from './files/file.module';
import { GraphModule } from './graph/graph.module';

@Module({
  imports: [
    FileModule,
    // GraphModule,
    MulterModule.register({
      dest: './uploads',
    }),
    MongooseModule.forRoot(
      'mongodb+srv://krisnadwisetyadi:TPeXDZPYWfjrNv24@cluster0.ujiykmz.mongodb.net/nestjs-test?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
