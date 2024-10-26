import { UserEntiry, UserProps } from '../../user.entity'
import { UserDataBuilder } from '../../../testing/helper/user-data-builder'
describe('User Entity uni teste', () => {
  let props: UserProps
  let sut: UserEntiry
  beforeEach(() => {
    UserEntiry.validate = jest.fn()
    props = UserDataBuilder({})
    sut = new UserEntiry(props)
  })
  it('Constructor method', () => {
    expect(UserEntiry.validate).toHaveBeenCalled()
    expect(sut.props.firstName).toBe(props.firstName)
    expect(sut.props.lastName).toBe(props.lastName)
    expect(sut.props.email).toBe(props.email)
    expect(sut.props.password).toBe(props.password)
    expect(sut.props.active).toBeTruthy()
    expect(sut.props.createdAt).toBeInstanceOf(Date)
    expect(sut.props.updatedAt).toBe(sut.props.createdAt)
  })

  it('Getter of firstName field', () => {
    expect(sut.props.firstName).toBeDefined()
    expect(sut.props.firstName).toEqual(props.firstName)
    expect(typeof sut.props.firstName).toBe('string')
  })

  it('Setter of firstName field', () => {
    sut['firstName'] = 'other firstName'
    expect(sut.props.firstName).toEqual('other firstName')
    expect(typeof sut.props.firstName).toBe('string')
  })

  it('Getter of lastName field', () => {
    expect(sut.props.lastName).toBeDefined()
    expect(sut.props.lastName).toEqual(props.lastName)
    expect(typeof sut.props.lastName).toBe('string')
  })

  it('Setter of lastName field', () => {
    sut['lastName'] = 'other lastName'
    expect(sut.props.lastName).toEqual('other lastName')
    expect(typeof sut.props.lastName).toBe('string')
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

  it('Setter of password field', () => {
    sut['password'] = 'other password'
    expect(sut.props.password).toEqual('other password')
    expect(typeof sut.props.password).toBe('string')
  })

  it('Getter of active field', () => {
    expect(sut.props.active).toBeDefined()
    expect(sut.props.active).toEqual(props.active)
    expect(typeof sut.props.active).toBe('boolean')
    expect(sut.props.active).toBeTruthy()
  })

  it('Getter of createdAt field', () => {
    expect(sut.props.createdAt).toBeDefined()
    expect(sut.props.createdAt).toBeInstanceOf(Date)
  })

  it('Getter of updatedAt field', () => {
    expect(sut.props.updatedAt).toBeDefined()
    expect(sut.props.updatedAt).toBeInstanceOf(Date)
  })

  it('Should update a user', () => {
    sut.update({
      firstName: 'other firstName',
      lastName: 'other lastName',
    })
    expect(UserEntiry.validate).toHaveBeenCalled()
    expect(sut.props.firstName).toEqual('other firstName')
    expect(sut.props.lastName).toEqual('other lastName')
  })
  it('Should updatePassword a user', () => {
    sut.updatePassword('other updatePassword')
    expect(UserEntiry.validate).toHaveBeenCalled()
    expect(sut.props.password).toEqual('other updatePassword')
  })

  it('Should updateActive a user', () => {
    sut.updateActive(false)
    expect(UserEntiry.validate).toHaveBeenCalled()
    expect(sut.props.active).toEqual(false)
  })
})
