import yfinance as yf
import pandas as pd
import numpy as np
import json
from datetime import datetime, date, timedelta
from yahooquery import Ticker
import yahooquery as yq
from yahooquery import Screener
import pytz

s = Screener()

# Helper Functions
def convert_timestamps_to_ist(data):
    """
    Recursively converts all timestamps in the given data structure to IST (UTC+5:30).
    Handles UNIX timestamps (integers), ISO date strings, and nested dictionaries/lists.
    """
    et = pytz.timezone("US/Eastern")  # Eastern Time (Yahoo Finance default)
    ist = pytz.timezone("Asia/Kolkata")  # Indian Standard Time (UTC+5:30)

    def convert_value(value):
        """Helper function to process each value."""
        if isinstance(value, (int, float)) and len(str(int(value))) == 10:
            # Convert UNIX timestamp (10-digit integer) to IST
            dt = datetime.fromtimestamp(value, tz=pytz.UTC)  # Convert to UTC
            dt_ist = dt.astimezone(ist)  # Convert to IST
            return dt_ist.strftime("%Y-%m-%d %H:%M:%S")

        if isinstance(value, str):
            try:
                # Convert date string assuming it's in ET
                dt = datetime.strptime(value, "%Y-%m-%d %H:%M:%S")
                dt = et.localize(dt)  # Set ET timezone
                dt_ist = dt.astimezone(ist)  # Convert to IST
                return dt_ist.strftime("%Y-%m-%d %H:%M:%S")
            except ValueError:
                pass  # Return original if not a valid timestamp

        return value  # Return unchanged if not a timestamp

    if isinstance(data, dict):
        return {key: convert_timestamps_to_ist(value) for key, value in data.items()}
    elif isinstance(data, list):
        return [convert_timestamps_to_ist(item) for item in data]
    else:
        return convert_value(data)
    
def clean_nan_values(data):
    """Helper function to clean NaN values from dictionary/list"""
    if isinstance(data, dict):
        return {k: clean_nan_values(v) for k, v in data.items()}
    elif isinstance(data, list):
        return [clean_nan_values(x) for x in data]
    elif isinstance(data, (float, np.float64)) and np.isnan(data):
        return None
    elif pd.isna(data):
        return None
    return data

def convert_to_json_safe(data):
    """Helper function to convert various data types to JSON-safe format"""
    if isinstance(data, pd.DataFrame):
        if data is not None and not data.empty:
            return data.to_dict('records')
        return []
    elif isinstance(data, pd.Series):
        return data.to_dict()
    elif isinstance(data, dict):
        return {str(k): convert_to_json_safe(v) for k, v in data.items()}
    elif isinstance(data, list):
        return [convert_to_json_safe(item) for item in data]
    elif pd.isna(data):  # Handle NaN/None values
        return None
    return data

def convert_timestamp_to_string(timestamp):
    return timestamp.strftime("%Y-%m-%d %H:%M:%S") if isinstance(timestamp, (datetime, pd.Timestamp)) else str(timestamp)

class DateEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, date):
            return obj.isoformat()
        return super().default(obj)

def clean_data(data):
        return {
            str(key): {
                sub_key: (None if pd.isna(sub_value) or sub_value in [float('inf'), float('-inf')] else sub_value)
                for sub_key, sub_value in value.items()
            }
            for key, value in data.to_dict().items()
        } if data is not None else {}

def get_last_n_quarters(current_date, n):
    """Generate the last n quarters ending dates from current date"""
    current_quarter = pd.Timestamp(current_date).quarter
    current_year = pd.Timestamp(current_date).year
    
    quarters = []
    for _ in range(n):
        # Adjust current_quarter and current_year based on quarters
        if current_quarter == 1:
            quarter_end = pd.Timestamp(f"{current_year}-03-31")
        elif current_quarter == 2:
            quarter_end = pd.Timestamp(f"{current_year}-06-30")
        elif current_quarter == 3:
            quarter_end = pd.Timestamp(f"{current_year}-09-30")
        elif current_quarter == 4:
            quarter_end = pd.Timestamp(f"{current_year}-12-31")
        
        # # Only append if the quarter date is not in the future
        if quarter_end <= pd.Timestamp(current_date):
            quarters.append(quarter_end.strftime("%m/%d/%Y"))
        
        # Move to the previous quarter
        current_quarter -= 1
        if current_quarter == 0:
            current_quarter = 4
            current_year -= 1
    
    return ['Current'] + quarters

