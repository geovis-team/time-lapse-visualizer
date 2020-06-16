import React, { Component } from 'react'
import { Button, Container, Accordion, Card } from 'react-bootstrap'
import axios from 'axios'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getFilters } from '../actions/getfilters'

import styles from '../static/css/DefaultVisPage.module.css'
import NavigationBar from './NavigationBar'
import Footer from './Footer'
import { data as mapdata } from './visualizer/data'

class DefaultVis extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: mapdata,
      filters: [
        [{ name: 'Filter', sub: [1, 2, 3], status: false }],
        [{ name: 'Filter', sub: [1, 2, 3], status: false }],
        [{ name: 'Filter', sub: [1, 2, 3], status: false }]
      ],
      loaded: false
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick = e => {
    console.log(e.target)
    console.log(e.target.getAttribute('name'))
    // TODO : Should call the API here onclick for new filters
  }

  componentDidMount () {
    // TODO : Should load the default filters initally.
    {
      console.log('check ----- ', this.props.getFilters('Covid'))
      // TODO : always logging undefined here.
    }
  }
  render () {
    // if (this.state.loaded === false) {
    //   return <></>
    // } else
    // TODO : removed the onload for now, can add later
    return (
      <div className={styles.body}>
        <NavigationBar />
        <Container
          fluid
          className={styles.container}
          style={{ padding: '0% 7% 7% 7%' }}
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
          <Row>
            {this.state.allvis.map((visObj, index) => (
              <Col
                xs={8}
                md={6}
                lg={4}
                key={visObj.id}
                style={{ padding: '2%' }}
              >
                <Card style={{ height: '100%' }}>
                  <Card.Header>
                    <h3
                      className={styles.visHeading}
                      name={visObj.name}
                      open={false}
                    >
                      {visObj.name}
                    </h3>
                  </Card.Header>
                  <Card.Img
                    variant='top'
                    src={require('../static/assets/map-placeholder.png')}
                  />
                  <Card.Body>
                    <Card.Title>{visObj.heading}</Card.Title>
                    <Card.Text>{visObj.title}</Card.Text>
                    <Button variant='dark'>
                      <Link
                        to={{
                          pathname: '/viewvis',
                          state: visObj
                        }}
                        className={styles.linkitem}
                      >
                        View Now
                      </Link>
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        <Footer />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    getFilters: state.getFilters
  }
}
// TODO : bind the function here
function matchDispatchToProps (dispatch) {
  return bindActionCreators({ getFilters: getFilters }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(DefaultVis)
