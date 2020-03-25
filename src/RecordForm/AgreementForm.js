/* eslint-disable react/prop-types */
import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core'

export default function AgreementForm({ acceptSend, setAcceptSend }) {

  const handleAcceptSend = event => {
    setAcceptSend(event.target.checked)
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {'Add Disclamer / Thanks'}
        </Grid>
        <Grid item xs={12}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={acceptSend} onChange={handleAcceptSend} />}
              label={'I agree'} />
          </FormGroup>
        </Grid>
      </Grid>
    </>
  )
}