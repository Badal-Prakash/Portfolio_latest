import {
  Component,
  AfterViewInit,
  ElementRef,
  QueryList,
  ViewChildren,
} from "@angular/core";
import { CommonModule } from "@angular/common";

interface Skill {
  name: string;
  level: number;
  color: string;
}
interface SkillGroup {
  category: string;
  icon: string;
  skills: Skill[];
}

@Component({
  selector: "app-skills",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./skills.component.html",
  styleUrl: "./skills.component.scss",
})
export class SkillsComponent implements AfterViewInit {
  @ViewChildren("skillCard") skillCards!: QueryList<ElementRef>;

  skillGroups: SkillGroup[] = [
    {
      category: "Backend",
      icon: "⚙️",
      skills: [
        { name: "C# / .NET 9", level: 92, color: "var(--neon-cyan)" },
        {
          name: "ASP.NET Core / Web API",
          level: 90,
          color: "var(--neon-cyan)",
        },
        { name: "Entity Framework Core", level: 85, color: "#00d4a8" },
        { name: "SignalR / gRPC", level: 78, color: "#00b890" },
      ],
    },
    {
      category: "Frontend",
      icon: "🖥️",
      skills: [
        { name: "Angular 17+", level: 88, color: "var(--neon-blue)" },
        { name: "TypeScript", level: 90, color: "var(--neon-blue)" },
        { name: "RxJS / NgRx", level: 82, color: "#0070e0" },
        { name: "CSS / Animations", level: 85, color: "#0060c0" },
      ],
    },
    {
      category: "Database & Cloud",
      icon: "🗄️",
      skills: [
        {
          name: "SQL Server / PostgreSQL",
          level: 85,
          color: "var(--neon-purple)",
        },
        { name: "Redis / Caching", level: 78, color: "#6b1fe0" },
        { name: "Azure / AWS", level: 75, color: "#5a10d0" },
        { name: "Docker / Kubernetes", level: 80, color: "#4900c0" },
      ],
    },
    {
      category: "Architecture",
      icon: "🏗️",
      skills: [
        { name: "Microservices / CQRS", level: 83, color: "#ff6b9d" },
        { name: "Clean Architecture", level: 88, color: "#f05080" },
        { name: "Event-Driven Design", level: 80, color: "#e03060" },
        { name: "REST / OpenAPI", level: 90, color: "#c02040" },
      ],
    },
  ];

  tools = [
    "Git",
    "Rider / VS Code",
    "Postman",
    "GitHub Actions",
    "Grafana",
    "RabbitMQ",
    "MassTransit",
    "Seq",
    "xUnit",
  ];

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bars =
              entry.target.querySelectorAll<HTMLElement>(".skill-bar-fill");
            bars.forEach((bar) => {
              const w = bar.style.width;
              bar.style.width = "0";
              setTimeout(() => {
                bar.style.width = w;
              }, 100);
            });
          }
        });
      },
      { threshold: 0.3 },
    );

    this.skillCards.forEach((card) => observer.observe(card.nativeElement));
  }
}
