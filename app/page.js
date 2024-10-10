import { Navbar } from "@/components/Navbar";
import { Token } from "@/components/Token";
import { Swap } from "@/components/Swap";

export default function Home() {
  return (
    <div className="h-screen">
      <Navbar/>
      <Swap/>
    </div>
  );
}