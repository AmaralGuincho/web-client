import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
// import AutoForm from 'uniforms-antd/AutoForm'

import { Layout, Breadcrumb, Table, Divider, Icon, Tooltip } from 'antd'

import FuncionarioForm from './FuncionarioForm'
import LoadingSpinner from '../../components/LoadingSpinner'
const { Content } = Layout

const contentStyle = {
  background: '#fff',
  padding: 24,
  margin: 0,
  minHeight: 280,
  overflow: 'initial'
}

const columns = [
  {
    title: 'Nome',
    dataIndex: 'nome',
    key: 'nome',
    render: (text, record) => <a href='#'> {text} </a>
  },
  {
    title: 'Sobrenome',
    dataIndex: 'sobrenome',
    key: 'sobrenome'
  },
  {
    title: 'Registro Geral',
    dataIndex: 'rg',
    key: 'rg'
  },
  {
    title: 'Ação',
    key: 'action',
    render: (text, record) => (
      <span>
        <Tooltip title='Editar'>
          <a href='#'><Icon type='edit' /></a>
        </Tooltip>
        <Divider type='vertical' />
        <Tooltip title='Apagar'>
          <a href='#'><Icon type='delete' /></a>
        </Tooltip>
      </span>
    )
  }
]

class Funcionario extends Component {
  static propTypes = {
    funcionariosQuery: PropTypes.object,
    mutate: PropTypes.func,
    match: PropTypes.object
  }

  cadastrarFuncionario (funcionario) {
    this.props.mutate({
      variables: {
        newUser: funcionario
      }
    })
  }

  renderTable = () => {
    const { funcionariosQuery } = this.props
    const { loading } = this.props.funcionariosQuery

    if (loading) {
      return <LoadingSpinner />
    }

    const funcionarios = funcionariosQuery.allUsers.map(
      ({ id, ...rest }) => ({ key: id, ...rest })
    )

    return <Table dataSource={funcionarios} columns={columns} />
  }

  renderForm = userId => {
    if (userId) {
      // return <AutoForm
      //   schema={schema}
      //   validate='onSubmit'
      //   onSubmit={doc => this.cadastrarFuncionario(doc)}
      // />

      return <FuncionarioForm />
    }
  }

  render () {
    const { url } = this.props.match

    return <div>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Funcionario</Breadcrumb.Item>
      </Breadcrumb>
      <Content style={contentStyle}>
        <h1>Funcionario</h1>

        <Switch>
          <Route path={`${url}/:id`} render={({ match }) => this.renderForm(match.params.id)} />

          <Route path={`${url}/create`} render={() => this.renderForm()} />

          <Route exact render={() => this.renderTable()} />
        </Switch>
      </Content>
    </div>
  }
}

// const GetFuncionario = gql`
//   query GetFuncionario($Id: ID!) {
//     User(id: $Id) {
//       nome
//       email
//       sobrenome
//       nascimento
//       rg
//       cnh
//     }
//   }
// `

const FuncionariosList = gql`
  query FuncionariosList {
    allUsers {
      id
      nome
      sobrenome,
      rg
    }
  }
`

const SubmitFuncionario = gql`
  mutation submitFuncionario(
    $nome: String
    $sobrenome: String
    $senha: String
    $email: String
  ) {
    createUser(
      nome: $nome,
      sobrenome: $sobrenome,
      senha: $senha,
      email: $email
    ){
      createdAt,
      id
    }
  }
`

export default compose(
  graphql(SubmitFuncionario),
  graphql(FuncionariosList, {
    name: 'funcionariosQuery',
    options: {
      pollInterval: 2000
    }
  })
)(Funcionario)
