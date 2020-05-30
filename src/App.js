import React from "react";

import { Cards, Chart, CountryPicker } from './components';
import styles from "./App.module.css";
import {fetchData} from './api';
import Coronaimage from './images/covid19.png';

class App extends React.Component{
    state={
        data: {},
        country:'',
    }
    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({ data : fetchedData });
    }
    handleCountryChange= async (country)=>{
        const fetchedData = await fetchData(country);
        this.setState({ data : fetchedData, country: country });
        
    }
    render(){
        const { data, country } = this.state;
        return(
            <div className={styles.container}>
                <img src={Coronaimage} alt='' className={styles.image} />
                <Cards data={data}></Cards>
                <CountryPicker handleCountryChange={this.handleCountryChange}></CountryPicker>
                <Chart data={data} country={country}></Chart>
            </div>
        )
    }
}

export default App;