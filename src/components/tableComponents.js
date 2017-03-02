import React, { Component } from 'react'
import { Table } from 'react-bootstrap'


export default class MBTable extends Component {
  prototype = {
    tableData: React.PropTypes.object,
    tableTitle: React.PropTypes.string,
    customClass: React.PropTypes.string,
    tableID: React.PropTypes.string
  }

  render () {
    const { tableData, customClass, tableID, tableTitle } = this.props
    if (tableData.hasOwnProperty('columns')) {
      return (
        <div className="mb-widget-container">
          {
            tableTitle ? <h3>{tableTitle}</h3> : ''
          }
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
        </div>
      )
    } else {
      return <div></div>
    }
  }
}