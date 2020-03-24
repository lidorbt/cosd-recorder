import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
}))

export default function AgreementForm() {
  const classes = useStyles()

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Some Agreement Shit
			</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Some Agreement Shit
					</Typography>
        </Grid>
      </Grid>
    </>
  )
}
