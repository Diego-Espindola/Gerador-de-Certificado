import { Component, input, OnDestroy, OnInit } from '@angular/core';
import { SecondaryButton } from '../secondary-button/secondary-button';
import { Router } from '@angular/router';
import { Certificado as CertificadoService} from '../../_services/certificado';
import { Certificado } from '../../interfaces/certificado';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-certificado',
  imports: [ SecondaryButton, CommonModule],
  templateUrl: './item-certificado.html',
  styleUrl: './item-certificado.css'
})
export class ItemCertificado implements OnInit, OnDestroy{

  constructor( private router: Router, private certificadoService: CertificadoService) {}
  private subscription: Subscription = new Subscription();
  certificadosList: Certificado[] = [];

  ngOnInit(): void {
    this.subscription = this.certificadoService.certificados$.subscribe(certificados => {
      this.certificadosList = certificados;
    })
  }

  navegarParaCertificado(id: string){
    this.router.navigate([`/certificados/${id}`]);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
  }

}