def process_dataframe(df):
    """Convert DataFrame to JSON-serializable format."""
    if df.empty:
        return []  # Return an empty list if no data found

    if isinstance(df.columns, pd.MultiIndex):  # Flatten MultiIndex columns
        df.columns = ['_'.join(col).strip() for col in df.columns]

    df = df.reset_index()
    df.replace({np.nan: None, np.inf: None, -np.inf: None}, inplace=True)

    # Convert datetime columns to string
    for col in df.columns:
        if pd.api.types.is_datetime64_any_dtype(df[col]):
            df[col] = df[col].apply(convert_timestamp_to_string)

    return df.to_dict(orient="records")  # Convert DataFrame to list of dictionaries

# Main Functions

def get_balance_sheet_as_json(ticker_symbol):
    ticker = yf.Ticker(ticker_symbol)
    yearly_bs = ticker.balance_sheet
    quarterly_bs = ticker.quarterly_balance_sheet
    yearly_bs_cleaned = clean_data(yearly_bs)
    quarterly_bs_cleaned = clean_data(quarterly_bs)
    return {
        "yearly": yearly_bs_cleaned,
        "quarterly": quarterly_bs_cleaned,
    }

def get_cash_flow_as_json(ticker_symbol, **kwargs):
    ticker = yf.Ticker(ticker_symbol)
    yearly_cf = ticker.cash_flow
    quarterly_cf = ticker.quarterly_cash_flow
    yearly_cf_cleaned = clean_data(yearly_cf)
    quarterly_cf_cleaned = clean_data(quarterly_cf)
    return {
        "yearly": yearly_cf_cleaned,
        "quarterly": quarterly_cf_cleaned,
    }

def get_historical_data_as_json(ticker_symbol, **kwargs):   
    historical_data = yf.Ticker(ticker_symbol).history(**kwargs)
    # handle pandas dataframe
    if isinstance(historical_data, pd.DataFrame):
        historical_data = historical_data.reset_index()
        for col in historical_data.columns:
            if pd.api.types.is_datetime64_any_dtype(historical_data[col]):
                historical_data[col] = historical_data[col].apply(convert_timestamp_to_string)
        # Convert DataFrame to list of dictionaries
        historical_data = historical_data.to_dict(orient="records")
    return json.loads(json.dumps(historical_data))

def get_sector_and_industry_as_json(ticker_symbol, **kwargs):
    info = yf.Ticker(ticker_symbol).info
    result = {
        "sector": info.get("sector", "N/A"),
        "industry": info.get("industry", "N/A")
    }
    return result

def get_cal_as_json(ticker_symbol, **kwargs):
    cal = yf.Ticker(ticker_symbol).calendar
    if cal is None:
        return json.dumps({"error": "No calendar data available"})
    return json.loads(json.dumps(cal, cls=DateEncoder))

def get_news_as_json(ticker_symbol):
    news = yf.Ticker(ticker_symbol).news
    if news is None:
        return json.dumps({"error": "No news available"})
    return json.loads(json.dumps(news, cls=DateEncoder))

def get_company_profile(ticker_symbol):
    info = yf.Ticker(ticker_symbol).info  # Fetch metadata and profile details
    return info

