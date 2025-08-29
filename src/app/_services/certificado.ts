import { Injectable } from '@angular/core';
import { Certificado as CertificadoInterface } from '../interfaces/certificado';

@Injectable({
  providedIn: 'root'
})
export class Certificado {

  certificados: CertificadoInterface[] = [];

  constructor() { }

  addCertificado(certificado: CertificadoInterface) {
    this.certificados.push(certificado);
    localStorage.setItem('certificados', JSON.stringify(this.certificados));
  }
}
