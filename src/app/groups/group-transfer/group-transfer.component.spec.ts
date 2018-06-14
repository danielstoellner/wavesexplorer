import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTransferComponent } from './group-transfer.component';

describe('GroupTransferComponent', () => {
  let component: GroupTransferComponent;
  let fixture: ComponentFixture<GroupTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
