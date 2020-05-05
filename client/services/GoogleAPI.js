import env from '../config/env.config';

export async function getCommuteTime (origin, destination) {
  const base = origin;
  const target = destination;

  let ApiURL = 'https://maps.googleapis.com/maps/api/distancematrix/json?';
  let params = `origins=${base}&destinations=${target}&key=${env.GOOGLE_API_KEY}`;
  let finalApiURL = `${ApiURL}${encodeURI(params)}`;

  try {
    let response = await fetch(finalApiURL);
    let responseJson = await response.json();
    return responseJson.rows[0].elements[0].duration.value;
  } catch (error) {
    console.error(error);
  }
}

export async function geocodeAddress (address) {
  const ApiURL = 'https://maps.googleapis.com/maps/api/geocode/json?';
  const params = `address=${address}&key=${env.GOOGLE_API_KEY}`;
  const finalApiURL = `${ApiURL}${encodeURI(params)}`;

  try {
    const apiResponse = await fetch(finalApiURL);
    const apiResponseJson = await apiResponse.json();
    const response = {
      coords: apiResponseJson.results[0].geometry.location,
      status: apiResponseJson.status,
    };
    return response;
  } catch (error) {
    console.error(error);
  }
}
