import {
  BriefcaseBusiness, Building2, ClipboardCheck, ClipboardList, Code2, Factory, FileCheck2, FileText,
  GraduationCap, Handshake, HeartPulse, Landmark, LaptopMinimal, ListChecks, MessageCircle, Radio,
  Rocket, ScanLine, ScanSearch, Search, ShieldCheck, ShoppingBag, Target, Timer, TrendingUp, Truck,
  UserRoundCheck, UsersRound, Zap,
} from 'lucide-react';

const icons = {
  BriefcaseBusiness, Building2, ClipboardCheck, ClipboardList, Code2, Factory, FileCheck2, FileText,
  GraduationCap, Handshake, HeartPulse, Landmark, LaptopMinimal, ListChecks, MessageCircle, Radio,
  Rocket, ScanLine, ScanSearch, Search, ShieldCheck, ShoppingBag, Target, Timer, TrendingUp, Truck,
  UserRoundCheck, UsersRound, Zap,
};

export function Icon({ name, size = 22 }: { name: keyof typeof icons; size?: number }) {
  const Symbol = icons[name];
  return <Symbol size={size} strokeWidth={1.65} aria-hidden="true" />;
}
