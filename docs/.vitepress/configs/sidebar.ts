import type { DefaultTheme } from 'vitepress'
import resources from '../../resources/sidebar'
import timeline from '../../timeline/sidebar'
import fe from '../../fe/sidebar'
import cs from '../../cs/sidebar'
import other from '../../other/sidebar'
import dm from '../../dm/sidebar'
import pr from '../../projects/sidebar'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/resources': resources,
  '/fe': fe,
  '/cs': cs,
  '/other': other,
  '/timeline': timeline,
  '/dm': dm,
  '/pr': pr,
}
