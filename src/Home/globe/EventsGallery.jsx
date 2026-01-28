import React from 'react';
import DomeGallery from '../globe/DomeGallery.jsx';
import events from '../../data/events.json';

export default function EventsGallery() {
  const images = events.map(e => ({
    src: e.image,
    alt: e.title,
    eventData: e
  }));

  return <DomeGallery images={images} />;
}
