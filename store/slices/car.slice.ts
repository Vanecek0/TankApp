import { Car } from "@/models/Car";
import { carRepository } from "@/repositories/carRepository";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

interface carState {
  car: Car | null;
  loading: boolean;
}

const initialState: carState = {
  car: null,
  loading: true,
}

const STORAGE_KEY = "selected_car";

const cartSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCarFromStorage.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadCarFromStorage.fulfilled, (state, action: PayloadAction<Car | null>) => {
        state.car = action.payload;
      })
       .addCase(setCarByIdAndPersist.fulfilled, (state, action: PayloadAction<Car | null>) => {
        state.car = action.payload;
      });
  }
})

export const loadCarFromStorage = createAsyncThunk(
  'car/loadCarFromStorage',
  async () => {
    const storedCar = await AsyncStorage.getItem(STORAGE_KEY);
    if (storedCar) {
      try {
        return JSON.parse(storedCar);
      } catch (e) {
        console.warn("Chyba při parsování auta z AsyncStorage", e);
      }
      
    }
    else {
      const firstCar = await carRepository.getFirst();
      if (!firstCar) {
        return null;
      }
      
      await AsyncStorage.setItem("selected_car", JSON.stringify(firstCar));
      return JSON.stringify(firstCar);
    }
  }
);

export const setCarByIdAndPersist = createAsyncThunk(
  "car/setCarByIdAndPersist",
  async (carId: number) => {

      const car = await carRepository.getById(carId);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(car));
      return car;
  }
);

export default cartSlice.reducer;