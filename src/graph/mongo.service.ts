import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RawDataDocument } from './graph.model';

@Injectable()
export class MongoDbService {
  constructor(
    @InjectModel('RawData')
    private readonly rawDataModel: Model<RawDataDocument>,
  ) {}

  async find(query: any) {
    return this.rawDataModel.find(query).exec();
  }
}
