"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { CardContent, Card } from "@/components/ui/card"
import { Command, CommandInput, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Bookmark, CloudLightning, CloudRain, CloudSun, LucideSun } from "lucide-react"
import { IoMdMedal } from "react-icons/io"
import { IoSchool } from "react-icons/io5"

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

let forecast = [
  { stock: "AAPL", forecast: "UP", percent: 2.5 },
  { stock: "TSLA", forecast: "DOWN", percent: -3.2 },
  { stock: "AMZN", forecast: "UP", percent: 1.8 },
  { stock: "MSFT", forecast: "UP", percent: 0.5 },
  { stock: "GOOGL", forecast: "UP", percent: 92.8 },
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
    <div className="h-screen w-screen justify-center flex-col">
      <header className="flex h-16 items-center p-5 border-b bg-gray-200 border-gray-700 pt-5 mb-5">
        <div className="flex flex-1 h-16">
          <img src="logo.png" alt="Fincast Logo" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="rounded-full border border-gray-200 w-10 h-10 dark:border-gray-800"
              size="icon"
              variant="ghost"
            >
              <img
                alt="Avatar"
                className="rounded-full h-9 w-9"
                src="/user-avatar-svgrepo-com.svg"
                style={{
                  aspectRatio: "64/64",
                  objectFit: "cover",
                }}
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
      <div className="w-full md:w-2/3 lg:w-1/2 xl:w-2/5 mx-auto p-5">
        <h1 className="sm:text-8xl text-6xl font-semibold text-gray-900 dark:text-gray-50">Hi, User</h1>
        <main className="w-full mt-5">
          <div className="w-full sm:p-6 pb-6">
            <div className="flex items-center justify-between border rounded">
              <Command className="overflow-visible bg-transparent">
                <CommandInput
                  placeholder="Search stocks..."
                  value={searchContent}
                  onValueChange={(e) => setSearchContent(e)}
                />
                <div className="relative">
                  <CommandList>
                    {searchContent !== "" && (
                      <div className="absolute w-full top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in z-10">
                        <CommandGroup className="h-full overflow-auto">
                          {stocks.map((stock) => (
                            <CommandItem key={stock.symbol}
                              onClick={() => router.push(`/details/${stock.symbol}`)}
                              onSelect={() => router.push(`/details/${stock.symbol}`)}>
                              <span
                                onClick={() => router.push(`/details/${stock.symbol}`)}>{stock.name} ({stock.symbol})</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </div>
                    )}
                  </CommandList>
                </div>
              </Command>
            </div>
          </div>
          <div className="sm:p-6 grid grid-cols-3 gap-1">
            <Link href="/games">
              <Card>
                <CardContent className="text-center px-0 pt-3">
                  <IoMdMedal className="mx-auto sm:h-24 sm:w-24 h-16 w-16" />
                  Daily Quiz
                </CardContent>
              </Card>
            </Link>
            <Link href="/saved">
              <Card>
                <CardContent className="text-center px-0 pt-3">
                  <Bookmark className="mx-auto sm:h-24 sm:w-24 h-16 w-16" />
                  Saved
                </CardContent>
              </Card>
            </Link>
            <Link href="/education">
              <Card>
                <CardContent className="text-center px-0 pt-3">
                  <IoSchool className="mx-auto sm:h-24 sm:w-24 h-16 w-16" />
                  Educational
                </CardContent>
              </Card>
            </Link>
          </div>
          <div className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-lg text-center">
                    Weather
                  </TableHead>
                  <TableHead className="text-lg text-center">
                    Forecast
                  </TableHead>
                  <TableHead className="text-lg text-center">
                    Stocks
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {forecast.map((item) => (
                  <TableRow key={item.stock}>
                    <td>
                      {item.forecast === "UP"
                        ? item.percent > 1
                          ? <LucideSun className="mx-auto h-24 w-24 text-yellow-500" />
                          : <CloudSun className="mx-auto h-24 w-24 text-yellow-500" />
                        : item.percent < -1
                          ? <CloudLightning className="mx-auto h-24 w-24 text-gray-500" />
                          : <CloudRain className="mx-auto h-24 w-24 text-blue-500" />
                      }
                    </td>
                    <td className="text-center">
                      <span className={`text-lg font-semibold ${item.percent > 0 ? "text-green-500" : "text-red-500"}`}>
                        {item.forecast} {item.percent}%
                      </span>
                    </td>
                    <td className="text-center">
                      <a className="text-center" href={`/details/${item.stock}`}>
                        <span className="text-lg font-semibold">{item.stock}</span>
                      </a>
                    </td>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </div >
    </div >
  )
}

