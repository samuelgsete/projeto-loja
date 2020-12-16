import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { Loja } from '../shared/models/loja.entity';
import { LojaService } from '../shared/services/loja.service';

@Component({
  selector: 'app-loja',
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.scss']
})
export class LojaComponent implements OnInit {

  public lojas = [];
  public loading: boolean = true;
  public form: FormGroup;
  
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
    this.servico.findAll().subscribe( response => {
      this.lojas = response;
    }, err => {
      this.errorMessage(err);
    }).add(() => {
      this.loading = false;
    });
  }   
  
  public createOrUpdate(loja: Loja) {
    const newLoja = new Loja({
      id: loja.id,
      cnpj: loja.cnpj,
      razaoSocial: loja.razaoSocial,
      nomeFantasia: loja.nomeFantasia,
      telefone: loja.telefone,
      funcionarios: loja.funcionarios
    });
    
    if(!newLoja.id) {
      this.servico.create(newLoja).subscribe(response => {
        this.toastr.success('Criado com sucesso', 'Feito', { progressBar: true });  
        this.hideModalCreate();  
        this.read();   
      }, err => {
        this.errorMessage(err);
      });
    }
    else {
      this.servico.update(newLoja).subscribe(response => {
        this.toastr.success('Atualizado com sucesso', 'Feito', { progressBar: true });
        this.hideModalUpdate();
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
          this.toastr.success('Removido com sucesso!', 'Feito', { progressBar: true });
          this.read();
        }, e =>{
          this.errorMessage(e);
        })
      } 
    });
  }

  public toDashboardFuncionarios(lojaId: number) {
    this.router.navigateByUrl(`/funcionarios/${lojaId}`);
  }
  
  private errorMessage(err: any) {
    if(err.status == 0) {
      this.toastr.error('Servidor Inacessível', 'ERRO', { progressBar: true });
    }
    else {
      this.toastr.error(err.error.details, 'ERRO', { progressBar: true });
    }
  }

  public hideModalCreate() {
    this.modalCreate.hide();
    this.form.reset();
  }

  public hideModalUpdate() {
    this.modalUpdate.hide();
    this.form.reset();
  }

  public showModalUpdate(loja: Loja) {
    this.form.patchValue({
      id: loja.id,
      cnpj: loja.cnpj,
      razaoSocial: loja.razaoSocial,
      nomeFantasia: loja.nomeFantasia,
      telefone: loja.telefone
    });
    this.modalUpdate.show();
  }

  ngOnInit(): void {
    this.read();
    this.form = this._fb.group({
      id: [null],
      cnpj: ['', [Validators.required]],
      razaoSocial: ['', [Validators.minLength(4), Validators.maxLength(30), Validators.required]],
      nomeFantasia: ['', [Validators.minLength(4), Validators.maxLength(30), Validators.required]],
      telefone: ['', [Validators.required]],
      funcionarios: [[]]
    });
  }
}