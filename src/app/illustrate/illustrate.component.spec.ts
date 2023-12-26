import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllustrateComponent } from './illustrate.component';

describe('IllustrateComponent', () => {
  let component: IllustrateComponent;
  let fixture: ComponentFixture<IllustrateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IllustrateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IllustrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
