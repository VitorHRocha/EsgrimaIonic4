import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileeditPage } from './profileedit.page';

describe('ProfileeditPage', () => {
  let component: ProfileeditPage;
  let fixture: ComponentFixture<ProfileeditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileeditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileeditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
