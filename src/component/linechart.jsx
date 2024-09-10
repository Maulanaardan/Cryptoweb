import React, { useState, useEffect } from 'react';
import Chart from 'react-google-charts';

const LineChart = (props) => {
    const { historicalData } = props;
    const [data, setData] = useState([["Date", "Prices"]]);

    useEffect(() => {
        const dataTemp = [["Date", "Prices"]];
        if (historicalData.prices) {
            historicalData.prices.forEach((element) => {
                // Menggunakan objek Date secara langsung
                dataTemp.push([new Date(element[0]), element[1]]);
            });
            setData(dataTemp);
        }
    }, [historicalData]);

    return (
        <Chart
            chartType="LineChart"
            data={data}
            height="100%"
            width="100%"
            legendToggle
        />
    );
};

export default LineChart;
