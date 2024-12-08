import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { cartSlice } from './cart';
import { searchSlice } from './search';
import { filterSlice } from './filters';
import { activitySlice } from './activity';
import { menuSlice, subMenuSlice } from './menu';

import { CartState, MenuState, TSearchState, TFiltersState, TSubMenuState, TActivityState } from '@/types/store';

export const useMenu = create<MenuState>()(menuSlice);
export const useSearch = create<TSearchState>()(searchSlice);
export const useSubMenu = create<TSubMenuState>()(subMenuSlice);
export const useActivity = create<TActivityState>()(activitySlice);
export const useCart = create<CartState>()(persist(cartSlice, { name: 'client-cart' }));
export const useFilters = create<TFiltersState>()(persist(filterSlice, { name: 'client-filters' }));
