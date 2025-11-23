import { Component, OnInit } from '@angular/core'; // <-- need OnInit
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.componet.html', // <-- correct file name
  styleUrls: ['./project.componet.css'],
  standalone: false // <-- note it's style**s**Urls, not styleUrl
})
export class ProjectComponet implements OnInit { // <-- class name should match file

  projects: any[] = []; // <-- variable to hold project data

  constructor(private projectService: ProjectService) {} // <-- inject service

  ngOnInit(): void {
    this.loadProjects(); // <-- fetch projects when component initializes
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
