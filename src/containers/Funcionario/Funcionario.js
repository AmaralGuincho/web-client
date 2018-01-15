import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import { Layout, Breadcrumb, Table } from 'antd'
import LoadingSpinner from '../../components/LoadingSpinner'
const { Content } = Layout

const dataSource = [
  {
    key: '1',
    nome: 'Mike',
    sobrenome: 'Papaya',
    address: '10 Downing Street'
  },
  {
    key: '2',
    nome: 'Johnny',
    sobrenome: 'Fag',
    address: '10 Downing Street'
  }
]

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
  }
]

class Funcionario extends Component {
  static propTypes = {
    funcionariosQuery: PropTypes.object
  }

  componentWillMount () {

  }

  renderTable = () => {
    const { funcionariosQuery } = this.props

    const funcionarios = funcionariosQuery.allUsers.map(
      ({ id, ...rest }) => ({ key: id, ...rest })
    )

    return <Table dataSource={funcionarios} columns={columns} />
  }

  render () {
    const { loading } = this.props.funcionariosQuery

    return <Layout style={{ padding: '0 24px 24px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Funcionario</Breadcrumb.Item>
      </Breadcrumb>
      <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
        <h1>Funcionario</h1>

        { loading ? <LoadingSpinner /> : this.renderTable() }

      </Content>
    </Layout>
  }
}

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

// const FuncionariosSubscription = gql`
//   subscription FuncionariosSubscription {
//     User(filter: {
//       mutation_in: [CREATED]
//     }){
//       node {
//         id,
//         nome,
//         sobrenome
//       }
//     }
//   }
// `

export default compose(
  graphql(FuncionariosList, {
    name: 'funcionariosQuery'
  })

)
// props: props => {
//   return { subscribeToNewFuncionarios: params => {
//     return props.funcionarios.subscribeToMore({
//       document: FuncionariosSubscription,
//       updateQuery: (prev, {subscriptionData}) => {
//         if (subscriptionData.data) {
//           return prev
//         }

//         const newFuncionario = subscriptionData.data.User

//         return Object.assign({}, prev, {
//           entry: {
//             funcionarios: [newFuncionario, ...prev.entry.funcionarios]
//           }
//         })
//       }
//     })
//   }
//   }
// }
(Funcionario)
