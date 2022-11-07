import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfinitescrollComponent } from './infinitescroll.component';

describe('InfinitescrollComponent', () => {
  let component: InfinitescrollComponent;
  let fixture: ComponentFixture<InfinitescrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfinitescrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfinitescrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
