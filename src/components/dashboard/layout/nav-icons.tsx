import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { PlugsConnected as PlugsConnectedIcon } from '@phosphor-icons/react/dist/ssr/PlugsConnected';
import { XSquare } from '@phosphor-icons/react/dist/ssr/XSquare';
import { ShoppingCart,ChartLine,Pencil } from '@phosphor-icons/react';
export const navIcons = {
  'chart-pie': ShoppingCart,
  'gear-six': Pencil,
  'plugs-connected': PlugsConnectedIcon,
  'x-square': XSquare,
  user: ChartLine,
  users: ChartLine,
} as Record<string, Icon>;
