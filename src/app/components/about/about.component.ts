import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
@Component({
  selector: "app-about",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./about.component.html",
  styleUrl: "./about.component.scss",
})
export class AboutComponent {
  values = [
    { icon: "🧠", text: "Systems Thinker" },
    { icon: "⚡", text: "Performance First" },
    { icon: "🛡️", text: "Clean Architecture" },
    { icon: "🤝", text: "Team Player" },
    { icon: "📐", text: "Design Minded" },
    { icon: "🔄", text: "Continuous Learner" },
  ];
}
