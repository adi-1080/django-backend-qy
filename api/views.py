from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .yf_fetch import *
from datetime import date

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
def get_stock_statistics(request, ticker):
    try:
        quarters = int(request.GET.get('quarters',6))
        return Response(get_stock_statistics_for_quarters(ticker, quarters))
    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
@api_view(["GET"])
def get_income_statement(request, ticker):
    try:
        return Response(get_income_statement_as_json(ticker))
    except Exception as e:
        return Response({"error": str(e)}, status=500)