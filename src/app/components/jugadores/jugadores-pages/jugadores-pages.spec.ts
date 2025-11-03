import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadoresPages } from './jugadores-pages';

describe('JugadoresPages', () => {
  let component: JugadoresPages;
  let fixture: ComponentFixture<JugadoresPages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JugadoresPages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JugadoresPages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
