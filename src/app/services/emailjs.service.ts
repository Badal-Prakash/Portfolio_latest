import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SendResult {
  success: boolean;
  error?: string;
}

@Injectable({ providedIn: "root" })
export class EmailJsService {
  private emailJsInstance: any = null;

  async send(form: ContactForm): Promise<SendResult> {
    try {
      const emailjs = await this.loadSdk();

      const response = await emailjs.send(
        environment.emailJs.serviceId,
        environment.emailJs.templateId,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
          reply_to: form.email,
          to_name: "Badal",
        },
        environment.emailJs.publicKey,
      );

      return response.status === 200
        ? { success: true }
        : { success: false, error: `Unexpected status: ${response.status}` };
    } catch (err: any) {
      console.error("EmailJS error:", err);
      return {
        success: false,
        error: err?.text ?? "Failed to send. Please email me directly.",
      };
    }
  }

  private loadSdk(): Promise<any> {
    if (this.emailJsInstance) {
      return Promise.resolve(this.emailJsInstance);
    }

    return new Promise((resolve, reject) => {
      if ((window as any).emailjs) {
        this.emailJsInstance = (window as any).emailjs;
        return resolve(this.emailJsInstance);
      }

      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
      script.async = true;

      script.onload = () => {
        const ejs = (window as any).emailjs;
        if (!ejs) return reject(new Error("EmailJS SDK not found after load."));
        ejs.init({ publicKey: environment.emailJs.publicKey });
        this.emailJsInstance = ejs;
        resolve(this.emailJsInstance);
      };

      script.onerror = () =>
        reject(new Error("Failed to load EmailJS from CDN."));
      document.head.appendChild(script);
    });
  }
}
