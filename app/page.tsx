"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { CardContent, Card } from "@/components/ui/card"
import { Command, CommandInput, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Cloud, CloudLightning, CloudRain, LucideSun } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { IoMdMedal } from "react-icons/io"
import { AiOutlineStock } from "react-icons/ai"
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
      <div className="w-full md:w1/2 lg:w-1/2 xl:w-2/5 mx-auto p-5">
        <h1 className="text-8xl font-semibold text-gray-900 dark:text-gray-50">Hi, User</h1>
        <main className="w-full mt-5">
          <div className="w-full p-6">
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
                            <CommandItem key={stock.symbol} onClick={() => router.push(`/details/${stock.symbol}`)} onSelect={() => router.push(`/details/${stock.symbol}`)}>
                              <span>{stock.name} ({stock.symbol})</span>
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
          <div className="p-6 grid grid-cols-3 gap-4">
            <Link href="/games">
              <Card>
                <CardContent className="text-center pt-3">
                  <IoMdMedal className="mx-auto h-24 w-24" />
                  Daily Games
                </CardContent>
              </Card>
            </Link>
            <Link href="/saved">
              <Card>
                <CardContent className="text-center pt-3">
                  <AiOutlineStock className="mx-auto h-24 w-24" />
                  Saved
                </CardContent>
              </Card>
            </Link>
            <Link href="/education">
              <Card>
                <CardContent className="text-center pt-3">
                  <IoSchool className="mx-auto h-24 w-24" />
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
                    Forecast
                  </TableHead>
                  <TableHead className="text-lg">
                    Stocks
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <td>
                    <LucideSun className="mx-auto h-24 w-24 text-yellow-500" />
                  </td>
                  <td>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                      AAPL
                    </Badge>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                      GOOGL
                    </Badge>
                  </td>
                </TableRow>
                <TableRow>
                  <td>
                    <Cloud className="mx-auto h-24 w-24 text-blue-500" />
                  </td>
                  <td>
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                      TSLA
                    </Badge>
                  </td>
                </TableRow>
                <tr>
                  <td>
                    <CloudRain className="mx-auto h-24 w-24 text-blue-500" />
                  </td>
                  <td>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      AMZN
                    </Badge>
                  </td>
                </tr>
                <tr>
                  <td>
                    <CloudLightning className="mx-auto h-24 w-24 text-gray-500" />
                  </td>
                  <td>
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
                      MSFT
                    </Badge>
                  </td>
                </tr>
              </TableBody>
            </Table>
          </div>
        </main>
      </div >
    </div >
  )
}

