import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { debounceTime } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { LojaService } from 'src/app/shared/services/loja.service';
import { Funcionario } from 'src/app/shared/models/funcionario.entity';
import { Paginacao } from 'src/app/shared/models/paginacao.entity';
import { CpfValidator } from 'src/app/shared/validators/cpf.validator';

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
  public search: FormControl = new FormControl();
  public lojaId: number = 0;
  public paginacao = new Paginacao();

  @ViewChild('modalCreate', { static: false }) modalCreate: any;
  @ViewChild('modalUpdate', { static: false }) modalUpdate: any;

  public operadoras = ['OI', 'TIM', 'CLARO', 'VIVO'];

  public constructor( 
                      private router: Router,
                      private _fb: FormBuilder,
                      private toastr: ToastrService, 
                      private servico: LojaService
                    ) { }

  public read() {
    this.loading = true;
    this.servico.buscarFuncionarios(this.lojaId, this.paginacao).subscribe( response => {
      this.funcionarios  = response.body.content;
      this.paginacao.totalElementos = response.body.totalElements;
      console.log(response.body);
      this.loading = false;
    }, responseError => {
      this.errorMessage(responseError.error);
    });
  } 
  
  public whenSelecting(funcionarios: any) {
    this.funcionariosSelecionados = funcionarios.selected;
  }

  public setPage(event: any) {
    this.paginacao.pagina = event.offset;
    this.read();
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
      this.servico.adicionarFuncionario(this.lojaId, novoFuncionario).subscribe(response => {
        this.toastr.success('Criado com sucesso', 'Feito', { progressBar: true, positionClass: 'toast-bottom-center' });  
        this.hideModalCreate(); 
        this.paginacao = new Paginacao(); 
        this.read();   
      }, err => {
        this.errorMessage(err);
      });
    }
    else {
      this.servico.editarFuncionario(this.lojaId, novoFuncionario).subscribe(response => {
        this.toastr.success('Atualizado com sucesso', 'Feito', { progressBar: true, positionClass: 'toast-bottom-center' });
        this.hideModalUpdate();
        this.paginacao = new Paginacao(); 
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
        this.servico.excluirFuncionario(this.lojaId, funcionario).subscribe(r => {   
          this.toastr.success('Removido com sucesso!', 'Feito', { progressBar: true, positionClass: 'toast-bottom-center' });
          this.paginacao = new Paginacao(); 
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
          this.servico.excluirFuncionario(this.lojaId, funcionario).subscribe(r => {   
            this.toastr.success('Removido com sucesso!', 'Feito', { progressBar: true, positionClass: 'toast-bottom-center' });
            this.paginacao = new Paginacao(); 
            this.read();
          }, e =>{
            this.errorMessage(e);
          });
        });
        this.funcionariosSelecionados = [];
      } 
    });
  }

  public alterarStatus(funcionario: Funcionario) {
    funcionario.status = !funcionario.status;
    this.servico.editarFuncionario(this.lojaId, funcionario).subscribe(response => {
      this.toastr.success('Status atualizado', 'Sucesso', { progressBar: true, positionClass: 'toast-bottom-center' });
      this.hideModalUpdate();
      this.paginacao = new Paginacao(); 
      this.read();
    }, err => {
      this.errorMessage(err);
    });
  }

  public hideModalCreate() {
    this.modalCreate.hide();
    this.createForm();
  }

  public hideModalUpdate() {
    this.modalUpdate.hide();
    this.createForm();
  }

  public showModalUpdate(funcionario: Funcionario) {
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
      this.toastr.error('Servidor Inacessível', 'ERRO', { progressBar: true, positionClass: 'toast-bottom-center' });
    }
    else {
      this.toastr.error(err.detalhes, 'ERRO', { progressBar: true, positionClass: 'toast-bottom-center' });
      this.router.navigateByUrl('/loja');
    }
  }

  private createForm() {
    this.form = this._fb.group({
      id: [null],
      nome: ['', [Validators.minLength(4), Validators.maxLength(60), Validators.required]],
      cpf: ['', [Validators.required, new CpfValidator()]],
      email: ['', [Validators.email, Validators.maxLength(60), Validators.required]],
      telefones: new FormArray([]),
      status: [true]
    });
  }

  ngOnInit(): void {
    this.lojaId = parseInt(this.router.url.split('/')[2]);
    this.read();
    this.search.valueChanges.pipe(debounceTime(700)).subscribe(value => {
      this.paginacao = new Paginacao({
        filtro: value,
        pagina: 0,
        tamanho: 5
      });
      this.read();
    });
    this.createForm();    
  }
}