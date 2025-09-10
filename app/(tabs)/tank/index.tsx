import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, RefreshControl, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useTheme } from '@/theme/ThemeProvider';
import { ThemeColors as Colors } from '@/constants/Colors';
import { spacing } from '@/utils/SizeScaling';
import ScaledText from '@/components/common/ScaledText';
import Icon from '@/components/Icon';
import Dropdown from '@/components/common/Dropdown';
import CustomButton, { ActionButton } from '@/components/common/Buttons';
import Dashboard from '@/components/dashboards';
import { useModal } from '@/providers/modalProvider';
import AddTankRecordModal from '@/components/modals/tankRecordModal';
import { AddStationRecordModal } from '@/components/modals/stationsModal';
import { loadCarFromStorage } from '@/store/slices/car.slice';
import { AppDispatch, RootState } from '@/store';
import { tankingService } from '@/services/tankingService';
import { useAnimatedScrollHandler } from '@/hooks/useAnimatedScrollHandler';
import { TankingItem } from '@/components/tanking/TankingItem';
import TankStatistics from './tabs/statistics';

export default function TankScreen() {
  const { isDark } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { car } = useSelector((state: RootState) => state.car);
  const { showModal } = useModal();

  const [isLoading, setIsLoading] = useState(true);
  const [tanking, setTanking] = useState<any[]>([]);
  const [orderTankings, setOrderTankings] = useState<'DESC' | 'ASC'>('DESC');

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Záznamy' },
    { key: 'second', title: 'Statistiky' },
  ]);

  const renderScene = useMemo(
    () =>
      ({ route }: { route: { key: string } }) => {
        switch (route.key) {
          case "first":
            return renderTankingList();
          case "second":
            return renderTankstatistics();
          default:
            return null;
        }
      },
    [orderTankings, isLoading, tanking, isDark]
  );

  const scrollY = useRef(new Animated.Value(0)).current;
  const { handleScroll, buttonOpacity } = useAnimatedScrollHandler(scrollY, [index, orderTankings]);

  useEffect(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    Animated.timing(scrollY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [index, orderTankings]);

  const flatListRef = useRef<Animated.FlatList>(null);

  const H_MAX_HEIGHT = 280;
  const H_MIN_HEIGHT = 95;
  const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE],
    outputRange: [H_MAX_HEIGHT, H_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    dispatch(loadCarFromStorage());
  }, [dispatch]);

  const loadTankings = useCallback(async (order: 'DESC' | 'ASC', carId: number) => {
    setIsLoading(true);
    try {
      const data = await tankingService.getGroupedTankingsByMonth(order, carId);
      setTanking(data);
    } catch (err) {
      console.error('Error loading tankings', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTankings(orderTankings, car?.id ?? 2);
  }, [loadTankings, orderTankings, car]);

  const onRefresh = useCallback(async () => {
    await loadTankings(orderTankings, car?.id ?? 2);
  }, [loadTankings, orderTankings, car]);

  const renderTankingList = () => (
    <>
      <View style={{ ...spacing.mt(12), ...spacing.mb(12) }} className="flex-row items-center justify-between">
        <ScaledText size="lg" className="font-bold" isThemed>
          Poslední záznamy
        </ScaledText>

        <Dropdown
          defaultIndex={orderTankings === 'DESC' ? 0 : 1}
          data={[
            { value: 'DESC', label: 'Nejnovější' },
            { value: 'ASC', label: 'Nejstarší' },
          ]}
          onChange={(item) => setOrderTankings(item.value === 'DESC' || item.value === 'ASC' ? item.value : 'DESC')}
          dropdownStyle={{
            ...spacing.borderRadius(12),
            ...spacing.width(150),
            ...spacing.borderWidth(0.5),
            ...spacing.px(12),
            borderColor: Colors.base.transparent,
            backgroundColor: isDark ? Colors.background.surface.dark : Colors.background.surface.light,
          }}
        />
      </View>

      <Animated.FlatList
        ref={flatListRef}
        data={tanking}
        keyExtractor={(item, idx) => item.month ?? idx.toString()}
        renderItem={({ item }) => <TankingItem item={item} isDark={isDark} />}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
        contentContainerStyle={[
          { paddingTop: H_MAX_HEIGHT },
        ]}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <ScaledText style={{ ...spacing.p(28) }} className="text-center font-bold" color={Colors.text.muted} size="base">
            {isLoading ? 'Načítání' : 'Žádné další záznamy'}
          </ScaledText>
        }
      />
    </>
  );

  const renderTankstatistics = () => (
    <Animated.ScrollView
      showsVerticalScrollIndicator={false}
      onScroll={handleScroll}
      contentContainerStyle={{ paddingBottom: 180 }}
      scrollEventThrottle={16}
    >
      <TankStatistics />
    </Animated.ScrollView>
  );

  const renderTabBar = useCallback(
    (props: any) => (
      <View className="flex-row justify-center items-center" style={{ ...spacing.mt(12), ...spacing.gap(12) }}>
        {props.navigationState.routes.map((route: any, i: number) => (
          <TouchableOpacity
            key={route.key}
            style={{
              width: '50%',
              ...spacing.py(10),
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              borderBottomWidth: 3,
              borderBottomColor: Colors.base.primary,
              backgroundColor: isDark ? Colors.background.surface.dark : Colors.background.surface.light,
            }}
            onPress={() => setIndex(i)}
          >
            <ScaledText
              size="base"
              style={{ fontWeight: 'bold', textAlign: 'center', color: isDark ? Colors.text.primary_dark : Colors.text.primary }}
            >
              {route.title}
            </ScaledText>
          </TouchableOpacity>
        ))}
      </View>
    ),
    [isDark]
  );

  return (
    <View style={{ flex: 1, backgroundColor: isDark ? Colors.background.dark : Colors.background.light }}>
      <View style={{ ...spacing.mx(20) }}>
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, backgroundColor: isDark ? Colors.background.dark : Colors.background.light }}>
          <Dashboard scrollRefVal={scrollY} />
        </View>
          <Animated.View style={{ height: "100%", paddingTop: headerHeight }}>
            <TabView
              lazy
              navigationState={{ index, routes }}
              renderScene={renderScene}
              renderTabBar={renderTabBar}
              onIndexChange={setIndex}
            />
        </Animated.View>


      </View>

      <ActionButton opacity={buttonOpacity}>
        <AddActionButton label="Přidat tankování" icon="tank" onPress={() => showModal(AddTankRecordModal)} isDark={isDark} />
        <AddActionButton label="Přidat stanici" icon="map_pin" onPress={() => showModal(AddStationRecordModal)} isDark={isDark} />
      </ActionButton>
    </View>
  );
}

const AddActionButton = ({ label, icon, onPress, isDark }: any) => (
  <View onTouchEnd={onPress} className="flex-row items-center gap-3" style={{ ...spacing.right(10) }}>
    <ScaledText size="base" color={isDark ? Colors.base.white : ''} className="font-bold">
      {label}
    </ScaledText>
    <CustomButton
      labelClassName="aspect-square text-center"
      style={{ ...spacing.borderRadius(90), ...spacing.p(16), ...spacing.width(60) }}
      className="flex shadow-md justify-center items-center aspect-square"
      label={<Icon name={icon} color={Colors.base.primary} style={{ ...spacing.width(20), ...spacing.height(20) }} />}
      labelSize="xl"
      labelColor={isDark ? Colors.base.white : ''}
      backgroundColor={isDark ? Colors.background.surface.dark : Colors.background.surface.light}
    />
  </View>
);