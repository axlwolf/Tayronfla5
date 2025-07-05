import * as icon from '@mdi/js';
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: icon.mdiViewDashboardOutline,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ?? icon.mdiTable,
    permissions: 'READ_USERS'
  },
  {
    href: '/configuraciones/configuraciones-list',
    label: 'Configuraciones',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiCogOutline' in icon ? icon['mdiCogOutline' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_CONFIGURACIONES'
  },
  {
    href: '/modelos/modelos-list',
    label: 'Modelos',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiCubeOutline' in icon ? icon['mdiCubeOutline' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_MODELOS'
  },
  {
    href: '/registros/registros-list',
    label: 'Registros',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiClipboardListOutline' in icon ? icon['mdiClipboardListOutline' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_REGISTROS'
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: icon.mdiAccountCircle,
  },

 {
    href: '/api-docs',
    target: '_blank',
    label: 'Swagger API',
    icon: icon.mdiFileCode,
    permissions: 'READ_API_DOCS'
  },
]

export default menuAside
