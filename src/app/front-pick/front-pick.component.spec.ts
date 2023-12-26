import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontPickComponent } from './front-pick.component';

describe('FrontPickComponent', () => {
  let component: FrontPickComponent;
  let fixture: ComponentFixture<FrontPickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontPickComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontPickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
