import googleDistance from 'google-distance-matrix';

export default class API {
  getDistances(origin, destinations) {
    return new Promise((resolve, reject) => {
      googleDistance.matrix(origin, destinations, (err, res) => {
        err ? reject(err) : resolve(res.rows[0].elements);
      })
    })
  }
}





