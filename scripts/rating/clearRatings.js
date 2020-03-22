const Account = require('../../models/account'); // temp
const mongoose = require('mongoose');

let count = 0;

async function clearRatings() {
	try {
		mongoose.Promise = global.Promise;
		await mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/secret-hitler-app`);
		await Account.find()
			.cursor()
			.eachAsync(account => {
				count++;
				account.eloSeason = 1600;
				account.save();

				if (!(count % 100)) {
					console.log('account cleared:' + count);
				}
			});
	} finally {
		console.log('accounts cleared');
		await mongoose.disconnect();
	}
}

clearRatings();
