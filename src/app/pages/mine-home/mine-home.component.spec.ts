import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineHomeComponent } from './mine-home.component';

describe('MineHomeComponent', () => {
  let component: MineHomeComponent;
  let fixture: ComponentFixture<MineHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
