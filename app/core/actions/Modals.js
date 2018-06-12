// @flow
export const MODALS_OPEN_NEXT = 'MODALS_OPEN_NEXT';
export const MODALS_CLOSE_CURRENT = 'MODALS_CLOSE_CURRENT';

import type { ModalConfig } from 'core/types';

export const openModal = (config: ModalConfig) => ({
    type: MODALS_OPEN_NEXT,
    config,
});

export const closeModal = () => ({
    type: MODALS_CLOSE_CURRENT,
});
