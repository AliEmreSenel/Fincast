"use client"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { SearchIcon, SettingsIcon, StoreIcon, UserIcon, XIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

let stocks = [
  {
    name: "Apple Inc.",
    symbol: "AAPL",
    priceList: [
      145.32,
      230.45,
      210.23,
      400.56,
    ],
    high: 175.53,
    low: 120.67,
    volume: 12.3,
    marketCap: 2.4,
    percentChange: 2.5,
  },
  {
    name: "Tesla Inc.",
    symbol: "TSLA",
    priceList: [
      320.45,
      250.67,
      402.67,
      300.11,
    ],
    high: 402.67,
    low: 250.11,
    volume: 8.7,
    marketCap: 1.0,
    percentChange: -3.2,
  },
  {
    name: "Amazon.com Inc.",
    symbol: "AMZN",
    priceList: [
      105.23,
      170.83,
      81.43,
      150.67,
    ],
    high: 170.83,
    low: 81.43,
    volume: 15.4,
    marketCap: 1.1,
    percentChange: 1.8,
  },
  {
    name: "Microsoft Corporation",
    symbol: "MSFT",
    priceList: [
      130.23,
      180.83,
      91.43,
      140.67,
    ],
    high: 180.83,
    low: 91.43,
    volume: 10.4,
    marketCap: 1.9,
    percentChange: 0.5,
  },
  {
    name: "Alphabet Inc.",
    symbol: "GOOGL",
    priceList: [
      150.23,
      190.83,
      101.43,
      160.67,
    ],
    high: 190.83,
    low: 101.43,
    volume: 9.4,
    marketCap: 2.1,
    percentChange: 92.8,
  }
]


export default function Home() {
  let router = useRouter();
  let [watchlist, setWatchlist] = useState([
    "AAPL",
    "TSLA",
    "AMZN",
  ]);
  let [searchContent, setSearchContent] = useState("");
  return (
    <div className="flex h-screen w-full">
      <div className="hidden w-64 shrink-0 border-r bg-gray-100 dark:border-gray-800 dark:bg-gray-900 lg:block">
        <div className="flex h-full flex-col justify-between py-6 px-4">
          <div className="space-y-6">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <StoreIcon className="h-6 w-6" />
              <span>Stock Tracker</span>
            </Link>
            <div className="relative">
              <Command>
                <CommandInput

                  className="w-full rounded-md border border-gray-200 bg-white px-10 py-2 text-sm shadow-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:focus:border-gray-50 dark:focus:ring-gray-50"
                  placeholder="Search stocks..."
                />
                <CommandList>
                  {searchContent !== "" && (
                    <>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup>
                        {stocks.map((stock) => (
                          <CommandItem key={stock.symbol} onClick={() => router.push(`/details/${stock.symbol}`)}>
                            <span>{stock.name} ({stock.symbol})</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </>
                  )
                  }
                </CommandList>
              </Command>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Watchlist</h3>
              <ul className="space-y-1">
                {watchlist.map((stock) => (
                  <li key={stock}>
                    <Button
                      className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
                      size="sm"
                      variant="ghost"
                    >
                      <span>{stock}</span>
                      <XIcon className="h-4 w-4" onClick={() => setWatchlist(watchlist.filter((item) => item !== stock))} />
                    </Button>
                  </li>
                ))}
              </ul>
              <Button className="w-full" size="sm" variant="outline" onClick={() => setWatchlist(watchlist.concat(["GOOGL"]))}>
                Add to Watchlist
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Button className="w-full" size="sm" variant="ghost">
              <SettingsIcon className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button className="w-full" size="sm" variant="ghost">
              <UserIcon className="h-4 w-4 mr-2" />
              Profile
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <header className="flex h-16 items-center border-b bg-white px-6 dark:border-gray-800 dark:bg-gray-950">
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50">Dashboard</h1>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                size="icon"
                variant="ghost"
              >
                <img
                  alt="Avatar"
                  className="rounded-full"
                  height="32"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "32/32",
                    objectFit: "cover",
                  }}
                  width="32"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {stocks.map((stock) => (
              <Card key={stock.symbol} onClick={() => router.push(`/details/${stock.symbol}`)}>
                <CardHeader>
                  <CardTitle>{stock.name} ({stock.symbol})</CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold">${stock.priceList[0]}</span>
                      <span className={`text-sm ${stock.percentChange > 0 ? "text-green-500" : "text-red-500"}`}>{stock.percentChange > 0 ? "+" : ""}{stock.percentChange}%</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Volume</p>
                      <p className="text-lg font-semibold">{stock.volume}M</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">52-Week High</p>
                      <p className="text-lg font-semibold">${stock.high}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">52-Week Low</p>
                      <p className="text-lg font-semibold">${stock.low}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Market Cap</p>
                      <p className="text-lg font-semibold">${stock.marketCap}T</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div >
    </div >
  )
}

