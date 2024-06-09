import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PassedPage } from './passed.page';

describe('PassedPage', () => {
  let component: PassedPage;
  let fixture: ComponentFixture<PassedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PassedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
