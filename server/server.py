from flask import Flask
from flask import request
import json
from prediction import prediction
from processing import change_prediction, generate_questions, generate_answers
from flask_cors import CORS, cross_origin
from daily_price import get_stock_price, filter_dates_daily, filter_dates_weekly, filter_dates_monthly, graph_stock_price
import pandas as pd


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

USE_MODEL = False

@app.route("/api/popular_stocks", methods=['GET'])
@cross_origin()
def index():
    return json.dumps(["AAPL", "MSFT", "AMZN", "GOOGL", "TSLA"])

@app.route("/api/forecast/<stock>/name", methods=['GET'])
@cross_origin()
def name(stock):
    if "stock" in request.view_args:
        if request.view_args['stock'] == "AAPL":
            return json.dumps({"stock": request.view_args['stock'], "name": "Apple Inc."})
        elif request.view_args['stock'] == "MSFT":
            return json.dumps({"stock": request.view_args['stock'], "name": "Microsoft Corporation"})
        elif request.view_args['stock'] == "AMZN":
            return json.dumps({"stock": request.view_args['stock'], "name": "Amazon.com Inc."})
        elif request.view_args['stock'] == "GOOGL":
            return json.dumps({"stock": request.view_args['stock'], "name": "Alphabet Inc."})
        elif request.view_args['stock'] == "TSLA":
            return json.dumps({"stock": request.view_args['stock'], "name": "Tesla Inc."})
    else:
        return '404'
    
@app.route("/api/forecast/list", methods=['GET'])
@cross_origin()
def stocks_list():
    df = pd.read_csv("server/nasdaq.csv")
    stocks_dict = {}
    for index, row in df.iterrows():
        stocks_dict[row['Ticker']] = row['Name']
    return json.dumps(stocks_dict)

@app.route("/api/forecast/<stock>/daily", methods=['GET'])
@cross_origin()
def price_daily(stock):
    if "stock" in request.view_args:
        df = get_stock_price(request.view_args['stock'])
        START_DATE = '2020-04-19'
        END_DATE = '2024-04-19'
        if "start_date" in request.args and "end_date" in request.args:
            df = filter_dates_daily(df, request.args['start_date'], request.args['end_date'])
        else:
            df = filter_dates_daily(df, START_DATE, END_DATE)
        return json.dumps(graph_stock_price(df))
    else:
        return '404'
    
@app.route("/api/forecast/<stock>/weekly", methods=['GET'])
@cross_origin()
def price_weekly(stock):
    if "stock" in request.view_args:
        df = get_stock_price(request.view_args['stock'])
        START_DATE = '2020-04-19'
        END_DATE = '2024-04-19'
        if "start_date" in request.args and "end_date" in request.args:
            df = filter_dates_weekly(df, request.args['start_date'], request.args['end_date'])
        else:
            df = filter_dates_weekly(df, START_DATE, END_DATE)
        return json.dumps(graph_stock_price(df))
    else:
        return '404'
    
@app.route("/api/forecast/<stock>/monthly", methods=['GET'])
@cross_origin()
def price_monthly(stock):
    if "stock" in request.view_args:
        df = get_stock_price(request.view_args['stock'])
        START_DATE = '2020-04-19'
        END_DATE = '2024-04-19'
        if "start_date" in request.args and "end_date" in request.args:
            df = filter_dates_monthly(df, request.args['start_date'], request.args['end_date'])
        else:
            df = filter_dates_monthly(df, START_DATE, END_DATE)
        return json.dumps(graph_stock_price(df))
    else:
        return '404'

@app.route("/api/forecast/<stock>", methods=['GET'])
@cross_origin()
def indx(stock):
    if "stock" in request.view_args:
        START_DATE = '2024-03-19'
        END_DATE = '2024-04-19'
        if USE_MODEL:
            answer = prediction(request.view_args['stock'], START_DATE, END_DATE)
            change = change_prediction(answer)
        else:
            if request.view_args['stock'] == "AAPL":
                answer = ANSWER_AAPL
                change = ("DOWN", "1")
                return json.dumps({"stock": request.view_args['stock'], "forecast": change[0], "percent": int(change[1])})
            elif request.view_args['stock'] == "MSFT":
                answer = ANSWER_MSFT
                change = ("UP", "3")
                return json.dumps({"stock": request.view_args['stock'], "forecast": change[0], "percent": int(change[1])})
            elif request.view_args['stock'] == "AMZN":
                answer = ANSWER_AMZN
                change = ("UP", "4")
                return json.dumps({"stock": request.view_args['stock'], "forecast": change[0], "percent": int(change[1])})
            elif request.view_args['stock'] == "GOOGL":
                answer = ANSWER_GOOGL
                change = ("UP", "1")
                return json.dumps({"stock": request.view_args['stock'], "forecast": change[0], "percent": int(change[1])})
            elif request.view_args['stock'] == "TSLA":
                answer = ANSWER_TSLA
                change = ("DOWN", "3")
                return json.dumps({"stock": request.view_args['stock'], "forecast": change[0], "percent": int(change[1])})
    else:
        return '404'
    