def get_analysis_data_as_json(ticker_symbol):
    result = {}
    try:
        # Fetch ticker object
        data = yf.Ticker(ticker_symbol)

        # Access analysis-related attributes
        analysis_data = {
            "earnings_estimate": (
                {str(key): convert_timestamp_to_string(value) for key, value in data.earnings_estimate.to_dict().items()}
                if data.earnings_estimate is not None
                else "No earnings estimate data available"
            ),
            "revenue_estimate": (
                {str(key): convert_timestamp_to_string(value) for key, value in data.revenue_estimate.to_dict().items()}
                if data.revenue_estimate is not None
                else "No revenue estimate data available"
            ),
            "earnings_history": (
                {str(key): convert_timestamp_to_string(value) for key, value in data.earnings_history.to_dict().items()}
                if data.earnings_history is not None
                else "No earnings history data available"
            ),
            "eps_trend": (
                {str(key): convert_timestamp_to_string(value) for key, value in data.eps_trend.to_dict().items()}
                if data.eps_trend is not None
                else "No EPS trend data available"
            ),
            "eps_revisions": (
                {str(key): convert_timestamp_to_string(value) for key, value in data.eps_revisions.to_dict().items()}
                if data.eps_revisions is not None
                else "No EPS revisions data available"
            ),
            "growth_estimates": (
                {str(key): convert_timestamp_to_string(value) for key, value in data.growth_estimates.to_dict().items()}
                if data.growth_estimates is not None
                else "No growth estimate data available"
            ),
            "recommendations": (
                {str(key): convert_timestamp_to_string(value) for key, value in data.recommendations.to_dict().items()}
                if data.recommendations is not None
                else "No recommendations data available"
            ),
            "recommendations_summary": (    
                {str(key): convert_timestamp_to_string(value) for key, value in data.recommendations_summary.to_dict().items()}
                if data.recommendations_summary is not None
                else "No recommendations summary data available"
            ),
            "upgrades_downgrades": (
                {str(key): convert_timestamp_to_string(value) for key, value in data.upgrades_downgrades.to_dict().items()}
                if data.upgrades_downgrades is not None
                else "No upgrades/downgrades data available"
            ),
            "sustainability": (
                {str(key): convert_timestamp_to_string(value) for key, value in data.sustainability.to_dict().items()}
                if data.sustainability is not None
                else "No sustainability data available"
            ),
            "analyst_price_targets": (
                {str(key): convert_timestamp_to_string(value) for key, value in data.analyst_price_targets.items()}
                if data.analyst_price_targets is not None
                else "No analyst price targets data available"
            ),
            "insider-purchases": (
                {str(key): convert_timestamp_to_string(value) for key, value in data.insider_purchases.to_dict().items()}
                if data.insider_purchases is not None
                else "No insider purchases data available"
            ),
            "insider_transactions": (
                {str(key): convert_timestamp_to_string(value) for key, value in data.insider_transactions.to_dict().items()}
                if data.insider_transactions is not None
                else "No insider transactions data available"
            ),
            "insider_roster_holders": (
                {str(key): convert_timestamp_to_string(value) for key, value in data.insider_roster_holders.to_dict().items()}
                if data.insider_roster_holders is not None
                else "No insider roast holders data available"
            ),
            "major_holders": (
                {str(key): convert_timestamp_to_string(value) for key, value in data.major_holders.to_dict().items()}
                if data.major_holders is not None
                else "No major holders data available"
            ),
            "institutional_holders": (
                {str(key): convert_timestamp_to_string(value) for key, value in data.institutional_holders.to_dict().items()}
                if data.institutional_holders is not None
                else "No institutional holders data available"
            ),
            "mutualfund_holders": (
                {str(key): convert_timestamp_to_string(value) for key, value in data.mutualfund_holders.to_dict().items()}
                if data.mutualfund_holders is not None
                else "No mutual fund holders data available"
            ),
        }

        # Serialize the result to JSON format using DateEncoder for date handling
        result[ticker_symbol] = json.loads(json.dumps(analysis_data, cls=DateEncoder))

    except Exception as e:
        result[ticker_symbol] = {"error": str(e)}

    return result

