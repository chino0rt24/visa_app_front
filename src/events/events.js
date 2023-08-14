/* global gapi, google */
export function createEvent(event) {
  return new Promise((resolve, reject) => {
    if (typeof gapi === "undefined") {
      reject(new Error("gapi no está definido"));
      return;
    }
    if (!gapi || !gapi?.client) {
      reject(new Error("gapi no está inicializado"));
      return;
    }

    const request = gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': event,
      'conferenceDataVersion': 1

    });

    request.execute((response) => {
      if (response.error) {
        reject(new Error(response.message));
      } else {
        resolve(response);
      }
    });
  });
}

  