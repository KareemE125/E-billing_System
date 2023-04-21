import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SPHomeComponent } from './sphome.component';

describe('SPHomeComponent', () => {
  let component: SPHomeComponent;
  let fixture: ComponentFixture<SPHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SPHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SPHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
