import { Component, signal, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { EmailJsService } from "../../services/emailjs.service";

@Component({
  selector: "app-contact",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./contact.component.html",
  styleUrl: "./contact.component.scss",
})
export class ContactComponent {
  year = new Date().getFullYear();
  sending = signal(false);
  error = signal("");
  success = signal(false);

  form = { name: "", email: "", subject: "", message: "" };

  contactInfo = [
    {
      icon: "📧",
      label: "Email",
      value: "lav14241@gmail.com",
      href: "mailto:lav14241@gmail.com",
    },
    { icon: "📍", label: "Location", value: "Bengaluru, India", href: "#" },
    { icon: "🕐", label: "Response Time", value: "Within 24 hours", href: "#" },
  ];

  socials = [
    {
      label: "GitHub",
      url: "https://github.com/Badal-Prakash",
      svg: `<svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.607.069-.607 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.362 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 36.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>`,
    },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/badal-prakash-narayan-a68b5a239/",
      svg: `<svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>`,
    },
  ];

  private sanitizer = inject(DomSanitizer);
  private emailJs = inject(EmailJsService);

  getSafeSvg(svg: string) {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  async sendMessage() {
    if (this.sending()) return;
    this.sending.set(true);
    this.error.set("");
    this.success.set(false);

    const result = await this.emailJs.send(this.form);

    if (result.success) {
      this.success.set(true);
      this.form = { name: "", email: "", subject: "", message: "" };
    } else {
      this.error.set(
        result.error ?? "Failed to send. Please email me directly.",
      );
    }

    this.sending.set(false);
  }
}
