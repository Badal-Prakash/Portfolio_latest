const fs = require("fs");
const path = require("path");

const serviceId = process.env["EMAILJS_SERVICE_ID"] || "";
const templateId = process.env["EMAILJS_TEMPLATE_ID"] || "";
const publicKey = process.env["EMAILJS_PUBLIC_KEY"] || "";

const envContent = `export const environment = {
  emailJs: {
    serviceId:  '${serviceId}',
    templateId: '${templateId}',
    publicKey:  '${publicKey}',
  }
};
`;

const devEnvContent = `export const environment = {
  emailJs: {
    serviceId:  '${serviceId}',
    templateId: '${templateId}',
    publicKey:  '${publicKey}',
  }
};
`;

const envDir = path.join(__dirname, "src", "environments");
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

fs.writeFileSync(path.join(envDir, "environment.prod.ts"), envContent);
fs.writeFileSync(path.join(envDir, "environment.ts"), devEnvContent);

console.log("✅ Environment files generated successfully.");
