import React, { Component } from 'react';
import Input from '../components/Input';
import { updateObject, checkValidity } from '../shared/utility';

class Form extends Component {
  state = {
    form: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
          isNumeric: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'india', displayValue: 'India' },
            { value: 'germany', displayValue: 'Germany' }
          ]
        },
        value: 'india',
        validation: {},
        valid: true
      }
    },
    formIsValid: false
  }

  inputChangedHandler = (event, inputIdentifier) => {

    const updatedFormElement = updateObject(this.state.form[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(event.target.value, this.state.form[inputIdentifier].validation),
      touched: true
    });
    const updatedform = updateObject(this.state.form, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedform) {
      formIsValid = updatedform[inputIdentifier].valid && formIsValid;
    }
    this.setState({ form: updatedform, formIsValid: formIsValid });
  }
  submitHandler = (event) => {
    event.preventDefault();
    console.log(this.state)
    return false;
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.form) {
      formElementsArray.push({
        id: key,
        config: this.state.form[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ))}
        <button onClick={(event) => this.submitHandler(event)}>Submit</button>
      </form>
    );

    return (
      <div>
        <h4>Form</h4>
        {form}
      </div>
    );
  }
}

export default Form;
