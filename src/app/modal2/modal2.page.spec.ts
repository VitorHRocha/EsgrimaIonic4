import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Modal2Page } from './modal2.page';

describe('Modal2Page', () => {
  let component: Modal2Page;
  let fixture: ComponentFixture<Modal2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Modal2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Modal2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
