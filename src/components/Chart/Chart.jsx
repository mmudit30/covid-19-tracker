import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Bar, Line } from 'react-chartjs-2';
import styles from './Chart.module.css';

const Chart = ({data: {confirmed, recovered, deaths}, country}) => {

    const [dailyData, setDailyData]= useState([]);

    useEffect(() => {
        // if(!dailyData.length){
            const fetchApi = async() => {
                setDailyData(await fetchDailyData());
            }
            // console.log(dailyData);            
            fetchApi();
        // }
    }, []);

    const Linechart = ()=>
        (
        dailyData.length ?
        (<Line
         data={
            {
                labels: dailyData.map(({date}) => date),
                datasets: [{
                    data: dailyData.map(({confirmed}) => confirmed),
                    label: 'Infected',
                    borderColor: 'rgba(0, 0, 255, 0.5)',
                    fill: true
                }, {
                    data: dailyData.map(({deaths}) => deaths),
                    label: 'Deaths',
                    borderColor: 'rgba(255, 0, 0, 0.5)',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    fill: true
                }],
            }
         }
         ></Line> ) : (<div></div>)
        )
    console.log(confirmed, recovered, deaths);
    
    const Barchart =() =>(
        confirmed ?
        (<Bar
          data={{
              labels: ['Infected', 'Recovered', 'Deaths'],
              datasets:[{
                  label: 'People',
                  backgroundColor: [
                      'rgba(0, 0, 255, 0.5)',
                      'rgba(0, 255, 0, 0.5)',
                      'rgba(255, 0, 0, 0.5)'
                  ],
                  data: [confirmed.value, recovered.value, deaths.value,]
              }]
          }}
          options={{
              legend: { display: false },
              title: { display: true, text: `Current state in ${country}` }
          }}
          >
        </Bar>) : (<div></div>)
    )

    return(
        <div className={styles.container}>
            { country ? Barchart() : Linechart() }
        </div>
    );
};

export default Chart;