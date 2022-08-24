import { FilesService } from './../../../services/files.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver-es';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-detachables',
  templateUrl: './detachables.component.html',
  styleUrls: ['./detachables.component.scss'],
})
export class DetachablesComponent implements OnInit {
  cols: any[] = [];
  filesData: any = [];
  virtualFilesData = new BehaviorSubject<any[]>([] as any);
  selectedFiles: any[] = [];
  showSpinner: boolean = false;
  showGenerate: boolean = true;

  constructor(
    private filesService: FilesService,
    private ref: ChangeDetectorRef
  ) {
    this.getData();
  }

  ngOnInit(): void {
    this.cols = [
      { field: 'fileName', header: 'Nombre del documento' },
      { field: 'date_create', header: 'Fecha de Creacion' },
      { field: 'options', header: 'Opciones' },
    ];
  }

  async getData() {
    await this.filesService.getUpload().then((data: any) => {
      console.log(data);

      if (!data.filesContent) {
        this.filesData = [];
      } else {
        this.filesData = [...data.filesContent];
      }
    });
  }

  downloadFile(rowData: any) {
    this.filesService.downloadFile(rowData._id).subscribe({
      next: (response: any) => {
        let blob = new Blob([response], {});
        saveAs(blob, rowData.fileName);
      },
      error: (error: any) => {
        alert('The file is not available');
      },
    });
  }

  async generatePDF() {
    this.showSpinner = true;
    this.showGenerate = false;

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

    await this.filesService.generateFiles(data).then((res: any) => {
      console.log(res);

      if (res.status == 200) {
        setTimeout(() => {
          this.filesService.getUpload().then((data: any) => {
            console.log(data);
            if (!data.filesContent) {
              this.filesData = [];
            } else {
              this.filesData = [...data.filesContent];
            }

            this.showSpinner = false;
            this.showGenerate = true;
          });
        }, 100);
      }
    });
  }
}
