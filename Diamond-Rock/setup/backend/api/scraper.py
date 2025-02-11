import requests
from bs4 import BeautifulSoup
import json
import os
from datetime import datetime, timedelta
import time
import logging

class YahooScraper:
    def __init__(self, cache_dir='./cache'):
        self.cache_dir = cache_dir
        self.cache_duration = timedelta(hours=1)
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        # Define cache files for different data types
        self.cache_files = {
            'trending': os.path.join(cache_dir, 'trending_cache.json'),
            'valuation': os.path.join(cache_dir, 'valuation_cache.json'),
            'currency': os.path.join(cache_dir, 'currency_cache.json'),
            'indices': os.path.join(cache_dir, 'indices_cache.json'),
            'gainers': os.path.join(cache_dir, 'gainers_cache.json'),
            'losers': os.path.join(cache_dir, 'losers_cache.json'),
            'most_active': os.path.join(cache_dir, 'most_active_cache.json'),
            'year_gainers': os.path.join(cache_dir, 'year_gainers_cache.json'),
            'year_losers': os.path.join(cache_dir, 'year_losers_cache.json'),
            'nse_volume_shockers': os.path.join(cache_dir, 'nse_volume_shockers_cache.json')
        }
        
        # URLs for different endpoints
        self.base_url = 'https://finance.yahoo.com'
        self.currency_url = f'{self.base_url}/currencies'
        self.indices_url = f'{self.base_url}/world-indices'
        self.gainers_url = f'{self.base_url}/markets/stocks/gainers'
        self.losers_url = f'{self.base_url}/markets/stocks/losers'
        self.most_active_url = f'{self.base_url}/markets/stocks/most-active'
        self.trending_url = f'{self.base_url}/trending-tickers'
        self.year_gainers_url = f'{self.base_url}/markets/stocks/52-week-gainers'
        self.year_losers_url = f'{self.base_url}/markets/stocks/52-week-losers'
        
        # Setup logging
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
        
        # Create cache directory if it doesn't exist
        if not os.path.exists(cache_dir):
            os.makedirs(cache_dir)

    def _load_cache(self, cache_type, symbol=None):
        """Load data from cache if it exists and is not expired"""
        cache_file = self.cache_files[cache_type]
        if symbol:
            cache_file = cache_file.replace('.json', f'_{symbol}.json')
            
        if os.path.exists(cache_file):
            try:
                with open(cache_file, 'r') as f:
                    cache_data = json.load(f)
                    cache_time = datetime.fromtimestamp(cache_data['timestamp'])
                    if datetime.now() - cache_time < self.cache_duration:
                        self.logger.info(f"Retrieved {cache_type} data from cache")
                        return cache_data['data']
                    else:
                        self.logger.info(f"Cache expired for {cache_type}")
            except (json.JSONDecodeError, KeyError) as e:
                self.logger.error(f"Cache error for {cache_type}: {str(e)}")
        return None

    def _save_cache(self, data, cache_type, symbol=None):
        """Save data to cache with timestamp"""
        cache_file = self.cache_files[cache_type]
        if symbol:
            cache_file = cache_file.replace('.json', f'_{symbol}.json')
            
        cache_data = {
            'timestamp': datetime.now().timestamp(),
            'data': data
        }
        try:
            with open(cache_file, 'w') as f:
                json.dump(cache_data, f)
            self.logger.info(f"Cached {cache_type} data successfully")
        except Exception as e:
            self.logger.error(f"Error saving cache for {cache_type}: {str(e)}")

    def _clean_value(self, value):
        """Clean and standardize value strings"""
        if isinstance(value, str):
            value = value.strip().replace(',', '')
            if value in ['-', 'N/A', '']:
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
            multipliers = {'T': 1e12, 'B': 1e9, 'M': 1e6, 'K': 1e3}
            for suffix, multiplier in multipliers.items():
                if value.endswith(suffix):
                    return float(value.replace(suffix, '')) * multiplier
                    
            return float(value)
        except ValueError:
            return value

    def _fetch_data(self, url, error_message="Error fetching data"):
        """Generic method to fetch data with error handling"""
        try:
            response = requests.get(url, headers=self.headers)
            response.raise_for_status()
            return response.text
        except requests.RequestException as e:
            self.logger.error(f"{error_message}: {str(e)}")
            return None

    def get_trending_tickers_json(self):
        """Fetch trending tickers from Yahoo Finance"""
        # Try to load from cache first
        cached_data = self._load_cache('trending')
        if cached_data:
            return json.dumps(cached_data)

        html_content = self._fetch_data(
            f'{self.base_url}/trending-tickers',
            "Error fetching trending tickers"
        )
        
        if not html_content:
            return json.dumps({"error": "Failed to fetch data", "cached_data": cached_data})

        try:
            soup = BeautifulSoup(html_content, 'html.parser')
            trending_data = []
            
            table = soup.find('table')
            if not table:
                raise ValueError("No trending tickers table found")
            
            rows = table.find('tbody').find_all('tr')
            for row in rows:
                cols = row.find_all('td')
                if len(cols) >= 9:
                    ticker_data = {
                        'Symbol': self._clean_value(cols[0].text),
                        'Name': self._clean_value(cols[1].text),
                        'Price': self._convert_to_number(cols[2].text),
                        'Change': self._convert_to_number(cols[3].text),
                        'Change %': self._convert_to_number(cols[4].text),
                        'Volume': self._convert_to_number(cols[5].text),
                        'Avg Vol (3M)': self._convert_to_number(cols[6].text),
                        'Market Cap': self._convert_to_number(cols[7].text),
                        'P/E Ratio (TTM)': self._convert_to_number(cols[8].text)
                    }
                    trending_data.append(ticker_data)
            
            # Cache the new data
            self._save_cache(trending_data, 'trending')
            return json.dumps(trending_data)

        except Exception as e:
            self.logger.error(f"Error parsing trending tickers: {str(e)}")
            if cached_data:
                return json.dumps({"error": str(e), "cached_data": cached_data})
            return json.dumps({"error": str(e)})

    def get_valuation_measures_json(self, symbol):
        """Fetch valuation measures for a specific symbol"""
        # Try to load from cache first
        cached_data = self._load_cache('valuation', symbol)
        if cached_data:
            return json.dumps(cached_data)

        html_content = self._fetch_data(
            f'{self.base_url}/quote/{symbol}/key-statistics',
            f"Error fetching valuation measures for {symbol}"
        )
        
        if not html_content:
            return json.dumps({"error": "Failed to fetch data", "cached_data": cached_data})

        try:
            soup = BeautifulSoup(html_content, 'html.parser')
            valuation_data = {}
            
            tables = soup.find_all('table')
            valuation_table = next((table for table in tables if 'Market Cap' in table.text), None)
                    
            if valuation_table:
                header_row = valuation_table.find('tr')
                dates = [self._clean_value(th.text) for th in header_row.find_all('th')[1:]]
                
                for row in valuation_table.find_all('tr')[1:]:
                    cols = row.find_all('td')
                    if cols:
                        metric = self._clean_value(cols[0].text)
                        values = [self._convert_to_number(col.text) for col in cols[1:]]
                        
                        valuation_data[metric] = dict(zip(dates, values))
            
            # Cache the new data
            self._save_cache(valuation_data, 'valuation', symbol)
            return json.dumps(valuation_data)

        except Exception as e:
            self.logger.error(f"Error parsing valuation measures for {symbol}: {str(e)}")
            if cached_data:
                return json.dumps({"error": str(e), "cached_data": cached_data})
            return json.dumps({"error": str(e)})

    def get_currency_data_json(self):
        """Fetch currency data"""
        # Try to load from cache first
        cached_data = self._load_cache('currency')
        if cached_data:
            return json.dumps(cached_data)

        html_content = self._fetch_data(
            self.currency_url,
            "Error fetching currency data"
        )
        
        if not html_content:
            return json.dumps({"error": "Failed to fetch data", "cached_data": cached_data})

        try:
            soup = BeautifulSoup(html_content, 'html.parser')
            table = soup.find('table', class_='markets-table')
            if not table:
                raise ValueError("Currency table not found")

            currency_data = []
            rows = table.find('tbody').find_all('tr')
            
            for row in rows:
                cells = row.find_all('td')
                if len(cells) >= 6:
                    currency_info = {
                        'symbol': self._clean_value(cells[0].text),
                        'name': self._clean_value(cells[1].text),
                        'last_price': self._convert_to_number(cells[2].text),
                        'change': self._convert_to_number(cells[3].text),
                        'percent_change': self._convert_to_number(cells[4].text),
                        'time': self._clean_value(cells[5].text)
                    }
                    currency_data.append(currency_info)

            # Cache the new data
            self._save_cache(currency_data, 'currency')
            return json.dumps(currency_data)

        except Exception as e:
            self.logger.error(f"Error parsing currency data: {str(e)}")
            if cached_data:
                return json.dumps({"error": str(e), "cached_data": cached_data})
            return json.dumps({"error": str(e)})

    def get_world_indices_json(self):
        """Fetch world indices data"""
        # Try to load from cache first
        cached_data = self._load_cache('indices')
        if cached_data:
            return json.dumps(cached_data)

        html_content = self._fetch_data(
            self.indices_url,
            "Error fetching world indices"
        )
        
        if not html_content:
            return json.dumps({"error": "Failed to fetch data", "cached_data": cached_data})

        try:
            soup = BeautifulSoup(html_content, 'html.parser')
            table = soup.find('table', class_='markets-table')
            if not table:
                raise ValueError("Indices table not found")

            indices_data = []
            rows = table.find('tbody').find_all('tr')
            
            for row in rows:
                cells = row.find_all('td')
                if len(cells) >= 7:
                    index_info = {
                        'symbol': self._clean_value(cells[0].text),
                        'name': self._clean_value(cells[1].text),
                        'last_price': self._convert_to_number(cells[2].text),
                        'change': self._convert_to_number(cells[3].text),
                        'percent_change': self._convert_to_number(cells[4].text),
                        'volume': self._convert_to_number(cells[5].text),
                        'time': self._clean_value(cells[6].text)
                    }
                    indices_data.append(index_info)

            # Cache the new data
            self._save_cache(indices_data, 'indices')
            return json.dumps(indices_data)

        except Exception as e:
            self.logger.error(f"Error parsing world indices: {str(e)}")
            if cached_data:
                return json.dumps({"error": str(e), "cached_data": cached_data})
            return json.dumps({"error": str(e)})
        
    def _parse_market_table(self, soup):
        """Helper method to parse market data tables"""
        try:
            table = soup.find('table')
            if not table:
                raise ValueError("Table not found")

            data = []
            rows = table.find('tbody').find_all('tr')
            
            for row in rows:
                cols = row.find_all('td')
                if len(cols) >= 9:  # Most tables have at least 9 columns
                    stock_data = {
                        'Symbol': self._clean_value(cols[0].text),
                        'Name': self._clean_value(cols[1].text),
                        'Price': self._convert_to_number(cols[2].text),
                        'Change': self._convert_to_number(cols[3].text),
                        'Change %': self._convert_to_number(cols[4].text),
                        'Volume': self._convert_to_number(cols[5].text),
                        'Avg Vol (3M)': self._convert_to_number(cols[6].text),
                        'Market Cap': self._convert_to_number(cols[7].text),
                        'PE Ratio': self._convert_to_number(cols[8].text) if len(cols) > 8 else None
                    }
                    data.append(stock_data)
            
            return data
        except Exception as e:
            self.logger.error(f"Error parsing market table: {str(e)}")
            return None

    def get_top_gainers_json(self):
        """Fetch top gaining stocks"""
        cached_data = self._load_cache('gainers')
        if cached_data:
            return json.dumps(cached_data)

        html_content = self._fetch_data(
            self.gainers_url,
            "Error fetching top gainers"
        )
        
        if not html_content:
            return json.dumps({"error": "Failed to fetch data", "cached_data": cached_data})

        try:
            soup = BeautifulSoup(html_content, 'html.parser')
            gainers_data = self._parse_market_table(soup)
            
            if gainers_data:
                self._save_cache(gainers_data, 'gainers')
                return json.dumps(gainers_data)
            else:
                raise ValueError("Failed to parse gainers data")

        except Exception as e:
            self.logger.error(f"Error processing top gainers: {str(e)}")
            if cached_data:
                return json.dumps({"error": str(e), "cached_data": cached_data})
            return json.dumps({"error": str(e)})

    def get_top_losers_json(self):
        """Fetch top losing stocks"""
        cached_data = self._load_cache('losers')
        if cached_data:
            return json.dumps(cached_data)

        html_content = self._fetch_data(
            self.losers_url,
            "Error fetching top losers"
        )
        
        if not html_content:
            return json.dumps({"error": "Failed to fetch data", "cached_data": cached_data})

        try:
            soup = BeautifulSoup(html_content, 'html.parser')
            losers_data = self._parse_market_table(soup)
            
            if losers_data:
                self._save_cache(losers_data, 'losers')
                return json.dumps(losers_data)
            else:
                raise ValueError("Failed to parse losers data")

        except Exception as e:
            self.logger.error(f"Error processing top losers: {str(e)}")
            if cached_data:
                return json.dumps({"error": str(e), "cached_data": cached_data})
            return json.dumps({"error": str(e)})

    def get_most_active_json(self):
        """Fetch most active stocks"""
        cached_data = self._load_cache('most_active')
        if cached_data:
            return json.dumps(cached_data)

        html_content = self._fetch_data(
            self.most_active_url,
            "Error fetching most active stocks"
        )
        
        if not html_content:
            return json.dumps({"error": "Failed to fetch data", "cached_data": cached_data})

        try:
            soup = BeautifulSoup(html_content, 'html.parser')
            active_data = self._parse_market_table(soup)
            
            if active_data:
                self._save_cache(active_data, 'most_active')
                return json.dumps(active_data)
            else:
                raise ValueError("Failed to parse most active data")

        except Exception as e:
            self.logger.error(f"Error processing most active stocks: {str(e)}")
            if cached_data:
                return json.dumps({"error": str(e), "cached_data": cached_data})
            return json.dumps({"error": str(e)})

    def get_52week_gainers_json(self):
        """Fetch 52-week high gainers"""
        cached_data = self._load_cache('year_gainers')
        if cached_data:
            return json.dumps(cached_data)

        html_content = self._fetch_data(
            self.year_gainers_url,
            "Error fetching 52-week gainers"
        )
        
        if not html_content:
            return json.dumps({"error": "Failed to fetch data", "cached_data": cached_data})

        try:
            soup = BeautifulSoup(html_content, 'html.parser')
            year_gainers_data = self._parse_market_table(soup)
            
            if year_gainers_data:
                self._save_cache(year_gainers_data, 'year_gainers')
                return json.dumps(year_gainers_data)
            else:
                raise ValueError("Failed to parse 52-week gainers data")

        except Exception as e:
            self.logger.error(f"Error processing 52-week gainers: {str(e)}")
            if cached_data:
                return json.dumps({"error": str(e), "cached_data": cached_data})
            return json.dumps({"error": str(e)})

    def get_52week_losers_json(self):
        """Fetch 52-week low losers"""
        cached_data = self._load_cache('year_losers')
        if cached_data:
            return json.dumps(cached_data)

        html_content = self._fetch_data(
            self.year_losers_url,
            "Error fetching 52-week losers"
        )
        
        if not html_content:
            return json.dumps({"error": "Failed to fetch data", "cached_data": cached_data})

        try:
            soup = BeautifulSoup(html_content, 'html.parser')
            year_losers_data = self._parse_market_table(soup)
            
            if year_losers_data:
                self._save_cache(year_losers_data, 'year_losers')
                return json.dumps(year_losers_data)
            else:
                raise ValueError("Failed to parse 52-week losers data")

        except Exception as e:
            self.logger.error(f"Error processing 52-week losers: {str(e)}")
            if cached_data:
                return json.dumps({"error": str(e), "cached_data": cached_data})
            return json.dumps({"error": str(e)})
        
    def get_nse_volume_shockers_json(self):
        """Fetch NSE volume shockers from StockEdge"""
        # Try to load from cache first
        cached_data = self._load_cache('nse_volume_shockers')
        if cached_data:
            return json.dumps(cached_data)

        # URL for volume shockers
        url = 'https://web.stockedge.com/trending-stocks?section=volume-shockers'

        html_content = self._fetch_data(
            url,
            "Error fetching NSE volume shockers"
        )

        if not html_content:
            return json.dumps({"error": "Failed to fetch data", "cached_data": cached_data})

        try:
            soup = BeautifulSoup(html_content, 'html.parser')
            volume_shockers_data = []

            # Find the table with volume shockers
            table = soup.find('table', class_='table')
            if not table:
                raise ValueError("Volume shockers table not found")

            # Extract table rows, skipping header
            rows = table.find_all('tr')[1:]

            for row in rows:
                cols = row.find_all('td')
                if len(cols) >= 6:
                    shocker_data = {
                        'Symbol': self._clean_value(cols[0].text),
                        'Company Name': self._clean_value(cols[1].text),
                        'LTP': self._convert_to_number(cols[2].text),
                        'Change': self._convert_to_number(cols[3].text),
                        'Change %': self._convert_to_number(cols[4].text),
                        'Volume': self._convert_to_number(cols[5].text)
                    }
                    volume_shockers_data.append(shocker_data)

            # Cache the new data
            self._save_cache(volume_shockers_data, 'nse_volume_gainers')
            return json.dumps(volume_shockers_data)

        except Exception as e:
            self.logger.error(f"Error parsing volume shockers: {str(e)}")
            if cached_data:
                return json.dumps({"error": str(e), "cached_data": cached_data})
            return json.dumps({"error": str(e)})