@app.route("/api/forecast/<stock>/QA", methods=['GET'])
@cross_origin()
def Q_A(stock):
    if "stock" in request.view_args:
        START_DATE = '2024-03-19'
        END_DATE = '2024-04-19'
        if USE_MODEL:
            answer = prediction(request.view_args['stock'], START_DATE, END_DATE)
            questions = generate_questions(answer)
        else: 
            if request.view_args['stock'] == "AAPL":
                answer = ANSWER_AAPL
                questions = ["What is the implication of a high P/E ratio in the stock market, and how can it be used to gauge investor sentiment?",
    "How do dividend yields and P/E ratios typically interact, and what can their relationship indicate about a company's financial performance?",
    "What is the significance of a decreasing stock price trend, and how can it be used to identify potential market instability or investor sentiment shifts?"]

                return json.dumps({"stock": request.view_args['stock'], "result": answer, "questions": questions})
    return json.dumps({"stock": request.view_args['stock'], "result": "TODO"})

@app.route("/api/forecast/<stock>/QA", methods=['POST'])
@cross_origin()
def answers(stock):
    if "stock" in request.view_args:
        if USE_MODEL:
            content = request.json
            answers = generate_answers(content['question'])
        else:
            if request.view_args['stock'] == "AAPL":
                content = request.json
                answers = ANSWERS_AAPL[content['question']]
                return json.dumps({"stock": request.view_args['stock'], "answers": answers})

ANSWER_AAPL ='''[Positive Developments]:
    1. Apple has successfully cut its greenhouse gas emissions by 55% since 2015, indicating a strong commitment to sustainability and environmental responsibility.
    2. The company's new product, Vision Pro, has the potential to revolutionize the business world by providing an innovative and immersive enterprise experience.
    3. Apple's Environmental Progress Report has highlighted the company's achievements and commitment to becoming carbon neutral.

    [Potential Concerns]:
    1. Apple's stock price has been steadily decreasing over the past few weeks, indicating potential market instability.
    2. The company's P/E ratio is relatively high, which could indicate that investors are becoming more cautious about investing in the stock.
    3. The dividend yield is relatively low, which could indicate that the company's financial performance may not be as strong as expected.

    [Prediction & Analysis]:
    Based on the above analysis, I predict that Apple's stock price will decrease by around 1-2% in the upcoming week. While the company has shown strong commitment to sustainability and innovation, there are some potential concerns that may impact the stock price in the short term. The recent decrease in stock price and high P/E ratio are significant concerns, as they could indicate potential market instability and caution among investors. However, the company's commitment to sustainability and innovation could potentially drive long-term growth and stability. Therefore, while the short-term outlook may be somewhat negative, the long-term outlook for Apple remains positive
    '''

