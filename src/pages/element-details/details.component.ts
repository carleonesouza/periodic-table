import {
  Component, OnInit, ElementRef,
  HostListener, Inject} from '@angular/core';
import { fromEvent, Observable  } from 'rxjs';
import 'rxjs/Rx';
import * as Hammer from 'hammerjs';

import { Table } from '../../models/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs-compat/operator/map';


@Component({
  selector: 'app-dialog',
  template:
    `<div role="dialog">
    <h1 mat-dialog-title cdkTrapFocus>Selecionar Elemento</h1>
  <div mat-dialog-content>
  <p>
  <mat-form-field appearance="outline">
    <mat-label>Digite a Linha</mat-label>
    <input matInput [(ngModel)]="data.linha" placeholder="Linha">
  </mat-form-field>
</p>
<p>
<mat-form-field appearance="outline">
  <mat-label>Digite a Coluna</mat-label>
  <input matInput [(ngModel)]="data.coluna" placeholder="Coluna">
</mat-form-field>
</p>
  </div>
  <div mat-dialog-actions>
    <button mat-button style="margin-left:5%" (click)="onNoClick()">Cancelar</button>
    <button mat-button [mat-dialog-close]="data" aria-label="Botão OK">Ok</button>
  </div>
  </div>
`,
})

export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-details-component',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})


export class DetailsComponent implements OnInit {
  csvUrl = '../../assets/dados.csv';
  elementos = [];
  linha: 0;
  coluna: 0;
  code = false;
  header: any[];
  titulo: any;
  buttonHelp = false;
  direcao = 0;
  tempo = 0;
  move: number;
  lata: any;
  no_home: boolean;


  constructor(private httpClient: HttpClient, private table: Table, private el: ElementRef,
              public dialog: MatDialog, public snackBar: MatSnackBar) {
     }

  ngOnInit() {
    this.linha = 0;
    this.coluna = 0;
    // tslint:disable-next-line: max-line-length
    this.httpClient.get(this.csvUrl, {responseType: 'text'})
    .subscribe((data) =>  this.extractData(data), err => this.handleError(err));

    // setar linha e coluna para voltar para o inicio da tabela
    this.table.setLinha(this.linha);
    this.table.setColuna(this.coluna);
    this.move = 0;
    this.no_home = false;

    document.addEventListener('keydown', (e) => {
      this.code = true;
      if (e.keyCode === 90) { this.table.mover(0);
                       this.move = 1;
    } // Baixo
      if (e.keyCode === 65) { this.table.mover(1);
                              this.move = 1;
      } // Esquerda
      if (e.keyCode === 87) { this.table.mover(2);
                              this.move = 1;
      } // Cima
      if (e.keyCode === 68) { this.table.mover(3);
                              this.move = 1;
      }
      // Direita
      if (e.keyCode === 81) { this.openDialog(); }
    }, false);

    const source = fromEvent(document, 'keydown');
    source.subscribe(
      () => {
        this.elementos = this.table.getDados()[this.table.getLinha()][this.table.getColuna()].split(',');
        this.titulo = this.elementos[2];
        /* if (this.elementos.length === 1 && this.move !== 0) {
          this.snackBar.open('Continue a frente', '', { duration: 3000 });
        } else if (this.move !== 0) {
          this.snackBar.open('Você chegou no elementos ' + this.elementos[2], '', { duration: 3000 });
        } */
        if (this.table.getDados()[this.table.getLinha()][this.table.getColuna()] === 'Lantanídeos') {
          this.elementos = this.table.getDados()[7][3].split(',');
        }
        if (this.table.getDados()[this.table.getLinha()][this.table.getColuna()] === 'Actinídeos') {
          this.elementos = this.table.getDados()[8][3].split(',');
        }
        this.move = 0;
      },
      (error) => {
        this.snackBar.open('Erro durante operação', 'RETRY', { duration: 3000 });
        console.log(error);
      }
    );
  }


  @HostListener('touchend') onTouchEnd() {
    const gesture = this.el.nativeElement.querySelector('.example-card');
    const h = new Hammer.Manager(gesture, {
      recognizers: [
        [Hammer.Swipe, { direction: Hammer.DIRECTION_ALL }],
      ]
    });
    h.get('swipe').set({ enable: true });
    h.on('swipe', (ev) => {
      if (this.tempo < ev.deltaTime) {
        this.tempo = ev.deltaTime;
        this.direcao = ev.direction.valueOf();
      }
    });
    this.tempo = 0;
    this.TouchchangePosition();
  }


  private extractData(data) {
    const dados = data.split(':');
    this.table.init(dados, this.linha || 0, this.coluna || 0);
    this.header = this.table.getDados()[this.table.getLinha()][this.table.getColuna()].split(',');
    this.titulo = this.header[2];
  }

  private TouchchangePosition() {
    if (this.direcao !== 0) {
      if (this.direcao === 16) { this.table.mover(2); } // Baixo
      if (this.direcao === 2) { this.table.mover(3); } // Esquerda
      if (this.direcao === 8) { this.table.mover(0); } // Cima
      if (this.direcao === 4) { this.table.mover(1); } // Direita
      this.code = true;
      this.elementos = this.table.getDados()[this.table.getLinha()][this.table.getColuna()].split(',');
      console.log(this.elementos);
      this.titulo = this.elementos[2];
      /*if (this.elementos.length === 1) {
        this.snackBar.open('Continue a frente', '', { duration: 3000 });
      }  else if (this.elementos[0] >= 1) {
        this.snackBar.open('Você chegou no elementos ' + this.elementos[2], '', { duration: 3000 });
      } */
    }
  }
  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Error';
    // console.error(errMsg);
    this.snackBar.open('Erro Ao Carregar Arquivo da Tabela', 'RETRY', { duration: 3000 });
    return errMsg;
  }

  private openDialog(): void {
    let dialogRef: MatDialogRef<DialogComponent, any>;
    dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: { linha: this.linha, coluna: this.coluna }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialogo Fechado !');
      this.elementos = this.table.getDados()[result.linha][result.coluna].split(',');
      console.log(this.elementos);
      this.titulo = this.elementos[2];
    });
  }

}
