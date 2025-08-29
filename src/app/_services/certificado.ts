import { Injectable } from '@angular/core';
import { Certificado as CertificadoInterface } from '../interfaces/certificado';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Certificado {

  private certificadosSubject = new BehaviorSubject<CertificadoInterface[]>([]);
  certificados$ = this.certificadosSubject.asObservable(); // Assim força que só poderá escutar e nunca lançar um novo valor
  storageName = 'certificados';

  constructor() { this.loadFromLocalStorage(); }

  loadFromLocalStorage() {
    let certificados: CertificadoInterface[] = [];
    if(localStorage.getItem(this.storageName) && (JSON.parse(localStorage.getItem(this.storageName)!) as any[]).length > 0){
      console.log('Carregando certificados do localStorage');
      certificados = JSON.parse(localStorage.getItem(this.storageName)!) as CertificadoInterface[];
    }
    this.certificadosSubject.next(certificados);
    console.log(this.certificadosSubject.value);
  }

  addCertificado(certificado: CertificadoInterface) {
    const updatedCertificados: CertificadoInterface[] = [...this.certificadosSubject.value, certificado];
    this.certificadosSubject.next(updatedCertificados);
    localStorage.setItem(this.storageName, JSON.stringify(updatedCertificados));
  }

  getCertificado(id: string | null): CertificadoInterface | undefined {
    return this.certificadosSubject.value.find(certificado => certificado.id === id);
  }
}