ANSWERS_AAPL = {"What is the implication of a high P/E ratio in the stock market, and how can it be used to gauge investor sentiment?": '''
The implication of a high P/E ratio in the stock market is that investors are willing to pay a premium for a company's shares, indicating high expectations for future growth and profitability. A high P/E ratio can be used to gauge investor sentiment in several ways:

* It reflects the market's optimism about a company's prospects, as investors are willing to pay a higher multiple of earnings for a company with high growth potential.
* It can be used to identify overvalued or undervalued stocks, as a high P/E ratio may indicate that a stock is overbought and due for a correction.
* It can be used to compare the market's expectations for a company to its actual performance, as a high P/E ratio may indicate that a company's earnings are not meeting market expectations.

According to the dividend discount model (DDM), a high P/E ratio can also be interpreted as a reflection of investors' expectations for future dividend payments. If investors expect a company to generate high returns in the future, they may be willing to pay a higher P/E ratio, as they anticipate higher dividends in the future.

Source: Fama, E. F., & French, K. R. (2002). The equity premium puzzle. Journal of Financial Economics, 63(3), 301-326.
''',
"How do dividend yields and P/E ratios typically interact, and what can their relationship indicate about a company's financial performance?":
'''
Dividend yields and P/E ratios typically interact in the following ways:

* High dividend yields are often accompanied by low P/E ratios, as investors may be attracted to the income generated by the dividend payments, but may not expect significant future growth.
* Low dividend yields are often accompanied by high P/E ratios, as investors may be willing to pay a premium for a company's shares, anticipating high future growth and profitability.
* A company with a high P/E ratio and low dividend yield may indicate that investors are more focused on growth prospects than current income generation.

The relationship between dividend yields and P/E ratios can indicate several things about a company's financial performance:

* High dividend yields and low P/E ratios may indicate that a company is a value stock, with a strong history of dividend payments and a low valuation.
* Low dividend yields and high P/E ratios may indicate that a company is a growth stock, with high expectations for future growth and profitability.

Source: Damodaran, A. (2012). Investment Valuation. John Wiley & Sons.
''',
"What is the significance of a decreasing stock price trend, and how can it be used to identify potential market instability or investor sentiment shifts?":
'''
A decreasing stock price trend can be used to identify potential market instability or investor sentiment shifts in several ways:

* A decreasing stock price trend may indicate that investors are becoming less confident in a company's prospects, as they adjust their expectations for future growth and profitability.
* A decreasing stock price trend may also indicate that investors are becoming more risk-averse, as they seek safer investments with lower volatility.
* A decreasing stock price trend can also be a sign of a broader market shift, as investors adjust their portfolios in response to changes in interest rates, economic indicators, or other market factors.

Investors can use a decreasing stock price trend to identify potential market instability or sentiment shifts by:

* Monitoring changes in investor sentiment and market conditions, such as changes in market volatility or investor confidence.
* Analysing company-specific factors, such as changes in earnings expectations, dividend payments, or management changes.
* Considering broader market trends, such as changes in interest rates, economic indicators, or other market factors.

Source: Shiller, R. J. (2014). Irrational Exuberance. Princeton University Press.

''',
"How can one evaluate the long-term outlook for a certain stock?": """
Evaluating the long-term outlook for a certain stock is a crucial task for investors seeking to make informed decisions. To accomplish this, I employ a multi-faceted approach that incorporates both quantitative and qualitative analysis.

Firstly, I examine the company's financial statements, focusing on key metrics such as revenue growth, profitability, and cash flow. This provides insight into the company's underlying business fundamentals and its ability to generate returns for shareholders. For instance, a company with a consistent track record of revenue growth and increasing profitability is more likely to maintain its competitive edge and drive long-term value creation.

Secondly, I analyze the company's industry and competitive landscape. This involves understanding the company's position within its industry, its market share, and the competitive dynamics that shape its business. For example, a company operating in a rapidly growing industry with limited competition may have a more favorable long-term outlook.

Thirdly, I consider the company's management team and their track record of delivering value to shareholders. A strong management team with a history of making sound strategic decisions and executing effectively is more likely to drive long-term growth and profitability.

Finally, I incorporate macroeconomic indicators, such as GDP growth, interest rates, and inflation, into my analysis. These factors can significantly impact the company's performance and long-term outlook.

By combining these factors, I can gain a comprehensive understanding of the company's long-term outlook and make informed investment decisions. For instance, a company with a strong financial foundation, a growing industry, a skilled management team, and a favorable macroeconomic environment is more likely to maintain its competitiveness and drive long-term value creation.

In conclusion, evaluating the long-term outlook for a certain stock requires a thorough examination of the company's financials, industry, management, and macroeconomic environment. By incorporating these factors into my analysis, I can make informed investment decisions and maximize returns for my clients.

"""}

ANSWER_MSFT = ''' Positive Developments:

1. Microsoft Corp has announced the release of its quarterly earnings on Thursday, April 25, 2024, which could bring a positive impact on its stock price.
2. The company's Copilot is expected to drive significant revenue growth and redefine enterprise productivity, which could lead to an increase in investor confidence.

Potential Concerns:

1. The company's stock price has been steadily decreasing since April 12, which may indicate a lack of investor confidence.
2. The company's PE ratio is quite high, at 35.04181589530272, which may indicate that the stock is overvalued.

Prediction & Analysis:

Based on the information provided, I predict that Microsoft Corp's stock price may see a slight increase in the upcoming week. The company's announcement of its quarterly earnings and the expected revenue growth from its Copilot may help to boost investor confidence and increase the stock price. However, the high PE ratio may act as a deterrent to some investors.

Therefore, I predict that the stock price of Microsoft Corp may increase by 2-3% in the upcoming week. This prediction is based on the assumption that the company's positive developments will outweigh the concerns surrounding its high PE ratio. However, the stock market is inherently unpredictable, and there are many factors that can affect stock prices. Therefore, this prediction should be taken with a grain of caution.'''

