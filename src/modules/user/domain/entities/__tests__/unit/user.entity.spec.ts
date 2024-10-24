import { faker } from '@faker-js/faker'
import { UserEntiry, UserPros } from '../../user.entity'
describe('User Entity uni teste', () => {
  let props: UserPros
  let sut: UserEntiry
  beforeEach(() => {
    props = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
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
})
