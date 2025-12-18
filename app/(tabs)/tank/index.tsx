import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, RefreshControl, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@/theme/ThemeProvider';
import { ThemeColors as Colors } from '@/constants/Colors';
import { spacing } from '@/utils/SizeScaling';
import ScaledText from '@/components/common/ScaledText';
import Icon from '@/components/Icon';
import Dropdown from '@/components/common/Dropdown';
import CustomButton, { ActionButton } from '@/components/common/Buttons';
import Dashboard from '@/components/dashboards';
import { useModal } from '@/hooks/useModal';
import AddTankRecordModal from '@/components/modals/tankRecordModal';
import { AddStationRecordModal } from '@/components/modals/stationsModal';
import { loadCarFromStorage } from '@/store/slices/car.slice';
import { AppDispatch, RootState } from '@/store';
import { tankingService } from '@/services/tankingService';
import { TankingItem } from '@/components/tanking/TankingItem';
import { LinearGradient } from 'expo-linear-gradient';
import darkenHexColor from '@/utils/colorDarken';
import CollapsibleScroll from '@/components/CollapsibleScroll';

export default function TankScreen() {
  const { isDark } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { car } = useSelector((state: RootState) => state.car);
  const { showModal } = useModal();

  const [isLoading, setIsLoading] = useState(true);
  const [tanking, setTanking] = useState<any[]>([]);
  const [orderTankings, setOrderTankings] = useState<'DESC' | 'ASC'>('DESC');

  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, [orderTankings]);

  const flatListRef = useRef<Animated.FlatList>(null);

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
    loadTankings(orderTankings, car?.id ?? 1);
  }, [loadTankings, orderTankings, car]);

  const handleTankAdded = async () => {
    await loadTankings(orderTankings, car?.id ?? 1);
  };

  return (
    <>
      <View
        className='flex-1'
        style={{
          backgroundColor: isDark ? Colors.background.dark : Colors.background.light
        }}
      >
        <CollapsibleScroll
          header={(scrollY) =>
            <View>
              <LinearGradient
                colors={[Colors.base.primary, darkenHexColor(Colors.base.primary, -15)]}
                locations={[0, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  position: 'absolute',
                  height: '75%',
                  top: 0,
                  left: 0,
                  right: 0,
                }}
              />

              <View style={{ ...spacing.mx(20) }}>
                <Dashboard scrollRefVal={scrollY} />
              </View>
            </View>
          }
          subHeader={() => (
            <View style={{ ...spacing.py(12), ...spacing.mx(20) }} className='flex-row items-center justify-between'>
              <ScaledText size='xl' className='font-bold' isThemed>Poslední záznamy</ScaledText>
              <Dropdown
                defaultIndex={0}
                data={[
                  { value: 'DESC', label: 'Nejnovější' },
                  { value: 'ASC', label: 'Nejstarší' }
                ]}
                onChange={(item) => {
                  if (item.value === "DESC" || item.value === "ASC") {
                    setOrderTankings(item.value);
                  } else {
                    console.warn("Invalid value for order:", item.value);
                  }
                }}
                dropdownStyle={{
                  ...spacing.borderRadius(12),
                  ...spacing.width(180),
                  ...spacing.borderWidth(0.5),
                  ...spacing.p(12),
                  borderColor: Colors.base.transparent,
                  backgroundColor: isDark ? Colors.background.surface.dark : Colors.background.surface.light
                }}
              ></Dropdown>
            </View>
          )}
          scrollComponent={Animated.FlatList}
          scrollProps={{
            data: tanking,
            keyExtractor: (item, idx) => item.month ?? idx.toString(),
            renderItem: ({ item }) => <TankingItem item={item} isDark={isDark} />,
            refreshControl: <RefreshControl refreshing={isLoading} />,
            scrollEventThrottle: 16,
            onScroll: Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            ),
            showsVerticalScrollIndicator: false,
            ListEmptyComponent: (
              <ScaledText style={{ ...spacing.p(28) }} className="text-center font-bold" color={Colors.text.muted} size="base">
                {isLoading ? 'Načítání' : 'Žádné další záznamy'}
              </ScaledText>
            ),
            contentContainerStyle: { ...spacing.borderRadius(12), ...spacing.mx(20), ...spacing.pb(6), backgroundColor: isDark ? Colors.background.dark : Colors.background.light },
          }}
          scrollYValue={scrollY}
        />
      </View >

      <ActionButton scrollY={scrollY}>
        <View onTouchEnd={() => {
          showModal(AddTankRecordModal, {
            onSubmitSuccess: handleTankAdded,
          });
        }}
          style={{ ...spacing.right(10) }} className='flex-row items-center gap-3'>
          <ScaledText size={'base'} color={isDark ? Colors.base.white : ''} className='font-bold'>Přidat tankování</ScaledText>
          <CustomButton
            labelClassName='aspect text-center'
            style={{
              ...spacing.borderRadius(90),
              ...spacing.p(16),
              ...spacing.width(60),
              shadowColor: Colors.base.black,
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,
              elevation: 8,
            }}
            className={`flex shadow-md justify-center items-center aspect-square`}
            label={
              <Icon
                name="tank"
                color={Colors.base.primary}
                style={{
                  ...spacing.width(20),
                  ...spacing.height(20),
                }}
              />
            }
            labelSize='xl'
            backgroundColor={isDark ? Colors.background.surface.dark : Colors.background.surface.light}

          />
        </View>
        <View onTouchEnd={
          () => { showModal(AddStationRecordModal) }} style={{ ...spacing.right(10) }} className='flex-row items-center gap-3'>
          <ScaledText size={'base'} color={isDark ? Colors.base.white : ''} className='font-bold'>Přidat stanici</ScaledText>
          <CustomButton
            labelClassName='aspect-square text-center'
            style={{
              ...spacing.borderRadius(90),
              ...spacing.p(16),
              ...spacing.width(60),
              shadowColor: Colors.base.black,
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,
              elevation: 8,
            }}
            className={`flex shadow-md justify-center items-center aspect-square`}
            label={
              <Icon
                name="map_pin"
                color={Colors.base.primary}
                style={{
                  ...spacing.width(20),
                  ...spacing.height(20)
                }}
              />
            }
            labelSize='xl'
            backgroundColor={isDark ? Colors.background.surface.dark : Colors.background.surface.light}
          />
        </View>
      </ActionButton>
    </>
  );
}