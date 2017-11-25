import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import Header from './Header'
import { createPost } from '../actions/Fetch'
import '../styles/NewPost.css'

class NewPost extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field
    const className = `Field ${touched && error ? 'Danger' : ''}`

    const input = () =>
      field.label === 'Content' ? (
        <textarea className="" type="text" {...field.input} />
      ) : (
        <input className="" type="text" {...field.input} />
      )

    return (
      <div className={className}>
        <label className="label">{field.label}</label>
        {input()}
        <div className="text-help">{touched ? error : ''}</div>
      </div>
    )
  }

  onSubmit = values => {
    this.props.createPost(values, () => {
      this.props.history.push('/')
    })
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <div className="NewPost">
        <Header button="Cancel" />
        <div className="container">
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <Field label="Title" name="title" component={this.renderField} />
            <Field
              label="Categories"
              name="categories"
              component={this.renderField}
            />
            <Field
              label="Content"
              name="content"
              component={this.renderField}
            />
            <button type="submit" className="btn-form">
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }
}

function validate(values) {
  const errors = {}

  if (!values.title || values.title.length < 3) {
    errors.title = 'Enter a title with at least 3 characters!'
  }
  if (values.title && values.title.length > 80) {
    errors.title = "It's too big"
  }
  if (!values.categories) {
    errors.categories = 'Enter some categories'
  }
  if (!values.content) {
    errors.content = 'Enter some content'
  }

  return errors
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(connect(null, { createPost })(NewPost))
