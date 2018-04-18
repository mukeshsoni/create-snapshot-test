// @flow
import React, { Component } from "react"

type Props = {
  name: string
}

export default class WithoutPropTypes extends Component<Props> {
  render() {
    return <div>Hello {this.props.name}</div>
  }
}
