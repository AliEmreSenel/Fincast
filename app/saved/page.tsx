"use client"
import { Bookmark } from "lucide-react";
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

let wishlist = [
  "AAPL",
  "TSLA",
  "GOOGL"
]

export default function Component() {
  let router = useRouter();
  let [forecast, setForecast] = useState([]);
  let [names, setNames] = useState([]);

  useEffect(() => {
    Promise.all(wishlist.map((stock) => {
      return fetch("http://172.20.10.6/api/forecast/" + stock, { method: "get", headers: new Headers({ "ngrok-skip-browser-warning": "true", }) })
        .then((res) => res.json())
    })).then((data) => { //@ts-ignore
      setForecast(data)
    })
  }, [])

  useEffect(() => {
    Promise.all(wishlist.map((stock) => {
      return fetch("http://172.20.10.6/api/forecast/" + stock + "/name", { method: "get", headers: new Headers({ "ngrok-skip-browser-warning": "true", }) })
        .then((res) => res.json())
    })).then((data) => { // @ts-ignore
      setNames(data)
    });
  }, [])

  if (forecast.length === 0 || names.length === 0)
    return <div>Loading...</div>

  return (
    <div className="p-4">
      <div className="grid gap-4">
        <div className="mb-4 flex pb-4 border-b">
          <div className='flex flex-grow flex-row'>
            <Bookmark className="h-16 w-16 me-2 inlince-block" />
            <h1 className="self-center text-3xl font-bold text-gray-900 dark:text-gray-100 inline-block">Bookmarks</h1>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {wishlist.map((stock) => (
            <Card key={stock} onClick={() => router.push(`/details/${stock}`)}>
              <CardHeader>
                {/* @ts-ignore */}
                <CardTitle>{names.find((n) => n.stock == stock)!.name} ({stock})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Predicted Direction</p>
                    {/* @ts-ignore */}
                    <p className={`text-lg font-semibold text-${forecast.find((f) => f.stock == stock)!.forecast == "UP" ? "green" : "red"}-500`}>{forecast.find((f) => f.stock == stock)!.forecast}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Predicted Change</p>
                    {/* @ts-ignore */}
                    <p className={`text-lg font-semibold text-${forecast.find((f) => f.stock == stock)!.forecast == "UP" ? "green" : "red"}-500`}>{forecast.find((f) => f.stock == stock)!.forecast == "UP" ? "" : "-"}{forecast.find((f) => f.stock == stock)!.percent}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>

  );
}

