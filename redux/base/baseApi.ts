import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export const baseApi = createApi({
      reducerPath: 'baseApi',
      baseQuery: fetchBaseQuery({
            baseUrl: `https://gym-server-br2c.onrender.com/api/v1`,
            prepareHeaders: (headers, { getState }) => {
                  const { token } = (getState() as RootState).auth;
                  if (token) {
                        headers.set('Authorization', `Bearer ${token}`);
                  }

            },
      }),
      endpoints: () => ({}),
      tagTypes: [
            'User',
            'Class',
            'Booking'
      ],
});