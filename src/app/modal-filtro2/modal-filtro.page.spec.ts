import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFiltro2Page } from './modal-filtro.page';

describe('ModalFiltroPage', () => {
  let component: ModalFiltro2Page;
  let fixture: ComponentFixture<ModalFiltro2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFiltro2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFiltro2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
