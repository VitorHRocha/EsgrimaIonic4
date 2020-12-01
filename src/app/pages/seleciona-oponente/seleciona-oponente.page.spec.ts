import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionaOponentePage } from './seleciona-oponente.page';

describe('SelecionaOponentePage', () => {
  let component: SelecionaOponentePage;
  let fixture: ComponentFixture<SelecionaOponentePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecionaOponentePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecionaOponentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
