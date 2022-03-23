export const NotImplementedException = (): Error => {
  throw new Error('This functionality is currently not implemented.')
}

export const SvgUndefinedException = (): Error => {
  throw new Error('Critical error. SVG element is undefined.')
}

export const ScreenCTMUndefinedException = (): Error => {
  throw new Error('Critical error. Screen CTM is undefined.')
}

export const SvgPointUndefinedException = (): Error => {
  throw new Error('Critical error. SVG Point is undefined.')
}

export const ViewBoxUndefinedException = (): Error => {
  throw new Error('Critical error. SVG ViewBox is undefined.')
}

export const FailedToInitializeServiceContainer = (): Error => {
  throw new Error(
    'Critical error. Failed to instantiate the Service Container.'
  )
}

export const FailedToStoreServiceReference = (): Error => {
  throw new Error(
    'Critical error. Failed to store the Service reference in the Service Container.'
  )
}

export const FailedToRetrieveServiceReference = (): Error => {
  throw new Error(
    'Critical error. Failed to retrieve the Service reference from the Service Container.'
  )
}
