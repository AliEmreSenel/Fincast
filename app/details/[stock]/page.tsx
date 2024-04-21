"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react";
import EChartsReact from 'echarts-for-react'
import { Textarea } from "@/components/ui/textarea";

export default function Component({ params }: { params: { stock: string } }) {
  let [name, setName] = useState("");
  let [dailyPrices, setDailyPrices] = useState([]);
  let [forecast, setForecast] = useState(null);
  let [questions, setQuestions] = useState([]);
  let [question, setQuestion] = useState("");
  let [just, setJust] = useState("");
  let [askedQAs, setAskedQAs] = useState([]);

  useEffect(() => {
    fetch(`http://172.20.10.6/api/forecast/${params.stock}/name`, { method: "get", headers: new Headers({ "ngrok-skip-browser-warning": "true", }) })
      .then(res => res.json())
      .then(data => {
        setName(data.name);
      });
    fetch(`http://172.20.10.6/api/forecast/${params.stock}/daily`, { method: "get", headers: new Headers({ "ngrok-skip-browser-warning": "true", }) })
      .then(res => res.json())
      .then(data => setDailyPrices(data));
    fetch(`http://172.20.10.6/api/forecast/${params.stock}`, { method: "get", headers: new Headers({ "ngrok-skip-browser-warning": "true", }) })
      .then(res => res.json())
      .then(data => setForecast(data));
    fetch(`http://172.20.10.6/api/forecast/${params.stock}/QA`, { method: "get", headers: new Headers({ "ngrok-skip-browser-warning": "true", }) })
      .then(res => res.json())
      .then(data => {
        setQuestions(data.questions);
        setJust(data.result);
      });
  }, [params.stock]);

  if (dailyPrices.length === 0 || forecast === null || just === "" || name === "") {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{name} ({params.stock})</h1>
        </div>
        <div className="mb-8">
          <EChartsReact option={
            {
              grid: { top: 24, right: 8, bottom: 24, left: 30 },
              xAxis: {
                type: "category",
                data: Object.keys(dailyPrices)
              },
              yAxis: {
                type: "value",
                scale: true,
              },
              toolbox: {
                feature: {
                  dataZoom: {
                    yAxisIndex: 'none'
                  },
                  restore: {},
                  saveAsImage: {}
                }
              },
              dataZoom: [
                {
                  show: true,
                  realtime: true,
                  start: 0,
                  end: 100,
                  xAxisIndex: [0, 1]
                },
                {
                  type: 'inside',
                  realtime: true,
                  start: 0,
                  end: 100,
                  xAxisIndex: [0, 1]
                }
              ],
              series: [
                {
                  name: "Price",
                  type: "line",
                  smooth: false,
                  symbolSize: 0.01,
                  data: Object.values(dailyPrices),
                }
              ],
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  type: "cross"
                }
              }
            }} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Forecast</h2>
          <div className={`text-lg`}>
            {/* @ts-ignore */}
            {params.stock} is forecasted to go <span className={`text-${forecast.forecast == "UP" ? "green" : "red"}-500`}>{forecast.forecast} by {forecast.percent}%</span> within one week
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Justification</h3>
          <div className="whitespace-pre text-wrap">
            {just}
          </div>
        </div>
        {askedQAs && askedQAs.length > 0 && < div >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Asked Questions:</h2>
          {askedQAs.map((qa, i) => (
            <div key={i} className="mb-4">
              {/* @ts-ignore */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Q: {qa.question}</h3>
              <div className="whitespace-pre text-wrap">
                {/* @ts-ignore */}
                A: {qa.answer}
              </div>
            </div>
          ))}
        </div>}
        {questions && questions.length > 0 && <>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Suggested Questions:</h2>
          <div className="w-full gap-4 mb-4">
            {questions.map((q, i) => (
              <Badge key={i} onClick={() => setQuestion(q)} className="cursor-pointer w-full">
                {q}
              </Badge>
            ))}
          </div>
        </>}
        <div className="flex items-center gap-4">
          <Textarea className="flex-1" placeholder="Ask a question about the stock data..." value={question} onChange={(e) => setQuestion(e.target.value)} />
          <Button onClick={() => {
            fetch(`http://172.20.10.6/api/forecast/${params.stock}/QA`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true",
              },
              body: JSON.stringify({ question })
            })
              .then(res => res.json())
              .then(data => { // @ts-ignore
                setAskedQAs(askedQAs.concat([{ question, answer: data.answers }]));
              });
          }}>
            Submit
          </Button>
        </div>
      </div>
    </div >
  )
}

