import {
  AppWindow,
  Bot,
  Brain,
  CalendarDays,
  ChartColumn,
  CodeXml,
  FileText,
  Globe,
  Network,
  Newspaper,
  Plug,
  Receipt,
  Rocket,
  ShieldCheck,
  Sparkles,
  SquareKanban,
  Workflow,
  Wrench,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";
import type { IconName } from "@/content/types";

const icons: Record<IconName, LucideIcon> = {
  brain: Brain,
  bot: Bot,
  workflow: Workflow,
  plug: Plug,
  code: CodeXml,
  app: AppWindow,
  globe: Globe,
  transform: Rocket,
  network: Network,
  wrench: Wrench,
  file: FileText,
  chart: ChartColumn,
  calendar: CalendarDays,
  receipt: Receipt,
  kanban: SquareKanban,
  sparkles: Sparkles,
  newspaper: Newspaper,
  shield: ShieldCheck,
};

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Component = icons[name] ?? Sparkles;
  return <Component aria-hidden="true" {...props} />;
}
