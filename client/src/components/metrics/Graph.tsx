import React, {useState, useEffect} from 'react';
import {
  Typography, useTheme,
} from '@mui/material';

import {DateTime} from 'luxon';
import {ResponsiveContainer, LineChart, BarChart, Bar, Line, Label, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

import MetricsService from '../../services/MetricsService';

export default function Graph() {
  const theme = useTheme();
  const [numStudentsPerDayLastWeek, setNumStudentsPerDayLastWeek] = useState([]);
  const [numStudentsPerDay, setNumStudentsPerDay] = useState([]);

  useEffect(() => {
    MetricsService.getNumStudentsPerDayLastWeek().then((res) => {
      setNumStudentsPerDayLastWeek(res.data.numStudentsPerDayLastWeek);
    });

    MetricsService.getNumStudentsPerDay().then((res) => {
      setNumStudentsPerDay(res.data.numStudentsPerDay);
    });
  }, []);

  const dateFormatter = (day) => {
    return DateTime.fromISO(day).toLocaleString({month: 'long', day: 'numeric'});
  };

  return (
    <div>
      <Typography variant="h5" sx={{mt: 4, ml: 10}} fontWeight='bold'>
        Number of Students per Day (in the last week)
      </Typography>
      <ResponsiveContainer width={'92%'} height={400}>
        <LineChart data={numStudentsPerDayLastWeek} margin={{top: 40, right: 0, bottom: 40, left: 50}}>
          <Line type="monotone" dataKey="students" strokeWidth={3} stroke={theme.palette.primary.main}/>
          <CartesianGrid stroke="#ccc" />
          <XAxis tickFormatter={dateFormatter} dataKey="day" domain={['dataMin', 'dataMax']}>
            <Label
              value={'Day'}
              position="bottom"
              style={{textAnchor: 'middle'}}
            />
          </XAxis>
          <YAxis dataKey="students">
            <Label
              value={'Number of Students'}
              position="left"
              angle={-90}
              style={{textAnchor: 'middle'}}
            />
          </YAxis>
          <Tooltip
            labelFormatter={dateFormatter}
          />
        </LineChart>
      </ResponsiveContainer>

      <Typography variant="h5" sx={{mt: 4, ml: 10}} fontWeight='bold'>
        Number of Students per Day of Week
      </Typography>
      <ResponsiveContainer width={'92%'} height={400}>
        <BarChart margin={{top: 40, right: 0, bottom: 40, left: 50}} data={numStudentsPerDay}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="day" />
          <YAxis dataKey="students">
            <Label
              value={'Number of Students'}
              position="left"
              angle={-90}
              style={{textAnchor: 'middle'}}
            />
          </YAxis>
          <Tooltip />
          <Bar dataKey="students" fill= {theme.palette.primary.main} />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}
