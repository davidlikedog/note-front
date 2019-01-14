import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicrureRotateComponent } from './picture-rotate.component';

describe('PicrureRotateComponent', () => {
  let component: PicrureRotateComponent;
  let fixture: ComponentFixture<PicrureRotateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicrureRotateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicrureRotateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
