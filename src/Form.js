import React, { Component } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'

import { Form, Input, Datepicker, SubmitBtn } from 'react-formik-ui'

class MainForm extends Component {
  onSubmit = data => {
    // here you handle the data to be submitted
    console.log(data)
  }

  // example of validation with yup
  getSchema = () => {
    return yup.object().shape({
      birthday: yup.date(),
    })
  }

  render() {
    return (
      <Formik
        initialValues={{
          birthday: '',
          clientName: '',
          projectName: '',
        }}
        validationSchema={this.getSchema}
        onSubmit={this.onSubmit}
        handleChange={this.handleChange}
        render={props => {
          let { clientName, projectName } = props.values
          return (
            <Form mode="structured">
              <div className="formTitle">
                {clientName
                  ? `${clientName} ${projectName}`
                  : 'Lets Get Started'}
              </div>

              <Input
                name="clientName"
                placeholder="Client Name"
                label="Client Name"
              />

              <Input
                name="projectName"
                placeholder="Project Name"
                label="Project Name"
              />

              <Datepicker name="dueDate" label="Due Date" />

              <SubmitBtn />
            </Form>
          )
        }}
      />
    )
  }
}

export default MainForm
