import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistraLutadoresPage } from './registra-lutadores.page';

describe('RegistraLutadoresPage', () => {
  let component: RegistraLutadoresPage;
  let fixture: ComponentFixture<RegistraLutadoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistraLutadoresPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistraLutadoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
