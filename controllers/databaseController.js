const {User, Realisasi, Account, Group, Kro, Ro, Kegiatan, Komponen, Budget} = require("../models")
const { bcryptPass, cekPass } = require('../helper/bcrypt');
const { tokenGenerate, cekToken } = require('../helper/token');

class DatabaseController {
	// Kegiatan
	static getKegiatan(req,res) {
		console.log(req.loggedUser);
		Kegiatan.findAll({
			order: [['id', 'desc']],
			include: [Group],
			attributes: { exclude: ['createdAt', 'updatedAt'] },
		})
		.then((data) => {
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

	static editKegiatan(req,res) {
		console.log("Yeeeesss");
		Kegiatan.update({
			kegiatanCode: req.body.kegiatanCode.toUpperCase(), 
			kegiatanDetail: req.body.kegiatanDetail,
			// GroupId: req.body.GroupId,
			// year: req.body.year,
		},{ where: {id: req.params.id
		}}).then(data => {
			res.status(200).json(data)
		})
		.catch(err => {
			res.status(404).json(err)
		})
	}

	static addKegiatan(req,res) {
		console.log(req.body);
		Kegiatan.findAll({
			order: [['id', 'desc']]
		}).then(data2 => {
			let newId = 1
			if(data2.length >= 1) {
				newId = data2[0].id + 1
			}
			Kegiatan.create({
				id: newId,
				kegiatanCode: req.body.kegiatanCode.toUpperCase(), 
				kegiatanDetail: req.body.kegiatanDetail,
				GroupId: req.body.GroupId,
				year: req.body.year,
			}).then(data => {
				res.status(200).json(data)
			})
			.catch(err => {
				res.status(404).json(err)
			})
		})

	}
	static deleteKegiatan(req, res) {
		Kegiatan.findOne({
			include: [Kro],
			where: {
				id: req.params.id
			}
		}).then(data => {
			console.log(data);
			if( data.Kros.length < 1) {
				return Kegiatan.destroy({
					where: {
						id :  req.params.id
					}
				}).then(data => {
					res.status(200).json({
						msg: "Data Berhasil dihapus"
					})
				}).catch(err => {
					res.status(404).json(err)
				})

			} 
		}).catch(err => {
			res.status(404).json(err)
		})
	}
	static getKegiatanKro(req,res) {
		// console.log("0000000000000000000000", req.query.GroupId);
		// console.log(req.loggedUser);[]
		Kegiatan.findAll({
			attributes: { exclude: ['createdAt', 'updatedAt'] },
			where: {
				GroupId: req.query.GroupId,
				year: req.query.year,

			},
		})
		.then((data) => {
			console.log(data.length, "====");
			res.status(200).json(data);
		})
		.catch(err => {
			res.status(404).json(err)
		})
	}

	//    Kro
	static addKro(req,res) {
		Kro.findAll({
			order: [['id', 'desc']]
		}).than(data2 => {
			let newId = 1
			if(data2.length >= 1) {
				newId = data2[0].id + 1
			}
			Kegiatan.findOne({
				where: {
					id: req.body.KegiatanId
				}
			}).then(data => {
				Kro.create({
					id: newId,
					KegiatanId: data.id, 
					GroupId: +req.body.GroupId,
					year: +req.body.year,
					kroCode: req.body.kroCode, 
					kroDetail: req.body.kroDetail,
				})
				.then(data => {
					res.status(200).json(data)
				})
				.catch(err => {
					res.status(404).json(err)
				})
	
			})
		})

	}

	static getKro(req,res) {

		// console.log(req.loggedUser);
		Kro.findAll({
			order: [['id', 'desc']],
			include: [Group, Kegiatan],
			attributes: { exclude: ['createdAt', 'updatedAt'] },
		})
		.then((data) => {
			// console.log(data,"----");
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

	static editKro(req,res) {
		// console.log("Yeeeesss");
		Kro.update({
			kroCode: req.body.kroCode.toUpperCase(), 
			kroDetail: req.body.kroDetail,
		},{
			where: {id: req.params.id}
		}).then(data => {
			res.status(200).json(data)
		})
		.catch(err => {
			res.status(404).json(err)
		})
	}

	static deleteKro(req, res) {
		// console.log(req.params.id, "Terhapusmi");
		Kro.findOne({
			include: [Ro],
			where: {
				id: req.params.id
			}
		}).then(data => {
			if(data.Ros.length < 1) {
				Kro.destroy({
					where: {
						id: req.params.id
					}
				}).then(data => {
					res.status(200).json({
						msg: "Data Berhasil dihapus"
					})
				}).catch(err => {
					res.status(404).json(err)
				})
			}
		})
	}

	static getKroRo(req,res) {
		Kro.findAll({
			attributes: { exclude: ['createdAt', 'updatedAt'] },
			where: {
				GroupId: req.query.GroupId,
				year: req.query.year,
				KegiatanId: req.query.KegiatanId,

			},
		})
		.then((data) => {
			console.log(data.length);
			res.status(200).json(data);
		})
		.catch(err => {
			res.status(404).json(err)
		})
	}

	// Ro
	static AddRo(req,res) {

		Ro.findAll({
			order: [['id', 'desc']]
		}).than(data2 => {
			let newId = 1
			if(data2.length >= 1) {
				newId = data2[0].id + 1
			}
			Ro.create({
				id: newId,
				GroupId: req.body.GroupId,
				KegiatanId: req.body.KegiatanId,
				KroId: req.body.KroId,
				year: req.body.year,
				roCode: req.body.roCode, 
				roDetail: req.body.roDetail,
			})
			.then(data2 => {
				res.status(200).json(data2)
	
			})
			.catch(err => {
				res.status(404).json(err)
			})
		})

	}

	static getRo(req,res) {
		// console.log(req.loggedUser);
		Ro.findAll({
			order: [['id', 'desc']],
			include: [Group, Kegiatan, Kro],
			attributes: { exclude: ['createdAt', 'updatedAt'] },
		})
		.then((data) => {
			// console.log(data,"----");
			if(req.query.year) {
				let hasil = data.filter(e => e.year == req.query.year)
				data = hasil
			}
			if(req.query.GroupId) {
				let hasil = data.filter(e => e.GroupId == req.query.GroupId)
				data = hasil

			}
			if(req.query.KroId) {
				let hasil = data.filter(e => e.KroId == req.query.KroId)
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

	static editRo(req,res) {
		// console.log("Yeeeesss");
		Ro.update({
			roCode: req.body.roCode.toUpperCase(), 
			roDetail: req.body.roDetail,
		},{
			where: {id: req.params.id}
		}).then(data => {
			res.status(200).json(data)
		})
		.catch(err => {
			res.status(404).json(err)
		})
	}

	static deleteRo(req, res) {
		// console.log(req.params.id, "Terhapusmi");
		Ro.findOne({
			include: [Komponen],
			where: {
				id: req.params.id
			}
		}).then(data => {
			console.log(data.Komponens);
			if(data.Komponens.length < 1) {
				Ro.destroy({
					where: {
						id: req.params.id
					}
				}).then(data => {
					res.status(200).json({
						msg: "Data Berhasil dihapus"
					})
				}).catch(err => {
					res.status(404).json(err)
				})
			}
		})
	}

	static getRoKomponen(req,res) {
		console.log(req.query.KroId, "================");
		Ro.findAll({
			attributes: { exclude: ['createdAt', 'updatedAt'] },
			where: {
				KroId: req.query.KroId,
			},
		})
		.then((data) => {
			res.status(200).json(data);
		})
		.catch(err => {
			res.status(404).json(err)
		})
	}

	// Komponen
	static addKomponen(req,res) {
		console.log(req.body);
		Komponen.findAll({
			order: [['id', 'desc']]
		}).then(data2 => {
			let newId = 1
			if(data2.length >= 1) {
				newId = data2[0].id + 1
			}
			Komponen.create({
				id: newId,
				GroupId: req.body.GroupId,
				KegiatanId: req.body.KegiatanId,
				KroId: req.body.KroId,
				RoId: req.body.RoId,
				year: req.body.year,
				komponenCode: req.body.komponenCode, 
				komponenDetail: req.body.komponenDetail,
			})
			.then(data2 => {
				res.status(200).json(data2)
	
			})
			.catch(err => {
				console.log(err);
				res.status(404).json(err)
			})
		})
		.catch(err => {
			console.log(err);
			res.status(404).json(err)
		})
	}

	static getKomponen(req,res) {
		// console.log(req.loggedUser);
		Komponen.findAll({
			order: [['id', 'desc']],
			include: [Group, Kegiatan, Kro, Ro],
			attributes: { exclude: ['createdAt', 'updatedAt'] },
		})
		.then((data) => {
			// console.log(data,"----");
			if(req.query.year) {
				let hasil = data.filter(e => e.year == req.query.year)
				data = hasil
			}
			if(req.query.GroupId) {
				let hasil = data.filter(e => e.GroupId == req.query.GroupId)
				data = hasil

			}
			if(req.query.KroId) {
				let hasil = data.filter(e => e.KroId == req.query.KroId)
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

	static editKomponen(req,res) {
		// console.log("Yeeeesss");
		Komponen.update({
			komponenCode: req.body.komponenCode.toUpperCase(), 
			komponenDetail: req.body.komponenDetail,
		},{
			where: {id: req.params.id}
		}).then(data => {
			res.status(200).json(data)
		})
		.catch(err => {
			res.status(404).json(err)
		})
	}

	static deleteKomponen(req, res) {
		console.log(req.params.id, "Terhapusmi");
		Komponen.findOne({
			include: [ Budget],
			where: {
				id: req.params.id
			}
		}).then(data => {
			console.log(data, "+++");
			// console.log(data.Komponens);
			// if(data.Budgets.length < 1 ||  data.Realisasis.length < 1) {
			// 	Komponen.destroy({
			// 		where: {
			// 			id: req.params.id
			// 		}
			// 	}).then(data => {
			// 		res.status(200).json({
			// 			msg: "Data Berhasil dihapus"
			// 		})
			// 	}).catch(err => {
			// 		res.status(404).json(err)
			// 	})
			// }
		}).catch(err => {
			console.log(err);
			res.status(404).json(err)
		})
	}

	static getKomReal(req,res) {
		console.log("yafet sampe");
		Komponen.findAll({
			where: {
				RoId: req.query.RoId
			}
		}).then((data) => {
			res.status(200).json(data);
		})
		.catch(err => {
			res.status(404).json(err)
		})
	}


	// Account


	
}

module.exports = DatabaseController