import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterFile } from 'multer';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: MulterFile) {
    console.log('fileeee', file);
    try {
      const result = await this.fileService.processUploadFile(file);
      console.log('resultresult', result);
    } catch (error) {
      console.log('errorupload', error);
    }
  }
}
