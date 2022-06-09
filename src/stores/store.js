import create from 'zustand';
import { prusaMK3SDefaults } from '../lib/presets/prusa-mk3s';
import { version } from '../lib/version';
import { persist } from 'zustand/middleware';

export const useStore = create(
    persist((set,get) => ({
        options: prusaMK3SDefaults,
        setOptions: (options) => set({ options: options }),
        fileName: '',
        setFileName: (fileName) => set({ fileName: fileName }),
        showVariableNames: false,
        setShowVariableNames: () => set({ showVariableNames: !get().showVariableNames }),
        startGcodeError: '',
        setStartGcodeError: (startGcodeError) => set({ startGcodeError: startGcodeError }),
        endGcodeError: '',
        setEndGcodeError: (endGcodeError) => set({ endGcodeError: endGcodeError }),
    }),
    {
        name: 'generator-parameters',
        version: version,
        getStorage: () => localStorage,
    }
));
