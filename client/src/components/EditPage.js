import React from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import Header from './Header'
import EditPaper from './EditPaper'

const routerPropTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

function EditPage({ match }) {
  return (
    <div>
      <Header />
      <EditPaper paperId={match.params.id} />
    </div>
  )
}

EditPage.propTypes = {
  ...routerPropTypes,
}

export default withRouter(EditPage)
