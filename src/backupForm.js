import React, { Component, useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'

import { Form, Input, Datepicker, SubmitBtn } from 'react-formik-ui'

const onSubmit = data => {
  // here you handle the data to be submitted
  console.log(data)
}

// example of validation with yup
const getSchema = () => {
  return yup.object().shape({
    birthday: yup.date(),
  })
}

//Handles the title field

const handleClientName = (value, setClientName) => {
  console.log('called')
  setClientName(value)
}
const test = () => {
  console.log('CALLED')
}

const MainForm = () => {
  const [clientName, setClientName] = useState('')
  return (
    <Formik
      initialValues={{
        birthday: '',
        clientName: '',
        projectName: '',
      }}
      validationSchema={getSchema}
      onSubmit={onSubmit}
      onChange={test}
      render={() => (
        <Form mode="structured">
          <div className="project-name">{clientName}</div>
          <Datepicker name="birthday" label="Birthdate" />

          <Input
            name="clientName"
            placeholder="Client Name"
            hint="this is a hint"
            label="Client Name"
          />

          <Input
            name="projectName"
            placeholder="Project Name"
            label="Project Name"
          />

          <SubmitBtn />
        </Form>
      )}
    />
  )
}

export default MainForm
