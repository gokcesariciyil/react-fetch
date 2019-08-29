import React from 'react'

export default function LeftSide() {

  var data = require('./places.json');

  for (var i = 0; i < data.length; i++) {
    var obj = data[i];
    return (
      <div key={obj}>
        <p>{obj.ActivityName}</p>
        <p>{obj.StartDate}</p>
        <p>{obj.EndDate}</p>
        <p>{obj.EditedOn}</p>
        <p>{obj.LastParticipationDate}</p>
        <p>{obj.Description}</p>
        <p>{obj.IsForFree}</p>
        <p>{obj.Province}</p>
        <p>{obj.District}</p>
        <p>{obj.Address}</p>
        <hr></hr>
      </div>
    )
  }
}
