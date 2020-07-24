import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatisticaPage } from './estatistica.page';

describe('EstatisticaPage', () => {
  let component: EstatisticaPage;
  let fixture: ComponentFixture<EstatisticaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstatisticaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstatisticaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