def get_stock_statistics_for_quarters(ticker_symbol, num_quarters):
    """
    Fetch stock statistics for the specified number of quarters
    Parameters:
    ticker_symbol (str): Stock ticker symbol
    num_quarters (int): Number of historical quarters to fetch
    num_quarters has max 20
    """
    try:
        # Validate num_quarters
        num_quarters = max(1, min(num_quarters, 20))  # Limit between 1 and 20 quarters
        
        ticker = yf.Ticker(ticker_symbol)
        info = ticker.info
        
        # Get the specified number of quarters
        dates = get_last_n_quarters(datetime.now(), num_quarters)
        
        quarterly_financials = ticker.quarterly_financials
        quarterly_balance_sheet = ticker.quarterly_balance_sheet
        
        statistics = {
            "Market_Cap": {},  # Add Market_Cap to the statistics
            "Enterprise_Value": {},
            "Trailing_PE": {},
            "Forward_PE": {},
            "PEG_Ratio": {},
            "Price_to_Sales": {},
            "Price_to_Book": {},
            "Enterprise_Value_to_Revenue": {},
            "Enterprise_Value_to_EBITDA": {}
        }
        
        for date in dates:
            try:
                if date == 'Current':
                    # Fetch current market cap directly from the info dictionary
                    market_cap = info.get('marketCap', 0)
                    statistics["Market_Cap"][date] = f"{market_cap / 1e12:.2f}T" if market_cap > 0 else "--"
                    statistics["Enterprise_Value"][date] = f"{info.get('enterpriseValue', 0) / 1e12:.2f}T"
                    statistics["Trailing_PE"][date] = str(info.get('trailingPE', '--'))
                    statistics["Forward_PE"][date] = str(info.get('forwardPE', '--'))
                    statistics["PEG_Ratio"][date] = str(info.get('pegRatio', '--'))
                    statistics["Price_to_Sales"][date] = str(info.get('priceToSalesTrailing12Months', '--'))
                    statistics["Price_to_Book"][date] = str(info.get('priceToBook', '--'))
                    statistics["Enterprise_Value_to_Revenue"][date] = str(info.get('enterpriseToRevenue', '--'))
                    statistics["Enterprise_Value_to_EBITDA"][date] = str(info.get('enterpriseToEbitda', '--'))
                else:
                    query_date = pd.to_datetime(date)
                    
                    if not quarterly_financials.empty:
                        # Get index of the closest quarter, check if a valid index is returned
                        closest_quarter_idx = quarterly_financials.columns.get_indexer([query_date], method='nearest')
                        
                        if closest_quarter_idx.size > 0:
                            closest_quarter = quarterly_financials.columns[closest_quarter_idx[0]]
                            
                            net_income = quarterly_financials.loc['Net Income', closest_quarter]
                            total_revenue = quarterly_financials.loc['Total Revenue', closest_quarter]
                            
                            if not quarterly_balance_sheet.empty:
                                total_assets = quarterly_balance_sheet.loc['Total Assets', closest_quarter]
                                total_liabilities = quarterly_balance_sheet.loc['Total Liabilities Net Minority Interest', closest_quarter]
                                book_value = total_assets - total_liabilities
                                
                                historical_price = ticker.history(start=closest_quarter, end=closest_quarter + pd.Timedelta(days=1))['Close'].iloc[0]
                                shares_outstanding = info.get('sharesOutstanding', 0)
                                
                                market_cap = historical_price * shares_outstanding
                                enterprise_value = market_cap + info.get('totalDebt', 0) - info.get('totalCash', 0)
                                
                                statistics["Market_Cap"][date] = f"{market_cap / 1e12:.2f}T"  # Market Cap for each quarter
                                statistics["Enterprise_Value"][date] = f"{enterprise_value / 1e12:.2f}T"
                                statistics["Trailing_PE"][date] = f"{market_cap / (net_income * 4):.2f}" if net_income > 0 else "--"
                                statistics["Price_to_Sales"][date] = f"{market_cap / (total_revenue * 4):.2f}" if total_revenue > 0 else "--"
                                statistics["Price_to_Book"][date] = f"{market_cap / book_value:.2f}" if book_value > 0 else "--"
                                statistics["Enterprise_Value_to_Revenue"][date] = f"{enterprise_value / (total_revenue * 4):.2f}" if total_revenue > 0 else "--"
                                statistics["Enterprise_Value_to_EBITDA"][date] = "--"
                                statistics["Forward_PE"][date] = "--"
                                statistics["PEG_Ratio"][date] = "--"
                        else:
                            # If no match is found, assign "--" to the metrics
                            for metric in statistics:
                                statistics[metric][date] = "--"
                    
                    # Handle case where the financial data is missing
                    for metric in statistics:
                        if date not in statistics[metric]:
                            statistics[metric][date] = "--"
            
            except Exception as e:
                print(f"Error processing date {date}: {str(e)}")
                for metric in statistics:
                    statistics[metric][date] = "--"

        return statistics

    
    except Exception as e:
        return {"error": str(e)}

