import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SecondaryButton } from '../../_components/secondary-button/secondary-button';
import { Certificado as CertificadoService} from '../../_services/certificado';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Certificado as CertificadoInterface } from '../../interfaces/certificado';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-certificado',
  imports: [RouterLink, SecondaryButton, CommonModule],
  templateUrl: './certificado.html',
  styleUrl: './certificado.css'
})
export class Certificado implements OnInit, OnDestroy {

  constructor(private certificadoService: CertificadoService, private route: ActivatedRoute) { }

  private routeSub: Subscription = new Subscription();
  id : string | null = null;
  certificado: CertificadoInterface | undefined;
  @ViewChild('certificadoContainer') certificadoElement!: ElementRef;

  ngOnInit(): void {
      this.routeSub = this.route.paramMap.subscribe(params => {
          this.id = params.get('id');
          this.certificado = this.certificadoService.getCertificado(this.id);
      });
  }

  ngOnDestroy(): void {
      if (this.routeSub) {
          this.routeSub.unsubscribe();
      }
  }

  downloadCertificado(): void {

    if(!this.certificado){
      return;
    }

    html2canvas(this.certificadoElement.nativeElement, { scale: 2 }).then(
      canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'certificado_' + this.certificado?.nome.replaceAll(" ", "_") + '.png';
        link.click();
      }
    )
  }
}
