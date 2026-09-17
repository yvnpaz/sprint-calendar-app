import type { EventInput } from '@fullcalendar/core';

const MOCK_LATENCY_MS = 400;

const MOCK_EVENTS: EventInput[] = [
  {
    id: '1',
    title: 'Sprint kickoff',
    start: new Date().toISOString().slice(0, 10),
    color: '#3880ff',
  },
  {
    id: '2',
    title: 'Demo innovation',
    start: addDays(new Date(), 2).toISOString().slice(0, 10),
    color: '#2dd36f',
  },
  {
    id: '3',
    title: 'Retro',
    start: addDays(new Date(), 5).toISOString(),
    end: addDays(new Date(), 5, 2).toISOString(),
    color: '#eb445a',
  },
];

function addDays(base: Date, days: number, extraHours = 0): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  d.setHours(d.getHours() + extraHours);
  return d;
}

/**
 * Stand-in for a real endpoint, e.g. GET /api/events?start=...&end=...
 * Swap the body for a fetch() call once a real API is available; the
 * EventInput[] contract stays the same so EventCalendar doesn't change.
 */
export async function fetchEvents(rangeStart: Date, rangeEnd: Date): Promise<EventInput[]> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS));

  return MOCK_EVENTS.filter((event) => {
    const start = new Date(event.start as string);
    return start >= rangeStart && start <= rangeEnd;
  });
}
