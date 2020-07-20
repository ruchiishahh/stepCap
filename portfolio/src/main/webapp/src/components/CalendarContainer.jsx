import React, { Component } from 'react';

function CalendarContainer() {
    const gapi = window.gapi;
    const CLIENT_ID = '778442330423-c8o8u3mmmtun0phpr1381isl452c8cus.apps.googleusercontent.com';
    const API_KEY = 'AIzaSyDnIFqZ8EqTAOJXorggZ_fEo_vQ4L_aYFA';
    const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    const SCOPES = "https://www.googleapis.com/auth/calendar.events";

    const handleClick = () => {
        gapi.load('client:auth2', () => {
            console.log('loaded client');

            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES
            })

            gapi.client.load('calendar', 'v3', () => console.log('IT WORKS!'));

            gapi.auth2.getAuthInstance().signIn().then(() => {
                var event = {
                    'summary': 'Awesome Event!',
                    'location': '800 Howard St., San Francisco, CA 94103',
                    'description': 'Really great refreshments',
                    'start': {
                        'dateTime': '2020-07-21T09:00:00-07:00',
                        'timeZone': 'America/Los_Angeles'
                    },
                    'end': {
                        'dateTime': '2020-07-21T17:00:00-07:00',
                        'timeZone': 'America/Los_Angeles'
                    },
                    'recurrence': [
                        'RRULE:FREQ=DAILY;COUNT=2'
                    ],
                    'attendees': [
                        {'email': 'owenzhange@google.com'},
                        {'email': 'shahruchi@google.com'}
                    ],
                    'reminders': {
                        'useDefault': false,
                        'overrides': [
                        {'method': 'email', 'minutes': 24 * 60},
                        {'method': 'popup', 'minutes': 10}
                        ]
                    }
                }


                var request = gapi.client.calendar.events.insert({
                    'calendarId': 'primary',
                    'resource': event,
                    'sendNotifications': true,
                })

                request.execute(event => {
                    console.log(event)
                    window.open(event.htmlLink)
                })
            }).catch(e => {
                console.log(e);
            }) ;
        });
    }


    return (
        <button onClick={handleClick}> Add Event </button>
    )
}

export default CalendarContainer;