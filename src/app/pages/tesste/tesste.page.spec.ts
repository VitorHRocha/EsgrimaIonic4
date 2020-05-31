import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesstePage } from './tesste.page';

describe('TesstePage', () => {
  let component: TesstePage;
  let fixture: ComponentFixture<TesstePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesstePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesstePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
