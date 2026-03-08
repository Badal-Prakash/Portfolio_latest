import { Component, HostListener, signal } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.scss",
})
export class NavbarComponent {
  scrolled = signal(false);

  navItems = [
    { num: "01.", label: "About", href: "#about" },
    { num: "02.", label: "Projects", href: "#projects" },
    { num: "03.", label: "Skills", href: "#skills" },
    { num: "04.", label: "Contact", href: "#contact" },
  ];

  @HostListener("window:scroll")
  onScroll() {
    this.scrolled.set(window.scrollY > 50);
  }

  smoothScroll(e: Event, href: string) {
    e.preventDefault();
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  }
}
