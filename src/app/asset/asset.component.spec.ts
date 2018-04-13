import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetDetailComponent } from './asset-detail.component';

describe('AssetComponent', () => {
  let component: AssetComponent;
  let fixture: ComponentFixture<AssetDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
