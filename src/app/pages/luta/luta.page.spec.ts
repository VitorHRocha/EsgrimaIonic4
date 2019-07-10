import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LutaPage } from './luta.page';

describe('LutaPage', () => {
  let component: LutaPage;
  let fixture: ComponentFixture<LutaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LutaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LutaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
