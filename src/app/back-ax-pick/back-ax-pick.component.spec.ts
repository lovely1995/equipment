import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackAxPickComponent } from './back-ax-pick.component';

describe('BackAxPickComponent', () => {
  let component: BackAxPickComponent;
  let fixture: ComponentFixture<BackAxPickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackAxPickComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackAxPickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
