import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistsTableComponent } from './artists-table.component';

describe('ArtistsTableComponent', () => {
  let component: ArtistsTableComponent;
  let fixture: ComponentFixture<ArtistsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
