import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import bowlImage from './bowl2.png'
import addMealImage from '../../images/addMeal.webp'
import activityImage from '../../images/activity.webp'
import petDetailsImage from '../../images/background.webp'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMeals } from '../Diet/mealsSlice'
import { fetchActivitiess } from '../Activity/activitiesSlice'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import PropTypes from 'prop-types'


/**
 * Homepage component that displays the main dashboard with diet and activity summaries,
 * as well as navigation cards to different sections of the application.
 *
 * @component
 * @example
 * return (
 *
 * )
 */
const Homepage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [dietDetails, setDietDetails] = useState({ meals: [] })

  const { activities = []} = useSelector((state) => state.activities)
  const { meals} = useSelector((state) => state.meals)
  const currentPet = useSelector((state) => state.pets.currentPet)

   /**
   * Fetch activities for the selected pet and date whenever the current pet or selected date changes.
   */
  useEffect(() => {
    if (currentPet && currentPet.id) {
      dispatch(
        fetchActivitiess({
          petId: currentPet.id,
          date: selectedDate.toISOString().split('T')[0],
        })
      )
    }
  }, [dispatch, currentPet, selectedDate])

  /**
   * Fetch meals for the selected pet and date whenever the current pet or selected date changes.
   */
  useEffect(() => {
    if (currentPet && currentPet.id) {
      dispatch(
        fetchMeals({
          petId: currentPet.id,
          date: selectedDate.toISOString().split('T')[0],
        })
      )
    }
  }, [dispatch, currentPet, selectedDate])


  /**
   * Calculate total calories and quantity from the fetched meals and update the state.
   */
  useEffect(() => {
    if (meals && meals.length > 0) {
      const validMeals = meals.filter((meal) => meal != null)
      const totals = validMeals.reduce(
        (acc, meal) => {
          acc.totalCalories += Number(meal.totalCalories)
          acc.totalQuantity += Number(meal.quantity)
          return acc
        },
        { totalCalories: 0, totalQuantity: 0 }
      )

      totals.totalCalories = parseFloat(totals.totalCalories.toFixed(1))
      totals.totalQuantity = parseFloat(totals.totalQuantity.toFixed(1))
      setDietDetails(totals)
    } else {
      setDietDetails({
        totalCalories: 0,
        totalQuantity: 0,
      })
    }
  }, [meals])

  const calorieGoal = currentPet?.caloriesDay
  const percentage = Math.min((dietDetails.totalCalories / calorieGoal) * 100, 100)
  const activityGoal = currentPet?.activitiesDay
  const activitiesCompleted = activities.length
  const activityPercentage = (activitiesCompleted / activityGoal) * 100

  return (
    <div className="home-background">
      <div className="custom-date-picker">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date)
            console.log(`Date changed to: ${date.toISOString().split('T')[0]}`)
          }}
        />
      </div>
      <div className="pet-details-cards">
        <Card className="home-card" title="Diet" style={{ width: '23rem' }} onClick={() => navigate('/dietdetails')}>
          <Card.Img variant="top" src={addMealImage} className="card-image-top" />
          <Card.Body>
            <Card.Title>Diet</Card.Title>
            <button className="icon-button fas fa-edit" onClick={() => navigate('/dietdetails')}></button>
          </Card.Body>
        </Card>

        <Card className="home-card" title="Activity" style={{ width: '23rem' }} onClick={() => navigate('/activitydetails')}>
          <Card.Img variant="top" src={activityImage} className="card-image-top" />
          <Card.Body>
            <Card.Title>Activity</Card.Title>
            <button className="icon-button fas fa-edit" onClick={() => navigate('/activitydetails')}></button>
          </Card.Body>
        </Card>

        <Card className="home-card" title="Schedule" style={{ width: '23rem' }} onClick={() => navigate('/scheduledetails')}>
          <Card.Img variant="top" src={bowlImage} className="card-image-top" />
          <Card.Body>
            <Card.Title>Schedule</Card.Title>
            <button className="icon-button fas fa-edit" onClick={() => navigate('/scheduledetails')}></button>
          </Card.Body>
        </Card>

        <Card className="home-card" title="ToDoList" style={{ width: '23rem' }} onClick={() => navigate('/todolist')}>
          <Card.Img variant="top" src={petDetailsImage} className="card-image-top" />
          <Card.Body>
            <Card.Title>ToDoList</Card.Title>
            <button className="icon-button fas fa-edit" onClick={() => navigate('/todolist')}></button>
          </Card.Body>
        </Card>

        <div className="summary-cards-container">
          <Card border="primary" className="summary-card-home" style={{ width: '27rem' }}>
            <Card.Header className="custom-heading-home">Diet</Card.Header>
            <Card.Body>
              <div className="progress-container">
                <div style={{ width: '90%', height: '270px', margin: 'auto' }}>
                  <CircularProgressbar
                    value={percentage}
                    text={`${percentage.toFixed(0)}%`}
                    styles={buildStyles({
                      textColor: 'black',
                      pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
                      trailColor: '#d6d6d6',
                    })}
                  />
                </div>

                <div className="progress-text">
                  <p>
                    <span className="quadrant" style={{ backgroundColor: 'blue' }}></span>Total Calories: {dietDetails.totalCalories} kcal
                  </p>
                  <p>
                    <span className="quadrant" style={{ backgroundColor: 'green' }}></span>Calorie Goal: {calorieGoal} kcal
                  </p>
                  <p>
                    <span className="quadrant" style={{ backgroundColor: 'red' }}></span>Total Quantity: {dietDetails.totalQuantity} grams
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card border="primary" className="summary-card-home" style={{ width: '27rem' }}>
            <Card.Header className="custom-heading-home">Active</Card.Header>
            <Card.Body>
              <div className="progress-container">
                <div style={{ width: '90%', height: '270px', margin: 'auto' }}>
                  <CircularProgressbar
                    value={activityPercentage}
                    text={`${activityPercentage.toFixed(0)}%`}
                    styles={buildStyles({
                      textColor: 'black',
                      pathColor: `rgba(62, 152, 199, ${activityPercentage / 100})`,
                      trailColor: '#d6d6d6',
                    })}
                  />
                </div>
                <div className="progress-text">
                  <p>
                    <span className="quadrant" style={{ backgroundColor: 'blue' }}></span>Activities Completed: {activitiesCompleted}
                  </p>
                  <p>
                    <span className="quadrant" style={{ backgroundColor: 'green' }}></span>Activities Goal: {activityGoal}
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}

Homepage.propTypes = {
  onLogout: PropTypes.func.isRequired,
}

export default Homepage
