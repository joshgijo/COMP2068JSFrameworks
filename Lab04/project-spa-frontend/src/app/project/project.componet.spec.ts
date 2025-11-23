import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectComponet } from './project.componet';

describe('Project', () => {
  let component: ProjectComponet;
  let fixture: ComponentFixture<ProjectComponet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectComponet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectComponet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
