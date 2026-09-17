import type { EventInput } from '@fullcalendar/core';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost';

export async function fetchEvents(rangeStart: Date, rangeEnd: Date): Promise<EventInput[]> {
  const params = new URLSearchParams({
    start: rangeStart.toISOString(),
    end: rangeEnd.toISOString(),
  });

  const response = await fetch(`${API_URL}/api/events?${params}`);

  if (!response.ok) {
    throw new Error(`Échec du chargement des événements (${response.status})`);
  }

  return response.json();
}
