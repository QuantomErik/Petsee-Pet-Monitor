import PropTypes from 'prop-types'

const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="card">
      <div className="card-icon">
        {icon}
      </div>
      <div className="card-content">
        <h3 className="card-title text-xl font-semibold">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
    </div>
  )
}

FeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
}

export default FeatureCard
