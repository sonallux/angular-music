import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumLinkComponent } from './album-link.component';

describe('AlbumLinkComponent', () => {
  let component: AlbumLinkComponent;
  let fixture: ComponentFixture<AlbumLinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlbumLinkComponent]
    });
    fixture = TestBed.createComponent(AlbumLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
