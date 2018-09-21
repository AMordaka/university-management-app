import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPickerComponent } from './modal-picker.component';

describe('ModalPickerComponent', () => {
  let component: ModalPickerComponent;
  let fixture: ComponentFixture<ModalPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
