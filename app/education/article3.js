"use client"
import EChartsReact from 'echarts-for-react'

let article3data = [{ "x": "2020-10-01", "y": 70.02999877929688 }, { "x": "2020-10-02", "y": 68.80999755859375 }, { "x": "2020-10-05", "y": 71.94999694824219 }, { "x": "2020-10-06", "y": 71.04000091552734 }, { "x": "2020-10-07", "y": 72.37000274658203 }, { "x": "2020-10-08", "y": 72.93000030517578 }, { "x": "2020-10-09", "y": 73.0 }, { "x": "2020-10-12", "y": 75.30999755859375 }, { "x": "2020-10-13", "y": 78.29000091552734 }, { "x": "2020-10-14", "y": 76.55999755859375 }, { "x": "2020-10-15", "y": 75.58000183105469 }, { "x": "2020-10-16", "y": 73.94000244140625 }, { "x": "2020-10-19", "y": 70.95999908447266 }, { "x": "2020-10-20", "y": 71.30999755859375 }, { "x": "2020-10-21", "y": 68.37000274658203 }, { "x": "2020-10-22", "y": 70.83999633789062 }, { "x": "2020-10-23", "y": 70.52999877929688 }, { "x": "2020-10-26", "y": 70.23999786376953 }, { "x": "2020-10-27", "y": 70.66999816894531 }, { "x": "2020-10-28", "y": 65.73999786376953 }, { "x": "2020-10-29", "y": 71.27999877929688 }, { "x": "2020-10-30", "y": 67.47000122070312 }, { "x": "2020-11-02", "y": 67.11000061035156 }, { "x": "2020-11-03", "y": 69.08000183105469 }, { "x": "2020-11-04", "y": 69.80999755859375 }, { "x": "2020-11-05", "y": 71.4800033569336 }, { "x": "2020-11-06", "y": 72.44999694824219 }, { "x": "2020-11-09", "y": 77.73999786376953 }, { "x": "2020-11-10", "y": 76.05000305175781 }, { "x": "2020-11-11", "y": 82.44000244140625 }, { "x": "2020-11-12", "y": 87.80999755859375 }, { "x": "2020-11-13", "y": 89.38999938964844 }, { "x": "2020-11-16", "y": 97.94999694824219 }, { "x": "2020-11-17", "y": 93.1500015258789 }, { "x": "2020-11-18", "y": 88.88999938964844 }, { "x": "2020-11-19", "y": 92.7699966430664 }, { "x": "2020-11-20", "y": 97.61000061035156 }, { "x": "2020-11-23", "y": 101.02999877929688 }, { "x": "2020-11-24", "y": 98.55999755859375 }, { "x": "2020-11-25", "y": 109.18000030517578 }, { "x": "2020-11-27", "y": 127.02999877929688 }, { "x": "2020-11-30", "y": 152.74000549316406 }, { "x": "2020-12-01", "y": 141.00999450683594 }, { "x": "2020-12-02", "y": 143.0 }, { "x": "2020-12-03", "y": 157.25999450683594 }, { "x": "2020-12-04", "y": 152.52000427246094 }, { "x": "2020-12-07", "y": 159.52000427246094 }, { "x": "2020-12-08", "y": 169.86000061035156 }, { "x": "2020-12-09", "y": 156.58999633789062 }, { "x": "2020-12-10", "y": 155.69000244140625 }, { "x": "2020-12-11", "y": 156.92999267578125 }, { "x": "2020-12-14", "y": 155.07000732421875 }, { "x": "2020-12-15", "y": 147.22000122070312 }, { "x": "2020-12-16", "y": 137.02999877929688 }, { "x": "2020-12-17", "y": 144.0 }, { "x": "2020-12-18", "y": 140.22999572753906 }, { "x": "2020-12-21", "y": 138.3000030517578 }, { "x": "2020-12-22", "y": 125.87999725341797 }, { "x": "2020-12-23", "y": 130.33999633789062 }, { "x": "2020-12-24", "y": 123.38999938964844 }, { "x": "2020-12-28", "y": 111.4000015258789 }, { "x": "2020-12-29", "y": 114.38999938964844 }, { "x": "2020-12-30", "y": 111.12999725341797 }, { "x": "2020-12-31", "y": 104.47000122070312 }, { "x": "2021-01-04", "y": 111.7300033569336 }, { "x": "2021-01-05", "y": 109.18000030517578 }, { "x": "2021-01-06", "y": 116.26000213623047 }, { "x": "2021-01-07", "y": 115.08999633789062 }, { "x": "2021-01-08", "y": 112.75 }, { "x": "2021-01-11", "y": 117.26000213623047 }, { "x": "2021-01-12", "y": 124.55000305175781 }, { "x": "2021-01-13", "y": 124.05999755859375 }, { "x": "2021-01-14", "y": 129.72000122070312 }, { "x": "2021-01-15", "y": 129.64999389648438 }, { "x": "2021-01-19", "y": 125.01000213623047 }, { "x": "2021-01-20", "y": 125.13999938964844 }, { "x": "2021-01-21", "y": 132.97999572753906 }, { "x": "2021-01-22", "y": 131.02000427246094 }, { "x": "2021-01-25", "y": 147.0 }, { "x": "2021-01-26", "y": 151.92999267578125 }, { "x": "2021-01-27", "y": 155.72999572753906 }, { "x": "2021-01-28", "y": 159.5500030517578 }, { "x": "2021-01-29", "y": 173.16000366210938 }, { "x": "2021-02-01", "y": 157.47999572753906 }, { "x": "2021-02-02", "y": 158.5800018310547 }, { "x": "2021-02-03", "y": 165.86000061035156 }, { "x": "2021-02-04", "y": 173.30999755859375 }, { "x": "2021-02-05", "y": 176.24000549316406 }, { "x": "2021-02-08", "y": 185.97999572753906 }, { "x": "2021-02-09", "y": 179.52000427246094 }, { "x": "2021-02-10", "y": 179.33999633789062 }, { "x": "2021-02-11", "y": 183.44000244140625 }, { "x": "2021-02-12", "y": 183.74000549316406 }, { "x": "2021-02-16", "y": 178.52999877929688 }, { "x": "2021-02-17", "y": 176.75999450683594 }, { "x": "2021-02-18", "y": 169.57000732421875 }, { "x": "2021-02-19", "y": 174.74000549316406 }, { "x": "2021-02-22", "y": 159.3699951171875 }, { "x": "2021-02-23", "y": 150.1699981689453 }, { "x": "2021-02-24", "y": 144.7899932861328 }, { "x": "2021-02-25", "y": 148.3800048828125 }, { "x": "2021-02-26", "y": 154.80999755859375 }, { "x": "2021-03-01", "y": 157.39999389648438 }, { "x": "2021-03-02", "y": 146.80999755859375 }, { "x": "2021-03-03", "y": 131.22000122070312 }, { "x": "2021-03-04", "y": 132.3000030517578 }, { "x": "2021-03-05", "y": 132.19000244140625 }, { "x": "2021-03-08", "y": 123.47000122070312 }, { "x": "2021-03-09", "y": 130.8699951171875 }, { "x": "2021-03-10", "y": 129.75 }, { "x": "2021-03-11", "y": 140.47000122070312 }, { "x": "2021-03-12", "y": 136.99000549316406 }, { "x": "2021-03-15", "y": 143.66000366210938 }, { "x": "2021-03-16", "y": 156.02000427246094 }, { "x": "2021-03-17", "y": 147.5500030517578 }, { "x": "2021-03-18", "y": 141.4600067138672 }, { "x": "2021-03-19", "y": 143.74000549316406 }, { "x": "2021-03-22", "y": 145.60000610351562 }, { "x": "2021-03-23", "y": 136.52000427246094 }, { "x": "2021-03-24", "y": 131.61000061035156 }, { "x": "2021-03-25", "y": 133.3300018310547 }, { "x": "2021-03-26", "y": 133.27999877929688 }, { "x": "2021-03-29", "y": 123.41999816894531 }, { "x": "2021-03-30", "y": 118.48999786376953 }, { "x": "2021-03-31", "y": 130.9499969482422 }, { "x": "2021-04-01", "y": 132.5500030517578 }, { "x": "2021-04-05", "y": 129.91000366210938 }, { "x": "2021-04-06", "y": 133.52999877929688 }, { "x": "2021-04-07", "y": 131.47000122070312 }, { "x": "2021-04-08", "y": 133.8800048828125 }, { "x": "2021-04-09", "y": 140.9199981689453 }, { "x": "2021-04-12", "y": 139.39999389648438 }, { "x": "2021-04-13", "y": 149.7100067138672 }, { "x": "2021-04-14", "y": 160.02999877929688 }, { "x": "2021-04-15", "y": 159.8699951171875 }, { "x": "2021-04-16", "y": 170.80999755859375 }, { "x": "2021-04-19", "y": 161.91000366210938 }, { "x": "2021-04-20", "y": 156.77999877929688 }, { "x": "2021-04-21", "y": 169.5 }, { "x": "2021-04-22", "y": 168.10000610351562 }, { "x": "2021-04-23", "y": 173.6300048828125 }, { "x": "2021-04-26", "y": 177.61000061035156 }, { "x": "2021-04-27", "y": 183.41000366210938 }, { "x": "2021-04-28", "y": 178.67999267578125 }, { "x": "2021-04-29", "y": 175.6699981689453 }, { "x": "2021-04-30", "y": 178.82000732421875 }, { "x": "2021-05-03", "y": 186.02000427246094 }, { "x": "2021-05-04", "y": 173.58999633789062 }, { "x": "2021-05-05", "y": 162.83999633789062 }, { "x": "2021-05-06", "y": 160.5 }, { "x": "2021-05-07", "y": 163.14999389648438 }, { "x": "2021-05-10", "y": 158.5500030517578 }, { "x": "2021-05-11", "y": 158.99000549316406 }, { "x": "2021-05-12", "y": 152.67999267578125 }, { "x": "2021-05-13", "y": 149.8699951171875 }, { "x": "2021-05-14", "y": 161.3800048828125 }, { "x": "2021-05-17", "y": 160.42999267578125 }, { "x": "2021-05-18", "y": 159.52999877929688 }, { "x": "2021-05-19", "y": 157.99000549316406 }, { "x": "2021-05-20", "y": 165.97000122070312 }, { "x": "2021-05-21", "y": 161.4499969482422 }, { "x": "2021-05-24", "y": 164.1699981689453 }, { "x": "2021-05-25", "y": 169.25999450683594 }, { "x": "2021-05-26", "y": 175.58999633789062 }, { "x": "2021-05-27", "y": 179.5399932861328 }, { "x": "2021-05-28", "y": 185.00999450683594 }, { "x": "2021-06-01", "y": 184.66000366210938 }, { "x": "2021-06-02", "y": 191.60000610351562 }, { "x": "2021-06-03", "y": 195.22000122070312 }, { "x": "2021-06-04", "y": 206.07000732421875 }, { "x": "2021-06-07", "y": 219.57000732421875 }, { "x": "2021-06-08", "y": 213.0 }, { "x": "2021-06-09", "y": 217.44000244140625 }, { "x": "2021-06-10", "y": 217.0 }, { "x": "2021-06-11", "y": 218.85000610351562 }, { "x": "2021-06-14", "y": 207.41000366210938 }, { "x": "2021-06-15", "y": 201.58999633789062 }, { "x": "2021-06-16", "y": 197.83999633789062 }, { "x": "2021-06-17", "y": 202.47000122070312 }, { "x": "2021-06-18", "y": 199.19000244140625 }, { "x": "2021-06-21", "y": 208.24000549316406 }, { "x": "2021-06-22", "y": 221.36000061035156 }, { "x": "2021-06-23", "y": 212.0399932861328 }, { "x": "2021-06-24", "y": 220.13999938964844 }, { "x": "2021-06-25", "y": 219.94000244140625 }, { "x": "2021-06-28", "y": 222.94000244140625 }, { "x": "2021-06-29", "y": 234.4600067138672 }, { "x": "2021-06-30", "y": 234.97999572753906 }, { "x": "2021-07-01", "y": 235.11000061035156 }, { "x": "2021-07-02", "y": 234.3000030517578 }, { "x": "2021-07-06", "y": 233.33999633789062 }, { "x": "2021-07-07", "y": 221.89999389648438 }, { "x": "2021-07-08", "y": 232.7899932861328 }, { "x": "2021-07-09", "y": 232.80999755859375 }, { "x": "2021-07-12", "y": 239.33999633789062 }, { "x": "2021-07-13", "y": 235.14999389648438 }, { "x": "2021-07-14", "y": 246.66000366210938 }, { "x": "2021-07-15", "y": 259.67498779296875 }, { "x": "2021-07-16", "y": 286.42999267578125 }, { "x": "2021-07-19", "y": 313.5899963378906 }, { "x": "2021-07-20", "y": 307.3299865722656 }, { "x": "2021-07-21", "y": 321.1099853515625 }, { "x": "2021-07-22", "y": 323.4800109863281 }, { "x": "2021-07-23", "y": 348.8299865722656 }, { "x": "2021-07-26", "y": 335.8699951171875 }, { "x": "2021-07-27", "y": 328.5 }, { "x": "2021-07-28", "y": 349.32000732421875 }, { "x": "2021-07-29", "y": 345.6400146484375 }, { "x": "2021-07-30", "y": 353.6000061035156 }, { "x": "2021-08-02", "y": 346.6099853515625 }, { "x": "2021-08-03", "y": 386.510009765625 }, { "x": "2021-08-04", "y": 419.04998779296875 }, { "x": "2021-08-05", "y": 416.260009765625 }, { "x": "2021-08-06", "y": 413.7200012207031 }, { "x": "2021-08-09", "y": 484.4700012207031 }, { "x": "2021-08-10", "y": 456.760009765625 }, { "x": "2021-08-11", "y": 385.3299865722656 }, { "x": "2021-08-12", "y": 391.4200134277344 }, { "x": "2021-08-13", "y": 389.7799987792969 }, { "x": "2021-08-16", "y": 373.8599853515625 }, { "x": "2021-08-17", "y": 401.8599853515625 }, { "x": "2021-08-18", "y": 398.79998779296875 }, { "x": "2021-08-19", "y": 375.5299987792969 }, { "x": "2021-08-20", "y": 382.9800109863281 }, { "x": "2021-08-23", "y": 411.8900146484375 }, { "x": "2021-08-24", "y": 394.94000244140625 }, { "x": "2021-08-25", "y": 397.8699951171875 }, { "x": "2021-08-26", "y": 400.29998779296875 }, { "x": "2021-08-27", "y": 382.2200012207031 }, { "x": "2021-08-30", "y": 370.69000244140625 }, { "x": "2021-08-31", "y": 376.69000244140625 }, { "x": "2021-09-01", "y": 389.94000244140625 }, { "x": "2021-09-02", "y": 397.6600036621094 }, { "x": "2021-09-03", "y": 416.70001220703125 }, { "x": "2021-09-07", "y": 436.3900146484375 }, { "x": "2021-09-08", "y": 422.8999938964844 }, { "x": "2021-09-09", "y": 455.9200134277344 }, { "x": "2021-09-10", "y": 449.3800048828125 }, { "x": "2021-09-13", "y": 419.7200012207031 }, { "x": "2021-09-14", "y": 427.7099914550781 }, { "x": "2021-09-15", "y": 434.4599914550781 }, { "x": "2021-09-16", "y": 440.6499938964844 }, { "x": "2021-09-17", "y": 430.04998779296875 }, { "x": "2021-09-20", "y": 423.3299865722656 }, { "x": "2021-09-21", "y": 434.0400085449219 }, { "x": "2021-09-22", "y": 440.7200012207031 }, { "x": "2021-09-23", "y": 454.6000061035156 }, { "x": "2021-09-24", "y": 430.1400146484375 }, { "x": "2021-09-27", "y": 408.8399963378906 }, { "x": "2021-09-28", "y": 384.2099914550781 }, { "x": "2021-09-29", "y": 378.8999938964844 }, { "x": "2021-09-30", "y": 384.8599853515625 }]

