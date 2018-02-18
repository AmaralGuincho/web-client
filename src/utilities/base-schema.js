import SimpleSchema from 'simpl-schema'

SimpleSchema.setDefaultMessages({
  initialLanguage: 'ptBR',
  messages: {
    ptBR: {
      required: '{{label}} não pode ser deixado em branco',
      minString: '{{label}} deve ter no mínimo {{min}} caracteres',
      maxString: '{{label}} não pode ter mais que {{max}} caracteres',
      minNumber: '{{label}} deve ser no mínimo {{min}}',
      maxNumber: '{{label}} deve ser no máximo {{max}}',
      minNumberExclusive: '{{label}} deve ser maior que {{min}}',
      maxNumberExclusive: '{{label}} deve ser menor que {{max}}',
      minDate: '{{label}} deve ser após {{min}}',
      maxDate: '{{label}} não pode ser antes de {{max}}',
      badDate: '{{label}} não é uma data válida',
      minCount: 'Deve ser definido no minimo {{minCount}} valores',
      maxCount: 'Não é possivel definir mais de {{maxCount}} valores',
      noDecimal: '{{label}} deve ser um número inteiro',
      notAllowed: '{{value}} é um valor proíbido',
      expectedType: '{{label}} deve ser do tipo {{dataType}}',

      regEx ({label, regEx}) {
        switch (regEx) {
          case SimpleSchema.RegEx.Email.toString():
          case SimpleSchema.RegEx.EmailWithTLD.toString():
            return 'Este email não é valido'

          default:
            return `O campo ${label} não é valido`
        }
      }
    }
  }
})

/* Uniforms Schema Specific Properties */
SimpleSchema.extendOptions(['uniforms'])

export default SimpleSchema
