import React from 'react';
import { View, Text } from 'react-native';
import { commonStyles } from '../styles/commonStyles';

export default function EmptyState({ emoji = '🔍', title = 'Sin elementos', subtitle = '' }) {
  return (
    <View style={commonStyles.emptyContainer}>
      <Text style={commonStyles.emptyEmoji}>{emoji}</Text>
      <Text style={commonStyles.emptyTitle}>{title}</Text>
      {subtitle ? <Text style={commonStyles.emptyText}>{subtitle}</Text> : null}
    </View>
  );
}
