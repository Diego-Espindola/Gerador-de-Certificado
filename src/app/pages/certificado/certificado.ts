import { Component, OnInit } from '@angular/core';
import { SecondaryButton } from '../../_components/secondary-button/secondary-button';
import { Certificado as CertificadoService} from '../../_services/certificado';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Certificado as CertificadoInterface } from '../../interfaces/certificado';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certificado',
  imports: [RouterLink, SecondaryButton, CommonModule],
  templateUrl: './certificado.html',
  styleUrl: './certificado.css'
})
export class Certificado implements OnInit {
  constructor(private certificadoService: CertificadoService, private route: ActivatedRoute) { }

  id : string | null = null;
  certificado: CertificadoInterface | undefined;
  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
          this.id = params.get('id');
          this.certificado = this.certificadoService.certificados?.find(item => item.id == this.id) || undefined;
      });
  }
}
