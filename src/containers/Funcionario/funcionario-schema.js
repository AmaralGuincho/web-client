import SimplSchemaBase from 'simpl-schema'
import { DatePicker } from 'antd'

import SimpleSchema from '../../utilities/base-schema'

const schema = new SimpleSchema({
  nome: {
    type: String,
    max: 50
  },
  sobrenome: {
    type: String,
    max: 180
  },

  email: {
    type: String,
    regEx: SimplSchemaBase.RegEx.Email
  },
  senha: {
    type: String,
    uniforms: {
      type: 'password'
    }
  },

  nascimento: {
    type: Date,
    max: 50,
    uniforms: DatePicker
  },

  rg: {
    label: 'RG',
    type: String,
    max: 50
  },
  cnh: {
    label: 'CNH',
    type: String,
    max: 50
  }
})

export default schema
