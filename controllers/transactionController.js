const {User, Realisasi, Account, Group, Kro, Ro, Kegiatan, Komponen, Budget} = require("../models")
const moment = require('moment')
const { bcryptPass, cekPass } = require('../helper/bcrypt');
const { tokenGenerate, cekToken } = require('../helper/token');

class TransactionController {

	static addTransaksion(req,res) {

		Realisasi.findAll({
			order: [['id', 'desc']]
		})
		.then(data2 => {
			let newId = 1
			if(data2.length >= 1) {
				newId = data2[0].id + 1
			}
			let noDokumen = ""
			let userId = req.loggedUser.id
			let dateTime = moment(req.body.dateTransaction).format("YYYY")
			let unix = Math.floor(new Date().getTime() / 1000)
			noDokumen = `${req.body.GroupId}${userId}-${dateTime}-${unix}`
			// console.log(noDokumen);
	
			let payload = {
				UserId:userId,
				id: newId,
				noDokumen: noDokumen,
				keterangan: req.body.keterangan,
				GroupId: +req.body.GroupId,
				KroId: +req.body.KroId,
				RoId: +req.body.RoId,
				KegiatanId: +req.body.KegiatanId,
				KomponenId: +req.body.KomponenId,
				// AccountId: +req.body.AccountId,
				dateTransaction: req.body.dateTransaction,
				sifatPembayaran: req.body.sifatPembayaran,
				manualAccount: req.body.manualAccount,
				jenisPembayaran: req.body.jenisPembayaran,
				pagu: +req.body.pagu,
				amount: +req.body.amount,
				balancePagu: +req.body.balancePagu,
	
				suratTugas: req.body.suratTugas,
				daftarNominatif: req.body.daftarNominatif,
				copySurat: req.body.copySurat,
				kwuitansi: req.body.kwuitansi,
				dpr: req.body.dpr,
				spd: req.body.spd,
				absen: req.body.absen,
				tiket: req.body.tiket,
				hotel: req.body.hotel,
				lainnya: req.body.lainnya,
				ttd: req.body.lainnya,
				invoice: req.body.invoice,
				kwuitansiPembayaran: req.body.kwuitansiPembayaran,
				stempel: req.body.stempel,
				fakturPajak: req.body.fakturPajak,
				ssp: req.body.ssp,
				ttdPetugas: req.body.ttdPetugas,
				suratPenawaran: req.body.suratPenawaran,
				spk: req.body.spk,
				bast: req.body.bast,
				bap: req.body.bap,
				sk: req.body.sk,
			}
			// console.log(payload);
			Realisasi.create(payload)
			.then (data => {
				console.log("berhasil");
				res.status(200).json({msg: "Data Berhasil ditambahkan"})
			})
			.catch(err => {
				console.log(err,"error");
				res.status(500).json({msg: "Periksa kembali data anda"})
			})
		})

	}


	static deleteTransaksi(req, res) {
		Realisasi.destroy({
			where: {
				id: req.params.id
			}
		}).then (data => {
			res.status(200).json({msg: "Data Berhasil ditambahkan"})
		})
		.catch(err => {
			res.status(500).json({msg: "Periksa kembali data anda"})
		})
	}

	static getTransaksi(req,res) {
		Realisasi.findAll({
			order: [['id', 'desc']],
			include: [Group,Kro, Ro, Kegiatan,Komponen],
			attributes: { exclude: ['createdAt', 'updatedAt'] },
		})
		.then((data) => {
			if(req.query.year) {
				let hasil = data.filter(e => e.year == req.query.year)
				data = hasil
			}

			if (req.loggedUser.role == "staff") {
				let hasil = data.filter(e => e.GroupId == req.loggedUser.GroupId)
				data = hasil
			} 
			
			if( req.loggedUser.role == "operator") {
				let hasil = data.filter(e => e.UserId == req.loggedUser.id)
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
	
	// Budget
	static addBudget(req,res) {
		let month = moment(req.body.monthSelect).format("MM")
		let year = moment(req.body.monthSelect).format("YYYY")
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
			if(data) {
				return res.status(500).json({msg: "Periksa kembali data anda"})
			} else {
				return Budget.create({
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
					res.status(500).json({msg: "Periksa kembali data anda"})
				})
			}
		}).catch(err => {
			res.status(500).json({msg: "Periksa kembali data anda"})
		})
	}

	static getBudget(req,res) {
		Budget.findAll({
			order: [['id', 'desc']],
			include: [ Group, Kro, Ro, Kegiatan, Komponen,],
			attributes: { exclude: ['createdAt', 'updatedAt'] },
		}).then((data) => {
			if(req.query.year) {
				let hasil = data.filter(e => e.year == req.query.year)
				data = hasil
			}

			if(req.query.GroupId) {
				let hasil = data.filter(e => e.GroupId == req.query.GroupId)
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

module.exports = TransactionController