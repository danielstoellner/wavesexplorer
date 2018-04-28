import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserimportComponent } from './userimport.component';

describe('UserimportComponent', () => {
  let component: UserimportComponent;
  let fixture: ComponentFixture<UserimportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserimportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserimportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
