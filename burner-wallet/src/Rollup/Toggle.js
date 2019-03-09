import React from 'react'
import { Radio, Grid } from 'semantic-ui-react'

const RollupToggle = props => (
  <Grid columns={2}>
    <Grid.Column width={2}>
      <Radio toggle defaultChecked={props.enabled} onChange={props.onChange} />
    </Grid.Column>
    <Grid.Column width={4}>I'm feeling lucky!</Grid.Column>
  </Grid>
)

export default RollupToggle
