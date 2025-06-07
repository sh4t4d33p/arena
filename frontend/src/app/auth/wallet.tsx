/**
 * Wallet Connection Component
 * 
 * Provides wallet connection and disconnection UI for the Arena Social application.
 * Uses RainbowKit for wallet connection modal and wagmi for wallet management.
 * 
 * @file wallet.tsx
 */
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Wallet Connection Button
 * 
 * @component WalletConnectButton
 * @returns {JSX.Element} Wallet connection UI component
 */
export const WalletConnectButton = () => {
  /**
   * Current wallet account state
   * 
   * @type {Object}
   * @property {string} address - Current wallet address
   * @property {boolean} isConnected - Connection status
   */
  const { address, isConnected } = useAccount();

  /**
   * RainbowKit connect modal hook
   * 
   * @type {Object}
   * @property {Function} openConnectModal - Opens wallet connection modal
   */
  const { openConnectModal } = useConnectModal();

  /**
   * Wagmi disconnect hook
   * 
   * @type {Object}
   * @property {Function} disconnect - Disconnects current wallet
   */
  const { disconnect } = useDisconnect();

  /**
   * Handle Connect Action
   * 
   * Opens the wallet connection modal.
   */
  const handleConnect = () => {
    openConnectModal?.();
  };

  /**
   * Handle Disconnect Action
   * 
   * Disconnects the current wallet connection.
   */
  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Wallet Connection</CardTitle>
      </CardHeader>
      <CardContent>
        {isConnected ? (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-600">
              Connected to: {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>
            <Button onClick={handleDisconnect} variant="destructive">
              Disconnect Wallet
            </Button>
          </div>
        ) : (
          <Button onClick={handleConnect}>
            Connect Wallet
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
