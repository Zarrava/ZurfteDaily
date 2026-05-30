import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { a11y } from '../constants/accessibility';
import { palette } from '../constants/colors';
import { shadows, typography } from '../constants/theme';
import { useAppFonts } from '../context/FontContext';
import { useTheme } from '../context/ThemeContext';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const INACTIVE_GRAY = '#8E99A8';

const TAB_LABELS = {
  Home: a11y.tabs.home,
  Favorites: a11y.tabs.favorites,
  Categories: a11y.tabs.categories,
  Settings: a11y.tabs.settings,
};

/**
 * Main bottom tab navigator — four core app sections.
 */
export default function BottomTabs() {
  const { colors } = useTheme();
  const { fonts } = useAppFonts();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: palette.gold,
        tabBarInactiveTintColor: INACTIVE_GRAY,
        tabBarAccessibilityLabel: TAB_LABELS[route.name],
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingBottom: Platform.OS === 'ios' ? 28 : 10,
          paddingTop: 10,
          ...shadows.tabBar,
        },
        tabBarLabelStyle: {
          ...typography.caption,
          fontFamily: fonts.semibold,
          fontSize: 11,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'home';

          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Favorites')
            iconName = focused ? 'heart' : 'heart-outline';
          else if (route.name === 'Categories')
            iconName = focused ? 'grid' : 'grid-outline';
          else if (route.name === 'Settings')
            iconName = focused ? 'settings' : 'settings-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
