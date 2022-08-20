import { FilesService } from './../../../services/files.service';
import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-detachables',
  templateUrl: './detachables.component.html',
  styleUrls: ['./detachables.component.scss'],
})
export class DetachablesComponent implements OnInit {
  cols: any[] = [];
  filesData = [];
  selectedFiles: any[] = [];

  constructor(private filesService: FilesService) {
    this.getData();
  }

  ngOnInit(): void {
    this.cols = [
      { field: 'fileName', header: 'Nombre del documento' },
      { field: 'date_create', header: 'Fecha de Creacion' },
      { field: 'options', header: 'Opciones' },
    ];
  }

  getData() {
    this.filesService.getUpload().then((data: any) => {
      this.filesData = data.filesContent;
    });
  }

  downloadFile(rowData: any) {
    this.filesService.downloadFile(rowData._id).subscribe({
      next: (response: any) => {
        console.log([response]);
        let blob = new Blob([response], {});
        saveAs(blob, rowData.fileName);
      },
      error: (error: any) => {
        alert('The file is not available');
      },
    });
  }

  generatePDF() {
    let data = [
      {
        id: 1,
        score: 135,
        time_alive: 80.5,
        acuracy: 20.5,
        user_id: 2,
        user: {
          username: 'Daniel',
        },
      },
      {
        id: 1,
        score: 135,
        time_alive: 80.5,
        acuracy: 20.5,
        user_id: 2,
        user: {
          username: 'Daniel',
        },
      },
      {
        id: 1,
        score: 135,
        time_alive: 80.5,
        acuracy: 20.5,
        user_id: 2,
        user: {
          username: 'Daniel',
        },
      },
    ];

    this.filesService.generateFiles(data).then((res: any) => {
      if (res.status == 200) {
        this.getData();
      }
    });
  }
}
