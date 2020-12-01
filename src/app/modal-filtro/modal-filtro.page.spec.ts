import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFiltroPage } from './modal-filtro.page';

describe('ModalFiltroPage', () => {
  let component: ModalFiltroPage;
  let fixture: ComponentFixture<ModalFiltroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFiltroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFiltroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
