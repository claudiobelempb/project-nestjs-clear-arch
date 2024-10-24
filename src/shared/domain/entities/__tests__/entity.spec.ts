import {
  UserEntiry,
  UserProps,
} from '@/modules/user/domain/entities/user.entity'
import { UserDataBuilder } from '@/modules/user/domain/testing/helper/user-data-builder'
import { validate as uuidValidate } from 'uuid'
import { AppEntity } from '../app-entity'

type StubEntityProps = {
  props1: string
  props2: number
}

class StubEntity extends AppEntity<StubEntityProps> {}
describe('AppEntity unit tests', () => {
  let props: UserProps
  let sut: UserEntiry
  it('Shoould set props and id', () => {
    const props: StubEntityProps = { props1: 'value1', props2: 15 }
    const entity = new StubEntity(props)

    expect(entity.props).toStrictEqual(props)
    expect(entity._id).not.toBeNull()
    expect(uuidValidate(entity._id)).toBeTruthy()
  })

  it('Shoould accept a valid uuid', () => {
    const props: StubEntityProps = { props1: 'value1', props2: 15 }
    const id = '47fc96ea-61a8-4fcb-baf0-0947f6317521'
    const entity = new StubEntity(props, id)

    expect(uuidValidate(entity._id)).toBeTruthy()
    expect(entity._id).toBe(id)
  })

  it('Shoould convert a entity to a javascript Object', () => {
    const props: StubEntityProps = { props1: 'value1', props2: 15 }
    const id = '47fc96ea-61a8-4fcb-baf0-0947f6317521'
    const entity = new StubEntity(props, id)

    expect(entity.toJSON()).toStrictEqual({
      id,
      ...props,
    })
  })
})
