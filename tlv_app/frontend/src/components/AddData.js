import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { Form, Button, Modal } from 'react-bootstrap'
import { toast } from 'react-semantic-toasts'

import axiosInstance from '../actions/utility'
import { addDataUrl } from '../urls'

class AddData extends Component {
  constructor (props) {
    super(props)
    this.state = {
      file: null,
      type: 0,
      types: [
        { text: 'Default', value: 0 },
        { text: 'Option1', value: 1 },
        { text: 'Option2', value: 2 },
        { text: 'Option3', value: 3 }
      ],
      openModal: false,
      disableDOS: false
    }
  }

  handleChange = (e, { name, value }) => {
    this.setState({
      [name]: value
    })
  }

  handleSubmit = () => {
    const uploadData = new FormData()
    uploadData.append('type', this.state.type)
    uploadData.append('file', this.state.file, this.state.file.name)
    uploadData.append('name', this.props.projectName)
    this.setState({
      disableDOS: true
    })
    axiosInstance
      .post(addDataUrl(), uploadData, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      .then(response => {
        toast({
          type: 'success',
          title: 'success',
          description: response.data,
          icon: 'check',
          time: 4000
        })
        this.successCallback()
      })
      .catch(function (err) {
        toast({
          type: 'error',
          title: 'Error',
          description: 'There was an error while uploading data',
          icon: 'frown',
          time: 4000
        })
      })
  }

  successCallback = () => {
    this.setState({
      file: null,
      type: 0,
      types: [
        { text: 'Default', value: 0 },
        { text: 'Option1', value: 1 },
        { text: 'Option2', value: 2 },
        { text: 'Option3', value: 3 }
      ],
      disableDOS: false
    })
  }

  errorCallBack = () => {
    this.setState({
      disableDOS: false
    })
  }

  show = () =>
    this.setState({
      openModal: true,
      file: null,
      type: 0,
      types: [
        { text: 'Default', value: 0 },
        { text: 'Option1', value: 1 },
        { text: 'Option2', value: 2 },
        { text: 'Option3', value: 3 }
      ]
    })
  handleClose = () => this.setState({ openModal: false })
  handleOpen = () => this.setState({ openModal: true })

  render () {
    let disabled = true
    if (this.state.file !== null) {
      disabled = false
    }
    const { openModal, disableDOS } = this.state
    const { projectName } = this.props
    return (
      <div>
        <Button variant='outline-secondary' onClick={this.handleOpen}>
          Add Data
        </Button>
        {openModal === true ? (
          <Modal show={this.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Data to {projectName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form styleName='modal-form'>
                <Form.File
                  id='formcheck-api-regular'
                  style={{ margin: '10% 0' }}
                >
                  <Form.File.Label>Select the Datasource File</Form.File.Label>
                  <Form.File.Input
                    onChange={e => this.setState({ file: e.target.files[0] })}
                  />
                </Form.File>
                <h6>Select Data structure type</h6>
                <Dropdown
                  style={{ marginRight: '2%' }}
                  placeholder='Type'
                  search
                  selection
                  options={this.state.types}
                  onChange={(e, data) => this.setState({ type: data.value })}
                />
                <Button
                  type='submit'
                  variant='dark'
                  onClick={this.handleSubmit}
                  disabled={disabled | disableDOS}
                >
                  Submit
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        ) : (
          <div></div>
        )}
      </div>
    )
  }
}

export default AddData
