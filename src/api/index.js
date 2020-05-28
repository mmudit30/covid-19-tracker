import axios from 'axios';

const url = 'https://covid19.mathdro.id/api/';

export const fetchData = async () => {
    try{
        const {data : {recovered, deaths, confirmed, lastUpdate}}  = await axios.get(url);
        return {recovered, deaths, confirmed, lastUpdate};
    }
    catch(error){
        
    }
}
