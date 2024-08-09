import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'Product', title: 'Products', href: paths.dashboard.product, icon: 'chart-pie' },
  { key: 'MainDescription', title: 'Skin Overview', href: paths.dashboard.MainDescription, icon: 'gear-six' },
  { key: 'SkinAnalysis', title: 'My Skin Analysis', href: paths.dashboard.Analysis, icon: 'user' },
] satisfies NavItemConfig[];
