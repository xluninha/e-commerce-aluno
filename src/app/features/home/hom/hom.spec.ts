import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hom } from './hom';

describe('Hom', () => {
  let component: Hom;
  let fixture: ComponentFixture<Hom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hom],
    }).compileComponents();

    fixture = TestBed.createComponent(Hom);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
