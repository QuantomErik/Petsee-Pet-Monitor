import { useState } from 'react'
import PropTypes from 'prop-types'
import FeatureCard from '../Home/FeatureCard'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { loginUser } from './LoginUser.js'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [flashMessage, setFlashMessage] = useState('')
  const [showFlash, setShowFlash] = useState(false)

  const features = [
    { title: 'Diet Monitoring', description: 'Track and manage your pet’s dietary needs.' },
    { title: 'Activity Monitoring', description: 'Monitor your pet’s physical activities.' },
    { title: 'Nutritional Facts', description: 'Get insights into the nutritional values.' },
    { title: 'Routine Planning', description: 'Plan and schedule your pet’s daily routines.' },
  ]

  const handleSubmit = async (event) => {
    event.preventDefault()
    setShowFlash(false)

    // Check for empty fields before sending a request
    if (!username.trim() || !password.trim()) {
      setFlashMessage('Username and password required')
      setShowFlash(true)
      return
    }

    try {
      const data = await loginUser({ username, password })
      console.log('Login successful:', data)
      localStorage.setItem('token', data.accessToken)
      // Call the onLoginSuccess function passed as a prop
      props.onLoginSuccess()
    } catch (error) {
      console.error('Login error:', error)
      setFlashMessage(error.message)
      setShowFlash(true)
    }
  }

  return (
    <div className="login-background">
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6} lg={4} className="mx-auto">
            <h1 className="text-center mb-4">Login to Petsee</h1>
            {showFlash && <div className="alert alert-danger">{flashMessage}</div>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="username">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 mt-3">
                Log In
              </Button>
            </Form>
          </Col>
        </Row>
        <Row className="mt-4 px-3">
          {features.map((feature, index) => (
            <Col sm={6} md={3} key={index}>
              <FeatureCard title={feature.title} description={feature.description} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

Login.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
}

export default Login
