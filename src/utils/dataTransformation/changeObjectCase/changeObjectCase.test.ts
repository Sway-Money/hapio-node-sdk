import { camelKeys, snakeKeys } from './changeObjectCase'

describe('changeObjectCase', () => {
  describe('camelKeys', () => {
    it('should transform keys to camelCase', () => {
      const result = camelKeys({ bar_baz: 2, foo_bar: 1 })
      expect(result).toEqual({ barBaz: 2, fooBar: 1 })
    })

    it('should transform keys to camelCase, if input is array', () => {
      const result = camelKeys([{ bar_baz: 2, foo_bar: 1 }])
      expect(result).toEqual([{ barBaz: 2, fooBar: 1 }])
    })

    it('should return input again, if input is falsy', () => {
      const undefinedResult = camelKeys(undefined as any)
      expect(undefinedResult).toBeUndefined()

      const falseResult = camelKeys(false as any)
      expect(falseResult).toBe(false)
    })

    it('should work with nested objects', () => {
      expect(
        camelKeys({
          bar_baz: 1,
          foo_bar: {
            bar_baz: 2,
          },
        }),
      ).toEqual({
        barBaz: 1,
        fooBar: {
          barBaz: 2,
        },
      })
    })

    it('does not transform dates', () => {
      const date = new Date()

      expect(
        camelKeys({
          bar_baz: 1,
          foo_bar: {
            bar_baz: date,
          },
        }),
      ).toEqual({
        barBaz: 1,
        fooBar: {
          barBaz: date,
        },
      })
    })

    it('should work with deeply nested objects', () => {
      expect(
        camelKeys({
          bar_baz: 1,
          foo_bar: {
            bar_baz: [{
              a_b: [
                [{ b_c: 1 }, 8],
                { c_d: { d_e: 2 } },
              ],
              c_d: null,
            }],
          },
        }),
      ).toEqual({
        barBaz: 1,
        fooBar: {
          barBaz: [{
            aB: [
              [{ bC: 1 }, 8],
              { cD: { dE: 2 } },
            ],
            cD: null,
          }],
        },
      })
    })
  })

  describe('snakeKeys', () => {
    it('should transform keys to snake_case', () => {
      expect(
        snakeKeys({ barBaz: 2, fooBar: 1 }),
      ).toEqual({ bar_baz: 2, foo_bar: 1 })
    })

    it('should return input again, if input is falsy', () => {
      expect(snakeKeys(undefined as any)).toBeUndefined()
      expect(snakeKeys(false as any)).toBe(false)
    })

    it('should work with nested objects', () => {
      expect(
        snakeKeys({
          barBaz: 1,
          fooBar: {
            barBaz: 2,
          },
        }),
      ).toEqual({
        bar_baz: 1,
        foo_bar: {
          bar_baz: 2,
        },
      })
    })

    it('does not transform dates', () => {
      const date = new Date()

      expect(
        snakeKeys({
          barBaz: 1,
          fooBar: {
            bar_baz: date,
          },
        }),
      ).toEqual({
        bar_baz: 1,
        foo_bar: {
          bar_baz: date,
        },
      })
    })

    it('should work with deeply nested objects', () => {
      expect(
        snakeKeys({
          barBaz: 1,
          fooBar: {
            barBaz: [{
              aB: [
                [{ bC: 1 }, 8],
                { cD: { dE: 2 } },
              ],
              cD: null,
            }],
          },
        }),
      ).toEqual({
        bar_baz: 1,
        foo_bar: {
          bar_baz: [{
            a_b: [
              [{ b_c: 1 }, 8],
              { c_d: { d_e: 2 } },
            ],
            c_d: null,
          }],
        },
      })
    })
  })
})