def get_income_statement_as_json(ticker_symbol, **kwargs):
    ticker = yf.Ticker(ticker_symbol)
    yearly_income_stmt = ticker.financials
    quarterly_income_stmt = ticker.quarterly_financials
    yearly_income_stmt_cleaned = clean_data(yearly_income_stmt)
    quarterly_income_stmt_cleaned = clean_data(quarterly_income_stmt)
    return {
        "yearly": yearly_income_stmt_cleaned,
        "quarterly": quarterly_income_stmt_cleaned,
    }

def get_multiple_historical_data_as_json(ticker_symbols, **kwargs):
    if isinstance(ticker_symbols, str):
        ticker_symbols = [ticker_symbols]  # Convert single string to list
    historical_data = yf.download(ticker_symbols, **kwargs)

    if isinstance(historical_data.columns, pd.MultiIndex): # Flatten MultiIndex columns if necessary
        historical_data.columns = ['_'.join(col).strip() for col in historical_data.columns]
    historical_data = historical_data.reset_index() # Reset index for JSON conversion
    historical_data = historical_data.replace({np.nan: None, np.inf: None, -np.inf: None}) # Replace NaN and Infinity values with None

    # Convert datetime columns to string
    for col in historical_data.columns:
        if pd.api.types.is_datetime64_any_dtype(historical_data[col]):
            historical_data[col] = historical_data[col].apply(convert_timestamp_to_string)

    # Convert DataFrame to JSON
    return json.loads(json.dumps(historical_data.to_dict(orient="records"), cls=DateEncoder))

def get_yesterday_and_today_closing_data_as_json(ticker_symbols):
    if isinstance(ticker_symbols, str):
        ticker_symbols = [ticker_symbols]

    historical_data = yf.download(ticker_symbols, period="1mo", interval="1d")
    if historical_data.empty:
        return {"error": "No data found for the given parameters."}

    yesterday = (datetime.now() - timedelta(days=1)).strftime("%Y-%m-%d")
    today = (datetime.now()).strftime("%Y-%m-%d")
    yesterday_data = historical_data.loc[historical_data.index == yesterday]
    today_data = historical_data.loc[historical_data.index == today]

    if yesterday_data.empty:
        return {"error": "No data available for yesterday."}
    if today_data.empty:
        return {"error": "No data available for today."}

    return json.loads(json.dumps({
        "yesterday_close": process_dataframe(yesterday_data),
        "today_close": process_dataframe(today_data),
    }, cls=DateEncoder))  # Ensure JSON serialization

def get_key_statistics_json(ticker):
    # Create a Ticker object
    stock = Ticker(ticker)

    # Fetch the key statistics
    key_stats = stock.key_stats

    key_stats_json = json.dumps(key_stats, indent=4)

    return json.loads(key_stats_json)

def search_json(query, first_quote):
    try:
        return yq.search(query, first_quote=first_quote)
    except Exception as e:
        return {'error': str(e)}

