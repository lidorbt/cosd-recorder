import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { DatePicker } from '@material-ui/pickers'
import { FormControlLabel, RadioGroup, FormLabel, FormControl, Radio, Select, InputLabel, MenuItem, makeStyles, FormGroup, Checkbox, TextField } from '@material-ui/core'
import _ from 'lodash'

export default function PersonalInformationForm() {
  const HealthStatusTypes = ['Healthy', 'Quarantine', 'Corona Positive']
  const [selectedYear, handleYearChange] = useState(new Date())
  const [hasLungsDisease, setHasLungsDisease] = useState('no')
  const [isSmoking, setIsSmoking] = useState('no')
  const [gender, setGender] = useState('female')
  const [healthStatus, setHealthStatus] = useState('0')
  const [otherDisease, setOtherDisease] = useState('')


  const handleHasLungsDiseaseChange = event => {
    setHasLungsDisease(event.target.value)
  }

  const handleIsSmokingChange = event => {
    setIsSmoking(event.target.value)
  }

  const handleGenderChange = event => {
    setGender(event.target.value)
  }

  const handleHealthStatusChange = event => {
    setHealthStatus(event.target.value)
  }

  const handleOtherDiseaseChange = event => {
    setOtherDisease(event.target.value)
  }

  const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 140
    }
  }))
  const lungsDiseases = ['Asthma', 'Bronchitis', 'Emphysema']
  const lungsDiseaseInit = _.zipObject(lungsDiseases, _.times(lungsDiseases.length, [false]))
  const [lungsDisease, setLungsDisease] = React.useState(lungsDiseaseInit)

  const handleChange = event => {
    setLungsDisease({ ...lungsDisease, [event.target.name]: event.target.checked })
  }

  const classes = useStyles()

  return (
    <>
      <Typography variant='h6' gutterBottom>{'Personal Information'}</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl component="fieldset" required>
            <FormLabel component="legend">{'Gender'}</FormLabel>
            <RadioGroup aria-label="gender" name="gender-rg" value={gender} onChange={handleGenderChange}>
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <DatePicker
            required
            views={['year']}
            label='Birth Year'
            value={selectedYear}
            onChange={handleYearChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" className={classes.formControl} required>
            <InputLabel id="health-status">{'Health Status'}</InputLabel>
            <Select
              labelId="health-status"
              id="health-status"
              value={healthStatus}
              onChange={handleHealthStatusChange}
              label="Health Status">
              {HealthStatusTypes.map((statusType, index) => (<MenuItem key={String(index)} value={String(index)}>{statusType}</MenuItem>))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl component='fieldset' required>
            <FormLabel component='legend'>{'Are You Smoking?'}</FormLabel>
            <RadioGroup aria-label='isSmoking' name='isSmoking' value={isSmoking} onChange={handleIsSmokingChange}>
              <FormControlLabel value='yes' control={<Radio />} label='Yes' />
              <FormControlLabel value='no' control={<Radio />} label='No' />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl component='fieldset' required>
            <FormLabel component='legend'>{'Do you have Any Lungs Diseases?'}</FormLabel>
            <RadioGroup aria-label='hasHealthDisease' name='healthDisease' value={hasLungsDisease} onChange={handleHasLungsDiseaseChange}>
              <FormControlLabel value='yes' control={<Radio />} label='Yes' />
              <FormControlLabel value='no' control={<Radio />} label='No' />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset" className={classes.formControl} required={hasLungsDisease === 'yes'} disabled={hasLungsDisease !== 'yes'}>
            <FormLabel component="legend">{'Lungs Diseases:'}</FormLabel>
            <FormGroup>
              {lungsDiseases.map((item, index) =>
                <FormControlLabel key={index}
                  control={<Checkbox checked={lungsDisease[item]} onChange={handleChange} name={item} />}
                  label={item} />)}
              <Grid container alignItems='flex-end'>
                <Grid item>
                  <FormControlLabel
                    control={<Checkbox checked={otherDisease.trim() !== ''} onChange={handleChange} name='Other' />} />
                </Grid>
                <Grid item>
                  <TextField id="standard-name" label="Name" value={otherDisease} onChange={handleOtherDiseaseChange} />
                </Grid>
              </Grid>
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
    </>
  )
}
