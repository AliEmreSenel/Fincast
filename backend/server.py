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
    df = pd.read_csv("backend/nasdaq.csv")
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
        return json.dumps({"stock": request.view_args['stock'], "forecast": "TODO", "percent": "TODO"})
    
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
            if request.view_args['stock'] == "MSFT":
                answer = ANSWER_MSFT
                questions = [str(i) for i in ANSWERS_MSFT.keys()]
                return json.dumps({"stock": request.view_args['stock'], "result": answer, "questions": questions})
            if request.view_args['stock'] == "AMZN":
                answer = ANSWER_AMZN
                questions = [str(i) for i in ANSWERS_AMZN.keys()]
                return json.dumps({"stock": request.view_args['stock'], "result": answer, "questions": questions})
            if request.view_args['stock'] == "GOOGL":
                answer = ANSWER_GOOGL
                questions = [str(i) for i in ANSWERS_GOOGL.keys()]
                return json.dumps({"stock": request.view_args['stock'], "result": answer, "questions": questions})
            if request.view_args['stock'] == "TSLA":
                answer = ANSWER_TSLA
                questions = [str(i) for i in ANSWERS_TSLA.keys()]
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
            if request.view_args['stock'] == "MSFT":
                content = request.json
                answers = ANSWERS_MSFT[content['question']]
                return json.dumps({"stock": request.view_args['stock'], "answers": answers})
            if request.view_args['stock'] == "AMZN":
                content = request.json
                answers = ANSWERS_AMZN[content['question']]
                return json.dumps({"stock": request.view_args['stock'], "answers": answers})
            if request.view_args['stock'] == "GOOGL":
                content = request.json
                answers = ANSWERS_GOOGL[content['question']]
                return json.dumps({"stock": request.view_args['stock'], "answers": answers})
            if request.view_args['stock'] == "TSLA":
                content = request.json
                answers = ANSWERS_TSLA[content['question']]
                return json.dumps({"stock": request.view_args['stock'], "answers": answers})
    return json.dumps({"stock": request.view_args['stock'], "answers": "TODO"})

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

