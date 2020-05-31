import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComportamentoOponentePage } from './comportamento-oponente.page';

describe('ComportamentoOponentePage', () => {
  let component: ComportamentoOponentePage;
  let fixture: ComponentFixture<ComportamentoOponentePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComportamentoOponentePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComportamentoOponentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
