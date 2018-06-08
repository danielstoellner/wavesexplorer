import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupStatisticComponent } from './group-statistic.component';

describe('GroupStatisticComponent', () => {
  let component: GroupStatisticComponent;
  let fixture: ComponentFixture<GroupStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
