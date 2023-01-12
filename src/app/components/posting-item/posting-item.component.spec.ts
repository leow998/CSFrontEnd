import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostingItemComponent } from './posting-item.component';

describe('PostingItemComponent', () => {
  let component: PostingItemComponent;
  let fixture: ComponentFixture<PostingItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostingItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
