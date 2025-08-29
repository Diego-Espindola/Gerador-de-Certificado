import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalIrParaCertificado } from './modal-ir-para-certificado';

describe('ModalIrParaCertificado', () => {
  let component: ModalIrParaCertificado;
  let fixture: ComponentFixture<ModalIrParaCertificado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalIrParaCertificado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalIrParaCertificado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
