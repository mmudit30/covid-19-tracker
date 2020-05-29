import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async () => {
    try{
        const {data : {recovered, deaths, confirmed, lastUpdate}}  = await axios.get(url);
        return {recovered, deaths, confirmed, lastUpdate};
    }
    catch(error){        
    }
}

export const fetchDailyData = async () => {
    try{
        const { data }  = await axios.get(`${url}/daily`);
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate
        }));
        return modifiedData;
    }
    catch(error){        
    }
}
