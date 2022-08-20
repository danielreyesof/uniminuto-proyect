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
  filesData: any[] = [];
  selectedFiles: any[] = [];

  constructor(private filesService: FilesService) {}

  ngOnInit(): void {
    this.filesService.getFiles().subscribe((res) => {
      console.log(res);

      this.filesData = res.filesContent;
    });

    this.cols = [
      { field: 'fileName', header: 'Nombre del documento' },
      { field: 'date_create', header: 'Fecha de Creacion' },
      { field: 'options', header: 'Opciones' },
    ];
  }

  downloadFile(rowData: any) {
    this.filesService.downloadFile(rowData._id).subscribe(
      (response: any) => {
        console.log([response]);

        let blob = new Blob([response], {});
        saveAs(blob, rowData.fileName);
      },
      (error) => {
        alert('The file is not available');
      },
      () => {}
    );
  }
}
