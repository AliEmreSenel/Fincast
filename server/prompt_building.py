import pandas as pd
import datetime
import yfinance as yf
from datetime import datetime, timedelta
import finnhub
import requests

FINNHUB_CLIENT = finnhub.Client(api_key="coi1lshr01qpcmnio7cgcoi1lshr01qpcmnio7d0")
API = 'vD9ONa9vNXNJ1GuQfyNrNwZVKjOGDEBz'
STOCK = 'AAPL'
START_DATE = '2024-04-12'
END_DATE = '2024-04-19'

def create_df(STOCK, startDate, endDate, finnhub_client, api):
    df_company_profile = pd.DataFrame(finnhub_client.company_profile2(symbol=STOCK), index=[0])

    df_news = pd.DataFrame(finnhub_client.company_news(STOCK, _from=startDate, to=endDate))

    pd.options.display.float_format = '{:,.2f}'.format

    IS = requests.get(f'https://financialmodelingprep.com/api/v3/income-statement/{STOCK}?apikey={api}').json()

    Ratios = requests.get(f'https://financialmodelingprep.com/api/v3/ratios/{STOCK}?apikey={api}').json()

    financials = {}
    financials = {'Year': [], 'EPS': [], 'PE': [], 'Dividend Yield': []}

    for item in range(5): 
        financials['Year'].append(2024 - item)
        financials['EPS'].append(IS[item]['eps'])
        financials['PE'].append(Ratios[item]['priceEarningsRatio'])
        financials['Dividend Yield'].append(Ratios[item]['dividendYield'])

    #Transform the dictionary into a Pandas
    df_basic_financials = pd.DataFrame.from_dict(financials)

    #Reorder the dataframe to make 'Year' the first column and then in order: EPS, PE, Dividend Yield
    df_basic_financials = df_basic_financials[['Year', 'EPS', 'PE', 'Dividend Yield']]

    return df_basic_financials, df_news, df_company_profile

def build_prompt(name, finnhubIndustry, ipo, marketCapitalization, currency, shareOutstanding, country, ticker, exchange, startDate, endDate, change, startPrice, endPrice, headline1, summary1, headline2, headline3, summary3, summary2, date, attr1, value1, attr2, value2, attr3, value3, period):
    SYSTEM_PROMPT = "You are a seasoned stock market analyst. Your task is to list the positive developments and potential concerns for companies based on relevant news and basic financials from the past weeks, then provide an analysis and prediction for the companies' stock price movement for the upcoming week. Your answer format should be as follows:\n\n[Positive Developments]:\n1. ...\n\n[Potential Concerns]:\n1. ...\n\n[Prediction & Analysis]:\n...\n"
    B_INST, E_INST = "[INST]", "[/INST]"
    B_SYS, E_SYS = "<<SYS>>\n", "\n<</SYS>>\n\n"

    prompt = f"""
    [Company Introduction]:

    {name} is a leading entity in the {finnhubIndustry} sector. Incorporated and publicly traded since {ipo}, the company has established its reputation as one of the key players in the market. As of today, {name} has a market capitalization of {str(round(marketCapitalization, 2))} in {currency}, with {str(round(shareOutstanding, 2))} shares outstanding. {name} operates primarily in the {country}, trading under the ticker {ticker} on the {exchange}. As a dominant force in the {finnhubIndustry} space, the company continues to innovate and drive progress within the industry.

    From {startDate} to {endDate}, {name}'s stock price {change} from {str(round(startPrice, 2))} to {str(round(endPrice, 2))}. Company news during this period are listed below:

    [Headline]: {headline1}
    [Summary]: {summary1}

    [Headline]: {headline2}
    [Summary]: {summary2}

    [Headline]: {headline3}
    [Summary]: {summary3}

    Some recent basic financials of {name}, reported at {date}, are presented below:

    [Basic Financials]:
    {attr1}: {value1}
    {attr2}: {value2}
    {attr3}: {value3}
    

    Based on all the information before {endDate}, let's first analyze the positive developments and potential concerns for {ticker}. Come up with 2-4 most important factors respectively and keep them concise. Most factors should be inferred from company-related news. Then make your prediction of the {ticker} stock price movement for next week ({period}). Provide a summary analysis to support your prediction.

    """
    return B_INST + B_SYS + SYSTEM_PROMPT + E_SYS + prompt + E_INST


