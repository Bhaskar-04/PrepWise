import Vapi from "@vapi-ai/web";

if (!process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN) {
  console.error("❌ Missing Vapi key. Set NEXT_PUBLIC_VAPI_WEB_TOKEN in .env.local");
}

export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!);