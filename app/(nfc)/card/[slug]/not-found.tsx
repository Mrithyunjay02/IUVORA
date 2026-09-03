import Link from "next/link";
import { IuvoraLogo } from "@/components/icons/IuvoraLogo";

export default function CardNotFound() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center p-6 bg-[#070709] text-[#FBF7EE]">
      <div className="w-full max-w-sm rounded-3xl bg-zinc-950/80 border border-white/[0.08] p-8 text-center space-y-6 shadow-2xl backdrop-blur-2xl">
        <div className="flex justify-center">
          <IuvoraLogo width={90} />
        </div>

        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#DFC15D]">
            404 • Card Not Found
          </p>
          <h1 className="text-xl font-bold font-display text-white">
            Profile Unavailable
          </h1>
          <p className="text-xs text-zinc-400 leading-relaxed">
            The digital visiting card you are trying to view does not exist or has been relocated.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="https://www.iuvora.com"
            className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-xs font-semibold text-white tracking-wide transition-colors"
          >
            Visit Iuvora.com →
          </Link>
        </div>
      </div>
    </main>
  );
}
