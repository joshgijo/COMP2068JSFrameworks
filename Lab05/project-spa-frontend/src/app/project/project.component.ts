import { Component, OnInit } from '@angular/core';
import { ProjectService, Project } from '../services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];

  // form-bound properties
  _id: string = '';
  name: string = '';
  dueDate: string = '';
  course: string = '';

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => this.projects = data,
      error: (err) => console.error(err)
    });
  }

  addProject(): void {
    const newProject: Project = {
      name: this.name,
      dueDate: this.dueDate,
      course: this.course
    };

    this.projectService.addProject(newProject).subscribe({
      next: () => {
        this.clearForm();
        this.loadProjects();
      },
      error: (err) => {
        console.error('Error adding project', err);
      }
    });
  }

  clearForm(): void {
    this._id = '';
    this.name = '';
    this.dueDate = '';
    this.course = '';
  }

  deleteProject(id?: string): void {
    if (!id) { return; }
    if (!confirm('Are you sure you want to delete this project?')) { return; }

    this.projectService.deleteProject(id).subscribe({
      next: () => {
        // successful delete; 204 no content expected
        this.loadProjects();
      },
      error: (err) => {
        console.error('Error deleting project', err);
      }
    });
  }

  selectProject(project: Project): void {
    this._id = project._id || '';
    this.name = project.name;
    this.dueDate = project.dueDate ? project.dueDate.slice(0,10) : '';
    this.course = project.course;
  }

  updateProject(): void {
    const updated: Project = {
      _id: this._id,
      name: this.name,
      dueDate: this.dueDate,
      course: this.course
    };

    this.projectService.updateProject(updated).subscribe({
      next: () => {
        this.clearForm();
        this.loadProjects();
      },
      error: (err) => {
        console.error('Error updating project', err);
      }
    });
  }
}
