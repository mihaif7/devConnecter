import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileExperience = ({experience: {
    company, title, location, curent, to, from, description}
}) => <div>
    <h3 className="text-dark">{company}</h3>
    <p>
        <Moment format='YYYY/MM/DD'>{from}</Moment> - {curent ? ' Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
    </p>
    <p>
       <strong>Position: </strong> {title}
    </p>
    {description && (<p>
       <strong>Description: </strong> {description}
    </p>)}
    {location && (<p>
       <strong>Location: </strong> {location}
    </p>)}
</div>

ProfileExperience.propTypes = {
    experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
