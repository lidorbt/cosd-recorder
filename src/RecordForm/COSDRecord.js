import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import PersonalInformationForm, { HealthStatusTypes } from './PersonalInformationForm'
import RecordForm from './RecordForm'
import AgreementForm from './AgreementForm'
import Axios from 'axios'
import Swal from 'sweetalert2'



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {`Copyright © COVID-19 Symptoms Detection ${new Date().getFullYear()}`}
    </Typography>
  )
}

export default function COSDRecord() {
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(2)

  //Form States

  const [selectedYear, handleYearChange] = useState(new Date())
  const [hasLungsDisease, setHasLungsDisease] = useState('yes')
  const [isSmoking, setIsSmoking] = useState('no')
  const [gender, setGender] = useState('male')
  const [healthStatus, setHealthStatus] = useState(HealthStatusTypes[0])
  const [otherDisease, setOtherDisease] = useState('other')

  const personalInformationProps = {
    selectedYear, handleYearChange,
    hasLungsDisease, setHasLungsDisease,
    isSmoking, setIsSmoking,
    gender, setGender,
    healthStatus, setHealthStatus,
    otherDisease, setOtherDisease
  }

  const [blobObject, setBlobObject] = useState(null)

  const [acceptSend, setAcceptSend] = useState('')


  //End
  const steps = [
    {
      title: 'Personal Information',
      component: <PersonalInformationForm {...personalInformationProps} />
    },
    {
      title: 'Record',
      component: <RecordForm setBlobObject={setBlobObject} />
    },
    {
      title: 'Agreement',
      component: <AgreementForm acceptSend={acceptSend} setAcceptSend={setAcceptSend} />
    },
  ]

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handleSend = () => {
    const record = {
      birthYear: selectedYear.getFullYear() - 30,
      hasLungsDisease,
      isSmoking,
      gender,
      healthStatus,
      otherDisease,
      blobObject
    }

    const data = new FormData()
    data.append('blobObject', blobObject)
    data.append('record', record)
    const headers = { 'Content-Type': `multipart/form-data; boundary=${data._boundary}` }
    Axios.post('https://cosd-record.azurewebsites.net/api/HttpTrigger1?code=T0ZB5PmDBsgQ1ZGaZKm5AXvmaAg82rI14ehqGjsun6bUCWa8Jit6qg==',
      data, { headers })
      .then(() => {
        Swal.fire('Success!', 'Record Saved', 'success')
      })
      .catch(error => {
        Swal.fire('Request Failed', 'Could Not Upload Data', 'error')
        console.error(error)
      })
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  return (
    <>
      <AppBar position="absolute" color="primary" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            {'COVID-19 Symptoms Detection'}
          </Typography>
        </Toolbar>
      </AppBar>

      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            COSD Record
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel>{step.title}</StepLabel>
              </Step>))}
          </Stepper>

          {steps[activeStep].component}

          <div className={classes.buttons}>
            {activeStep !== 0 && (<Button onClick={handleBack} className={classes.button}>{'Back'}</Button>)}
            {activeStep !== steps.length - 1 ?
              (<Button variant="contained" color="primary" onClick={handleNext} className={classes.button}> {'Next'} </Button>) :
              (<Button variant="contained" color="primary" onClick={handleSend} className={classes.button} disabled={!acceptSend}> {'Send'} </Button>)}
          </div>
        </Paper>
        <Copyright />
      </main >
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}))
