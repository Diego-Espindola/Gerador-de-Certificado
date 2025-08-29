import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './_components/navbar/navbar';
import { CommonModule } from '@angular/common';
import { PrimaryButton } from './_components/primary-button/primary-button';
import { SecondaryButton } from './_components/secondary-button/secondary-button';
import { ItemCertificado } from './_components/item-certificado/item-certificado';
import { BaseUi } from './_components/base-ui/base-ui';
import { Certificados } from './pages/certificados/certificados';
import { CertificadoForm } from './pages/certificado-form/certificado-form';
import { Certificado } from './interfaces/certificado';
import { Certificado as CertificadoService} from './_services/certificado';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    Navbar,
    BaseUi,
    ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('gerador-certificado');
  protected readonly showNavbar = true;

  constructor(private certificadoService: CertificadoService) { }

  ngOnInit(): void {
    let certificados: Certificado[] = [];
    if(localStorage.getItem('certificados') && (JSON.parse(localStorage.getItem('certificados')!) as any[]).length > 0){
      console.log('Carregando certificados do localStorage');
      certificados = JSON.parse(localStorage.getItem('certificados')!) as Certificado[];
    }
    this.certificadoService.certificados = certificados;
    console.log(this.certificadoService.certificados);
  }
}
