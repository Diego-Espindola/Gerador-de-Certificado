import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimaryButton } from '../primary-button/primary-button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-ir-para-certificado',
  imports: [PrimaryButton, CommonModule, ],
  templateUrl: './modal-ir-para-certificado.html',
  styleUrl: './modal-ir-para-certificado.css',
})
export class ModalIrParaCertificado {

  @Input({ required: true }) idCertificado!: string;
  @Output() fecharModal = new EventEmitter<void>();

  private backdropClickCount = 0;

  constructor() {}

  goToCertificado(): void {
    const certificadoUrl = `${window.location.origin}/certificados/${this.idCertificado}`;
    window.location.href = certificadoUrl;
  }

  closeModal(): void {
    this.fecharModal.emit();
  }

  handleBackdropClick(): void {
    this.backdropClickCount++;
    if (this.backdropClickCount === 2) {
      this.closeModal();
      this.backdropClickCount = 0; // Resetar o contador
    }
  }
}
