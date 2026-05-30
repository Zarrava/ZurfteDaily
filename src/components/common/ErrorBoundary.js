import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { palette } from '../../constants/colors';
import { borderRadius, spacing, typography } from '../../constants/theme';

/**
 * Catches unexpected render errors so the app does not white-screen.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.message}>
            Please restart the app. Your saved favorites stay on your device.
          </Text>
          <TouchableOpacity
            onPress={this.handleRetry}
            style={styles.button}
            accessibilityRole="button"
            accessibilityLabel="Try again"
          >
            <Text style={styles.buttonText}>Try again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.deepNavy,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  title: {
    ...typography.screenTitle,
    color: palette.white,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  message: {
    ...typography.body,
    color: palette.lightGray,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  button: {
    backgroundColor: palette.gold,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    minHeight: 48,
    justifyContent: 'center',
  },
  buttonText: {
    color: palette.deepNavy,
    fontWeight: '700',
    fontSize: 16,
  },
});
