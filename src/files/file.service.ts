import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RawData } from './file.model';
import { MulterFile } from 'multer';
import { Model } from 'mongoose';

@Injectable()
export class FileService {
  constructor(
    @InjectModel('RawData') private readonly rawDataModel: Model<RawData>,
  ) {}
  async processUploadFile(file: MulterFile): Promise<string> {
    const csvData = file.buffer.toString('utf-8');
    const rows = csvData.split('\n');
    const columnHeaders = rows[0].split('\r');
    const cleanColumnHeaders = columnHeaders[0].split(',').map((i) => {
      if (i.includes(' ')) {
        i = i.toLowerCase().replace(/ /g, '_');
      }
      if (i.includes('.')) {
        i = i.toLowerCase().replace(/\./g, '_');
      }
      return i;
    });

    const data = [];
    for (let row = 1; row < rows.length; row++) {
      const cleanRow = rows[row]
        .split('\r')[0]
        .split(',')
        .map((clean) => {
          if (clean.includes('=')) {
            const split = clean.split('=');
            clean = {
              [split[0].trim().toLowerCase().replace(/ /g, '_')]: split[1],
            };
          }

          return typeof clean === 'string' ? clean.toLowerCase() : clean;
        });

      const rowData = [];

      for (let header = 0; header < cleanColumnHeaders.length; header++) {
        rowData.push({
          [cleanColumnHeaders[header]]: cleanRow[header],
        });
      }
      data.push(rowData);
    }

    const resultData = data.map((i) => {
      if (i.every((i) => i !== undefined)) {
        return i.map((x) => ({
          resultTime: x.result_time ? x.result_time : null,
          enodebId: x.l_cell_unavail_dur_energysaving
            ? x.l_cell_unavail_dur_energysaving.enodeb_id
            : null,
          cellId: x.Reliability ? x.Reliability?.local_cell_id : null,
          availDur: x.l_cell_avail_dur ? x.l_cell_avail_dur.cell_name : null,
        }));
      }
      // return i;
    });

    console.log('dataa', resultData);

    const newFile = new this.rawDataModel(...resultData);
    const result = await newFile.save();
    console.log('result', result);
    return result.id as string;
  }
}
