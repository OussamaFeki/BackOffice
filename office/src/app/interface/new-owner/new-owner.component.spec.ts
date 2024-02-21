import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOwnerComponent } from './new-owner.component';

describe('NewOwnerComponent', () => {
  let component: NewOwnerComponent;
  let fixture: ComponentFixture<NewOwnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewOwnerComponent]
    });
    fixture = TestBed.createComponent(NewOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
