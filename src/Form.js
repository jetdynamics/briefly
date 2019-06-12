import React, { Component } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'

import {
  Form,
  Input,
  Datepicker,
  Textarea,
  DropZone,
  SubmitBtn,
} from 'react-formik-ui'
import { addDays } from 'date-fns'

const nextWeek = addDays(new Date(), 7)

class MainForm extends Component {
  onSubmit = data => {
    console.log('called the onSubmit')
    // here you handle the data to be submitted
    console.log(data)
  }

  // example of validation with yup
  getSchema = () => {
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
      objective: yup.string().required('Required'),
      theProblem: yup.string().required('Required'),
      userOne: yup
        .string()
        .min(10, 'give us a little more info than that')
        .required('Required'), // probably don't need validation on these
      budget: yup.string().required('This helps managers decide on priority'),
    })
  }

  render() {
    return (
      <Formik
        initialValues={{
          clientName: '',
          projectName: '',
          dueDate: '',
          objective: '',
          theProblem: '',
          budget: '',
          files: [],
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
                required
                autoComplete="off"
              />
              <Input
                name="projectName"
                placeholder="Project Name"
                label="Project Name"
                autoComplete="off"
              />
              <Datepicker name="dueDate" label="Due Date" />
              <Textarea name="objective" label="Whats the objective?" />
              <Textarea
                name="theProblem"
                label="What problem are we trying to solve? "
              />
              <div className="form-title">
                <h1>Background Info</h1>
              </div>
              lets maybe do a personality builder here, fields for age, gender,
              etc.
              <div className="add-another-avatar">
                Add Another button goes here
              </div>
              <Textarea
                name="Market Position"
                label={`what kind of company is ${
                  clientName ? clientName : 'the client'
                }?, High end? Value first? Do they want to be seen as market leaders? educators? etc.`}
              />
              <div className="does-it-need-coding">
                Does it need coding? Button
              </div>
              <Input
                name="budget"
                placeholder="What's the budget?"
                label="Budget"
                autoComplete="off"
              />
              <div className="competitors">
                <h1>Competitors</h1>
                <Input name="competitors" />
              </div>
              <div className="copy-section">
                <h1>Copy</h1>
                <div className="copy-unit">
                  <Input name="copy1" label="Where is this for?" />
                  <Textarea name="copyBox" label="gimme some copy" />
                </div>
              </div>
              <div className="references">
                <h1>References</h1>
                <DropZone
                  name="files"
                  label="Image upload (use skitch to mark things you like if needed)"
                />
              </div>
              <SubmitBtn />
            </Form>
          )
        }}
      />
    )
  }
}

// TODO: Add currency masking for budget field
// TODO: add in persona builder for avatars
// TODO: add another button for competitors
export default MainForm
