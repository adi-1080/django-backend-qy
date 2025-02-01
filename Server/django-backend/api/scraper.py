import requests
from bs4 import BeautifulSoup
import json
import os
from datetime import datetime, timedelta

class YahooScraper:
    def __init__(self, cache_dir='./cache'):
        self.cache_dir = cache_dir
        self.cache_duration = timedelta(hours=1)  # Reduced cache time for trending data
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        if not os.path.exists(cache_dir):
            os.makedirs(cache_dir)

    def _clean_value(self, value):
        """Clean and standardize value strings"""
        if isinstance(value, str):
            value = value.strip().replace(',', '')
            if value == '-' or value == 'N/A':
                return None
        return value

    def _convert_to_number(self, value):
        """Convert string values to numbers, handling suffixes"""
        value = self._clean_value(value)
        if not value or not isinstance(value, str):
            return value
            
        try:
            # Handle percentages
            if '%' in value:
                return float(value.replace('%', ''))
                
            # Handle T/B/M/K suffixes
            multipliers = {
                'T': 1e12,
                'B': 1e9,
                'M': 1e6,
                'K': 1e3
            }
            
            for suffix, multiplier in multipliers.items():
                if value.endswith(suffix):
                    number = float(value.replace(suffix, ''))
                    return number * multiplier
                    
            return float(value)
        except:
            return value

    def get_trending_tickers_json(self):
        """Fetch trending tickers from Yahoo Finance"""
        try:
            url = 'https://finance.yahoo.com/trending-tickers'
            response = requests.get(url, headers=self.headers)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            trending_data = []
            
            # Find the trending tickers table
            table = soup.find('table')
            if not table:
                return json.dumps({"error": "No trending tickers table found"})
            
            # Get rows
            rows = table.find('tbody').find_all('tr')
            for row in rows:
                cols = row.find_all('td')
                if len(cols) >= 9:  # Ensure we have all expected columns
                    ticker_data = {
                        'Symbol': self._clean_value(cols[0].text),
                        'Name': self._clean_value(cols[1].text),
                        'Price': self._convert_to_number(cols[2].text),
                        'Change': self._convert_to_number(cols[3].text),
                        'Change %': self._convert_to_number(cols[4].text),
                        'Volume': self._convert_to_number(cols[5].text),
                        'Avg Vol (3M)': self._convert_to_number(cols[6].text),
                        'Market Cap': self._clean_value(cols[7].text),
                        'P/E Ratio (TTM)': self._convert_to_number(cols[8].text)
                    }
                    trending_data.append(ticker_data)
            
            return json.dumps(trending_data, indent=2)

        except Exception as e:
            return json.dumps({"error": str(e)})

    def get_valuation_measures_json(self, symbol):
        """Fetch valuation measures and return as JSON"""
        try:
            url = f'https://finance.yahoo.com/quote/{symbol}/key-statistics'
            response = requests.get(url, headers=self.headers)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            valuation_data = {}
            
            tables = soup.find_all('table')
            valuation_table = None
            for table in tables:
                if 'Market Cap' in table.text:
                    valuation_table = table
                    break
                    
            if valuation_table:
                header_row = valuation_table.find('tr')
                dates = [self._clean_value(th.text) for th in header_row.find_all('th')[1:]]
                
                for row in valuation_table.find_all('tr')[1:]:
                    cols = row.find_all('td')
                    if cols:
                        metric = self._clean_value(cols[0].text)
                        values = [self._clean_value(col.text) for col in cols[1:]]
                        
                        metric_data = {}
                        for date, value in zip(dates, values):
                            metric_data[date] = value
                            
                        valuation_data[metric] = metric_data
            
            return json.dumps(valuation_data, indent=2)

        except Exception as e:
            return json.dumps({"error": str(e)})