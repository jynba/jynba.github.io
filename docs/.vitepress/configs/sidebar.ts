import type { DefaultTheme } from 'vitepress'
import resources from '../../resources/sidebar'
import fe from '../../fe/sidebar'
import cs from '../../cs/sidebar'
import other from '../../other/sidebar'
import dm from '../../dm/sidebar'
import pr from '../../projects/sidebar'
import fs from 'fs-extra'
const sidebarDailyNotes: DefaultTheme.SidebarItem[] =
  fs.readJSONSync('./scripts/timeline.json', { throws: false }) || []

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/resources': resources,
  '/fe': fe,
  '/cs': cs,
  '/other': other,
  '/timeline': sidebarDailyNotes,
  '/dm': dm,
  '/pr': pr,
}
