import { ReactElement } from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { RootState } from "../store";
import { Store } from "@reduxjs/toolkit";
import {initialState} from "../mocks/testUtils";

const mockStore = configureStore([]);

export const renderComponentWithProvider = (component: ReactElement, state?: RootState): {
    renderResult: RenderResult,
    store: MockStoreEnhanced<RootState>,
    state: RootState | undefined
} => {
    const store: MockStoreEnhanced<RootState> = mockStore(state || initialState) as MockStoreEnhanced<RootState>;

    const renderResult = render(
        <Provider store={store as unknown as Store<RootState>}>
            {component}
        </Provider>
    );

    return {
        renderResult,
        store,
        state: state || initialState
    };
};