import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';

export default function GlobalView({
  title,
  subtitle,
  onBack,
  onTitlePress,
  onSubtitlePress,
  rightComponent,
  loading,
  children,
  footer,
  hideHeader = false,
  useScroll = true,
  rightWidth = 120,
}) {
  return (
    <View style={commonStyles.container}>
      {!hideHeader && (
        <View style={commonStyles.header}>
          {/* left */}
          {onBack ? (
            <TouchableOpacity onPress={onBack} style={commonStyles.backButton}>
              <Text style={commonStyles.backText}>←</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ width: 56 }} />
          )}

          {/* right */}
          <View style={{ minWidth: rightWidth, alignItems: 'flex-end', paddingRight: 8, flexDirection: 'row', justifyContent: 'flex-end' }}>
            {rightComponent}
          </View>

          {/* center overlay - absolute to avoid shrink by left/right */}
          <View pointerEvents="box-none" style={{ position: 'absolute', left: 56, right: rightWidth, top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 8 }}>
            {title ? (
              onTitlePress ? (
                <TouchableOpacity onPress={onTitlePress} disabled={!onTitlePress}>
                  <Text style={[commonStyles.headerTitle, { textAlign: 'center' }]} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
                </TouchableOpacity>
              ) : (
                <Text style={[commonStyles.headerTitle, { textAlign: 'center' }]} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
              )
            ) : null}

            {subtitle ? (
              onSubtitlePress ? (
                <TouchableOpacity onPress={onSubtitlePress} disabled={!onSubtitlePress}>
                  <Text style={commonStyles.headerSubtitle} numberOfLines={1}>{subtitle}</Text>
                </TouchableOpacity>
              ) : (
                <Text style={commonStyles.headerSubtitle} numberOfLines={1}>{subtitle}</Text>
              )
            ) : null}
          </View>
        </View>
      )}

      {loading ? (
        <View style={commonStyles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={commonStyles.loadingText}>Cargando...</Text>
        </View>
      ) : (
        useScroll ? (
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
            {children}
          </ScrollView>
        ) : (
          <View style={{ flex: 1, padding: 16 }}>
            {children}
          </View>
        )
      )}

      {footer}
    </View>
  );
}
