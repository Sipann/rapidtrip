import env from '../config/env.config';

export default async function getCommuteTime (origin, destination) {
  const base = origin;
  const target = destination;

  let ApiURL = 'https://maps.googleapis.com/maps/api/distancematrix/json?';
  let params = `origins=${base}&destinations=${target}&key=${env.GOOGLE_API_KEY}`;
  let finalApiURL = `${ApiURL}${encodeURI(params)}`;

  try {
    let response = await fetch(finalApiURL, { mode: 'no-cors' });
    let responseJson = await response.json();
    return responseJson.rows[0].elements[0].duration.value;
  } catch (error) {
    console.error(error);  // eslint-disable-line no-console
  }
}
