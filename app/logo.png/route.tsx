import { logoImage } from "@/lib/brand-image";

export const dynamic = "force-static";

export function GET() {
  return logoImage();
}
