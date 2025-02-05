import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchInnerChartApiData = createAsyncThunk('fetchInnerChartApiData', async (_, { getState }) => {
        const state = getState().innerChartApiData;
        const response = await fetch(`http://127.0.0.1:8000/api/get_historical_data/${state.ticker}/?period=30y`);
        return response.json();
    }
);

const innerChartApiSlice = createSlice({
    name: 'innerChartApiData',
    initialState: {
        isLoading: false,
        ticker: 'RELIANCE.NS',
        data: null,
        isError: false
    },
    reducers: {
        setTicker: (state, action) => {
            state.ticker = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInnerChartApiData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchInnerChartApiData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchInnerChartApiData.rejected, (state) => {
                console.log('Error fetching data', state.ticker);
                state.isError = true;
            });
    }
});

export const { setTicker } = innerChartApiSlice.actions;

export default innerChartApiSlice.reducer;