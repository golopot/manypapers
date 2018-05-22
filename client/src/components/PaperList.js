import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Item = styled.div`
  padding: 6px 0;

  .up {
    font-size: 16px;
  }
`


const PaperItem = ({ paper }) => (
  <Item>
    <div className="up"><a href={`/paper/${paper._id}`}>{paper.title}</a>{' '}</div>
    <div className="down">{paper.authors}</div>
  </Item>
)

PaperItem.propTypes = {
  paper: PropTypes.shape({
    _id: PropTypes.string,
  }),
}

PaperItem.defaultProps = {
  paper: {},
}

export default function PaperList({ papers }) {
  return (
    <div>
      <h1>Papers</h1>
      {papers.map(x => <PaperItem paper={x} key={x._id} />)}
    </div>
  )
}

PaperList.propTypes = {
  papers: PropTypes.arrayOf(PropTypes.object).isRequired,
}
