import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondicaoPosLutaPage } from './condicao-pos-luta.page';

describe('CondicaoPosLutaPage', () => {
  let component: CondicaoPosLutaPage;
  let fixture: ComponentFixture<CondicaoPosLutaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondicaoPosLutaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondicaoPosLutaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
