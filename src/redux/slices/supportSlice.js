// src/redux/slices/supportSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  complaints: [],
  loading: false,
  lastTicket: null,
};

const supportSlice = createSlice({
  name: "support",
  initialState,
  reducers: {
    submitComplaint: (state, action) => {
      const ticket = {
        id: `SN${Date.now().toString().slice(-6)}`,
        ...action.payload,
        status: "Open",
        createdAt: new Date().toISOString(),
      };
      state.complaints.unshift(ticket);
      state.lastTicket = ticket.id;
    },
    clearLastTicket: (state) => {
      state.lastTicket = null;
    },
  },
});

export const { submitComplaint, clearLastTicket } = supportSlice.actions;
export const selectComplaints = (state) => state.support.complaints;
export const selectLastTicket = (state) => state.support.lastTicket;
export default supportSlice.reducer;
