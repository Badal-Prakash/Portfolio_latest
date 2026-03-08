import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  gradient: string;
}

export interface Skill {
  name: string;
  level: number;
  color: string;
}

export interface SkillGroup {
  category: string;
  icon: string;
  skills: Skill[];
}

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  private projects$ = this.http.get<Project[]>(`${this.base}/api/projects`).pipe(shareReplay(1));
  private skills$ = this.http.get<SkillGroup[]>(`${this.base}/api/skills`).pipe(shareReplay(1));

  getProjects(): Observable<Project[]> {
    return this.projects$;
  }

  getSkills(): Observable<SkillGroup[]> {
    return this.skills$;
  }

  getFeaturedProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.base}/api/projects/featured`);
  }
}
