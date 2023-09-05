import { Controller, Get, Query } from '@nestjs/common';
import { GraphService } from './graph.service';

@Controller('graph')
export class GraphController {
  constructor(private readonly graphService: GraphService) {}

  @Get()
  async getGraph(
    @Query('enodebId') enodebId: string,
    @Query('cellId') cellId: string,
    @Query('startDate') startDate: string, // Changed to string
    @Query('endDate') endDate: string, // Changed to string
  ) {
    const results = await this.graphService.getGraphData(
      enodebId,
      cellId,
      new Date(startDate),
      new Date(endDate),
    );
    return results;
  }
}
