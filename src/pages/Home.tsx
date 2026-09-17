import { useState } from 'react';
import {
  IonAlert,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import type { EventClickArg } from '@fullcalendar/core';
import EventCalendar from '../components/EventCalendar';
import './Home.css';

const Home: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventClickArg | null>(null);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Calendrier</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="calendar-wrapper">
          <EventCalendar onEventClick={setSelectedEvent} />
        </div>
      </IonContent>

      <IonAlert
        isOpen={selectedEvent !== null}
        onDidDismiss={() => setSelectedEvent(null)}
        header={selectedEvent?.event.title}
        message={selectedEvent?.event.startStr}
        buttons={['OK']}
      />
    </IonPage>
  );
};

export default Home;
