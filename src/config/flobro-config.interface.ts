import { ISvgConfig } from '../domain/interfaces/svg-config.interface'
import { IDefaultConfig } from './default.config.interface'

export interface IFlobroConfig {
  svgConfig: ISvgConfig
  defaults: IDefaultConfig
}