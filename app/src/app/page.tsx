import Image from "next/image";
import { Button } from "@/components/ui/button"
import { NavbarDemo } from "@/components/Nav"
import { GoogleGeminiEffectDemo } from "@/components/Hero"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <GoogleGeminiEffectDemo />
    </main>
  );
}
