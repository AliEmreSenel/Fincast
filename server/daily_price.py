import yfinance as yf
from datetime import datetime

def get_stock_price(stock):
    df = yf.download(stock, start='2020-01-01', end=datetime.today().strftime('%Y-%m-%d'))
    return df

def filter_dates(df, start_date, end_date):
    mask = (df.index >= start_date) & (df.index <= end_date)
    return df.loc[mask]

if __name__ == '__main__':
    stock = 'AAPL'
    start_date = '2024-04-12'
    end_date = '2024-04-19'
    print(get_stock_price(stock))
    print(filter_dates(get_stock_price(stock), start_date, end_date))