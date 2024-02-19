import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcustomsComponent } from './newcustoms.component';

describe('NewcustomsComponent', () => {
  let component: NewcustomsComponent;
  let fixture: ComponentFixture<NewcustomsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewcustomsComponent]
    });
    fixture = TestBed.createComponent(NewcustomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
