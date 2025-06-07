/**
 * Arena Social Providers
 * 
 * Global providers for the Arena Social application.
 * Includes wallet connection, query caching, and UI providers.
 * 
 * @file providers.tsx
 */
"use client";

import React from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, polygon } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { env } from '../lib/config';
import { ProvidersProps } from '../types/providers';

/**
 * Query Client Configuration
 * 
 * Creates a new QueryClient instance for React Query.
 * Used for caching and managing API requests.
 * 
 * @type {QueryClient}
 */
const queryClient = new QueryClient();

/**
 * Wallet Connection Configuration
 * 
 * Sets up wallet connection with supported chains (mainnet and polygon).
 * Uses RainbowKit for wallet UI.
 * 
 * @type {Config}
 */
const config = getDefaultConfig({
  appName: 'Arena Social',
  projectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  chains: [mainnet, polygon],
});

/**
 * Providers Component
 * 
 * @component Providers
 * @param {ProvidersProps} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {JSX.Element} Providers component
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}