import { ReactNode } from 'react';
import { QueryClient } from '@tanstack/react-query';

export interface ProvidersProps {
  children: ReactNode;
}

export interface ProvidersContext {
  queryClient: QueryClient;
}
