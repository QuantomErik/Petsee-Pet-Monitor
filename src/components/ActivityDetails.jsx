import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function ActivityDetails() {
    const [activities, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchActivities = async () => {
          const token = localStorage.getItem('token');
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:3000/api/pet/activitydetails', {
                  headers: {
                    'Authorization': `Bearer ${token}`,
                  },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setActivities(data.activities);
            } catch (error) {
                setError(error.message);
            }
            setIsLoading(false);
        };

        fetchActivities();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <div>
          <h1>Activity Details</h1>
          {activities.length > 0 ? (
              <div>
                  {activities.map((activity, index) => (
    <Card key={activity._id || index} style={{ width: '18rem', marginBottom: '1rem' }}>
        <Card.Body>
            <Card.Title>{activity.type}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Activity Details</Card.Subtitle>
            <Card.Text>
                Duration: {activity.duration} minutes
                <br/>
                Intensity: {activity.intensity}
            </Card.Text>
            <Button variant="primary" onClick={() => navigate(`/activitydetails/edit/${activity._id}`)}>Edit</Button>
        </Card.Body>
    </Card>
                  ))}
              </div>
          ) : (
              <p>No activities found</p>
          )}
          <Button onClick={() => navigate('/activitydetails/addactivity')} className="mt-3">Create Activity</Button>
      </div>
  );
}

export default ActivityDetails;
