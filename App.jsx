import React, { useState, useEffect } from 'react';

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = () => {
    if (title && date && time) {
      const newEvent = {
        id: Date.now(),
        title,
        date,
        time,
      };
      setEvents([...events, newEvent]);
      setTitle('');
      setDate('');
      setTime('');
    } else {
      alert('Please fill out all fields');
    }
  };

  const removeEvent = (id) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
  };

  return (
    <div>
      <h1>Event Calendar</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button onClick={addEvent}>Add Event</button>
      </div>
      <div>
        {events.map((event) => (
          <div key={event.id}>
            <h3>{event.title}</h3>
            <p>Date: {event.date}</p>
            <p>Time: {event.time}</p>
            <button onClick={() => removeEvent(event.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
