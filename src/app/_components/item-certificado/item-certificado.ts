import { Component, input, OnInit } from '@angular/core';
import { SecondaryButton } from '../secondary-button/secondary-button';
import { Router } from '@angular/router';
import { Certificado as CertificadoService} from '../../_services/certificado';
import { Certificado } from '../../interfaces/certificado';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-certificado',
  imports: [ SecondaryButton, CommonModule],
  templateUrl: './item-certificado.html',
  styleUrl: './item-certificado.css'
})
export class ItemCertificado implements OnInit {

  constructor( private router: Router, private certificadoService: CertificadoService) {}

  certificadosList: Certificado[] = [];

  ngOnInit(): void {
    this.buscarCertificados();
  }

  navegarParaCertificado(id: string){
    this.router.navigate([`/certificados/${id}`]);
  }

  buscarCertificados(){
    this.certificadosList = this.certificadoService.certificados;
  }

}
