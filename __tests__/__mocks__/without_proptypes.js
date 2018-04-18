import React, { Component } from "react"

export default class WithoutPropTypes extends Component {
  render() {
    return <div>Hello {this.props.name}</div>
  }
}
