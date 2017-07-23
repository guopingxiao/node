var User=require("../models/user");

//注册
exports.showSignup = function(req,res){
	res.render("pages/signup",{
		title:"注册页面"
	})
};

exports.signup = function(req,res){
	var _user = req.body.user;
	User.findOne({name:_user.name},function(err,name){
		if (err) {
			console.log(err);
		};
		if(name){
			console.log("用户名已存在!");
			return res.redirect("/signin");
		}else{
			var user =new User(_user);
			user.save(function(err,user){
				if(err){
					console.log("用户名密码保存失败")
				};
				req.session.user=user;
				res.redirect("back");
			});
		};
	});	
};

//userlist
exports.userlist = function(req,res){
	User.fetch(function(err,users){
		if(err){
			console.log(err);
		}
		res.render("pages/userlist",{
			title:"用户列表页面",
			users:users
		});
	});	
};

//登录
exports.showSignin = function(req,res){
	res.render("pages/signin",{
		title:"登录页面"
	})
};

exports.signin = function(req,res){
	var _user = req.body.user;
	var name = _user.name;
	var password = _user.password;
	User.findOne({name:name},function(err,user){
		if(err){
			console.log(err);
		};
		if(!user){
			console.log("找不到用户名");
			return res.redirect("/signup");
		};
		user.comparePassword(password,function(err,isMatch){
			if(err){
				console.log(err);
			};
			if(isMatch){
				console.log("登录成功");
				req.session.user=user;
				return res.redirect("/");
			}else{
				console.log("密码错误");
				return res.redirect("/signin");
			};
		});
	});
};
//是否登录
exports.signinRequired = function(req,res,next){
	var user = req.session.user;
	if(!user){
		console.log("没有登录");
		return res.redirect("/signin");
	}
	next();
};
//是否有权限
exports.adminRequired = function(req,res,next){
	var user = req.session.user;
	if(user.role <= 10){
		console.log("没有权限");
		return res.redirect("/signin");
	}
	next();
};

//登出
exports.logout = function(req,res){
	//app.locals.user ="";
	req.session.destroy();
    res.redirect('/');
};








