import { Module } from '@nestjs/common';
import { GraphService } from './graph.service';
import { GraphController } from './graph.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RawDataSchema } from 'src/files/file.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'RawData', schema: RawDataSchema, collection: 'raw_data' },
    ]),
  ],
  controllers: [GraphController],
  providers: [GraphService],
})
export class GraphModule {}
