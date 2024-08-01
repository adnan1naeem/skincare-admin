import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'Product', title: 'Product', href: paths.dashboard.product, icon: 'chart-pie' },
  { key: 'MainDescription', title: 'Main Description', href: paths.dashboard.MainDescription, icon: 'gear-six' },
  { key: 'SkinAnalysis', title: 'SkinAnalysis', href: paths.dashboard.Analysis, icon: 'user' },
] satisfies NavItemConfig[];