export function Article3() {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Positive News</h2>
      <p>
        In November 2020, Moderna, a biotechnology company, announced highly promising results from its Phase 3 clinical trial for its COVID-19 vaccine candidate, mRNA-1273. These were the events that followed the announcement:
      </p>
      <ol>
        <li>
          <span className="text-lg font-semibold">1. Positive Vaccine Efficacy Data: </span>On November 16, 2020, Moderna announced interim results from its Phase 3 study, indicating that its COVID-19 vaccine candidate demonstrated an efficacy of approximately 94.5%. This news was a significant milestone in the race to develop effective vaccines against the COVID-19 pandemic.
        </li>
        <li>
          <span className="text-lg font-semibold">2. Market Reaction: </span>The announcement of the positive vaccine efficacy data led to a surge in Moderna&apos;s stock price. On the day of the announcement, Moderna&apos;s shares jumped by over 9%. The news not only boosted Moderna&apos;s stock but also had a positive impact on broader market sentiment, particularly for companies in the healthcare and biotechnology sectors.
        </li>
        <li>
          <span className="text-lg font-semibold">3. Investor Confidence: </span>Moderna&apos;s vaccine efficacy data instilled confidence among investors and stakeholders in the company&apos;s ability to develop a successful COVID-19 vaccine. The news signaled a potential breakthrough in the fight against the pandemic and raised hopes for a return to normalcy.
        </li>
        <li>
          <span className="text-lg font-semibold">4. Market Volatility: </span>Following the announcement, Moderna&apos;s stock experienced heightened volatility as investors reacted to news developments and updates regarding the vaccine&apos;s regulatory approval, distribution plans, and manufacturing capacity. The company&apos;s stock price fluctuated in response to market sentiment and external factors related to the COVID-19 pandemic.
        </li>
        <li>
          <span className="text-lg font-semibold">5. Regulatory Approval and Distribution: </span>In the weeks following the announcement of the positive vaccine efficacy data, Moderna submitted applications for emergency use authorization (EUA) to regulatory authorities in various countries, including the U.S. Food and Drug Administration (FDA). Regulatory approval and the commencement of vaccine distribution further influenced Moderna&apos;s stock price as investors assessed the potential impact on the company&apos;s revenue and earnings prospects.
        </li>
        <Article3Graph />
      </ol>

    </div>
  )
}

export function Article3Graph() {
  return (

    <EChartsReact option={
      {
        grid: { top: 24, right: 8, bottom: 24, left: 30 },
        xAxis: {
          type: "category",
          data: article3data.map((point) => point.x)
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
            data: article3data.map((point) => point.y),
            markArea: {
              itemStyle: {
                color: 'rgba(255, 173, 177, 0.4)'
              },
              data: [
                [
                  {
                    name: "Covid-19 Vaccine Approval",
                    xAxis: '2020-11-16'
                  },
                  {
                    xAxis: '2020-11-17'
                  }
                ]
              ]
            }
          }
        ],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        }
      }} />)
}