def build_prompt_from_df(STOCK, startDate, endDate):
    df_basic_financials, df_news, df_company_profile = create_df(STOCK, startDate, endDate, FINNHUB_CLIENT, API)
    df_prices = yf.download(STOCK, start=startDate, end=endDate)

    name = df_company_profile['name'].iloc[0]
    finnhubIndustry = df_company_profile['finnhubIndustry'].iloc[0]
    ipo = df_company_profile['ipo'].iloc[0]
    marketCapitalization = df_company_profile['marketCapitalization'].iloc[0]
    currency = df_company_profile['currency'].iloc[0]
    shareOutstanding = df_company_profile['shareOutstanding'].iloc[0]
    country = df_company_profile['country'].iloc[0]
    ticker = df_company_profile['ticker'].iloc[0]
    exchange = df_company_profile['exchange'].iloc[0]
    startDate = startDate
    endDate = endDate

    startPrice = df_prices['Open'].iloc[0]
    endPrice = df_prices['Close'].iloc[-1]
    change = 'increased' if endPrice > startPrice else 'decreased'

    headline1 = df_news['headline'].values[2]
    summary1 = df_news['summary'].values[2]
    headline2 = df_news['headline'].values[3]
    summary2 = df_news['summary'].values[3]
    headline3 = df_news['headline'].values[4]
    summary3 = df_news['summary'].values[4]


    date = datetime.strptime(endDate, "%Y-%m-%d").strftime("%Y")
    attr1 = 'EPS'
    value1 = df_basic_financials[df_basic_financials['Year'] == int(date)][attr1].values[0] if df_basic_financials[df_basic_financials['Year'] == int(date)][attr1].values.size > 0 else None
    attr2 = 'PE'
    value2 = df_basic_financials[df_basic_financials['Year'] == int(date)][attr2].values[0] if df_basic_financials[df_basic_financials['Year'] == int(date)][attr2].values.size > 0 else None
    attr3 = 'Dividend Yield'
    value3 = df_basic_financials[df_basic_financials['Year'] == int(date)][attr3].values[0] if df_basic_financials[df_basic_financials['Year'] == int(date)][attr3].values.size > 0 else None

    # period = input() ###############################
    period = 7
    period = f"from {datetime.strptime(endDate, '%Y-%m-%d')} to {datetime.strptime(endDate, '%Y-%m-%d') + timedelta(days=period)}" # fetch from input the prediction

    return build_prompt(name, finnhubIndustry, ipo, marketCapitalization, currency, shareOutstanding, country, ticker, exchange, startDate, endDate, change, startPrice, endPrice, headline1, summary1, headline2, summary2, headline3, summary3, date, attr1, value1, attr2, value2, attr3, value3, period)
# [Company Introduction]:

#     Apple Inc is a leading entity in the Technology sector. Incorporated and publicly traded since 1980-12-12, the company has established its reputation as one of the key players in the market. As of today, Apple Inc has a market capitalization of 2547910.24 in USD, with 15441.88 shares outstanding. Apple Inc operates primarily in the US, trading under the ticker AAPL on the NASDAQ NMS - GLOBAL MARKET. As a dominant force in the Technology space, the company continues to innovate and drive progress within the industry.

#     From 2024-04-12 to 2024-04-19, Apple Inc's stock price decreased from 174.26 to 167.04. Company news during this period are listed below:

#     [Headline]: Netflix Joins Apple, Meta in Withholding Key Data From Investors
#     [Summary]: (Bloomberg) -- Netflix Inc. shares fell the most in nine months Friday, taking the shine off stellar first-quarter financial results following management’s decision to stop reporting quarterly subscriber data.Most Read from BloombergElon Wants His Money BackNew York’s Rich Get Creative to Flee State Taxes. Auditors Are On to ThemDubai Grinds to Standstill as Flooding Hits CityIsrael Reported to Have Launched Retaliatory Strike on Iran‘Mag Seven’ Get Crushed Before Next Week’s Results: Markets Wr

#     [Headline]: Here’s Why Apple (AAPL) is in Contributor’s List of Polen Capital
#     [Summary]: The announcement came in the midst of a blowout quarter, suggesting that the growth from the password crackdown and ad-supported tier might be waning. Plus, Meta’s updated must-see AI chatbot.

#     [Headline]: Polen Capital, an investment management company, released its “Polen Global Growth Strategy” first-quarter 2024 investor letter. A copy of the letter can be downloaded here. In the first quarter, the fund increased 8.10% gross and 7.81% net, respectively, trailing the MSCI ACW Index’s 8.20% return. The market dynamics that were in place at the end […]
#     [Summary]: Netflix Says It’s Going Dark on Subscriber Numbers. Is the Model Maturing?

#     Some recent basic financials of Apple Inc, reported at 2024, are presented below:

#     [Basic Financials]:
#     EPS: 6.16
#     PE: 27.790811789370586
#     Dividend Yield: 0.005573960673721321


#     Based on all the information before 2024-04-19, let's first analyze the positive developments and potential concerns for AAPL. Come up with 2-4 most important factors respectively and keep them concise. Most factors should be inferred from company-related news. Then make your prediction of the AAPL stock price movement for next week (from 2024-04-19 00:00:00 to 2024-04-26 00:00:00). Provide a summary analysis to support your prediction.

if __name__ == '__main__':
    print(build_prompt_from_df(STOCK, START_DATE, END_DATE))