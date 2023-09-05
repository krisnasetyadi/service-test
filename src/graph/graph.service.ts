import { Injectable } from '@nestjs/common';
import { MongoDbService } from './mongo.service';

@Injectable()
export class GraphService {
  constructor(private readonly mongodbService: MongoDbService) {}

  async getGraphData(
    enodebId: string,
    cellId: string,
    startDate: Date,
    endDate: Date,
  ) {
    const query = {
      enodebId,
      cellId,
      resultTime: {
        $gte: startDate,
        $lte: endDate,
      },
    };
    console.log('query', query);
    const rawData = await this.mongodbService.find(query);

    const results = rawData.map((data) => ({
      resultTime: data.resultTime,
      availability: (data.availDur / 900) * 100,
    }));

    return results;
  }
}
