var $loginMsg = $('.loginMsg'),
	$login = $('.login'),
	$signupMsg = $('.signupMsg'),
	$signup = $('.signup'),
	$frontbox = $('.frontbox');

$('#switch1').on('click', function() {
	$loginMsg.toggleClass("visibility");
	$frontbox.addClass("moving");
	$signupMsg.toggleClass("visibility");

	$signup.toggleClass('hide');
	$login.toggleClass('hide');
})

$('#switch2').on('click', function() {
	$loginMsg.toggleClass("visibility");
	$frontbox.removeClass("moving");
	$signupMsg.toggleClass("visibility");

	$signup.toggleClass('hide');
	$login.toggleClass('hide');
})

// --------------------初始化--------------------------
var APP_ID = 'acHVBEhDP7PmS4PSITliGkbc-gzGzoHsz';
var APP_KEY = 'agrRn6IGqN3wn8cXGTAhblze';
AV.init({
	appId: APP_ID,
	appKey: APP_KEY
});
//------------------用户登录--------------------------
var formLogin = document.querySelector('form[name="logIn"]')
formLogin.addEventListener('submit', function(e) {
	e.preventDefault()
	var username = formLogin.username.value
	var password = formLogin.password.value
	AV.User.logIn(username, password).then(function(loginedUser) {
		console.log(loginedUser);
		location.reload()
	}, function(error) {
		if(error.code === 210) {
			alert('用户名和密码不匹配')
		} else if(error.code === 211) {
			alert('用户名不存在')
		}
	});
})

//-----------------用户注册,此处不能用jQuery--------
var signin = document.querySelector('form[name=signIn]')
signin.addEventListener('submit', function(e) {
	e.preventDefault()
	// 新建 AVUser 对象实例
	var user = new AV.User();
	// 设置用户名
	user.setUsername(signin.username.value);
	// 设置密码
	user.setPassword(signin.password.value);
	// 设置邮箱
	user.setEmail(signin.email.value);
	user.signUp().then(function(loginedUser) {
		alert('注册成功');
		window.location.reload()
	}, function(error) {
		alert('注册失败');
	});
})

//----------------------获取当前用户--------------------------
var currentUser = AV.User.current();
if(currentUser) {
	// 跳转到首页
	var userStatus = document.querySelector('div[class="userStatus"]')
	userStatus.innerHTML = '欢迎回来,' + currentUser.attributes.username
	var div = document.createElement('button')
	div.textContent = '退出当前登录'
	//样式
	userStatus.style.color = 'white'
	userStatus.style.fontSize = '50px'
	var a = document.querySelector('div[class="container"]')
	a.remove()
	//-----------------
	userStatus.appendChild(div)
	userStatus.children[0].addEventListener('click', function() {
		AV.User.logOut()
		window.location.reload()
	})

} else {
	//currentUser 为空时，可打开用户注册界面…
}