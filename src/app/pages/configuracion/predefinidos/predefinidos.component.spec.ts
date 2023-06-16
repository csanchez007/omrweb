import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredefinidosComponent } from './predefinidos.component';

describe('PredefinidosComponent', () => {
  let component: PredefinidosComponent;
  let fixture: ComponentFixture<PredefinidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredefinidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredefinidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
