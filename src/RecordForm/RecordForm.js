import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import AudioRecorder from '../Common/AudioRecorder'
export default function RecordForm() {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Appropriate Title
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AudioRecorder />
        </Grid>
      </Grid>
    </>
  )
}
