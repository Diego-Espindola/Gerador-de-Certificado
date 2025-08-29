import { Component, OnInit, ViewChild } from '@angular/core';
import { SecondaryButton } from '../../_components/secondary-button/secondary-button';
import { PrimaryButton } from '../../_components/primary-button/primary-button';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { Certificado } from '../../interfaces/certificado';
import { Certificado as CertificadoService } from '../../_services/certificado';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-certificado-form',
  imports: [PrimaryButton, SecondaryButton, FormsModule, CommonModule],
  templateUrl: './certificado-form.html',
  styleUrl: './certificado-form.css'
})
export class CertificadoForm {
  @ViewChild('form') form!: NgForm;
  adicionarAtividadeError: boolean = false;
  atividade: string = '';
  certificado: Certificado = this.estadoInicial();

  constructor(private certificadoService: CertificadoService) {}

  validarFormulario(control: NgModel) {
    return control.invalid && control.touched;
  }

  limparFormulario() {
    this.certificado = this.estadoInicial();
    this.form.resetForm({
      nome: '',
      atividade: ''
    });
  }

  formValido(){
      return this.certificado.nome.length > 0 && this.certificado.atividades.length > 0;
  }

  adicionarAtividade(){
    const jaPossuiAtividade: boolean = !!this.certificado.atividades.find((element) => element == this.atividade)
    if(this.atividade.length > 0 && !jaPossuiAtividade){
      this.certificado.atividades.push(this.atividade);
      this.atividade = ''
      this.adicionarAtividadeError = false;
    }else{
      this.adicionarAtividadeError = true;
    }
  }

  removerAtividade(indexAtividade: number) {
    this.certificado.atividades.splice(indexAtividade, 1)
  }

  submit(){
    if(this.formValido()){
      this.certificado.dataEmissao = formatDate(new Date(), 'yyyy-MM-dd', 'pt-BR');
      this.certificado.id = uuidv4();
      this.certificadoService.addCertificado(this.certificado);
      this.limparFormulario();
    }
  }

  estadoInicial(): Certificado {
    return {
      id: '',
      nome: '',
      atividades: [],
    }
  }
}


