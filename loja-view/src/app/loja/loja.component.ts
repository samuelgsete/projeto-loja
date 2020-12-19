import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { debounceTime } from 'rxjs/operators';

import { Loja } from '../shared/models/loja.entity';
import { LojaService } from '../shared/services/loja.service';
import { Paginacao } from '../shared/models/paginacao.entity';
import { CnpjValidator } from '../shared/validators/cnpj.validator';

@Component({
  selector: 'app-loja',
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.scss']
})
export class LojaComponent implements OnInit {

  public lojas = [];
  public loading: boolean = true;
  public form: FormGroup;
  public search: FormControl = new FormControl();
  public paginacao = new Paginacao({ tamanho: 3 });
  
  @ViewChild('modalCreate', { static: false }) modalCreate: any;
  @ViewChild('modalUpdate', { static: false }) modalUpdate: any;

  public constructor(
                      private router: Router,
                      private _fb: FormBuilder,
                      private toastr: ToastrService, 
                      private servico: LojaService
                    ) { }

  public read() {
    this.loading = true;
    this.servico.findAll(this.paginacao).subscribe( response => {
      this.lojas = response.body.content;
      this.paginacao.totalElementos = response.body.totalElements;
      this.paginacao.eAultima = response.body.last;
      console.log(this.paginacao);
      this.loading = false;
    }, err => {
      this.errorMessage(err);
    });
  }   

  public changePage(sense: boolean) {  
    if(sense) {
      this.paginacao.pagina++;
    }
    else {
      this.paginacao.pagina--;
    }
    this.read();
  }
  
  public createOrUpdate(loja: Loja) {
    const newLoja = new Loja({
      id: loja.id,
      cnpj: loja.cnpj,
      razaoSocial: loja.razaoSocial,
      nomeFantasia: loja.nomeFantasia,
      telefone: loja.telefone,
      funcionarios: loja.funcionarios,
      qtdFuncionarios: loja.qtdFuncionarios
    });
    
    if(!newLoja.id) {
      this.servico.create(newLoja).subscribe(response => {
        this.toastr.success('Criado com sucesso', 'Feito', { progressBar: true, positionClass: 'toast-bottom-center' });  
        this.hideModalCreate();  
        this.paginacao = new Paginacao({ tamanho: 3 }); 
        this.read();   
      }, err => {
        this.errorMessage(err);
      });
    }
    else {
      this.servico.update(newLoja).subscribe(response => {
        this.toastr.success('Atualizado com sucesso', 'Feito', { progressBar: true, positionClass: 'toast-bottom-center' });
        this.hideModalUpdate();
        this.paginacao = new Paginacao({ tamanho: 3 });; 
        this.read();
      }, err => {
        this.errorMessage(err);
      });
    }
  }

  public delete(id: number) {
    Swal.fire({
      title: 'Tem certeza que deseja remover?',
      text: 'Você não poderá desfazer essa operação',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.servico.delete(id).subscribe(r => {   
          this.toastr.success('Removido com sucesso!', 'Feito', { progressBar: true, positionClass: 'toast-bottom-center' });
          this.paginacao = new Paginacao({ tamanho: 3 });
          this.read();
        }, e =>{
          this.errorMessage(e);
        });
      } 
    });
  }

  public toDashboardFuncionarios(lojaId: number) {
    this.router.navigateByUrl(`/loja/${lojaId}`);
  }
  
  private errorMessage(err: any) {
    if(err.status == 0) {
      this.toastr.error('Servidor Inacessível', 'ERRO', { progressBar: true, positionClass: 'toast-bottom-center' });
    }
    else {
      this.toastr.error(err.error.details, 'ERRO', { progressBar: true, positionClass: 'toast-bottom-center' });
    }
  }

  public hideModalCreate() {
    this.modalCreate.hide();
    this.createForm();
  }

  public hideModalUpdate() {
    this.modalUpdate.hide();
    this.createForm();
  }

  public showModalUpdate(loja: Loja) {
    this.form.patchValue({
      id: loja.id,
      cnpj: loja.cnpj,
      razaoSocial: loja.razaoSocial,
      nomeFantasia: loja.nomeFantasia,
      telefone: loja.telefone,
      funcionarios: loja.funcionarios,
      qtdFuncionarios: loja.qtdFuncionarios
    });
    this.modalUpdate.show();
  }

  public createForm() {
    this.form = this._fb.group({
      id: [null],
      cnpj: ['', [Validators.required, new CnpjValidator()]],
      razaoSocial: ['', [Validators.minLength(4), Validators.maxLength(30), Validators.required]],
      nomeFantasia: ['', [Validators.minLength(4), Validators.maxLength(30), Validators.required]],
      telefone: ['', [Validators.required]],
      qtdFuncionarios: [0],
      funcionarios: [[]]
    });
  }

  ngOnInit(): void {
    this.read();
    this.createForm();
    this.search.valueChanges.pipe(debounceTime(700)).subscribe(value => {
      this.paginacao = new Paginacao({
        filtro: value,
        pagina: 0,
        tamanho: 3
      });
      this.read();
    });
  }
}