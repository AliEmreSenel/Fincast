"use client"
import EChartsReact from 'echarts-for-react'

let article2data = [{ "x": "2006-04-03", "y": 19.53 }, { "x": "2006-04-04", "y": 19.59 }, { "x": "2006-04-05", "y": 19.66 }, { "x": "2006-04-06", "y": 19.53 }, { "x": "2006-04-07", "y": 19.31 }, { "x": "2006-04-10", "y": 19.34 }, { "x": "2006-04-11", "y": 19.23 }, { "x": "2006-04-12", "y": 19.28 }, { "x": "2006-04-13", "y": 19.19 }, { "x": "2006-04-17", "y": 19.02 }, { "x": "2006-04-18", "y": 19.29 }, { "x": "2006-04-19", "y": 19.16 }, { "x": "2006-04-20", "y": 19.16 }, { "x": "2006-04-21", "y": 19.24 }, { "x": "2006-04-24", "y": 19.21 }, { "x": "2006-04-25", "y": 19.21 }, { "x": "2006-04-26", "y": 19.21 }, { "x": "2006-04-27", "y": 19.31 }, { "x": "2006-04-28", "y": 17.12 }, { "x": "2006-05-01", "y": 17.22 }, { "x": "2006-05-02", "y": 17.02 }, { "x": "2006-05-03", "y": 16.42 }, { "x": "2006-05-04", "y": 16.61 }, { "x": "2006-05-05", "y": 16.87 }, { "x": "2006-05-08", "y": 16.82 }, { "x": "2006-05-09", "y": 16.74 }, { "x": "2006-05-10", "y": 16.85 }, { "x": "2006-05-11", "y": 16.46 }, { "x": "2006-05-12", "y": 16.42 }, { "x": "2006-05-15", "y": 16.47 }, { "x": "2006-05-16", "y": 16.37 }, { "x": "2006-05-17", "y": 16.17 }, { "x": "2006-05-18", "y": 16.24 }, { "x": "2006-05-19", "y": 16.05 }, { "x": "2006-05-22", "y": 16.28 }, { "x": "2006-05-23", "y": 16.22 }, { "x": "2006-05-24", "y": 16.72 }, { "x": "2006-05-25", "y": 16.89 }, { "x": "2006-05-26", "y": 16.88 }, { "x": "2006-05-30", "y": 16.47 }, { "x": "2006-05-31", "y": 16.12 }, { "x": "2006-06-01", "y": 16.24 }, { "x": "2006-06-02", "y": 16.19 }, { "x": "2006-06-05", "y": 16.01 }, { "x": "2006-06-06", "y": 15.75 }, { "x": "2006-06-07", "y": 15.68 }, { "x": "2006-06-08", "y": 15.73 }, { "x": "2006-06-09", "y": 15.60 }, { "x": "2006-06-12", "y": 15.45 }, { "x": "2006-06-13", "y": 15.31 }, { "x": "2006-06-14", "y": 15.57 }, { "x": "2006-06-15", "y": 15.70 }, { "x": "2006-06-16", "y": 15.72 }, { "x": "2006-06-19", "y": 16.04 }, { "x": "2006-06-20", "y": 16.05 }, { "x": "2006-06-21", "y": 16.42 }, { "x": "2006-06-22", "y": 16.28 }, { "x": "2006-06-23", "y": 16.01 }, { "x": "2006-06-26", "y": 16.24 }, { "x": "2006-06-27", "y": 16.27 }, { "x": "2006-06-28", "y": 16.48 }, { "x": "2006-06-29", "y": 16.70 }, { "x": "2006-06-30", "y": 16.58 }, { "x": "2006-07-03", "y": 16.86 }, { "x": "2006-07-05", "y": 16.61 }, { "x": "2006-07-06", "y": 16.71 }, { "x": "2006-07-07", "y": 16.58 }, { "x": "2006-07-10", "y": 16.72 }, { "x": "2006-07-11", "y": 16.44 }, { "x": "2006-07-12", "y": 16.11 }, { "x": "2006-07-13", "y": 15.84 }, { "x": "2006-07-14", "y": 15.86 }, { "x": "2006-07-17", "y": 16.00 }, { "x": "2006-07-18", "y": 16.18 }, { "x": "2006-07-19", "y": 16.65 }, { "x": "2006-07-20", "y": 16.26 }, { "x": "2006-07-21", "y": 16.98 }, { "x": "2006-07-24", "y": 17.08 }, { "x": "2006-07-25", "y": 17.23 }, { "x": "2006-07-26", "y": 17.34 }, { "x": "2006-07-27", "y": 16.98 }, { "x": "2006-07-28", "y": 17.25 }, { "x": "2006-07-31", "y": 17.12 }, { "x": "2006-08-01", "y": 17.07 }, { "x": "2006-08-02", "y": 17.29 }, { "x": "2006-08-03", "y": 17.23 }, { "x": "2006-08-04", "y": 17.28 }, { "x": "2006-08-07", "y": 17.23 }, { "x": "2006-08-08", "y": 17.32 }, { "x": "2006-08-09", "y": 17.39 }, { "x": "2006-08-10", "y": 17.40 }, { "x": "2006-08-11", "y": 17.38 }, { "x": "2006-08-14", "y": 17.45 }, { "x": "2006-08-15", "y": 17.58 }, { "x": "2006-08-16", "y": 17.64 }, { "x": "2006-08-17", "y": 17.64 }, { "x": "2006-08-18", "y": 18.42 }, { "x": "2006-08-21", "y": 18.65 }, { "x": "2006-08-22", "y": 18.30 }, { "x": "2006-08-23", "y": 18.33 }, { "x": "2006-08-24", "y": 18.38 }, { "x": "2006-08-25", "y": 18.46 }, { "x": "2006-08-28", "y": 18.53 }, { "x": "2006-08-29", "y": 18.45 }, { "x": "2006-08-30", "y": 18.43 }, { "x": "2006-08-31", "y": 18.35 }, { "x": "2006-09-01", "y": 18.45 }, { "x": "2006-09-05", "y": 18.29 }, { "x": "2006-09-06", "y": 18.29 }, { "x": "2006-09-07", "y": 18.16 }, { "x": "2006-09-08", "y": 18.28 }, { "x": "2006-09-11", "y": 18.50 }, { "x": "2006-09-12", "y": 18.52 }, { "x": "2006-09-13", "y": 18.55 }, { "x": "2006-09-14", "y": 18.80 }, { "x": "2006-09-15", "y": 19.17 }, { "x": "2006-09-18", "y": 19.13 }, { "x": "2006-09-19", "y": 19.18 }, { "x": "2006-09-20", "y": 19.41 }, { "x": "2006-09-21", "y": 19.21 }, { "x": "2006-09-22", "y": 19.04 }, { "x": "2006-09-25", "y": 19.25 }, { "x": "2006-09-26", "y": 19.42 }, { "x": "2006-09-27", "y": 19.60 }, { "x": "2006-09-28", "y": 19.57 }, { "x": "2006-09-29", "y": 19.53 }, { "x": "2006-10-02", "y": 19.54 }, { "x": "2006-10-03", "y": 19.55 }, { "x": "2006-10-04", "y": 19.95 }, { "x": "2006-10-05", "y": 19.94 }, { "x": "2006-10-06", "y": 19.90 }, { "x": "2006-10-09", "y": 19.80 }, { "x": "2006-10-10", "y": 19.77 }, { "x": "2006-10-11", "y": 19.67 }, { "x": "2006-10-12", "y": 20.15 }, { "x": "2006-10-13", "y": 20.26 }, { "x": "2006-10-16", "y": 20.32 }, { "x": "2006-10-17", "y": 20.31 }, { "x": "2006-10-18", "y": 20.37 }, { "x": "2006-10-19", "y": 20.20 }, { "x": "2006-10-20", "y": 20.30 }, { "x": "2006-10-23", "y": 20.32 }, { "x": "2006-10-24", "y": 20.20 }, { "x": "2006-10-25", "y": 20.22 }, { "x": "2006-10-26", "y": 20.25 }, { "x": "2006-10-27", "y": 20.24 }, { "x": "2006-10-30", "y": 20.37 }, { "x": "2006-10-31", "y": 20.50 }, { "x": "2006-11-01", "y": 20.57 }, { "x": "2006-11-02", "y": 20.55 }, { "x": "2006-11-03", "y": 20.52 }, { "x": "2006-11-06", "y": 20.60 }, { "x": "2006-11-07", "y": 20.67 }, { "x": "2006-11-08", "y": 20.70 }, { "x": "2006-11-09", "y": 20.90 }, { "x": "2006-11-10", "y": 20.88 }, { "x": "2006-11-13", "y": 20.96 }, { "x": "2006-11-14", "y": 20.95 }, { "x": "2006-11-15", "y": 20.87 }, { "x": "2006-11-16", "y": 21.12 }, { "x": "2006-11-17", "y": 21.07 }, { "x": "2006-11-20", "y": 21.42 }, { "x": "2006-11-21", "y": 21.44 }, { "x": "2006-11-22", "y": 21.44 }, { "x": "2006-11-24", "y": 21.33 }, { "x": "2006-11-27", "y": 21.13 }, { "x": "2006-11-28", "y": 21.06 }, { "x": "2006-11-29", "y": 21.19 }, { "x": "2006-11-30", "y": 21.04 }, { "x": "2006-12-01", "y": 20.87 }, { "x": "2006-12-04", "y": 21.02 }, { "x": "2006-12-05", "y": 20.87 }, { "x": "2006-12-06", "y": 20.77 }, { "x": "2006-12-07", "y": 20.67 }, { "x": "2006-12-08", "y": 21.07 }, { "x": "2006-12-11", "y": 21.17 }, { "x": "2006-12-12", "y": 21.09 }, { "x": "2006-12-13", "y": 21.18 }, { "x": "2006-12-14", "y": 21.55 }, { "x": "2006-12-15", "y": 21.63 }, { "x": "2006-12-18", "y": 21.42 }, { "x": "2006-12-19", "y": 21.49 }, { "x": "2006-12-20", "y": 21.56 }, { "x": "2006-12-21", "y": 21.48 }, { "x": "2006-12-22", "y": 21.24 }, { "x": "2006-12-26", "y": 21.49 }, { "x": "2006-12-27", "y": 21.51 }, { "x": "2006-12-28", "y": 21.48 }, { "x": "2006-12-29", "y": 21.40 }]

