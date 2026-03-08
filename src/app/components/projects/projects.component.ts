import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  gradient: string;
}

@Component({
  selector: "app-projects",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./projects.component.html",
  styleUrl: "./projects.component.scss",
})
export class ProjectsComponent {
  filters = ["All", ".NET", "Angular", "DevOps", "OSS"];
  activeFilter = signal("All");

  allProjects: Project[] = [
    {
      id: 1,
      featured: true,
      title: "FinanceTracker",
      description:
        "Full-stack multi-tenant SaaS platform for expense management, invoicing, and budgeting. Built with ASP.NET Core 9 Clean Architecture backend and Angular 17 Signals frontend, featuring role-based access control, real-time notifications, automated audit logging across all entities, and Excel/CSV report exports.",
      tags: [
        ".NET 9",
        "Angular 17",
        "PostgreSQL",
        "EF Core",
        "MediatR",
        "Docker",
      ],
      githubUrl: "https://github.com/Badal-Prakash/FinanceTracker",
      liveUrl: "https://finance-tracker-opal-tau.vercel.app/",
      gradient: "linear-gradient(135deg, #0a2a4a, #001a2e)",
    },
    {
      id: 2,
      featured: true,
      title: "WorldWise",
      description:
        "Full-featured travel tracking SPA built with React.js and Vite. Integrates an interactive Leaflet map with click-to-add location markers, review and notes system per destination, date-stamped journey history, and JWT-based user authentication. CSS Modules for scoped styling with zero class collisions.",
      tags: [
        "React.js",
        "Vite",
        "Leaflet.js",
        "CSS Modules",
        "REST API",
        "Netlify",
      ],
      githubUrl: "https://github.com/Badal-Prakash/World-Wise",
      liveUrl: "https://world-wise-t.netlify.app/",
      gradient: "linear-gradient(135deg, #1a3a2a, #0d2b1a)",
    },
    {
      id: 3,
      featured: true,
      title: "The Wild Oasis",
      description:
        "Full-featured hotel management dashboard built with React, Vite, and Supabase. Features Supabase Auth for employee-only access, real-time cabin and booking CRUD, check-in/check-out workflows, interactive sales and occupancy charts via Recharts, React Hook Form for validated forms, React Query for server state, and Styled Components with dark/light mode toggle.",
      tags: [
        "React",
        "Supabase",
        "React Query",
        "Styled Components",
        "Recharts",
        "React Hook Form",
      ],
      githubUrl: "https://github.com/Badal-Prakash/the-wild-oasis",
      liveUrl: "https://the-wild-oasis-bpn.netlify.app/login",
      gradient: "linear-gradient(135deg, #1a2a1a, #0d1f0d)",
    },
    {
      id: 4,
      featured: false,
      title: "Natours",
      description:
        "Server-side rendered tour booking platform using Node.js, Express, MongoDB, and Pug templates. Implements JWT auth with cookie-based sessions, role-based route protection (user/guide/admin), Stripe Checkout with webhook payment confirmation, geospatial queries for nearby tours, Multer + Sharp for image resizing, rate limiting, XSS/NoSQL injection protection via Helmet and express-mongo-sanitize, and a factory handler pattern for DRY CRUD controllers.",
      tags: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "Pug",
        "Stripe",
        "JWT",
        "Mongoose",
      ],
      githubUrl: "https://github.com/Badal-Prakash/natours",
      liveUrl: "",
      gradient: "linear-gradient(135deg, #1a3320, #0d2214)",
    },
    // {
    //   id: 5,
    //   featured: false,
    //   title: "Open Source Component Library",
    //   description:
    //     "Themeable Angular component library with 30+ accessible components, full Storybook docs and 95% test coverage.",
    //   tags: ["Angular", "Storybook", "A11y", "OSS"],
    //   githubUrl: "https://github.com",
    //   liveUrl: "https://example.com",
    //   gradient: "linear-gradient(135deg, #0a1a2e, #001428)",
    // },
    // {
    //   id: 6,
    //   featured: true,
    //   title: "Event-Driven Microservices",
    //   description:
    //     "Production microservices architecture with event sourcing, CQRS, and saga orchestration using MassTransit + RabbitMQ.",
    //   tags: [".NET 9", "MassTransit", "RabbitMQ", "CQRS"],
    //   githubUrl: "https://github.com",
    //   liveUrl: "https://example.com",
    //   gradient: "linear-gradient(135deg, #001428, #0a0028)",
    // },
  ];

  tagFilterMap: Record<string, string[]> = {
    ".NET": [".NET 9", "gRPC", "JWT", "MassTransit"],
    Angular: ["Angular", "SignalR", "TypeScript"],
    DevOps: ["Docker", "GitHub Actions", "Nginx", "Prometheus"],
    OSS: ["OSS", "Storybook", "A11y"],
  };

  filteredProjects = signal<Project[]>(this.allProjects);

  setFilter(f: string) {
    this.activeFilter.set(f);
    if (f === "All") {
      this.filteredProjects.set(this.allProjects);
    } else {
      const allowed = this.tagFilterMap[f] ?? [];
      this.filteredProjects.set(
        this.allProjects.filter((p) => p.tags.some((t) => allowed.includes(t))),
      );
    }
  }
}
