import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { commonStyles } from '../styles/commonStyles';

export default function PrimaryButton({ onPress, children, disabled, loading, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[commonStyles.button, style, disabled && { opacity: 0.6 }]}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={commonStyles.buttonText}>{children}</Text>
      )}
    </TouchableOpacity>
  );
}
