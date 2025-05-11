import { View, ScrollView, Text } from 'react-native';
import React from 'react';

import { useTheme } from '@/theme/ThemeProvider';
import { Link, usePathname } from 'expo-router';
import { Colors } from '@/constants/Colors';
import ScaledText from '@/components/other/scaledText';
import Tabs from '@/components/ui/tabs';

export function TankStatistics() {
  const { isDark } = useTheme();

  return (
    <ScaledText isThemed={true} size='base'>TEst</ScaledText>
  );
}