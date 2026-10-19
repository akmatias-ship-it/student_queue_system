require('dotenv').config();

const bcrypt = require('bcryptjs'),
	pool = require('../config/db');

(async () => {
	for (const [name, email, pw, role, num] of [
		['Campus Administrator', 'admin@campus.local', 'admin123', 'admin', null],
		['Queue Staff', 'staff@campus.local', 'staff123', 'staff', null],
		['Demo Student', 'student@campus.local', 'student123', 'student', '2026-0001'],
	]) {
		const hash = await bcrypt.hash(pw, 12);
		await pool.execute(
			'INSERT INTO users(full_name,email,password_hash,role,student_number) VALUES(?,?,?,?,?) ON DUPLICATE KEY UPDATE full_name=VALUES(full_name),password_hash=VALUES(password_hash),role=VALUES(role),student_number=VALUES(student_number),is_active=1',
			[name, email, hash, role, num],
		);
	}

	for (const [n, d] of [
		['Registrar', 'Enrollment and academic records'],
		['Cashier', 'Tuition and campus payments'],
		['Student Affairs', 'Student support and concerns'],
	]) {
		await pool.execute(
			'INSERT INTO services(name,description) VALUES(?,?) ON DUPLICATE KEY UPDATE description=VALUES(description),is_active=1',
			[n, d],
		);
	}

	console.log(
		'Seed complete. Demo accounts: admin@campus.local / admin123, staff@campus.local / staff123, student@campus.local / student123',
	);
	await pool.end();
})().catch(async (e) => {
	console.error(e);
	await pool.end();
	process.exit(1);
});
