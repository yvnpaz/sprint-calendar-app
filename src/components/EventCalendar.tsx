import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { type DateClickArg } from '@fullcalendar/interaction';
import type { EventClickArg, EventSourceFuncArg } from '@fullcalendar/core';
import { fetchEvents } from '../api/eventsApi';
import './EventCalendar.css';

interface EventCalendarProps {
  onEventClick?: (arg: EventClickArg) => void;
  onDateClick?: (arg: DateClickArg) => void;
}

const EventCalendar: React.FC<EventCalendarProps> = ({ onEventClick, onDateClick }) => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,listWeek',
      }}
      height="100%"
      events={(info: EventSourceFuncArg, successCallback, failureCallback) => {
        fetchEvents(info.start, info.end).then(successCallback).catch(failureCallback);
      }}
      eventClick={onEventClick}
      dateClick={onDateClick}
    />
  );
};

export default EventCalendar;
