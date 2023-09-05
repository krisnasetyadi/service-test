import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RawDataSchema } from './file.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'RawData', schema: RawDataSchema, collection: 'raw_data' },
    ]),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
