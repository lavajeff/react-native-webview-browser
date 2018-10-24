"use strict";

import React, { Component } from "react";
import { View, WebView } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

const WEBVIEW_REF = "webview";

class Webbrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scalesPageToFit: true
    };
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          this.props.backgroundColor && {
            backgroundColor: this.props.backgroundColor
          }
        ]}
      >
        <View style={styles.header}>
          <View style={{ flexDirection: "row" }}>
            {/* {this.renderBackButton()} */}
            {/* {this.renderAddressBar()} */}
          </View>
          {/* {this.renderStatusBar()} */}
        </View>
        <WebView
          ref={WEBVIEW_REF}
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          source={{ uri: this.props.url }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          onNavigationStateChange={this.onNavigationStateChange}
          onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
          startInLoadingState={true}
          scalesPageToFit={this.state.scalesPageToFit}
          onLoad={() => this.refs[WEBVIEW_REF].postMessage(this.props.cookie)}
          {...(this.props.jsCode
            ? { injectedJavaScript: this.props.jsCode }
            : {})}
          {...this.props.webviewProps}
        />
      </View>
    );
  }
}

Webbrowser.propTypes = {
  url: PropTypes.string,
  backgroundColor: PropTypes.string,
  jsCode: PropTypes.string,
  cookie: PropTypes.string,
  webviewProps: PropTypes.object
};

Webbrowser.defaultProps = {
  url: "",
  jsCode: null,
  cookie: "",
  webviewProps: {}
};

export default Webbrowser;
