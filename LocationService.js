import * as Location from 'expo-location';

const LOCATION_TASK_NAME = 'background-location-task';

import { defineTask } from 'expo-task-manager';


// Helper to send locations to the server
const sendLocationsToAPI = async (locationData) => {
  // Logic to send data to your server
  // For simplicity, console.log is used here
  console.log('Sending locations to server:', locationData);
};

// Define the task to process location updates
defineTask(
  LOCATION_TASK_NAME,
  async ({
    data,
    error,
  }) => {
    if (error) {
      console.log(error);
      return;
    }

    if (data) {
      // send the locations to the server
      sendLocationsToAPI(locationQueue);
    }
  },
);


export const startBackgroundLocationSync = async () => {
  const isRegistered = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);

  if (isRegistered) {
    return;
  }

  await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    accuracy: Location.Accuracy.High,
    deferredUpdatesInterval: 60 * 1000,
    deferredUpdatesDistance: 0,
    showsBackgroundLocationIndicator: true,
    foregroundService: {
      notificationTitle: 'Title',
      notificationBody: 'Body',
      notificationColor: '#ffcf50',
    },
  });
};
