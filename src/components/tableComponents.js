import React, {Component} from 'react'
import {Table} from 'react-bootstrap'


export default class MBTable extends Component {
  prototype = {
    config: React.PropTypes.object,
    callback: React.PropTypes.func,
    type: React.PropTypes.string
  }

  render () {
    const {tableData, customClass, tableID} = this.props
    if (tableData.hasOwnProperty('columns')) {
      return (
      <Table responsive className={customClass} id={tableID}>
          <thead>
            <tr>
            {
              tableData.columns.map((cols, i) => {
                return <th key={'col_'+i}>{cols}</th>
              })
            }
            </tr>
          </thead>
          <tbody>
            {
              tableData.rows.map((rows, i) => {
                return (
                  <tr key={'rows_'+i}>
                    {
                      rows.length ? 
                        rows.map((rowData, j) => {
                          return <td key={'cell_'+j}>{rowData}</td>
                        })
                        :  null
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      )
    } else {
      return <div></div>
    }
  }
}