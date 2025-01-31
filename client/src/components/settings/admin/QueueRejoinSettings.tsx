
import React, {useContext} from 'react';
import {
  Button, CardContent, Typography, TextField, Grid,
} from '@mui/material';

import BaseCard from '../../common/cards/BaseCard';

import SettingsService from '../../../services/SettingsService';
import {QueueDataContext} from '../../../contexts/QueueDataContext';

export default function QueueRejoinSettings(props) {
  const {queueData} = useContext(QueueDataContext);
  const onSubmit = (event) => {
    event.preventDefault();

    SettingsService.updateRejoinTime(
        JSON.stringify({
          rejoinTime: rejoinTimeInput,
        }),
    );
  };

  let rejoinTimeInput = queueData.rejoinTime;

  return (
    <BaseCard>
      <CardContent>
        <Typography sx={{fontWeight: 'bold', ml: 1, mt: 1}} variant="body1" gutterBottom>
          Queue Rejoin Settings
        </Typography>
        <form onSubmit={onSubmit}>
          <Grid container spacing={1}>
            <Grid className="d-flex" item sx={{mt: 1, ml: 1}}>
              Allow students to rejoin the queue after
              <TextField
                id="current-sem"
                type="number"
                variant="standard"
                sx={{mx: 1, mt: -1}}
                style={{width: '50px'}}
                defaultValue={queueData.rejoinTime ? queueData.rejoinTime : 10}
                onChange={(e) => {
                  rejoinTimeInput = parseInt(e.target.value, 10);
                }}
                inputProps={{min: 0, style: {textAlign: 'center'}}}
              />
              minute(s)
            </Grid>
            <Grid className="d-flex" item sx={{mx: 1}}>
              <Button type="submit" variant="contained">Save</Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </BaseCard>
  );
}
