import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackPickComponent } from './back-pick.component';

describe('BackPickComponent', () => {
  let component: BackPickComponent;
  let fixture: ComponentFixture<BackPickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackPickComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackPickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
