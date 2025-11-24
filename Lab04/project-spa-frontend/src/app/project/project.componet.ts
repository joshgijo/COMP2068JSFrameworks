import { Component, OnInit } from '@angular/core'; 
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.componet.html', 
  styleUrls: ['./project.componet.css'],
  standalone: false 
})
export class ProjectComponet implements OnInit { 

  projects: any[] = []; 

  constructor(private projectService: ProjectService) {} 

  ngOnInit(): void {
    this.loadProjects(); 
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe(
      (data) => {
        this.projects = data;
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

}
