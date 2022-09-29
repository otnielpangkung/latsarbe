const {User, Realisasi, Account, Group, Kro, Ro, Kegiatan, Komponen, Budget} = require("../models")
const moment = require('moment')

class BudgetController {

	// Budget
	static addBudget(req,res) {
		console.log("Yeees");
		let month = +moment(req.body.monthSelect).format("MM")
		let year = +moment(req.body.monthSelect).format("YYYY")
		console.log(month, "<===");
		Budget.findOne({
			where: {
				KomponenId: +req.body.KomponenId,
				KroId: +req.body.KroId,
				RoId: +req.body.RoId,
				KegiatanId: +req.body.KegiatanId,
				GroupId: +req.body.GroupId,
				year: +year,
				month: +month,
			}
		}).then(data => {
			console.log(data, "===");
			if(data) {
				return res.status(500).json({msg: "Periksa kembali data anda"})
			} else {
				let id = 1
				Budget.findAll({
					order: [['id','desc']]
				}).then(data2 => {
					if(data2.length >= 1) {
						id = data2[0].id + 1
					}
					return Budget.create({
						id: id,
						KomponenId: +req.body.KomponenId,
						KroId: +req.body.KroId,
						RoId: +req.body.RoId,
						GroupId: +req.body.GroupId,
						KegiatanId: +req.body.KegiatanId,
						
						week: +req.body.week,
						year: +year,
						month: +month,
						amount: +req.body.amount,
						AccountId: +req.body.AccountId,
					}).then (data => {
						res.status(200).json({msg: "Data Berhasil ditambahkan"})
					})
					.catch(err => {
						console.log(err);
						res.status(500).json({msg: "Periksa kembali data anda"})
					})
				})

			}
		}).catch(err => {
			console.log(err);
			res.status(500).json({msg: "Periksa kembali data anda"})
		})
	}

	static getBudget(req,res) {
		Budget.findAll({
			order: [ ['KomponenId','asc'],['KroId','asc'], ['id', 'desc']],
			include: [ Group, Kro, Ro, Kegiatan, Komponen,],
			attributes: { exclude: ['createdAt', 'updatedAt'] },
			where: {
				year: req.query.year
			}
		}).then( (data) => {
			if(req.query.year) {
				let hasil =  data.filter(e => e.year == req.query.year)
				data = hasil
			}

			if(req.query.month) {
				let hasil = data.filter(e => e.month == req.query.month)
				data = hasil
			}

			if(req.loggedUser.role == "staff") {
				let hasil = data.filter(e => e.GroupId == req.loggedUser.GroupId)
				data = hasil
			} 
		
			let dataLength = data.length;
			const startIndex = (req.query.page - 1) * req.query.limit;
			const endIndex = req.query.page * req.query.limit;
			const result = data.slice(startIndex, endIndex);

			res.status(200).json({
				data2: {
					result,
					dataLength,
				},
			});
		})
		.catch(err => {
			res.status(404).json(err)
		})
	}

	static deleteBudget(req, res) {
		Budget.destroy({
			where: {
				id: req.params.id
			}
		}).then(data => {
			res.status(200).json(data)
		})
		.catch(err => {
			res.status(404).json(err)
		})
	}

	static editBudget(req,res) { 
		let payload = {
			year: +req.body.year,
			KomponenId: +req.body.KomponenId,
			KroId: +req.body.KroId,
			RoId: +req.body.RoId,
			GroupId: +req.body.GroupId,
			KegiatanId: +req.body.KegiatanId,
			week: +req.body.week,
			month: +req.body.month,
			amount: +req.body.amount,
			AccountId: +req.body.AccountId,
		}

		Budget.update(payload, {
			where: {
				id: req.params.id
			}
		}).then(data => {
			res.status(200).json(data)
		})
		.catch(err => {
			res.status(404).json(err)
		})
	}
	

}

module.exports = BudgetController