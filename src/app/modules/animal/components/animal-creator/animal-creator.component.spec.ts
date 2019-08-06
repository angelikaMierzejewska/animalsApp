import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalCreatorComponent } from './animal-creator.component';

describe('AnimalCreatorComponent', () => {
  let component: AnimalCreatorComponent;
  let fixture: ComponentFixture<AnimalCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnimalCreatorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
