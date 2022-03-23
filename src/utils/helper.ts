import { UUID } from '../domain/interfaces/custom-types'

export class Helper {
  public static GenerateUUID(): UUID {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c: number) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    )
  }

  public static noop = (): null => null

  public static ToNearestHundredth(value: number): number {
    return Math.round(value * 0.01) * 100
  }
}
