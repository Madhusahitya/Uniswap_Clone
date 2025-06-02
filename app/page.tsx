"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowDownUp, Settings, Wallet, ChevronDown, Info, Zap, TrendingUp, Shield, Clock } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { motion, AnimatePresence } from "framer-motion"

// Mock token data
const tokens = [
  {
    symbol: "ETH",
    name: "Ethereum",
    icon: "⟠",
    price: 2340.5,
    balance: 1.2345,
    address: "0x...",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    icon: "💵",
    price: 1.0,
    balance: 1250.0,
    address: "0x...",
  },
  {
    symbol: "USDT",
    name: "Tether",
    icon: "₮",
    price: 1.0,
    balance: 890.5,
    address: "0x...",
  },
  {
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    icon: "₿",
    price: 43250.0,
    balance: 0.0234,
    address: "0x...",
  },
  {
    symbol: "UNI",
    name: "Uniswap",
    icon: "🦄",
    price: 8.45,
    balance: 125.67,
    address: "0x...",
  },
  {
    symbol: "LINK",
    name: "Chainlink",
    icon: "🔗",
    price: 14.23,
    balance: 45.89,
    address: "0x...",
  },
]

export default function TokenSwapInterface() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [fromToken, setFromToken] = useState(tokens[0])
  const [toToken, setToToken] = useState(tokens[1])
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [slippage, setSlippage] = useState([0.5])
  const [isSwapping, setIsSwapping] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showTokenSelector, setShowTokenSelector] = useState<"from" | "to" | null>(null)

  // Mock exchange rate calculation
  useEffect(() => {
    if (fromAmount && fromToken && toToken) {
      const rate = fromToken.price / toToken.price
      const calculated = (Number.parseFloat(fromAmount) * rate).toFixed(6)
      setToAmount(calculated)
    } else {
      setToAmount("")
    }
  }, [fromAmount, fromToken, toToken])

  const connectWallet = async () => {
    // Mock wallet connection
    setIsWalletConnected(true)
    setWalletAddress("0x1234...5678")
  }

  const disconnectWallet = () => {
    setIsWalletConnected(false)
    setWalletAddress("")
  }

  const swapTokens = () => {
    const temp = fromToken
    setFromToken(toToken)
    setToToken(temp)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  const handleSwap = async () => {
    if (!fromAmount || !toAmount) return

    setIsSwapping(true)
    // Mock swap delay
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSwapping(false)
    setFromAmount("")
    setToAmount("")
  }

  const TokenSelector = ({
    type,
    onSelect,
  }: { type: "from" | "to"; onSelect: (token: (typeof tokens)[0]) => void }) => (
    <Dialog open={showTokenSelector === type} onOpenChange={(open) => setShowTokenSelector(open ? type : null)}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Select a token</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {tokens.map((token) => (
            <motion.div
              key={token.symbol}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-pink-50 cursor-pointer border border-transparent hover:border-pink-200 transition-all"
              onClick={() => {
                onSelect(token)
                setShowTokenSelector(null)
              }}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">{token.icon}</div>
                <div>
                  <div className="font-semibold">{token.symbol}</div>
                  <div className="text-sm text-gray-500">{token.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">${token.price.toLocaleString()}</div>
                <div className="text-sm text-gray-500">{token.balance.toFixed(4)}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      {/* Header */}
      <header className="border-b border-pink-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="text-2xl">🦄</div>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                UniSwap Clone
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-pink-100 text-pink-700 border-pink-200">
                <TrendingUp className="w-3 h-3 mr-1" />
                Ethereum
              </Badge>

              {isWalletConnected ? (
                <Button
                  variant="outline"
                  onClick={disconnectWallet}
                  className="border-pink-200 text-pink-700 hover:bg-pink-50"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  {walletAddress}
                </Button>
              ) : (
                <Button
                  onClick={connectWallet}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto pt-8 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="border-pink-200 shadow-xl shadow-pink-100/50">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold text-gray-900">Swap</h1>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-gray-500 hover:text-pink-600 hover:bg-pink-50"
                >
                  <Settings className="w-5 h-5" />
                </Button>
              </div>

              {/* Settings Panel */}
              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 p-4 bg-pink-50 rounded-lg border border-pink-200"
                  >
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Slippage tolerance: {slippage[0]}%
                        </label>
                        <Slider
                          value={slippage}
                          onValueChange={setSlippage}
                          max={5}
                          min={0.1}
                          step={0.1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>0.1%</span>
                          <span>5%</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Info className="w-4 h-4" />
                        <span>
                          Your transaction will revert if the price changes unfavorably by more than this percentage.
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* From Token */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">From</span>
                    {isWalletConnected && (
                      <span className="text-sm text-gray-500">Balance: {fromToken.balance.toFixed(4)}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Input
                      type="number"
                      placeholder="0.0"
                      value={fromAmount}
                      onChange={(e) => setFromAmount(e.target.value)}
                      className="border-0 bg-transparent text-2xl font-semibold p-0 h-auto focus-visible:ring-0"
                    />
                    <Button
                      variant="outline"
                      onClick={() => setShowTokenSelector("from")}
                      className="flex items-center gap-2 bg-white border-gray-300 hover:bg-gray-50"
                    >
                      <span className="text-lg">{fromToken.icon}</span>
                      <span className="font-semibold">{fromToken.symbol}</span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    ${fromAmount ? (Number.parseFloat(fromAmount) * fromToken.price).toFixed(2) : "0.00"}
                  </div>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={swapTokens}
                    className="p-2 bg-white border-2 border-pink-200 rounded-full hover:border-pink-300 transition-colors"
                  >
                    <ArrowDownUp className="w-5 h-5 text-pink-600" />
                  </motion.button>
                </div>

                {/* To Token */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">To</span>
                    {isWalletConnected && (
                      <span className="text-sm text-gray-500">Balance: {toToken.balance.toFixed(4)}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Input
                      type="number"
                      placeholder="0.0"
                      value={toAmount}
                      readOnly
                      className="border-0 bg-transparent text-2xl font-semibold p-0 h-auto focus-visible:ring-0"
                    />
                    <Button
                      variant="outline"
                      onClick={() => setShowTokenSelector("to")}
                      className="flex items-center gap-2 bg-white border-gray-300 hover:bg-gray-50"
                    >
                      <span className="text-lg">{toToken.icon}</span>
                      <span className="font-semibold">{toToken.symbol}</span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    ${toAmount ? (Number.parseFloat(toAmount) * toToken.price).toFixed(2) : "0.00"}
                  </div>
                </div>

                {/* Exchange Rate */}
                {fromAmount && toAmount && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-pink-50 rounded-lg p-3 border border-pink-200"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Exchange Rate</span>
                      <span className="font-medium">
                        1 {fromToken.symbol} = {(fromToken.price / toToken.price).toFixed(6)} {toToken.symbol}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span className="text-gray-600">Price Impact</span>
                      <span className="text-green-600">{"<0.01%"}</span>
                    </div>
                  </motion.div>
                )}

                {/* Swap Button */}
                <Button
                  onClick={handleSwap}
                  disabled={!isWalletConnected || !fromAmount || !toAmount || isSwapping}
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:from-gray-300 disabled:to-gray-300 disabled:text-gray-500"
                >
                  {isSwapping ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Swapping...
                    </div>
                  ) : !isWalletConnected ? (
                    "Connect Wallet"
                  ) : !fromAmount || !toAmount ? (
                    "Enter an amount"
                  ) : (
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Swap
                    </div>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 grid grid-cols-3 gap-4"
        >
          <Card className="p-4 text-center border-pink-200">
            <Shield className="w-6 h-6 text-pink-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-900">Secure</div>
            <div className="text-xs text-gray-500">Audited contracts</div>
          </Card>
          <Card className="p-4 text-center border-pink-200">
            <Clock className="w-6 h-6 text-pink-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-900">Fast</div>
            <div className="text-xs text-gray-500">Instant swaps</div>
          </Card>
          <Card className="p-4 text-center border-pink-200">
            <TrendingUp className="w-6 h-6 text-pink-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-900">Best Price</div>
            <div className="text-xs text-gray-500">Optimal routes</div>
          </Card>
        </motion.div>
      </main>

      {/* Token Selectors */}
      <TokenSelector type="from" onSelect={(token) => setFromToken(token)} />
      <TokenSelector type="to" onSelect={(token) => setToToken(token)} />
    </div>
  )
}
