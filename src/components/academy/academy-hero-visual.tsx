import Image from "next/image";
import { GraduationCap, PlayCircle, Users } from "lucide-react";
import robotOffice from "@/assets/images/robot-office.webp";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/** Hero visual: the ARA robot at work, with a floating "training in progress" card. */
export function AcademyHeroVisual({ locale }: { locale: Locale }) {
  const a = getDictionary(locale).academy;
  return (
    <div className="relative mx-auto w-full max-w-lg pb-10 sm:pb-6">
      <div aria-hidden="true" className="absolute -inset-6 -z-10 rounded-full bg-electric/25 blur-3xl" />
      <Image
        src={robotOffice}
        alt={a.heroImageAlt}
        priority
        placeholder="blur"
        sizes="(min-width: 1024px) 40vw, (min-width: 640px) 32rem, 100vw"
        className="h-auto w-full rounded-[1.75rem] shadow-2xl ring-1 ring-white/15"
      />
      <div
        aria-hidden="true"
        className="absolute right-3 -bottom-2 left-3 rounded-2xl bg-midnight/90 p-4 shadow-xl ring-1 ring-cyan/30 backdrop-blur motion-safe:animate-fade-up sm:right-auto sm:-bottom-4 sm:-left-6 sm:w-80"
      >
        <p className="flex items-center gap-2 text-sm font-bold text-white">
          <GraduationCap className="size-4 text-macaw" />
          {a.heroCardTitle}
        </p>
        <p className="mt-1 flex items-center gap-2 text-xs text-white/75">
          <PlayCircle className="size-3.5 text-cyan" />
          {a.heroCardProgress}
        </p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-cyan to-electric" />
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-white/60">
          <Users className="size-3.5" />
          {a.formatShort.classroom} · {a.formatShort.online}
        </p>
      </div>
    </div>
  );
}
