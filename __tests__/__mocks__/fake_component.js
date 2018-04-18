import React, { Component } from "react"
import PropTypes from "prop-types"

class FakeComponent extends Component {
  render() {
    return (
      <div>
        Rendering a fake component
        <p>Welcome - {this.props.firstName}</p>
      </div>
    )
  }
}

FakeComponent.propTypes = {
  firstName: PropTypes.string.isRequired,
  person: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired
  }).isRequired,
  hadAadhar: PropTypes.bool,
  onClick: PropTypes.func.isRequired
}

export default FakeComponent
