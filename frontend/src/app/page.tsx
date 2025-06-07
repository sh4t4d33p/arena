/**
 * Home Page
 * 
 * Landing page for the Decentralized Social application.
 * Handles wallet connection and displays welcome message.
 * 
 * @file page.tsx
 */
import { useAccount } from 'wagmi';
import { Button } from '@/components/ui/button';

/**
 * Home Page Component
 * 
 * @component Home
 * @returns {JSX.Element} Home page component
 */
export default function Home() {
  /**
   * Current wallet connection state
   * 
   * @type {{ isConnected: boolean, address: string | undefined }}
   */
  const { isConnected, address } = useAccount();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Welcome to Decentralized Social</h1>
          
          {!isConnected ? (
            <div className="flex flex-col gap-4">
              <p className="text-gray-600">
                Connect your Ethereum wallet to get started
              </p>
              <Button>Connect Wallet</Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-gray-600">
                Connected as: {address?.substring(0, 6)}...{address?.substring(address.length - 4)}
              </p>
              <Button variant="outline">Disconnect</Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
