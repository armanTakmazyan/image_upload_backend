require('dotenv').config()
const express = require('express')
const morgan = require('morgan');
const { isCelebrateError } = require('celebrate');
const bodyParser = require('body-parser');
const connectDB = require('./config/mongoDB');
const MainRouter = require('./routes');
const {
	sendError,
	throwError,
	CustomError,
} = require('./helpers/errorAndSuccessMessages');
const app = express();

// Connect Database
connectDB();

app.use(cors())
app.options('*', cors());

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.use(morgan('combined'));

app.use('/', MainRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  throwError(404, 'NOT_FOUND', `Route ${req.url} not found.`)();
});


// handle the celebrate validation errors
app.use((err, req, res, next) => {
	if(!isCelebrateError(err)) next(err);
	else {
		// we need more robust way to logging errors
		console.error(err);
		throwError(400, 'VALIDATION_ERROR', err.details.entries().next().value[1])();
	}
});


// handle other errors
app.use((error, req, res, next) => {
    if (error instanceof CustomError) {
        return sendError(res)(error);
    }else {
        // general error
        error.status = error.status || 500;
        error.errorType = error.errorType || 'GENERIC';
        return sendError(res)(error);
    }
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));