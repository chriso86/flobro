import { Sealed } from '../decorators/sealed'
import {
  FailedToInitializeServiceContainer,
  FailedToRetrieveServiceReference,
  FailedToStoreServiceReference,
} from '../../utils/error-constants'
import { EventService } from './event.service'
import { StateService } from './state.service'
import { Class } from '../interfaces/custom-types'

@Sealed
export class ServiceContainer {
  private static _instance: ServiceContainer
  private _services: { [key: string]: unknown } = {}

  protected constructor() {
    // Don't allow construction of this class - it's a Singleton
    // Register services here
    this.StoreService(EventService)
    this.StoreService(StateService)
  }

  public static getInstance(): ServiceContainer {
    try {
      if (this._instance) {
        return this._instance
      } else {
        this._instance = new ServiceContainer()

        return this._instance
      }
    } catch (e: unknown) {
      throw FailedToInitializeServiceContainer()
    }
  }

  public GetService<T>(Service: Class<T>): T {
    try {
      const service = new Service() as {
        constructor: { name: string }
      }
      const key = service.constructor.name
      const result = this._services[key]

      if (!result) {
        throw new Error()
      }

      return result as T
    } catch (e: unknown) {
      throw FailedToRetrieveServiceReference()
    }
  }

  private StoreService<T>(Service: Class<T>, args?: unknown) {
    try {
      const service = new Service(args) as {
        constructor: { name: string }
      }
      const key = service.constructor.name

      this._services[key] = service

      return this._services[key]
    } catch (e: unknown) {
      throw FailedToStoreServiceReference()
    }
  }
}
