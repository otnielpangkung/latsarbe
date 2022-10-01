const {User, Group, Realisasi, Ro, Kro, Komponen, Budget, Kegiatan} = require("../models")
const { bcryptPass, cekPass } = require('../helper/bcrypt');
const { tokenGenerate, cekToken } = require('../helper/token');

class UserController {
    // user
    static login(req, res) {
		console.log("Teeess");
		console.log('masuk login', req.body);
		User.findOne({
			where: {
				username: req.body.username,
			},
		})
			.then((data) => {
				console.log("yess");
				// console.log(data.password);
				if (data) {
					console.log(data.password);
					let password = cekPass(req.body.password, data.password);
					// /cons/ole.log(password);
					if (password) {
						console.log("Tesss");
						let user = {
							username: data.username,
							role: data.role,
							id: data.id,
							GroupId: data.GroupId,
						};
						console.log(user,"=======");
						let access_token = tokenGenerate(user);
						res.status(200).json({
							id: data.id,
							username: data.username,
							access_token: access_token,
						});
						// res.status(200).json(data)
					} else {
						res.status(401).json({ msg: 'poaswword/username salah' });
					}
				} else {
					res.status(401).json({ msg: 'poaswword/username salah' });
				}
			})
			.catch((err) => {
				res.status(401).json({ msg: 'poaswword/username salah 2' });
			});

	}

    static register(req,res) {
		User.findAll({
			order: [['id', 'desc']]
		}).than(data2 => {
			let newId = 1
			if(data2.length >= 1) {
				newId = data2[0].id + 1
			}
			User.create({
				id: newId,
				username: req.body.username,
				password: bcryptPass(req.body.password) ,
				GroupId: req.body.GroupId,
				role: req.body.GroupId,
			})
			.then(data => {
				res.status(200).json(data)
			})
			.catch(err => {
				res.status(404).json(err)
			})
		})

    }

    static getUser(req, res) {
		console.log(req.query.page, "====");
		User.findAll({
            include: [Group],
			attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
			order: [['id', 'desc']]
		}).then((data) =>  {

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
		.catch((err) => {
			res.status(401).json(err);
		});
	}

    // group

    static addGroup(req, res) {
		Group.findAll({
			order: [['id', 'desc']]
		}).then(data2 => {
			let newId = 1
			if(data2.length >= 1) {
				newId = data2[0].id + 1
			}

			Group.create({
				id: newId,
				grupName : req.body.grupName
			})
			.then(data => {
				
				res.status(200).json(data)
			})
			.catch(err => {
				res.status(404).json(err)
			})
		})

    }

    static getGroup(req, res) {
        // tidak perlu pagination karena sedikit dan jarang bertambah
        Group.findAll({
			attributes: { exclude: [ 'createdAt', 'updatedAt'] },
		})
        .then(data => {
			// let hasil = data.filter(e => e.grupName[0] == "P")
			// data = hasil
			// hasil = data.filter(e => e.grupName[2] == "n")
			// data = hasil
			res.status(200).json(data)
		})
		.catch(err => {
			res.status(404).json(err)
		})
    }
	static editGroup(req, res) {
		// console.log(req.body.grupName);
		Group.update({
            grupName : req.body.grupName
        }, {
			where: {
				id: req.params.id
			}
		})
        .then(data => {
			res.status(200).json(data)
		})
		.catch(err => {
			res.status(404).json(err)
		})
	}
    static deleteGroup(req,res) {
		// console.log(req.params.id);
		Kegiatan.findOne({
			where: {
				GroupId: req.params.id
			}
		}).then(data => {
			console.log(data)
			if(data) {
				return res.status(404).json({msg : "Periksa Kembali data anda"})
			} else {
				console.log("yes");
				Group.destroy({
					where: {
						id: req.params.id
					}
				}).then(data => {
					res.status(200).json(data)
                }).catch(err => {
					console.log(err);
                    res.status(404).json(err)
                })
			}
		})
    }
}

module.exports = UserController