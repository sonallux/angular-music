import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistLinkComponent } from './artist-link.component';

describe('ArtistLinkComponent', () => {
  let component: ArtistLinkComponent;
  let fixture: ComponentFixture<ArtistLinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtistLinkComponent]
    });
    fixture = TestBed.createComponent(ArtistLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
