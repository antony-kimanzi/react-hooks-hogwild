import React from 'react'

export default function FilterButton({initiateGreasedFilter}, {showGreasedHog}) {
  return (
    <div>
      <button onClick={initiateGreasedFilter} className="ui green button large filter-button">
        {showGreasedHog ? "Show All Hogs" : "Show Only Greased Hogs"}
      </button>
    </div>
  )
}
