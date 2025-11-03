import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbitrosPages } from './arbitros-pages';

describe('ArbitrosPages', () => {
  let component: ArbitrosPages;
  let fixture: ComponentFixture<ArbitrosPages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArbitrosPages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArbitrosPages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