export function Article2() {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Rounding Bottom</h2>
      <p>
        The rounding bottom chart pattern, also known as the saucer bottom or bowl bottom, is a long-term reversal pattern that typically forms after an extended downtrend. It is characterized by a gradual and smooth transition from a downward price movement to an upward trend:
      </p>
      <ol>
        <li>
          <span className="text-lg font-semibold">1. Downtrend: </span>The rounding bottom pattern begins with a prolonged downtrend in the price of an asset. This downtrend is characterized by lower lows and lower highs on the price chart, indicating a consistent decline in the asset&apos;s value over time.
        </li>
        <li>
          <span className="text-lg font-semibold">2. Transition Phase: </span>As the downtrend loses momentum, the price movement begins to flatten out, forming a gradual curve or rounding bottom shape on the chart. This phase represents a period of consolidation and accumulation, where buying pressure starts to equal or exceed selling pressure.
        </li>
        <li>
          <span className="text-lg font-semibold">3. Symmetrical Curve: </span>The rounding bottom typically forms a smooth, symmetrical curve on the price chart, resembling the shape of a bowl or saucer. This curve can vary in duration and steepness but is generally characterized by a gradual transition from the downtrend to the uptrend.
        </li>
        <li>
          <span className="text-lg font-semibold">4. Volume: </span>During the formation of the rounding bottom, trading volume tends to diminish as the pattern progresses. This decline in volume reflects decreasing selling pressure and can signal a potential reversal in the trend. However, as the pattern approaches completion and the price begins to rise, there may be an increase in volume as buyers become more active.
        </li>
        <li>
          <span className="text-lg font-semibold">5. Breakout: </span>The rounding bottom pattern is considered complete when the price breaks above the resistance level formed by the highest point of the curve. This breakout signals a reversal of the previous downtrend and the beginning of a new uptrend. Traders often look for confirmation of the breakout through increased volume and sustained upward momentum.
        </li>
        <Article2Graph />
      </ol>

    </div>

  )
}

export function Article2Graph() {
  return (
    <EChartsReact option={
      {
        grid: { top: 24, right: 8, bottom: 24, left: 30 },
        xAxis: {
          type: "category",
          data: article2data.map((point) => point.x)
        },
        yAxis: {
          type: "value",
          min: 13,
        },
        series: [
          {
            name: "Price",
            type: "line",
            smooth: false,
            symbolSize: 0.01,
            data: article2data.map((point) => point.y),
            markArea: {
              itemStyle: {
                color: 'rgba(255, 173, 177, 0.4)'
              },
              data: [
                [
                  {
                    name: 'Rounding Bottom',
                    xAxis: '2006-04-27'
                  },
                  {
                    xAxis: '2006-09-20'
                  }
                ]
              ]
            }
          },
          {
            name: "Neckline",
            type: "line",
            symbolSize: 0.01,
            data: article2data.map((_) => 19.31)
          }
        ],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        }
      }} />
  )
}
