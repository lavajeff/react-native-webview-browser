"use strict";

import React from "react";

import PropTypes from "prop-types";

import ReactNative, { Image, Text, TouchableHighlight } from "react-native";

import BaseComponent from "./BaseComponent";
import styles from "./styles";
import Button from "./Button";

class BackButton extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible
    };

    this._bind("onBackPress");
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible
    });
  }

  buttonStyle() {
    return [
      styles.backButton,
      this.props.foregroundColor && { tintColor: this.props.foregroundColor }
    ];
  }

  onBackPress() {
    const { onPress } = this.props;

    onPress && onPress();
  }

  render() {
    const { visible } = this.props;

    if (!visible) {
      return false;
    }

    return (
      // <Button
      //   onPress={ this.onBackPress.bind(this) }
      //   title="Done"
      //   color='#fff'
      //   style={this.buttonStyle()}>
      // </Button>
      <TouchableHighlight
        onPress={this.onBackPress.bind(this)}
        style={styles.backButton}
        underlayColor="#ffffffff"
      >
        <Text style={{ color: "#fff" }}>Done</Text>
      </TouchableHighlight>
    );
  }
}

BackButton.propTypes = {
  visible: PropTypes.bool,
  onPress: PropTypes.func,
  foregroundColor: PropTypes.string
};

BackButton.defaultProps = {
  visible: true
};

export default BackButton;
