/* global gapi, google */

import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function GoogleCalendarComponent() {
  const CLIENT_ID = '867952354032-do43ibra0nof9bjr9jjfg71pl2gv0fum.apps.googleusercontent.com';
  const API_KEY = 'AIzaSyD3cELZIciwE7uG3izApaqQ2hpcR7FJaaA';
  const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
  const SCOPES = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile';

  const [tokenClient, setTokenClient] = useState(null);
  const [gapiInited, setGapiInited] = useState(false);
  const [gisInited, setGisInited] = useState(false);
  const [events, setEvents] = useState([]);
  const [authButtonText, setAuthButtonText] = useState('Authorize');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Carga de bibliotecas externas
    const gapiScript = document.createElement('script');
    gapiScript.src = 'https://apis.google.com/js/api.js';
    gapiScript.async = true;
    gapiScript.defer = true;
    gapiScript.onload = gapiLoaded;
    document.body.appendChild(gapiScript);

    const gsiScript = document.createElement('script');
    gsiScript.src = 'https://accounts.google.com/gsi/client';
    gsiScript.async = true;
    gsiScript.defer = true;
    gsiScript.onload = gisLoaded;
    document.body.appendChild(gsiScript);

    return () => {
      document.body.removeChild(gapiScript);
      document.body.removeChild(gsiScript);
    };
  }, []);

  const gapiLoaded = () => {
    gapi.load('client', initializeGapiClient);
  };

  const initializeGapiClient = async () => {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    setGapiInited(true);
    maybeEnableButtons();
  };

  const gisLoaded = () => {
    const client = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
    });
    setTokenClient(client);
    setGisInited(true);
    maybeEnableButtons();
  };

  const maybeEnableButtons = () => {
    if (gapiInited && gisInited) {
      setIsSignedIn(true);
    }
  };

  const getUserInfo = async () => {
    try {
        const response = await gapi.client.request({
            path: 'https://www.googleapis.com/oauth2/v1/userinfo',
            method: 'GET'
        });
        setUserInfo(response.result);
        const  {
            name,
            email,
            picture,
          } = response.result;
          localStorage.setItem('user', JSON.stringify({name, email, picture}));
          navigate('/settingWeekly');  
    } catch (error) {
        console.error("Error fetching user info:", error);
    }
};

  const handleAuthClick = async () => {
    if (tokenClient) {
        tokenClient.callback = async (resp) => {
            if (resp.error !== undefined) {
                throw resp;
            }
            setIsSignedIn(true);
            setAuthButtonText('Refresh');
            await listUpcomingEvents();
            await getUserInfo(); // <- Aquí obtenemos la información del usuario
        };
        
      if (!gapi.client.getToken()) {
        tokenClient.requestAccessToken({ prompt: 'consent' });
        

      } else {
        tokenClient.requestAccessToken({ prompt: '' });
      }
    }
  };

  const handleSignoutClick = () => {
    if (gapi && gapi.client) {
      const token = gapi.client.getToken();
      if (token) {
        google.accounts.oauth2.revoke(token.access_token);
        gapi.client.setToken('');
        setEvents([]);
        setAuthButtonText('Authorize');
        setIsSignedIn(false);
      }
    }
  };

  const listUpcomingEvents = async () => {
    let response;
    try {
      const request = {
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime',
      };
      response = await gapi.client.calendar.events.list(request);
      const eventsList = response.result.items.map(event => `${event.summary} (${event.start.dateTime || event.start.date})`);
      setEvents(eventsList);
    } catch (err) {
      setEvents([err.message]);
    }
  };

  return (
    <div>
      <p>Google Calendar API Quickstart</p>
      {!isSignedIn && (
        <>
          <Button onClick={handleAuthClick}>{authButtonText}</Button>
          <Button onClick={handleSignoutClick}>Sign Out</Button>
          <pre>{events.join('\n')}</pre>
        </>
      )}
    </div>
  );
}

export default GoogleCalendarComponent;