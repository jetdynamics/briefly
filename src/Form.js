import React, { Component } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'

import { Form, Input, Datepicker, SubmitBtn } from 'react-formik-ui'
import { addDays } from 'date-fns'

const nextWeek = addDays(new Date(), 7)

class MainForm extends Component {
  onSubmit = data => {
    // here you handle the data to be submitted
    console.log(data)
  }

  // example of validation with yup
  getSchema = () => {
    console.log('Called')
    return yup.object().shape({
      clientName: yup
        .string()
        .min(2, "the client's name is longer than that...")
        .required('Required'),
      projectName: yup
        .string()
        .min(2, 'Lets give the project name a bit more length...')
        .required('Required'),
      dueDate: yup
        .date()
        .min(nextWeek, "You can't be serious")
        .required('Please set a due date'),
    })
  }

  render() {
    return (
      <Formik
        initialValues={{
          dueDate: '',
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

              {/* Client Name */}
              <Input
                name="clientName"
                placeholder="Client Name"
                label="Client Name"
                required
                autocomplete="off"
              />

              <Input
                name="projectName"
                placeholder="Project Name"
                label="Project Name"
                autocomplete="off"
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
