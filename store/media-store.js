"use client";

import { create } from "zustand";

export const useMediaStore = create((set, get) => ({
  mediaItems: [],
  selectedMediaId: null,
  selectedMedia: null,

  addMediaItem: (item) =>
    set((state) => ({
      mediaItems: [...state.mediaItems, item],
    })),

  updateMediaItem: (id, updates) =>
    set((state) => ({
      mediaItems: state.mediaItems.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
      selectedMedia:
        state.selectedMediaId === id
          ? { ...state.selectedMedia, ...updates }
          : state.selectedMedia,
    })),

  removeMediaItem: (id) =>
    set((state) => ({
      mediaItems: state.mediaItems.filter((item) => item.id !== id),
      selectedMediaId: state.selectedMediaId === id ? null : state.selectedMediaId,
      selectedMedia: state.selectedMediaId === id ? null : state.selectedMedia,
    })),

  selectMedia: (id) =>
    set((state) => ({
      selectedMediaId: id,
      selectedMedia: id ? state.mediaItems.find((item) => item.id === id) || null : null,
    })),
}));
