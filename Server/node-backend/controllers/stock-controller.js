import mongoose from 'mongoose';
import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

const djangoAPI = process.env.DJANGO_API;

const search = async(req,res) => {
  const searchTerm = req.query.name; 

    if (!searchTerm) {
        return res.status(400).json({ error: 'Name parameter is required' });
    }

    try {

      const db = mongoose.connection.useDb('jsonutils');  

        const collections = [
            { name: 'nyse', searchFields: ['company-name', 'nyse-symbol'] },
            { name: 'nasdaq', searchFields: ['company-name', 'nasdaq-symbol'] },
            { name: 'nse-indices', searchFields: ['index-name', 'ticker-symbol'] },
            { name: 'bse-indices', searchFields: ['index-name', 'ticker-symbol'] },
            { name: 'nse-bse-companies', searchFields: ['company-name','nse-symbol']},
            { name: 'sse', searchFields: ['company-name','sse-cde']},
            { name: 'hk', searchFields: ['company-name','hk-code']},
        ];
        let results = [];

        for (const coll of collections) {
            const collection = db.collection(coll.name);

            const searchQuery = {$or: coll.searchFields.map((field) => ({[field]: new RegExp(searchTerm, 'i')}))};

            const companyResults = await collection.find(searchQuery).toArray();
            results = results.concat(companyResults);
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'No companies found' });
        }

        res.json(results); 
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getBalanceSheet = async (req, res) => {
  const { tickerSymbol } = req.params;
  try {
    const response = await axios.get(
      `${djangoAPI}/get_balance_sheet/${tickerSymbol}`
    );
    console.log(response);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCashFlow = async (req, res) => {
  const { tickerSymbol } = req.params;
  try {
    const response = await axios.get(
      `${djangoAPI}/get_cash_flow/${tickerSymbol}`
    );
    console.log(response);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHistoricalData = async (req, res) => {
  const { tickerSymbol } = req.params;
  const period = req.query.period || "1mo";
  const interval = req.query.interval || "1d";

  try {
    const response = await axios.get(
      `${djangoAPI}/get_historical_data/${tickerSymbol}/`,
      {
        params: {
          period: period,
          interval: interval,
        },
      }
    );
    const formattedData = response.data.map((item) => {
      const formattedDate = item.Date.replace(" ", "T");
      const timestamp = new Date(formattedDate).getTime();
      return {
        Date: timestamp,
        Open: item.Open,
        High: item.High,
        Low: item.Low,
        Close: item.Close,
      };
    });
    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: error.message });
  }
};

const getSectorAndIndustry = async (req, res) => {
  const { tickerSymbol } = req.params;
  try {
    const response = await axios.get(
      `${djangoAPI}/get_sector_and_industry/${tickerSymbol}`
    );
    console.log(response);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCalendar = async (req, res) => {
  const { tickerSymbol } = req.params;
  try {
    const response = await axios.get(
      `${djangoAPI}/get_calendar/${tickerSymbol}`
    );
    console.log(response);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStockStats = async(req,res) => {
  const {tickerSymbol,quarters} = req.params;
  try{
    const response = await axios.get(`${djangoAPI}/get_stock_stats/${tickerSymbol}/${quarters}`);
    console.log(response);
    res.status(200).json(response.data);
  }catch(e){
    res.status(500).json({error: e.message});
  }
}

const getAnalysis = async(req,res) => {
  const {tickerSymbol} = req.params;
  try{
    const response = await axios.get(`${djangoAPI}/get_analysis_data/${tickerSymbol}`);
    console.log(response);
    res.status(200).json(response.data);
  }catch(e){
    res.status(500).json({error: e.message});
  }
}

const getNews = async(req,res) => {
  const {tickerSymbol} = req.params;
  try{
    const response = await axios.get(`${djangoAPI}/get_news/${tickerSymbol}`);
    console.log(response);
    res.status(200).json(response.data);
  }catch(e){
    res.status(500).json({error: e.message});
  }
}

const getProfile = async(req,res) => {
  const {tickerSymbol} = req.params;
  try{
    const response = await axios.get(`${djangoAPI}/get_profile/${tickerSymbol}`);
    console.log(response);
    res.status(200).json(response.data);
  }catch(e){
    res.status(500).json({error: e.message});
  }
}

export default {
  getBalanceSheet,
  getCashFlow,
  getHistoricalData,
  getSectorAndIndustry,
  getCalendar,
  getStockStats,
  getAnalysis,
  getNews,
  getProfile,
  search,
};
