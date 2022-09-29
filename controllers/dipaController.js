const {User, Realisasi, Account, Group, Kro, Ro, Kegiatan, Komponen, Budget, sequelize} = require("../models")
const moment = require('moment')
// const

class DipaController {

	static getKegiatan(req,res) {
		// console.log(req.query.year);
		let penm = []
		Kegiatan.findAll({
			where: {
				year: req.query.year,

			},
			// raw: true,
			// nest: true,
			include: [ 
				{
					model: Kro, 
					attributes: {
						 exclude: ['createdAt', 'updatedAt'],
						 include: [sequelize.fn('sum', sequelize.col('Realisasi.amount')), 'total_amount']
					},
					include: [
						{
							model: Ro,  
							attributes: {
								exclude: ['createdAt', 'updatedAt']
							},
							include: [
								{
									model: Komponen,
									attributes: { 
										exclude: ['createdAt', 'updatedAt']
									}
								}
							]
						},
					]
				}, {
					model: Realisasi,
					 as :  'Realisasi',
					attributes: [
						'id','KroId','RoId','dateTransaction',
						// [sequelize.fn('sum', sequelize.col('amount')), 'total_amount'],	
					],
					// where: {
					// 	dateTransaction: sequelize.fn('MONTH', sequelize.col('dateTransaction'), req.query)	
					// }
				}
			],
			attributes: { exclude: ['createdAt', 'updatedAt'] },
		}).then ( async data => {
			// penm = data.map(e => e.dataValues)
			
			// for await (let i of penm) {

			// 	let realisasi = await Realisasi.findAll({
			// 		where: {
			// 			KegiatanId : i.id
			// 		}
			// 	})
				
			// }
			console.log(data[0]);
			res.status(200).json(data)
		})

	}

	// kegiatan
	static getJumlah(req,res) {
		console.log("yesss");
		let hasil = 0
		// let penm = {
		// 	Kegiatan: [
		// 		{id : 1,
		// 		total: 300,
				
		// 		}
		// 	],
		// 	Kro
		// }
		console.log(req.query.KegiatanId);

		if(!req.query.KegiatanId && req.query.KroId && req.query.RoId && req.query.KomponenId) {
			return res.status(500).json({msg : "Query tidak Boleh Kosong"})
		}
		Realisasi.findAll({
			where: {
				KegiatanId: +req.query.KegiatanId
			}
		}).then(data => {
			// hasil = data
			// if(req.query.KroId) {
			// 	let penampung = data.filter(e => e.KroId == req.query.KroId)
			// 	data = penampung 
			// }

			data?.map(e => {
				let year = +moment(e.dateTransaction).format("YYYY")
				let month = +moment(e.dateTransaction).format("MM")
				if(!req.query.month) {
					if(year == +req.query.year) {
						hasil += e.amount
					}
				} else if(req.query.month) {
					if(year == +req.query.year && month == +req.query.month) {
						hasil += e.amount
					}
					
				}
			})
			// console.log(hasil);
			return res.status(200).json(hasil)
		})

		
		
		// console.log(penm, "++++++++++++++");
		// let penm2 = []
		// penm?.map(e => {
		// 	let year = moment(e.dateTransaction).format("YYYY")
		// 	let month = moment(e.dateTransaction).format("MM")
		// 	if(!req.query.month) {
		// 		if(year == +req.query.year) {
		// 			hasil += e.amount
		// 		}
		// 	} else if(req.query.month) {
		// 		if(year == +req.query.year && month == +req.query.month) {
		// 			hasil += e.amount
		// 		}
				
		// 	}
		// })
	
		// 	res.status(200).json({hasil : hasil})

	}
	

}

module.exports = DipaController