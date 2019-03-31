import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAnalistaComponent } from './home-analista.component';

describe('HomeAnalistaComponent', () => {
  let component: HomeAnalistaComponent;
  let fixture: ComponentFixture<HomeAnalistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAnalistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAnalistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