## Additional DATA
def get_list_of_currencies_json():
    data = json.dumps(yq.get_currencies(),indent=4)
    return json.loads(data)

def get_exchanges_json():
    exchanges = yq.get_exchanges()
    exchanges = exchanges.dropna()
    data = exchanges.to_dict(orient='records')  # Convert DataFrame to list of dictionaries
    return data

def get_market_summary_json(country):
    data = json.dumps(yq.get_market_summary(country=country),indent=4)
    return json.loads(data)

def get_list_of_trending_stocks_countrywise_json(country):
    data = json.dumps(yq.get_trending(country=country))
    return json.loads(data)

def get_asset_profile_json(symbols):
    tickers = Ticker(symbols)
    data = json.dumps(tickers.asset_profile,indent=4)
    
    return json.loads(data)

def get_calendar_events_json(ticker):
    sym = Ticker(ticker)
    data = sym.calendar_events
    converted_data = convert_timestamps_to_ist(data)
    return converted_data

def get_company_officers_json(ticker):
    sym = Ticker(ticker)
    officers = sym.company_officers
    data = officers.to_dict(orient="records")
    print(data)
    cleanded_data = clean_nan_values(data)
    return cleanded_data

def get_earning_history_json(ticker):
    sym = Ticker(ticker)
    data = json.dumps((sym.earning_history).to_dict(orient="records"),indent=4)
    print(data)
    return json.loads(data)

def get_earnings_json(ticker):
    sym = Ticker(ticker)
    data = json.dumps((sym.earnings),indent=4)
    print(data)
    return json.loads(data)

def get_earnings_trend_json(ticker):
    sym = Ticker(ticker)
    data = json.dumps((sym.earnings_trend),indent=4)
    print(data)
    return json.loads(data)

def get_esg_scores_json(ticker):
    sym = Ticker(ticker)
    data = json.dumps((sym.esg_scores),indent=4)
    print(data)
    return json.loads(data)

def get_financial_data_json(ticker):
    sym = Ticker(ticker)
    data = json.dumps((sym.financial_data),indent=4)
    print(data)
    return json.loads(data)

def get_fund_bond_holdings_json(ticker):
    sym = Ticker(ticker)
    data = json.dumps((sym.fund_bond_holdings),indent=4)
    print(data)
    return json.loads(data)

def get_fund_bond_ratings_json(tickers):
    sym = Ticker(tickers)
    # Check if 'fund_bond_ratings' is available
    if sym.fund_bond_ratings is not None:
        data = json.dumps(sym.fund_bond_ratings.to_dict(orient="records"), indent=4)
        return json.loads(data)
    return None  # Return None if no data is found

def get_fund_equity_holdings_json(ticker):
    sym = Ticker(ticker)
    data = json.dumps((sym.fund_equity_holdings),indent=4)
    print(data)
    return json.loads(data)

def get_fund_holding_info_json(ticker):
    sym = Ticker(ticker)
    data = json.dumps((sym.fund_holding_info),indent=4)
    print(data)
    return json.loads(data)

def get_fund_ownership_json(ticker):
    sym = Ticker(ticker)
    data = json.dumps((sym.fund_ownership).to_dict(orient="records"),indent=4)
    print(data)
    return json.loads(data)

def get_fund_performance_json(ticker):
    sym = Ticker(ticker)
    data = json.dumps((sym.fund_performance),indent=4)
    print(data)
    return json.loads(data)

def get_fund_profile_json(ticker):
    sym = Ticker(ticker)
    data = json.dumps((sym.fund_profile),indent=4)
    print(data)
    return json.loads(data)

def get_fund_sector_weightings_json(ticker):
    sym = Ticker(ticker)
    data = json.dumps((sym.fund_sector_weightings).to_dict(orient="records"),indent=4)
    print(data)
    return json.loads(data)

def get_fund_top_holdings_json(ticker):
    sym = Ticker(ticker)
    data = json.dumps((sym.fund_top_holdings).to_dict(orient="records"),indent=4)
    print(data)
    return json.loads(data)

