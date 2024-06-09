import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BahayPage } from './bahay.page';

describe('BahayPage', () => {
  let component: BahayPage;
  let fixture: ComponentFixture<BahayPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BahayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
