import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Funcionario } from 'src/app/shared/models/funcionario.entity';

import { FuncionarioService } from 'src/app/shared/services/funcionario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.scss']
})
export class FuncionarioComponent implements OnInit {

  public funcionarios = [];
  public funcionariosSelecionados = [];
  public telefones = [];
  public loading: boolean = true;
  public form: FormGroup;
  public lojaId: number = 0;

  @ViewChild('modalCreate', { static: false }) modalCreate: any;
  @ViewChild('modalUpdate', { static: false }) modalUpdate: any;

  public operadoras = ['OI', 'TIM', 'CLARO', 'VIVO'];

  public constructor( 
                      private router: Router,
                      private _fb: FormBuilder,
                      private toastr: ToastrService, 
                      private servico: FuncionarioService
                    ) { }

  public read() {
    this.loading = true;
    this.servico.findAll(this.lojaId).subscribe( response => {
      this.funcionarios = response;
    }, err => {
      this.errorMessage(err);
    }).add(() => {
      this.loading = false;
    });
  } 
  
  public whenSelecting(funcionarios: any) {
    this.funcionariosSelecionados = funcionarios.selected;
  }

  public saveOrUpdate(funcionario: Funcionario) {
    const novoFuncionario = new Funcionario({
      id: funcionario.id,
      nome: funcionario.nome,
      cpf: funcionario.cpf,
      email: funcionario.email,
      telefones: funcionario.telefones,
      status: funcionario.status
    });
    if(!novoFuncionario.id) {
      novoFuncionario.status = true;
      this.servico.create(this.lojaId, novoFuncionario).subscribe(response => {
        this.toastr.success('Criado com sucesso', 'Feito', { progressBar: true });  
        this.hideModalCreate();  
        this.read();   
      }, err => {
        this.errorMessage(err);
      });
    }
    else {
      this.servico.update(this.lojaId, novoFuncionario).subscribe(response => {
        this.toastr.success('Atualizado com sucesso', 'Feito', { progressBar: true });
        this.hideModalUpdate();
        this.read();
      }, err => {
        this.errorMessage(err);
      });
    }
  }

  public deleteOne(funcionario: Funcionario) {
    Swal.fire({
      title: 'Tem certeza que deseja remover?',
      text: 'Você não poderá desfazer essa operação',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.servico.delete(this.lojaId, funcionario).subscribe(r => {   
          this.toastr.success('Removido com sucesso!', 'Feito', { progressBar: true });
          this.read();
        }, e =>{
          this.errorMessage(e);
        });
      } 
    });
  }

  public deleteSelected() {
    Swal.fire({
      title: 'Tem certeza que deseja remover?',
      text: 'Você não poderá desfazer essa operação',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.funcionariosSelecionados.forEach( funcionario => {
          this.servico.delete(this.lojaId, funcionario).subscribe(r => {   
            this.toastr.success('Removido com sucesso!', 'Feito', { progressBar: true });
            this.read();
          }, e =>{
            this.errorMessage(e);
          });
        });
        this.funcionariosSelecionados = [];
      } 
    });
  }

  public hideModalCreate() {
    this.modalCreate.hide();
    this.form.reset();
    this.telefoneFormArray.controls = [];
  }

  public hideModalUpdate() {
    this.modalUpdate.hide();
    this.form.reset();
    this.telefoneFormArray.controls = [];
  }

  public showModalUpdate(funcionario: Funcionario) {
    console.log(funcionario);
    this.form.patchValue({
      id: funcionario.id,
      nome: funcionario.nome,
      cpf: funcionario.cpf,
      email: funcionario.email,
      status: funcionario.status
    });
    this.carregarContatos(funcionario.telefones)
    this.modalUpdate.show();
  }

  public carregarContatos(contatos: any[]) {
    contatos.forEach( contato => {
      this.telefoneFormArray.push(this._fb.group({
        id: [contato.id],
        operadora: [contato.operadora, Validators.required],
        numero: [contato.numero, Validators.required]
      }));
    });
    return this.telefoneFormArray;
  }

  public adicionarContato() {
    this.telefoneFormArray.push(this._fb.group({
      id: [null],
      operadora: ['', Validators.required],
      numero: ['', Validators.required]
    }));
  }

  public removerContato(index: number) {
    this.telefoneFormArray.controls.splice(index, 1);
  }

  public get telefoneFormArray(): FormArray {
    const formArray = this.form['controls']['telefones'] as FormArray;
    return formArray;
  }
  
  private errorMessage(err: any) {
    if(err.status == 0) {
      this.toastr.error('Servidor Inacessível', 'ERRO', { progressBar: true });
    }
    else {
      this.toastr.error(err.error.details, 'ERRO', { progressBar: true });
    }
  }

  ngOnInit(): void {
    this.lojaId = parseInt(this.router.url.split('/')[2]);
    this.read();

    this.form = this._fb.group({
      id: [null],
      nome: ['', [Validators.minLength(4), Validators.maxLength(60), Validators.required]],
      cpf: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.maxLength(60), Validators.required]],
      telefones: new FormArray([]),
      status: [true]
    })
  }
}