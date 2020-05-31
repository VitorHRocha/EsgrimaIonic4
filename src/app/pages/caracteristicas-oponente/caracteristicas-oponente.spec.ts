import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroOpPage } from './caracteristicas-oponente.page';

describe('RegistroOpPage', () => {
  let component: RegistroOpPage;
  let fixture: ComponentFixture<RegistroOpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroOpPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroOpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
