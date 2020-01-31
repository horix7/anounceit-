import valids from './middleware/informationValidate';

import express from 'express';
const app = express();

import { urlencoded, json } from 'body-parser';
import userEndpoint from './controllers/userControlers';
import anounceEndpoint from './controllers/anounceController';
// import authenticate from './middleware/userAuthatication';


app.use(urlencoded({ extended: false}));
app.use(json());

app.get('/', (req, res) => {
  return res.status(200).send({'messagge' : 'welcome to  anounce it' });

})

app.post('/api/v2/auth/signup', valids.inputsValids(valids.schemas.UserSchema), userEndpoint.userSignUp);
app.post('/api/v2/auth/signin', userEndpoint.userSignIn);
app.get('/api/v2/allusers', userEndpoint.getAllUsers);
app.get('/api/v2/oneuser', userEndpoint.getOneUser);
app.post('/api/v2/announcement',valids.inputsValids(valids.schemas.AnouncementSchema), anounceEndpoint.createAnounment);
app.put('/api/v2/anouncement/:id', anounceEndpoint.updateAnouncement);
app.get('/api/v2/announcements', anounceEndpoint.getAllAnouncement);
app.get('/api/v2/announcement/:id', anounceEndpoint.getOneAnouncement);
app.get('/api/v2/announcement/:status', anounceEndpoint.getAnounceByStatus);
app.put('/api/v2/announcement/status', valids.inputsValids(valids.schemas.changeAnnouncement), anounceEndpoint.changeAnounceStatus);
app.delete('/api/v2/announcement/:id', anounceEndpoint.deleteAnouncement);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log('listenning to port 8080 ................'))

module.exports = app
