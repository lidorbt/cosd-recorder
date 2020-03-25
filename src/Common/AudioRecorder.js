/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { ReactMic } from '@cleandersonlobo/react-mic'
import Swal from 'sweetalert2'
import '../Assets/font-awesome/css/all.min.css'
import '../Assets/recorder-style.css'

const AudioRecorder = ({ setBlobObject }) => {
  const RECORD_TIME_LIMIT = 10000

  const [isRecording, setIsRecording] = useState()
  const [downloadLinkURL, setDownloadLinkURL] = useState()
  const [blobURL, setBlobURL] = useState()
  const [recordingInSession, setRecordingInSession] = useState(false)
  const [recordingStarted, setRecordingStarted] = useState(false)
  const [recordingStopped, setRecordingStopped] = useState(false)
  const [recordTimeout, setRecordTimeout] = useState(null)

  const onSave = blobObject => {
    setDownloadLinkURL(blobObject.blobURL)
  }

  const onStart = () => {
    console.log('You can tap into the onStart callback')
  }

  const onStop = blobObject => {
    setBlobObject(blobObject.blob)
    setBlobURL(blobObject.blobURL)
  }

  const onData = recordedBlob => {
    console.log('ONDATA CALL IS BEING CALLED! ', recordedBlob)
  }

  const onBlock = () => {
    alert('ya blocked me!')
  }

  const startRecording = () => {
    const timeoutId = setTimeout(() => {
      stopRecording()
      Swal.fire(
        'Record Limit',
        'Record limit is 10 secods',
        'info'
      )
    }, RECORD_TIME_LIMIT)

    setRecordTimeout(timeoutId)
    setIsRecording(true)
    setRecordingInSession(true)
    setRecordingStarted(true)
    setRecordingStopped(false)
  }

  const stopRecording = () => {
    if (recordTimeout) {
      clearTimeout(recordTimeout)
      setRecordTimeout(null)
    }
    setIsRecording(false)
    setRecordingInSession(false)
    setRecordingStarted(false)
    setRecordingStopped(true)
  }

  const recordBtn = recordingInSession ? 'fa disabled fa-record-vinyl fa-fw' : 'fa fa-record-vinyl fa-fw'
  const stopBtn = !recordingStarted ? 'fa disabled fa-stop-circle' : 'fa fa-stop-circle'
  const downloadLink = recordingStopped ? 'fa fa-download' : 'fa disabled fa-download'

  return (
    <div>
      <div id='project-wrapper'>
        <div id='project-container'>
          <div id='overlay' />
          <div id='content'>
            <h2>Recorder</h2>
            <h3>Some Instructions</h3>
            <ReactMic
              className='oscilloscope'
              record={isRecording}
              backgroundColor='#333'
              strokeColor='#ffffff'
              visualSetting='sinewave'
              audioBitsPerSecond={128000}
              onStop={onStop}
              onStart={onStart}
              onSave={onSave}
              onData={onData}
              onBlock={onBlock}
            />
            <div id='oscilloscope-scrim'>
              {!recordingInSession && <div id='scrim' />}
            </div>
            <div id='controls'>
              <div className='column active'>
                <i
                  onClick={startRecording}
                  className={recordBtn}
                  aria-hidden='true'
                />
              </div>
              <div className='column'>
                <i
                  onClick={stopRecording}
                  className={stopBtn}
                  aria-hidden='true'
                />
              </div>
              <div className='column download'>
                <a className={downloadLink} href={downloadLinkURL} download={'recording.wav'} > </a>
              </div>
            </div>
          </div>
          <div id='audio-playback-controls'>
            <audio controls='controls' src={blobURL} controlsList='nodownload' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AudioRecorder
