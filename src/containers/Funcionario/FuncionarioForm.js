import React, { Component } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { Redirect } from 'react-router-dom'

import {
  Form,
  DatePicker,
  Input,
  Button,
  message
} from 'antd'

import LoadingSpinner from '../../components/LoadingSpinner'

const FormItem = Form.Item

const submitFuncionarioMutation = gql`
  mutation submitFuncionario(
    $nome: String
    $sobrenome: String
    $senha: String
    $email: String,
    $nascimento: DateTime
  ) {
    createUser(
      nome: $nome,
      sobrenome: $sobrenome,
      senha: $senha,
      email: $email,
      nascimento: $nascimento
    ){
      createdAt,
      id
    }
  }
`

class FuncionarioForm extends Component {
  static propTypes = {
    /* form is a propType created by antd Form.create wrapper */
    form: PropTypes.object,
    mutate: PropTypes.func
  }

  state = {
    isLoading: false,
    success: false
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        const values = {
          ...fieldsValue,
          nascimento: fieldsValue['nascimento'].format('YYYY-MM-DD')
        }

        this.setState({isLoading: true})

        this.props.mutate({ variables: { ...values } })
          .then(data => {
            this.setState({ isLoading: false })
            this.setState({ success: !!data })
          })
          .catch(err => {
            this.setState({ isLoading: false })
            message.error('Ocorreu um erro. Por favor tente novamente.')
            console.error(err)
          })
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const { isLoading, success } = this.state

    if (success) {
      return <Redirect to='/funcionario' />
    }

    if (isLoading) {
      return <LoadingSpinner />
    }

    return <Form onSubmit={this.handleSubmit}>
      <FormItem label='Nome'>
        {getFieldDecorator('nome', {
          rules: [{
            required: true,
            message: 'Informe o nome do Funcionario',
            whitespace: true
          }]
        })(<Input placeholder='Nome' />)}
      </FormItem>

      <FormItem label='Sobrenome'>
        {getFieldDecorator('sobrenome', {
          rules: [{
            required: true,
            message: 'Informe o Sobrenome do Funcionario',
            whitespace: true
          }]
        })(<Input placeholder='Sobrenome' />)}
      </FormItem>

      <FormItem label='Nascimento'>
        {getFieldDecorator('nascimento', {
          rules: [{
            type: 'object',
            message: 'Informe o a data de nascimento'
          }, {
            required: true,
            message: 'Informe a data de nascimento do Funcionario'
          }]
        })(<DatePicker format='DD/MM/YYYY' placeholder='Data Nascimento' />)}
      </FormItem>

      <FormItem label='Email'>
        {getFieldDecorator('email', {
          rules: [{
            type: 'email',
            message: 'O email inserido não é válido'
          }, {
            required: true,
            message: 'É preciso cadastrar um email para o funcionario ter acesso ao sistema'
          }]
        })(<Input placeholder='Email' />)}
      </FormItem>

      <FormItem label='Senha'>
        {getFieldDecorator('password', {
          rules: [
            {
              required: true,
              message: 'Cadastre uma senha para o novo funcionario!'
            },
            {
              validator: this.checkConfirm
            }
          ]
        })(<Input type='password' placeholder='Senha' />)}
      </FormItem>

      <FormItem>
        <Button type='primary' htmlType='submit'>
          Cadastrar
        </Button>
      </FormItem>

    </Form>
  }
}

export default compose(
  graphql(submitFuncionarioMutation)
)(Form.create()(FuncionarioForm))
