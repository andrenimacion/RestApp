import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaMesasComponent } from './asigna-mesas.component';

describe('AsignaMesasComponent', () => {
  let component: AsignaMesasComponent;
  let fixture: ComponentFixture<AsignaMesasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignaMesasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignaMesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
