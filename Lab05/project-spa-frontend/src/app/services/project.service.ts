// src/app/services/project.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

export interface Project {
  _id?: string;
  name: string;
  dueDate: string; // or Date if you prefer
  course: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = environment.ServerAPI + 'api/projects/';

  constructor(private http: HttpClient) {}

  // Get list of projects
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  // Add new project
  addProject(newProject: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, newProject);
  }

  // Delete project by id
  deleteProject(id: string): Observable<any> {
    return this.http.delete(this.apiUrl + id);
  }

  // Update project (expects project object with _id)
  updateProject(project: Project): Observable<any> {
    return this.http.put(this.apiUrl, project);
  }
}
