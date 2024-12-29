import { createSlice } from "@reduxjs/toolkit";

interface TimerState {
  timeRemaining: number;
  isRunning: boolean;
}

const initialState: TimerState = {
  timeRemaining: 500,
  isRunning: false,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    start(state) {
      state.isRunning = true;
    },

    stop(state) {
      state.isRunning = false;
    },

    decrementTime(state) {
      if (state.timeRemaining > 0) {
        state.timeRemaining--;
      }
    },

    reset: () => initialState,
  },
});

export const timerActions = timerSlice.actions;
export default timerSlice.reducer;
