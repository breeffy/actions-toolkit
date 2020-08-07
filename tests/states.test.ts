import {createStateProxy, StateType} from '../src/states'

describe('createStateProxy', () => {
  let states: StateType

  beforeEach(() => {
    process.env.STATE_EXAMPLE = 'pizza'
    process.env.STATE_FOO = 'bar'
    process.env['STATE_EXAMPLE-NAME'] = 'pizza'
    states = createStateProxy()
  })

  afterEach(() => {
    delete process.env.STATE_EXAMPLE
    delete process.env.STATE_FOO
    delete process.env.STATE_EXAMPLE_NAME
  })

  describe('#get', () => {
    it('returns the expected value', () => {
      const result = states.example
      expect(result).toBe('pizza')
    })
  
    it('accepts the correct types', () => {
      states = createStateProxy<{ example: string }>()
      const result = states.example
      expect(result).toBe('pizza')
    })
  
    it('gets a property with a - in it', () => {
      states = createStateProxy<{ 'example-name': string }>()
      const result = states['example-name']
      expect(result).toBe('pizza')
    })
  })

  describe('#set', () => {
    it('does not allow properties to be set', () => {
      expect(() => states.test = 'test').toThrowError()
    })
  })

  describe('#ownKeys', () => {
    it('returns the filtered keys', () => {
      const keys = Object.keys(states)
      expect(keys).toEqual(['STATE_EXAMPLE-NAME', 'STATE_EXAMPLE', 'STATE_FOO'])
    })
  })
})