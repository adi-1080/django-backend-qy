from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .yf_fetch import *
from datetime import date
from .scraper import YahooScraper
from yahooquery import Ticker
import numpy as np

scraper = YahooScraper(cache_dir="./cache")

@api_view(["GET"])
def index(request):
    return render(request, "index.html")

@api_view(["GET"])
def get_balance_sheet(request, ticker):
    try:
        return Response(get_balance_sheet_as_json(ticker))
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(["GET"])
def get_cash_flow(request, ticker):
    try:
        return Response(get_cash_flow_as_json(ticker))
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(["GET"])
def get_historical_data(request, ticker):
    try:
        period = request.query_params.get("period", "1mo")    # Default to '1mo'
        interval = request.query_params.get("interval", "1d") # Default to '1d'
        return Response(get_historical_data_as_json(ticker_symbol=ticker, period=period, interval=interval))
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(["GET"])
def get_sector_and_industry(request, ticker):
    try:
        return Response(get_sector_and_industry_as_json(ticker), status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(["GET"])
def get_calendar(request, ticker):
    try:
        return Response(get_cal_as_json(ticker))
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(["GET"])
def get_news(request, ticker):
    try:
        return Response(get_news_as_json(ticker))
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(["GET"])
def get_profile(request, ticker):
    try:
        return Response(get_company_profile(ticker))
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(["GET"])
def get_analysis_data(request, ticker):
    try:
        return Response(get_analysis_data_as_json(ticker))
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(["GET"])
def get_stock_statistics(request, ticker, quarters):
    try:
        return Response(get_stock_statistics_for_quarters(ticker, quarters))
    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
@api_view(["GET"])
def get_income_statement(request, ticker):
    try:
        return Response(get_income_statement_as_json(ticker))
    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
@api_view(["POST"])
def get_multiple_historical_data(request):
    try:
        # Extract parameters from query params
        ticker_symbols = request.data.get("tickers")  # Expecting an array
        start = request.query_params.get("start")
        end = request.query_params.get("end")
        period = request.query_params.get("period")  # Alternative to start/end
        interval = request.query_params.get("interval", "1d")  # Default to "1d"

        if not ticker_symbols:
            return Response({"error": "Missing required parameter: tickers"}, status=400)

        # Call function to get historical data
        data = get_multiple_historical_data_as_json(
            ticker_symbols,
            start=start,
            end=end,
            period=period,
            interval=interval,
        )
        
        return Response(data)
    
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(["POST"])
def get_yesterday_and_today_closing_data(request):
    try:
        ticker_symbols = request.data.get("tickers")
        if not ticker_symbols: return Response({"error": "Missing required parameter: tickers"}, status=400)
        return Response(get_yesterday_and_today_closing_data_as_json(ticker_symbols))
    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
@api_view(["GET"])
def get_valuation_measures(request, ticker):
    try:
        scraper = YahooScraper()
        json_data = scraper.get_valuation_measures_json(ticker)
        return Response(json.loads(json_data),status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
@api_view(["GET"])
def get_trending_tickers(request):
    try:
        scraper = YahooScraper(cache_dir="./cache")
        json_data = scraper.get_trending_tickers_json()
        return Response(json.loads(json_data),status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
@api_view(["GET"])
def get_key_statistics(request,ticker):
    try:
        json_data = get_key_statistics_json(ticker)
        return Response((json_data),status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
        
@api_view(["GET"])
def get_world_indices(request):
    try:
        json_data = scraper.get_world_indices_json()
        return Response(json.loads(json_data),status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(["GET"])
def search(request):
        query = request.GET.get('query', '')
        first_quote = request.GET.get('first_quote', 'false').lower() == 'true'
        
        if not query:
            return Response({'error': 'Query parameter is required'}, status=400)
        
        data = search_json(query, first_quote)
        return Response(data)  

@api_view(["GET"])
def get_currency_data(request):
    try:
        scraper = YahooScraper(cache_dir="./cache")
        json_data = scraper.get_currency_data_json()
        return Response(json.loads(json_data),status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500) 
    
@api_view(["GET"])
def get_list_of_currencies(request):
    try:
        json_data = get_list_of_currencies_json()
        return Response(json_data,status=200)
    except Exception as e:
        return Response({"error": str(e)},status=500)
    
@api_view(["GET"])
def get_exchanges(request):
    try:
        json_data = get_exchanges_json()
        return Response(json_data,status=200)
    except Exception as e:
        return Response({"error": str(e)},status=500)
    
@api_view(["GET"])
def get_market_summary(request,country="INDIA"):
    try:
        json_data = get_market_summary_json(country=country)
        return Response(json_data,status=200)
    except Exception as e:
        return Response({"error": str(e)},status=500)
    
@api_view(["GET"])
def get_list_of_trending_stocks_countrywise(request,country):
    try:
        json_data = get_list_of_trending_stocks_countrywise_json(country=country)
        return Response(json_data,status=200)
    except Exception as e:
        return Response({"error": str(e)},status=500)
    
@api_view(["GET"])
def get_most_active(request):
    try:
        json_data = scraper.get_most_active_json()
        return Response(json.loads(json_data),status=200)
    except Exception as e:
        return Response({"error": str(e)},status=500)
    
@api_view(["GET"])
def get_top_gainers(request):
    try:
        json_data = scraper.get_top_gainers_json()
        return Response(json.loads(json_data),status=200)
    except Exception as e:
        return Response({"error": str(e)},status=500)
    
@api_view(["GET"])
def get_top_losers(request):
    try:
        json_data = scraper.get_top_losers_json()
        return Response(json.loads(json_data),status=200)
    except Exception as e:
        return Response({"error": str(e)},status=500)
    
@api_view(["GET"])
def get_52week_gainers(request):
    try:
        json_data = scraper.get_52week_gainers_json()
        return Response(json.loads(json_data),status=200)
    except Exception as e:
        return Response({"error": str(e)},status=500)
    
@api_view(["GET"])
def get_52week_losers(request):
    try:
        json_data = scraper.get_52week_losers_json()
        return Response(json.loads(json_data),status=200)
    except Exception as e:
        return Response({"error": str(e)},status=500)
    
@api_view(["GET"])
def get_asset_profile(request,symbols):
    try:
        data = get_asset_profile_json(symbols)
        
        if not data:
            return Response({"error": "No data found for the provided symbols"}, status=404)

        return Response(data, status=200)
    except Exception as e:
        return Response({"error":str(e)},status=500)
    
@api_view(["GET"])
def get_calendar_events(request,ticker):
    try:
        data = get_calendar_events_json(ticker)
        
        if not data:
            return Response({"error": "No data found for the provided symbols"}, status=404)

        return Response(data, status=200)
    except Exception as e:
        return Response({"error":str(e)},status=500)
    
@api_view(["GET"])
def get_company_officers(request,ticker):
    try:
        data = get_company_officers_json(ticker)
        
        if not data:
            return Response({"error": "No data found for the provided symbols"}, status=404)

        return Response(data, status=200)
    except Exception as e:
        return Response({"error":str(e)},status=500)
 
@api_view(["GET"])
def get_earning_history(request,ticker):
    try:
        data = get_earning_history_json(ticker)
        converted_data = convert_timestamps_to_ist(data)  # Convert timestamps
        
        if not data:
            return Response({"error": "No data found for the provided symbols"}, status=404)

        return Response(converted_data, status=200)
    except Exception as e:
        return Response({"error":str(e)},status=500)
    
@api_view(["GET"])
def get_earnings(request,ticker):
    try:
        data = get_earnings_json(ticker)
        
        if not data:
            return Response({"error": "No data found for the provided symbols"}, status=404)

        return Response(data, status=200)
    except Exception as e:
        return Response({"error":str(e)},status=500)
    
@api_view(["GET"])
def get_earnings_trend(request,ticker):
    try:
        data = get_earnings_trend_json(ticker)
        
        if not data:
            return Response({"error": "No data found for the provided symbols"}, status=404)

        return Response(data, status=200)
    except Exception as e:
        return Response({"error":str(e)},status=500)
    
@api_view(["GET"])
def get_esg_scores(request,ticker):
    try:
        data = get_esg_scores_json(ticker)
        
        if not data:
            return Response({"error": "No data found for the provided symbols"}, status=404)

        return Response(data, status=200)
    except Exception as e:
        return Response({"error":str(e)},status=500)
    
@api_view(["GET"])
def get_financial_data(request,ticker):
    try:
        data = get_financial_data_json(ticker)
        
        if not data:
            return Response({"error": "No data found for the provided symbols"}, status=404)

        return Response(data, status=200)
    except Exception as e:
        return Response({"error":str(e)},status=500)
    
@api_view(["GET"])
def get_fund_bond_holdings(request,ticker):
    try:
        data = get_fund_bond_holdings_json(ticker)
        
        if not data:
            return Response({"error": "No data found for the provided symbols"}, status=404)

        return Response(data, status=200)
    except Exception as e:
        return Response({"error":str(e)},status=500)
    
@api_view(["GET"])
def get_fund_bond_ratings(request):
    try:
        # Get the 'tickers' query parameter, expected as a comma-separated string
        tickers = request.GET.get("tickers")
        
        if not tickers:
            return Response({"error": "No tickers provided"}, status=400)
        
        # Split the tickers into a list (e.g., "AAPL,GOOGL,TSLA" becomes ["AAPL", "GOOGL", "TSLA"])
        tickers_list = tickers.split(',')
        
        # Get the data for the tickers
        data = get_fund_bond_ratings_json(tickers_list)
        
        # If no data is returned, send a 404 error
        if not data:
            return Response({"error": "No data found for the provided symbols"}, status=404)

        return Response(data, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
@api_view(["GET"])
def get_fund_equity_holdings(request,ticker):
    try:
        data = get_fund_equity_holdings_json(ticker)
        
        if not data:
            return Response({"error": "No data found for the provided symbols"}, status=404)

        return Response(data, status=200)
    except Exception as e:
        return Response({"error":str(e)},status=500)
    
@api_view(["GET"])
def get_fund_holding_info(request,ticker):
    try:
        data = get_fund_holding_info_json(ticker)
        
        if not data:
            return Response({"error": "No data found for the provided symbols"}, status=404)

        return Response(data, status=200)
    except Exception as e:
        return Response({"error":str(e)},status=500)
    
@api_view(["GET"])
def get_fund_ownership(request,ticker):
    try:
        data = get_fund_ownership_json(ticker)
        
        if not data:
            return Response({"error": "No data found for the provided symbols"}, status=404)

        return Response(data, status=200)
    except Exception as e:
        return Response({"error":str(e)},status=500)
    
@api_view(["GET"])
def get_fund_performance(request,ticker):
    try:
        data = get_fund_performance_json(ticker)
        
        if not data:
            return Response({"error": "No data found for the provided symbols"}, status=404)

        return Response(data, status=200)
    except Exception as e:
        return Response({"error":str(e)},status=500)
    
@api_view(["GET"])
def get_fund_profile(request,ticker):
    try:
        data = get_fund_profile_json(ticker)
        
        if not data:
            return Response({"error": "No data found for the provided symbols"}, status=404)

        return Response(data, status=200)
    except Exception as e:
        return Response({"error":str(e)},status=500)
    
@api_view(["GET"])
def get_fund_sector_weightings(request,ticker):
    try:
        data = get_fund_sector_weightings_json(ticker)
        
        if not data:
            return Response({"error": "No data found for the provided symbols"}, status=404)

        return Response(data, status=200)
    except Exception as e:
        return Response({"error":str(e)},status=500)
    
@api_view(["GET"])
def get_fund_top_holdings(request,ticker):
    try:
        data = get_fund_top_holdings_json(ticker)
        
        if not data:
            return Response({"error": "No data found for the provided symbols"}, status=404)

        return Response(data, status=200)
    except Exception as e:
        return Response({"error":str(e)},status=500)
    
@api_view(["GET"])
def get_grading_history(request,ticker):
    try:
        data = get_grading_history_json(ticker)
        
        if not data:
            return Response({"error": "No data found for the provided symbols"}, status=404)

        return Response(data, status=200)
    except Exception as e:
        return Response({"error":str(e)},status=500)
    
@api_view(["GET"])
def get_index_trend(request,ticker):
    try:
        data = get_index_trend_json(ticker)
        
        if not data:
            return Response({"error": "No data found for the provided symbols"}, status=404)

        return Response(data, status=200)
    except Exception as e:
        return Response({"error":str(e)},status=500)
    
@api_view(["GET"])
def get_industry_trend(request,ticker):
    try:
        data = get_industry_trend_json(ticker)
        
        if not data:
            return Response({"error": "No data found for the provided symbols"}, status=404)

        return Response(data, status=200)
    except Exception as e:
        return Response({"error":str(e)},status=500)

@api_view(['GET'])
def get_insider_holders(request, ticker):
    """
    Get insider holders data for a given ticker
    """
    try:
        sym = Ticker(ticker)
        df = sym.insider_holders
        
        # Check if we got a DataFrame
        if not isinstance(df, pd.DataFrame):
            return Response({
                'status': 'error',
                'message': 'No insider holders data available',
                'data': []
            }, status=500)
            
        # Convert DataFrame to records and clean NaN values
        raw_data = df.to_dict(orient="records")
        cleaned_data = clean_nan_values(raw_data)
        
        # Convert any remaining numpy or pandas types to Python native types
        cleaned_data = [
            {k: v.item() if isinstance(v, (np.int64, np.float64)) else v 
             for k, v in record.items()}
            for record in cleaned_data
        ]
        
        return Response({
            'status': 'success',
            'message': 'Insider holders data retrieved successfully',
            'data': cleaned_data
        }, status=200)
        
    except Exception as e:
        return Response({
            'status': 'error',
            'message': str(e),
            'data': []
        }, status=500)
    
@api_view(["GET"])
def get_insider_transactions(request,ticker):
    try:
        data = get_insider_transactions_json(ticker)
        
        if not data:
            return Response({"error": "No data found for the provided symbols"}, status=404)

        return Response(data, status=200)
    except Exception as e:
        return Response({"error":str(e)},status=500)
    
@api_view(["GET"])
def get_institution_ownership(request,ticker):
    try:
        data = get_institution_ownership_json(ticker)
        
        if not data:
            return Response({"error": "No data found for the provided symbols"}, status=404)

        return Response(data, status=200)
    except Exception as e:
        return Response({"error":str(e)},status=500)
    
@api_view(["GET"])
def get_major_holders(request,ticker):
    try:
        data = get_major_holders_json(ticker)
        
        if not data:
            return Response({"error": "No data found for the provided symbols"}, status=404)

        return Response(data, status=200)
    except Exception as e:
        return Response({"error":str(e)},status=500)
    
@api_view(["GET"])
def get_page_views(request,ticker):
    try:
        data = get_page_views_json(ticker)
        
        if not data:
            return Response({"error": "No data found for the provided symbols"}, status=404)

        return Response(data, status=200)
    except Exception as e:
        return Response({"error":str(e)},status=500)
    
@api_view(["GET"])
def get_price(request,ticker):
    try:
        data = get_price_json(ticker)
        
        if not data:
            return Response({"error": "No data found for the provided symbols"}, status=404)

        return Response(data, status=200)
    except Exception as e:
        return Response({"error":str(e)},status=500)
    
@api_view(["GET"])
def get_quote_type(request,ticker):
    try:
        data = get_quote_type_json(ticker)
        
        if not data:
            return Response({"error": "No data found for the provided symbols"}, status=404)

        return Response(data, status=200)
    except Exception as e:
        return Response({"error":str(e)},status=500)
    
@api_view(["GET"])
def get_quote_type(request,ticker):
    try:
        data = get_quote_type_json(ticker)
        
        if not data:
            return Response({"error": "No data found for the provided symbols"}, status=404)

        return Response(data, status=200)
    except Exception as e:
        return Response({"error":str(e)},status=500)
    
@api_view(["GET"])
def get_recommendation_trend(request,ticker):
    try:
        data = get_recommendation_trend_json(ticker)
        
        if not data:
            return Response({"error": "No data found for the provided symbols"}, status=404)

        return Response(data, status=200)
    except Exception as e:
        return Response({"error":str(e)},status=500)
    
@api_view(["GET"])
def get_sec_filings(request,ticker):
    try:
        data = get_sec_filings_json(ticker)
        
        if not data:
            return Response({"error": "No data found for the provided symbols"}, status=404)

        return Response(data, status=200)
    except Exception as e:
        return Response({"error":str(e)},status=500)
    
@api_view(["GET"])
def get_share_purchase_activity(request,ticker):
    try:
        data = get_share_purchase_activity_json(ticker)
        
        if not data:
            return Response({"error": "No data found for the provided symbols"}, status=404)

        return Response(data, status=200)
    except Exception as e:
        return Response({"error":str(e)},status=500)
    
@api_view(["GET"])
def get_summary_detail(request,ticker):
    try:
        data = get_summary_detail_json(ticker)
        
        if not data:
            return Response({"error": "No data found for the provided symbols"}, status=404)

        return Response(data, status=200)
    except Exception as e:
        return Response({"error":str(e)},status=500)
    
@api_view(["GET"])
def get_summary_profile(request,ticker):
    try:
        data = get_summary_profile_json(ticker)
        
        if not data:
            return Response({"error": "No data found for the provided symbols"}, status=404)

        return Response(data, status=200)
    except Exception as e:
        return Response({"error":str(e)},status=500)
    
@api_view(["GET"])
def get_available_screeners(request):
    try:
        data = get_available_screeners_json()
        
        if not data:
            return Response({"error": "No data found for the provided symbols"}, status=404)

        return Response(data, status=200)
    except Exception as e:
        return Response({"error":str(e)},status=500)
    
@api_view(["POST"])
def get_screeners(request):
    if request.method != 'POST':
        return Response({"error": "Only POST method is allowed"}, status=405)

    try:
        # Parse the JSON body
        body = json.loads(request.body)
        screeners = body.get("screeners", [])
        count = body.get("count", 25)  # Default count = 25

        # Validate input
        if not isinstance(screeners, list) or not screeners:
            return Response({"error": "Invalid or missing 'screeners' list"}, status=400)
        if not isinstance(count, int) or count <= 0:
            return Response({"error": "Invalid 'count', must be a positive integer"}, status=400)

        # Fetch data from YahooQuery
        s = Screener()
        data = s.get_screeners(screeners, count)
        
        return Response(data)

    except json.JSONDecodeError:
        return Response({"error": "Invalid JSON format"}, status=400)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
@api_view(["GET"])
def get_corporate_events(request,ticker):
    try:
        data = get_corporate_events_json(ticker)
        
        if not data:
            return Response({"error": "No data found for the provided symbols"}, status=404)

        return Response(data, status=200)
    except Exception as e:
        return Response({"error":str(e)},status=500)
    
@api_view(["GET"])
def get_recommendations(request, tickers):
    """
    API endpoint to retrieve recommendations for given stock symbol(s)
    
    :param request: HTTP request
    :param tickers: Comma-separated list of stock ticker symbols
    :return: JSON response with recommendations
    """
    try:
        # Split tickers and remove any whitespace
        ticker_list = [ticker.strip() for ticker in tickers.split(',')]
        
        # Validate input
        if not ticker_list:
            return Response(
                {"error": "No ticker symbols provided"}, 
                status=400
            )
        
        # Create Ticker object with space-separated symbols
        sym = Ticker(' '.join(ticker_list))
        
        # Retrieve recommendations
        recommendations = sym.recommendations
        
        # Handle case where no recommendations are found
        if not recommendations:
            return Response(
                {"error": "No recommendations found for the provided symbols"}, 
                status=404
            )
        
        return Response(recommendations, status=200)
    
    except Exception as e:
        return Response(
            {"error": str(e)},
            status=500
        )
    
@api_view(["GET"])
def get_technical_insights(request, tickers):
    """
    API endpoint to retrieve technical insights for given stock symbol(s)
    
    :param request: HTTP request
    :param tickers: Comma-separated list of stock ticker symbols
    :return: JSON response with technical insights
    """
    try:
        # Split tickers and remove any whitespace
        ticker_list = [ticker.strip() for ticker in tickers.split(',')]
        
        # Validate input
        if not ticker_list:
            return Response(
                {"error": "No ticker symbols provided"}, 
                status=400
            )
        
        # Create Ticker object with space-separated symbols
        sym = Ticker(' '.join(ticker_list))
        
        # Retrieve technical insights
        technical_insights = sym.technical_insights
        
        # Handle case where no technical insights are found
        if not technical_insights:
            return Response(
                {"error": "No technical insights found for the provided symbols"}, 
                status=404
            )
        
        return Response(technical_insights, status=200)
    
    except Exception as e:
        return Response(
            {"error": str(e)},
            status=500
        )
        
### Most IMPORTANT Sector and Industries information API 
@api_view(['GET'])
def get_sector_industries(request, sector_key):
    """
    Get industries within a sector
    """
    try:
        sector = yf.Sector(sector_key)
        industries = sector.industries
        
        if industries is None or (isinstance(industries, pd.DataFrame) and industries.empty):
            return Response({
                'status': 'success',
                'data': [],
                'message': 'No industries found for this sector'
            })
        
        data = {
            'status': 'success',
            'data': convert_to_json_safe(industries),
            'message': 'Industries retrieved successfully'
        }
        return Response(data, status=200)
    
    except Exception as e:
        return Response({
            'status': 'error',
            'message': str(e),
            'data': []
        }, status=500)

@api_view(['GET'])
def get_sector_top_companies(request, sector_key):
    """
    Get top companies in a sector
    """
    try:
        sector = yf.Sector(sector_key)
        companies = sector.top_companies
        
        if companies is None or (isinstance(companies, pd.DataFrame) and companies.empty):
            return Response({
                'status': 'success',
                'data': [],
                'message': 'No companies found for this sector'
            })
        
        data = {
            'status': 'success',
            'data': convert_to_json_safe(companies),
            'message': 'Companies retrieved successfully'
        }
        return Response(data, status=200)
    
    except Exception as e:
        return Response({
            'status': 'error',
            'message': str(e),
            'data': []
        }, status=500)

@api_view(['GET'])
def get_sector_etfs(request, sector_key):
    """
    Get top ETFs for a sector
    """
    try:
        sector = yf.Sector(sector_key)
        etfs = sector.top_etfs
        
        if etfs is None:
            return Response({
                'status': 'success',
                'data': {},
                'message': 'No ETFs found for this sector'
            })
        
        data = {
            'status': 'success',
            'data': convert_to_json_safe(etfs),
            'message': 'ETFs retrieved successfully'
        }
        return Response(data, status=200)
    
    except Exception as e:
        return Response({
            'status': 'error',
            'message': str(e),
            'data': {}
        }, status=500)

@api_view(['GET'])
def get_sector_mutual_funds(request, sector_key):
    """
    Get top mutual funds for a sector
    """
    try:
        sector = yf.Sector(sector_key)
        funds = sector.top_mutual_funds
        
        if funds is None:
            return Response({
                'status': 'success',
                'data': {},
                'message': 'No mutual funds found for this sector'
            })
        
        data = {
            'status': 'success',
            'data': convert_to_json_safe(funds),
            'message': 'Mutual funds retrieved successfully'
        }
        return Response(data, status=200)
    
    except Exception as e:
        return Response({
            'status': 'error',
            'message': str(e),
            'data': {}
        }, status=500)

@api_view(['GET'])
def get_sector_overview(request, sector_key):
    """
    Get overview information for a specific sector
    """
    try:
        sector = yf.Sector(sector_key)
        overview_data = {
            'key': sector.key,
            'name': sector.name,
            'overview': sector.overview,
            'symbol': sector.symbol
        }
        
        data = {
            'status': 'success',
            'data': convert_to_json_safe(overview_data),
            'message': 'Overview retrieved successfully'
        }
        return Response(data, status=200)
    
    except Exception as e:
        return Response({
            'status': 'error',
            'message': str(e),
            'data': {}
        }, status=500)

@api_view(['GET'])
def get_sector_research(request, sector_key):
    """
    Get research reports for a sector
    """
    try:
        sector = yf.Sector(sector_key)
        research = sector.research_reports
        
        if research is None:
            return Response({
                'status': 'success',
                'data': [],
                'message': 'No research reports found for this sector'
            })
        
        data = {
            'status': 'success',
            'data': convert_to_json_safe(research),
            'message': 'Research reports retrieved successfully'
        }
        return Response(data, status=200)
    
    except Exception as e:
        return Response({
            'status': 'error',
            'message': str(e),
            'data': []
        }, status=500)