def get_grading_history_json(ticker):
    sym = Ticker(ticker)
    data = json.dumps((sym.grading_history).to_dict(orient="records"),indent=4)
    print(data)
    return json.loads(data)

def get_index_trend_json(ticker):
    sym = Ticker(ticker)
    data = json.dumps((sym.index_trend),indent=4)
    print(data)
    return json.loads(data)

def get_industry_trend_json(ticker):
    sym = Ticker(ticker)
    data = json.dumps((sym.industry_trend),indent=4)
    print(data)
    return json.loads(data)

### dictionary has NaN values hence json.loads() not working (fixed later)
def get_insider_holders_json(ticker):
    sym = Ticker(ticker)
    data = (sym.insider_holders).to_dict(orient="records")
    print(type(data))
    return data

### json.loads() not working NaN values problem, (fixed later)
def get_insider_transactions_json(ticker):
    sym = Ticker(ticker)
    data = sym.insider_transactions
    data_dict = data.apply(lambda row: {
        col: (None if pd.isna(val) or (isinstance(val, float) and (np.isnan(val) or np.isinf(val))) else val)
        for col, val in row.items()
    }, axis=1).tolist()
    
    # Filter out rows with all None values
    data_dict = [row for row in data_dict if any(val is not None for val in row.values())]
    
    return data_dict        

def get_institution_ownership_json(ticker):
    sym = Ticker(ticker)
    data = json.dumps((sym.institution_ownership).to_dict(orient="records"),indent=4)
    print(data)
    return json.loads(data)

def get_major_holders_json(ticker):
    sym = Ticker(ticker)
    data = json.dumps((sym.major_holders),indent=4)
    print(data)
    return json.loads(data)

def get_page_views_json(ticker):
    sym = Ticker(ticker)
    data = json.dumps((sym.page_views),indent=4)
    print(data)
    return json.loads(data)

def get_price_json(ticker):
    sym = Ticker(ticker)
    data = json.dumps((sym.price),indent=4)
    print(data)
    return json.loads(data)

def get_quote_type_json(ticker):
    sym = Ticker(ticker)
    data = json.dumps((sym.quote_type),indent=4)
    print(data)
    return json.loads(data)

def get_recommendation_trend_json(ticker):
    sym = Ticker(ticker)
    data = json.dumps((sym.recommendation_trend).to_dict(orient="records"),indent=4)
    print(data)
    return json.loads(data)

def get_sec_filings_json(ticker):
    sym = Ticker(ticker)
    data = json.dumps((sym.sec_filings).to_dict(orient="records"),indent=4)
    print(data)
    return json.loads(data)

def get_share_purchase_activity_json(ticker):
    sym = Ticker(ticker)
    data = json.dumps((sym.share_purchase_activity),indent=4)
    print(data)
    return json.loads(data)

def get_summary_detail_json(ticker):
    sym = Ticker(ticker)
    data = json.dumps((sym.summary_detail),indent=4)
    print(data)
    return json.loads(data)

def get_summary_profile_json(ticker):
    sym = Ticker(ticker)
    data = json.dumps((sym.summary_profile),indent=4)
    print(data)
    return json.loads(data)

### Most importatn APIs
def get_available_screeners_json():
    data = s.available_screeners
    print(type(data))
    return json.loads(json.dumps(data,indent=7))

def get_corporate_events_json(ticker):
    sym = Ticker(ticker)
    data = json.dumps((sym.corporate_events).to_dict(orient="records"),indent=4)
    print(data)
    return json.loads(data)

def get_recommendations_json(ticker):
    sym = Ticker(ticker)
    data = json.dumps(sym.recommendations,indent=4)
    print(data)
    return json.loads(data)

def get_technical_insights_json(ticker):
    sym = Ticker(ticker)
    data = json.dumps(sym.technical_insights,indent=4)
    print(data)
    return json.loads(data)