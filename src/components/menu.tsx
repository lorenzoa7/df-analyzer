'use client'

import { menuConfig } from '@/config/menu'
import { SiteRoutes } from '@/config/routes'
import { isActiveRoute } from '@/functions/is-active-route'
import { usePathname } from 'next/navigation'
import MenuItem from './menu-item'

export default function Menu() {
  const currentRoute = usePathname() as SiteRoutes
  return (
    <div className="flex items-center gap-5">
      {menuConfig.map((item, index) => (
        <MenuItem
          key={item.title}
          hasArrow={index !== 0}
          isActive={isActiveRoute(currentRoute, item.route)}
        >
          {item.title}
        </MenuItem>
      ))}
    </div>
  )
}
