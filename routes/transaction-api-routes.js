const db = require("../models");

module.exports = (app) => {
	// get all transactions
	app.get("/api/transactions", async (req, res) => {
		try {
			const query = {};
			if (req.query.user_id) {
				query.UserId = req.query.user_id;
			}
			const allTransactions = await db.Transaction.findAll({
				where: query,
				include: [db.User, db.Budget],
			});
			res.json(allTransactions);
		} catch (err) {
			throw new Error("Unable to get all transaction data.");
		}
	});
	// get one transaction by id
	app.get("/api/transactions/:id", async (req, res) => {
		try {
			const oneTransaction = await db.Transaction.findOne({
				where: {
					id: req.params.id,
				},
				include: [db.User, db.Budget],
			});
			res.json(oneTransaction);
		} catch (err) {
			throw new Error("Unable to get single transaction data.");
		}
	});
	// create a new transaction
	app.post("/api/transactions", async (req, res) => {
		try {
			console.log("post transaction");
			const newTransaction = await db.Transaction.create(req.body);
			console.log("NEW TRANSACTION", newTransaction);
			res.json(newTransaction);
		} catch (err) {
			res.status(401).json(err);
		}
	});
	// delete a transaction by id
	app.delete("/api/transactions/:id", async (req, res) => {
		try {
			const deleteTransaction = await db.Transaction.destroy({
				where: {
					id: req.params.id,
				},
			});
			res.json(deleteTransaction);
		} catch (err) {
			throw new Error(
				"Unable to delete this transaction at id: " + req.params.id
			);
		}
	});
	// update a transaction by id
	app.put("/api/transactions/:id", async (req, res) => {
		try {
			const updated = {
				purpose: req.body.purpose,
				amount: req.body.amount,
				note: req.body.note,
			};
			const updateTransaction = await db.Transaction.update(updated, {
				where: {
					id: req.body.id,
				},
			});
			res.json(updateTransaction);
		} catch (err) {
			throw new Error(
				"Unable to update this transaction at id: " + req.params.id
			);
		}
	});
};
