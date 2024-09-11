import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  apiAddNewContact,
  apiDeleteContact,
  apiGetContacts,
} from "./operations";
import { selectNameFilter } from "../filters/selectors";
import { apiLogout } from "../auth/operations";

const INITIAL_STATE = {
  contacts: [],
  isLoading: false,
  error: null,
};
const contactsSlice = createSlice({
  name: "contacts",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(apiGetContacts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiGetContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
        state.error = null;
      })
      .addCase(apiGetContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(apiAddNewContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiAddNewContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts.push(action.payload);
        state.error = null;
      })
      .addCase(apiAddNewContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(apiDeleteContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiDeleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload.id
        );
      })
      .addCase(apiDeleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(apiLogout.fulfilled, (state) => {
        state.contacts = [];
        state.isLoading = false;
        state.error = null;
      }),
});

export const selectContacts = (state) => state.contacts.contacts;

export const selectVisibleContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
export const contactsReducer = contactsSlice.reducer;
