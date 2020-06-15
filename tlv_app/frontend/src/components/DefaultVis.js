import React, { Component } from 'react'
import { Button, Container, Accordion, Card } from 'react-bootstrap'
import axios from 'axios'

import styles from '../static/css/DefaultVisPage.module.css'
import { Visualisation } from './Visualisation'
import NavigationBar from './NavigationBar'
import Footer from './Footer'
import { data as mapdata } from './visualizer/data'

export default class DefaultVis extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItem: 'home',
      models: ['Covid', 'Disasters', 'Shops'],
      data: mapdata,
      filters: [],
      loaded: false
    }
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  componentDidMount () {
    this.state.models.map((model, index) => {
      axios
        .get('http://127.0.0.1:8000/api/visualization/get_filters/', {
          params: {
            model: model
          }
        })
        .then(res => {
          const fil = this.state.filters
          const arr = []
          var flag = 0
          for (const el in res.data.secondaryFilters) {
            const obj = {
              name: el,
              sub: res.data.secondaryFilters[el]
            }
            // Omit if no default visualisation
            if (flag === 0) {
              flag = 1
              obj['status'] = true
            } else obj['status'] = false
            arr.push(obj)
          }
          fil.push(arr)
          this.setState({
            filters: fil
          })
          if (index == this.state.models.length - 1) {
            this.setState({ loaded: true })
          }
        })
        .catch(err => {
          console.log(err)
        })
    })
  }
  render () {
    if (this.state.loaded === false) {
      return <></>
    } else
      return (
        <div className={styles.body}>
          <NavigationBar />
          <Container
            fluid
            className={styles.container}
            style={{ padding: '4% 7%' }}
          >
            <div className={styles.intro}>
              <h1 style={{ marginBottom: '2%' }}>
                Visualisations for a variety of different datasets
              </h1>
              <h6>
                Select one of the visualisations from the options to expand and
                view the plots
              </h6>
              <h6>
                The filters that can be applied for each visualisation are
                available as checkboxes.
              </h6>
            </div>
            <Accordion defaultActiveKey='0'>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant='link' eventKey='0'>
                    <h3 className={styles.visHeading}>
                      Rise in COVID-19 cases in India
                    </h3>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey='0'>
                  <Visualisation
                    vis={{
                      data: this.state.data,
                      title:
                        'Visualising the COVID-19 cases using a choropleth graph',
                      filters: this.state.filters[0]
                    }}
                  />
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant='link' eventKey='1'>
                    <h3 className={styles.visHeading}>
                      Natural Calamities and Climate change
                    </h3>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey='1'>
                  <Visualisation
                    vis={{
                      data: { types: [], locations: [] },
                      title: 'Calamities and Natural disasters',
                      filters: this.state.filters[1]
                    }}
                  />
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant='link' eventKey='2'>
                    <h3 className={styles.visHeading}>
                      Trends in Businesses around the world
                    </h3>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey='2'>
                  <Visualisation
                    vis={{
                      data: { types: [], locations: [] },
                      title:
                        'Number  of shops that closed and opened during the Pandemic',
                      filters: this.state.filters[2]
                    }}
                  />
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Container>
          <Footer />
        </div>
      )
  }
}
