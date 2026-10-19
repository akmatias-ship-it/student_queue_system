require('dotenv').config();
const express = require('express'),
	session = require('express-session'),
	MySQLStore = require('express-mysql-session')(session),
	flash = require('connect-flash'),
	helmet = require('helmet'),
	path = require('path');

const app = express(),
	port = Number(process.env.PORT || 3000);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
	session({
		key: 'student_queue.sid',
		secret: process.env.SESSION_SECRET || 'development-only-change-me',
		store: new MySQLStore({
			host: process.env.DB_HOST || 'localhost',
			port: Number(process.env.DB_PORT || 3306),
			user: process.env.DB_USER || 'root',
			password: process.env.DB_PASSWORD || '',
			database: process.env.DB_NAME || 'student_queuing_system',
		}),
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 14400000,
		},
	}),
);

app.use(flash());
app.use((req, res, next) => {
	res.locals.currentUser = req.session.user || null;
	res.locals.successMessages = req.flash('success');
	res.locals.errorMessages = req.flash('error');
	next();
});

app.get('/', (req, res) =>
	res.redirect(req.session.user ? '/dashboard' : '/login'),
);

app.use('/', require('./routes/auth'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/queue', require('./routes/queue'));
app.use('/admin', require('./routes/admin'));

app.use((req, res) =>
	res.status(404).render('error', {
		title: 'Not found',
		status: 404,
		message: 'Page not found.',
	}),
);

app.use((err, req, res, next) => {
	console.error(err);
	if (res.headersSent) return next(err);
	res.status(500).render('error', {
		title: 'Server error',
		status: 500,
		message: 'Unexpected error. Check the terminal.',
	});
});

if (require.main === module) {
	app.listen(port, () =>
		console.log(`Student Queuing System running at http://localhost:${port}`),
	);
}

module.exports = app;
