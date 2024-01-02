import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SpotifyClientService } from './spotify-client/spotify-client.service';
import { MainLayoutModule } from './main-layout/main-layout.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [MainLayoutModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [AppComponent],
      providers: [{ provide: SpotifyClientService, useValue: { isAuthenticated: () => false } }],
    }),
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