ANSWER_AMZN = '''
Positive Developments:
1. Amazon.com Inc. is set to open its first physical store in Illinois, which may expand its customer base and increase foot traffic.
2. The company's stock price has decreased by 11.7% in the past week, indicating potential buying opportunities for investors.

Potential Concerns:
1. The company's stock price has been steadily decreasing over the past few months, which may indicate a potential downward trend.
2. The company's PE ratio is high at 51.45, which may be a concern for some investors.

Prediction & Analysis:
Based on these developments and concerns, it is predicted that the stock price of Amazon.com Inc. will increase by approximately 3-4% in the upcoming week. This is due to the potential benefits of opening a physical store, which could bring in new customers and increase foot traffic. Additionally, the recent price decrease may indicate a buying opportunity for investors, which could drive the stock price upwards. However, the high PE ratio may still be a concern for some investors, and the downward trend in the stock price may continue to be a factor in the short term. Overall, the potential benefits of the physical store opening and the recent price decrease may outweigh the concerns, leading to an upward movement in the stock price.
'''

ANSWER_GOOGL = '''
Positive Developments:

1. Despite the overall market volatility, Alphabet Inc's stock price remained relatively stable, indicating the company's resilience in the face of market turbulence.
2. Alphabet Inc is a dominant force in the media space, and the company's innovative approach to technology has helped it maintain its position.
3. The company's financial health is strong, with a high EPS (Earnings per Share) and a low PE (Price to Earnings ratio) indicating that the company is performing well.

Potential Concerns:

1. The overall market volatility, as seen in the Dow Jones Futures and the Bloomberg article, could impact the stock price of Alphabet Inc.
2. The flight-to-safety bid has lost traction, which could potentially affect the stock price of Alphabet Inc.
3. The company's lack of dividend yield could be a concern for investors seeking income.

Prediction & Analysis:

Based on the information available, the stock price of Alphabet Inc is likely to experience a slight increase in the upcoming week. This prediction is supported by the company's resilience in the face of market volatility, its strong financial health, and its dominant position in the media space.

However, the overall market volatility and the loss of the flight-to-safety bid could potentially impact the stock price of Alphabet Inc. Therefore, investors should closely monitor the market conditions and keep a close eye on any developments that could affect the stock price.

In conclusion, while there are some potential concerns, the positive developments and strong financial health of Alphabet Inc suggest that the company is well-positioned to weather the market volatility and continue to perform well in the upcoming week. Therefore, I predict a slight increase in the stock price of Alphabet Inc.
'''

ANSWER_TSLA = '''
[Positive Developments]:
1. The company is set to release its earnings report, which could potentially boost the stock price if the results are positive.
2. The company's stock has been part of a big earnings week, alongside other major companies like Microsoft and Meta.
3. Despite a recent decrease in the stock price, Tesla Inc's basic financials, such as EPS and PE, are relatively strong.

[Potential Concerns]:
1. The recent stock market downturn has affected the company's stock price, as well as the overall market.
2. The stock market is currently experiencing a negative sentiment, which could potentially lead to a decrease in the stock price.
3. The company's stock is trading at a relatively high PE ratio, which may indicate that the stock is overvalued.

[Prediction & Analysis]:
Based on the current situation, I predict that Tesla Inc's stock price will decrease by approximately 3% in the upcoming week (from 2024-04-19 to 2024-04-26). This prediction is primarily based on the recent stock market downturn and the potential negative sentiment surrounding the company's stock. However, the company's strong basic financials, including EPS and PE, could provide a slight support to the stock price.

It is important to note that the company's earnings report will likely have a significant impact on the stock price. If the company's earnings are positive, it could potentially increase the stock price, but if the earnings are negative, it could lead to a further decrease.

In conclusion, while the company's basic financials are relatively strong, the recent stock market downturn and the potential negative sentiment surrounding the company's stock could lead to a decrease in the stock price in the upcoming week. However, the company's earnings report could potentially provide a counterbalance to these factors and lead to a more positive outcome.

'''

if __name__ == "__main__":
    app.run(host='0.0.0.0', port='80')
    