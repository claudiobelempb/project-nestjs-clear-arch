import { UserEntiry, UserProps } from '../../user.entity'
import { UserDataBuilder } from '../../../testing/helper/user-data-builder'
describe('User Entity uni teste', () => {
  let props: UserProps
  let sut: UserEntiry
  beforeEach(() => {
    props = UserDataBuilder({})
    sut = new UserEntiry(props)
  })
  it('Constructor method', () => {
    expect(sut.props.name).toBe(props.name)
    expect(sut.props.email).toBe(props.email)
    expect(sut.props.password).toBe(props.password)
    expect(sut.props.active).toBe(true)
    expect(sut.props.createdAt).toBeInstanceOf(Date)
    expect(sut.props.updatedAt).toBe(sut.props.createdAt)
  })

  it('Getter of name field', () => {
    expect(sut.props.name).toBeDefined()
    expect(sut.props.name).toEqual(props.name)
    expect(typeof sut.props.name).toBe('string')
  })

  it('Getter of email field', () => {
    expect(sut.props.email).toBeDefined()
    expect(sut.props.email).toEqual(props.email)
    expect(typeof sut.props.email).toBe('string')
  })

  it('Getter of password field', () => {
    expect(sut.props.password).toBeDefined()
    expect(sut.props.password).toEqual(props.password)
    expect(typeof sut.props.password).toBe('string')
  })

  it('Getter of active field', () => {
    expect(sut.props.active).toBeDefined()
    expect(sut.props.active).toEqual(props.active)
    expect(typeof sut.props.active).toBe('boolean')
  })

  it('Getter of createdAt field', () => {
    expect(sut.props.createdAt).toBeDefined()
    expect(sut.props.createdAt).toBeInstanceOf(Date)
  })

  it('Getter of updatedAt field', () => {
    expect(sut.props.updatedAt).toBeDefined()
    expect(sut.props.updatedAt).toBeInstanceOf(Date)
  })
})
