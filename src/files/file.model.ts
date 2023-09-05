import * as mongoose from 'mongoose';

export const RawDataSchema = new mongoose.Schema({
  resultTime: { type: Date },
  enodebId: { type: String },
  cellId: { type: String },
  availDur: { type: Number },
});

export interface RawData extends mongoose.Document {
  resultTime: Date;
  enodebId: string;
  cellId: string;
  availDur: number;
}
