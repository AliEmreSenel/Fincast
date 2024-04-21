import yfinance as yf
from datetime import datetime

def get_stock_price(stock):
    df = yf.download(stock, start='2020-01-01', end=datetime.today().strftime('%Y-%m-%d'))
    return df

def filter_dates_daily(df, start_date, end_date):
    mask = (df.index >= start_date) & (df.index <= end_date)
    return df.loc[mask]

def filter_dates_weekly(df, start_date, end_date):
    mask = (df.index >= start_date) & (df.index <= end_date)
    return df.loc[mask].resample('W').mean()

def filter_dates_monthly(df, start_date, end_date):
    mask = (df.index >= start_date) & (df.index <= end_date)
    return df.loc[mask].resample('ME').mean()

def graph_stock_price(df):
    graph = {}
    for date in df.index:
        graph[date.strftime("%Y-%m-%d")] = df.loc[date]['Close']
    return graph



if __name__ == '__main__':
    stock = 'AAPL'
    start_date = '2023-04-12'
    end_date = '2024-04-19'
    print(get_stock_price(stock))
    print(filter_dates_daily(get_stock_price(stock), start_date, end_date))
    print(graph_stock_price(filter_dates_daily(get_stock_price(stock), start_date, end_date)))
    print(graph_stock_price(filter_dates_weekly(get_stock_price(stock), start_date, end_date)))
    print(graph_stock_price(filter_dates_monthly(get_stock_price(stock), start_date, end_date)))