Therefore, I predict that the stock price of Microsoft Corp may increase by 2-3% in the upcoming week. This prediction is based on the assumption that the company's positive developments will outweigh the concerns surrounding its high PE ratio. However, the stock market is inherently unpredictable, and there are many factors that can affect stock prices. Therefore, this prediction should be taken with a grain of caution.
'''

ANSWERS_MSFT = {"What is the implication of a company's PE ratio being significantly higher than the industry average, and how might this affect investor sentiment?":"""A company's PE ratio being significantly higher than the industry average can have several implications. 
                Firstly, it may indicate that investors are placing a high premium on the company's earnings, possibly due to factors such as strong brand recognition, innovative products, or a dominant market position. However, this can also be a warning sign, as it may suggest that the company's stock is overvalued and may be due for a correction. 
                If the PE ratio is significantly higher than the industry average, investors may become increasingly cautious, leading to a decrease in demand for the company's stock. This, in turn, could lead to a decline in the stock price, as supply and demand forces come into balance. Furthermore, if the company's earnings growth slows or disappoints, the stock price may experience a significant decline, as investors re-evaluate their expectations.

Source: Aswath Damodaran, "The P/E Ratio" (2022)
                """,
                "How might a company's revenue growth rate influence its stock price, and what are some common metrics used to measure revenue growth?":"""A company's revenue growth rate can significantly influence its stock price. 
                A high and consistent revenue growth rate can be a key driver of stock price appreciation, as it indicates that the company is successfully expanding its market share, increasing its customer base, or innovating its products. On the other hand, a decline or stagnation in revenue growth can lead to a decline in the stock price, as investors become concerned about the company's ability to maintain its competitiveness.
                 To measure revenue growth, investors and analysts often use metrics such as the compound annual growth rate (CAGR), revenue growth rate, and revenue growth rate as a percentage of total revenue. These metrics provide a comprehensive view of a company's revenue performance and can help investors make informed decisions.

Source: McKinsey & Company, "Revenue Growth: A Guide for CEOs" (2020)
                """,
                "What are some potential consequences of a company's stock price experiencing a prolonged decline, and how might this impact investor confidence and overall market sentiment?":"""A company's stock price experiencing a prolonged decline can have several consequences.
                  Firstly, it can lead to a decline in investor confidence, as investors become increasingly skeptical about the company's ability to recover. This can lead to a decrease in demand for the company's stock, further exacerbating the decline. Secondly, a prolonged decline in the stock price can make it more difficult for the company to raise capital or attract new investors, as the company's perceived value decreases. 
                  This can lead to a vicious cycle, where the decline in the stock price makes it harder for the company to recover. Finally, a prolonged decline in the stock price can also impact overall market sentiment, as investors become increasingly risk-averse and seek out safer investments. This can lead to a broader decline in the stock market, as investors become more cautious.

Source: Financial Times, "Why Stock Market Declines Are a Bigger Deal Than You Think" (2022)
                """
}

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

ANSWERS_AMZN = {"What is the significance of a company's PE ratio being high, and how might this affect investor decisions?":"""The significance of a company's PE ratio being high is that it may indicate that the market has high expectations for the company's future growth and profitability. This could be due to various factors such as a strong brand reputation, a competitive advantage, or a history of consistent earnings growth.
                 However, a high PE ratio can also be a warning sign that the stock is overvalued and may be due for a correction. Investors may be cautious about investing in such a company, as they may be concerned that the stock price may drop if the company fails to meet their high expectations.
                For example, if a company has a PE ratio of 30, it means that investors are willing to pay $30 for every dollar of earnings the company generates. If the company's earnings growth slows down or the market becomes concerned about its ability to meet expectations, the stock price may drop, and the PE ratio could contract. This could lead to a significant decline in the company's stock price and a potential loss for investors.
                """,
                "How does a decrease in a company's stock price over a short period of time affect its overall market value?":"""A decrease in a company's stock price over a short period of time can have a significant impact on its overall market value. If the stock price drops by 10% or more over a short period, such as a day or a week, it can lead to a significant decline in the company's market capitalization. 
                This can be due to various factors such as a change in investor sentiment, a decline in earnings estimates, or a sudden event that affects the company's business.
                For example, if a company's stock price drops from $50 to $40 over a week, it means that the company's market capitalization has declined by $10 billion. This can have a significant impact on the company's ability to raise capital, attract talent, or make strategic acquisitions. A decline in stock price can also lead to a decline in the company's credit rating, making it more expensive for the company to borrow money.
                """,
                "What is the purpose of analyzing a company's stock price trend over a longer period of time, and what insights can be gained from such analysis?":"""Analyzing a company's stock price trend over a longer period of time can provide valuable insights into its long-term performance and potential for future growth. 
                By examining the company's stock price trend over several years, investors can identify trends such as steady growth, volatility, or a decline. This information can be used to make informed investment decisions and to identify potential opportunities or risks.
                For example, if a company's stock price has consistently grown over the past 5 years, it may indicate that the company has a strong business model, a competitive advantage, or a history of consistent earnings growth. This could make it a attractive investment opportunity for long-term investors. On the other hand, if a company's stock price has declined over the past 5 years, it may indicate that the company is facing significant challenges, such as a decline in its industry, a change in consumer preferences, or a decline in its competitive position. This could make it a less attractive investment opportunity for investors.
                """
}

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

ANSWERS_GOOGL = {"What is the significance of a high EPS (Earnings per Share) in a company's financial health, and how does it impact the company's overall performance?":"""

EPS (Earnings per Share) is a fundamental financial metric that measures a company's profitability. A high EPS indicates that a company is generating significant earnings per outstanding share, which can have a significant impact on its overall performance. A high EPS can be a sign of a company's financial health, as it suggests that the company is generating sufficient earnings to cover its expenses, pay dividends to shareholders, and invest in growth initiatives.

A high EPS can also impact a company's overall performance in several ways. Firstly, it can attract investors who are looking for companies with strong earnings growth potential. This can drive up the company's stock price, as investors are willing to pay a premium for shares of a company with a high EPS. Secondly, a high EPS can provide a company with the financial flexibility to invest in new projects, expand its operations, or return value to shareholders through dividends or share buybacks. This can help a company achieve its strategic objectives and create long-term value for its shareholders.

Finally, a high EPS can also be a key factor in determining a company's valuation multiples, such as the Price-to-Earnings (P/E) ratio. A high EPS can justify a higher P/E ratio, as investors are willing to pay more for shares of a company with strong earnings growth potential.

In conclusion, a high EPS is a significant indicator of a company's financial health, and it can have a profound impact on its overall performance by attracting investors, providing financial flexibility, and determining valuation multiples.
                """,
                "What is the difference between the Price to Earnings (PE) ratio and the Dividend Yield, and how do they affect a company's financial performance?":"""

The Price-to-Earnings (P/E) ratio and Dividend Yield are two commonly used financial metrics that provide insights into a company's financial performance. The P/E ratio is the ratio of a company's stock price to its earnings per share (EPS), and it provides a snapshot of how much investors are willing to pay for each dollar of earnings. A high P/E ratio suggests that investors are willing to pay a premium for shares of a company with strong earnings growth potential.

On the other hand, the Dividend Yield is the ratio of a company's annual dividend payment to its current stock price. It provides a measure of the return that investors can expect from holding a company's shares. A high Dividend Yield suggests that a company is paying out a significant portion of its earnings as dividends, which can provide investors with a steady income stream.

The key difference between the P/E ratio and Dividend Yield is that the P/E ratio focuses on earnings growth, while the Dividend Yield focuses on income generation. A company with a high P/E ratio may be seen as a growth stock, while a company with a high Dividend Yield may be seen as a income stock.

In terms of how they affect a company's financial performance, the P/E ratio and Dividend Yield can have different implications. A high P/E ratio can suggest that a company has strong earnings growth potential, which can drive up its stock price and attract investors. On the other hand, a high Dividend Yield can suggest that a company is generating significant income, which can provide investors with a steady return.

In conclusion, the P/E ratio and Dividend Yield are two distinct financial metrics that provide insights into a company's financial performance. While the P/E ratio focuses on earnings growth, the Dividend Yield focuses on income generation. Understanding these metrics can help investors make informed decisions about their investments.
                """,
                'How does the concept of a "flight-to-safety bid" impact the stock market, and what are the implications for investors seeking income?':"""A "flight-to-safety bid" occurs when investors flee from riskier assets, such as stocks, and move into safer assets, such as government bonds or cash. This phenomenon can have a significant impact on the stock market, as it can drive down stock prices and increase demand for safer assets.

When investors engage in a flight-to-safety bid, they are often seeking shelter from market volatility, economic uncertainty, or geopolitical tensions. This can cause stock prices to fall, as investors become risk-averse and seek out safer assets. In addition, a flight-to-safety bid can also drive up the prices of government bonds, as investors seek out higher-yielding and lower-risk assets.

For investors seeking income, a flight-to-safety bid can have implications for their investment strategies. When investors flee from riskier assets, it can drive up the prices of safer assets, such as government bonds. This can make it more challenging for investors to generate returns, as they may have to accept lower yields or take on more risk to achieve their investment objectives.
                """
}

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

ANSWERS_TSLA = {"What is the relationship between a company's earnings per share (EPS) and its price-to-earnings (PE) ratio, and how can an investor use this information to inform their investment decisions?":"""The relationship between a company's earnings per share (EPS) and its price-to-earnings (PE) ratio is a critical consideration for investors when evaluating a company's stock. The PE ratio is a financial metric that measures the ratio of a company's current stock price to its earnings per share. In other words, it represents how much investors are willing to pay for each dollar of earnings generated by the company. A company with a high PE ratio has a stock price that is higher relative to its earnings, indicating that investors have high expectations for future growth.

Investors can use this information to inform their investment decisions in several ways. Firstly, a high PE ratio may indicate that a company is experiencing rapid growth, which could be a sign of future success. However, it may also mean that the stock is overvalued, and investors may be paying too much for each dollar of earnings. Conversely, a low PE ratio may indicate that a company is undervalued, and investors may be missing out on a good opportunity.

Investors can also use the PE ratio in conjunction with other financial metrics, such as the price-to-book (PB) ratio, to get a more comprehensive view of a company's value. For example, if a company has a high PE ratio but a low PB ratio, it may indicate that investors are placing a high premium on the company's growth prospects, but the company's book value (i.e., its assets minus liabilities) is not particularly impressive.
                """,
                "How do changes in the overall market sentiment and the company's stock price correlate, and what are some common indicators that investors use to track market sentiment?":"""Market sentiment refers to the overall attitude or opinion of investors, analysts, and traders towards a particular stock, sector, or market. Changes in market sentiment can be reflected in the stock price, and investors often use various indicators to track market sentiment. Some common indicators include:

* The VIX index, which measures the level of fear or anxiety in the market, often referred to as the "fear index".
* The put-call ratio, which measures the number of put options traded relative to call options, often referred to as the "put-call ratio".
* The CBOE Market Volatility Index (VIX), which measures the level of market volatility and is often referred to as the "fear index".
* The Chicago Board Options Exchange (CBOE) Volatility Index (VIX) is a widely followed indicator of market sentiment, which measures the level of market volatility and is often referred to as the "fear index".

Investors often use these indicators to gauge market sentiment and make informed investment decisions. For example, if the VIX index is high, it may indicate that investors are fearful and are selling stocks, which could be a sign to buy. Conversely, if the VIX index is low, it may indicate that investors are optimistic and are buying stocks, which could be a sign to sell.
                """,
                "What are some potential implications of a company's stock trading at a high PE ratio, and how might this impact an investor's decision to buy or sell the stock?":"""A company's stock trading at a high PE ratio can have several implications for investors. Firstly, it may indicate that investors are highly optimistic about the company's future growth prospects, which could be a sign of future success. However, it may also mean that the stock is overvalued, and investors may be paying too much for each dollar of earnings. This could lead to a decline in the stock price if the company fails to meet expectations.

Furthermore, a high PE ratio can also indicate that investors are placing a high premium on the company's growth prospects, which may not be justified. For example, if a company is trading at a PE ratio of 20, but its earnings growth rate is only 5%, it may be overvalued. Conversely, if a company is trading at a PE ratio of 10, but its earnings growth rate is 10%, it may be undervalued.

Ultimately, investors should consider a range of factors, including the company's financial performance, industry trends, and competitive landscape, when evaluating a stock's PE ratio and making an investment decision.
                """
}

if __name__ == "__main__":
    app.run(host='0.0.0.0', port='80')
    
