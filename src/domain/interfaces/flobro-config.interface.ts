import { ISvgSettings } from './svg-settings.interface'
import { IGridSettings } from './grid-settings.interface'
import { IBlockGlobalSettings } from './block-settings.interface'
import { ISocketGlobalSettings } from './socket-settings.interface'
import { ILinkGlobalSettings } from './link-settings.interface'

export interface IFlobroConfig {
  svgSettings: Partial<ISvgSettings>
  gridSettings: Partial<IGridSettings>
  blockGlobalSettings: Partial<IBlockGlobalSettings>
  socketGlobalSettings: Partial<ISocketGlobalSettings>
  linkGlobalSettings: Partial<ILinkGlobalSettings>
}
