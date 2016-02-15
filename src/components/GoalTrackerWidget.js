import PropTypes from 'prop-types'
import React from 'react'

import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up'
import ContentAdd from 'material-ui/svg-icons/content/add'
import FloatingActionButton from 'material-ui/FloatingActionButton'

import Gauge from './Gauge'
import { GoalPropType, nonNegativeInteger } from '../prop-types'

const GoalTrackerWidget = ({ FIXME }) => {
  const adderComponent = target > progress
    ? <FloatingActionButton mini secondary><ContentAdd /></FloatingActionButton>
    : <FloatingActionButton mini disabled><ActionThumbUp /></FloatingActionButton>

  return (
    <div className='goal'>
      <div className='summary'>
        <h2>{name}</h2>
        <Gauge value={progress} max={target} />
        <small>{progress} {units} sur {target}</small>
      </div>
      <div className='cta'>{adderComponent}</div>
    </div>
  )
}

GoalTrackerWidget.propTypes = {
  goal: GoalPropType.isRequired,
  progress: nonNegativeInteger.isRequired,
  onProgress: PropTypes.func
}

export default GoalTrackerWidget
