import { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts';
import { GetUserFeelings } from '../helpers/fetchbackend';
import { set } from 'date-fns/set';



export function MoodGraph() {
    const [feelings, setFeelings] = useState([]);
    const [dates, setDates] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        const email = localStorage.getItem("email");
        const data = await GetUserFeelings(email);

        const f = [];
        const d = [];

        for (const obj of data.feelings) {
            f.push(obj.feeling);
            d.push(new Date(obj.created_at).toISOString().split('T')[0]);
        }

        setFeelings(f);
        setDates(d);
        };

        fetchData();
    }, []);

    return (
    <div className="flex flex-col items-center p-8 min-h-screen">
        <h2 className="relative text-5xl font-semibold text-white-800 mb-16 mt-4 ">
        Graph Over Feelings
        </h2>

        <div className="w-full max-w-6xl overflow-x-auto mt-36">
        <LineChart
            xAxis={[
            {
                data: dates,
                label: 'Date',
                scaleType: 'point',
            },
            ]}
            series={[{ data: feelings }]}
            height={500}
            yAxis={[
            {
                label: 'Feeling',
                scaleType: 'linear',
                min: 0,
                max: 10,
            },
            ]}
        />
        </div>
    </div>
    );

}