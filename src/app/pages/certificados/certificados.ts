import { Component, OnDestroy, OnInit } from '@angular/core';
import { SecondaryButton } from '../../_components/secondary-button/secondary-button';
import { ItemCertificado } from '../../_components/item-certificado/item-certificado';
import { RouterLink } from '@angular/router';
import { Certificado as CertificadoService } from '../../_services/certificado';
import { Certificado } from '../../interfaces/certificado';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certificados',
  imports: [RouterLink, SecondaryButton, ItemCertificado, CommonModule],
  templateUrl: './certificados.html',
  styleUrl: './certificados.css'
})
export class Certificados implements OnInit, OnDestroy{

  certificados: Certificado[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private certificadoService: CertificadoService){}

  ngOnInit(): void {
      this.subscription = this.certificadoService.certificados$.subscribe(certificados => {
          this.certificados = certificados;
      });
  }

  ngOnDestroy(): void {
      if (this.subscription) {
          this.subscription.unsubscribe();
      }
  }
}
