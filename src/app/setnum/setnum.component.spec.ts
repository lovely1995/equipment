import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetnumComponent } from './setnum.component';

describe('SetnumComponent', () => {
  let component: SetnumComponent;
  let fixture: ComponentFixture<SetnumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetnumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetnumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
