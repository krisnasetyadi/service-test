import { Document } from 'mongoose';

export interface RawData {
  enodebId: string;
  cellId: string;
  resultTime: Date;
  availDur: number;
}

export interface RawDataDocument extends RawData, Document {}
