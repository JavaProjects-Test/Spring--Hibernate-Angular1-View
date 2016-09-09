var app = angular.module('myApp', ['ngRoute']);
app.config(['$routeProvider',
	function($routeProvider){
		$routeProvider.when('/default',{
			templateUrl: 'html/default.html',
			controller: 'default'
		}).when('/signup',{
			templateUrl: 'html/signup.html',
			controller: 'signup'
		}).when('/login',{
			templateUrl: 'html/login.html',
			controller: 'login'
		}).when('/home',{
			templateUrl:'html/home.html'
		}).when('/forgotpassword',{
			templateUrl:'html/forgotpassword.html',
			controller: 'forgotpassword'
		}).when('/phone',{
			templateUrl:'html/phone.html',
			controller:'phonecontroller'
		}).when('/speaker',{
			templateUrl:'html/speaker.html',
			controller:'speakercontroller'
		}).when('/bag',{
			templateUrl: 'html/bag.html',
			controller:'bagcontroller'
		}).when('/laptop',{
			templateUrl:'html/laptop.html',
			controller:'laptopcontroller'
		}).otherwise({
			redirectTo: '/default'
		});
	}]);

app.controller('default',function($scope){
	$scope.message="Hi, This is default page";
});

app.controller('signup',function($scope,$http,$location){
	$scope.firstName="";
	$scope.lastName="";
	$scope.emailId="";
	$scope.password="";
	$scope.country="";
	$scope.state="";
	$scope.city="";
	$scope.submit=function(){
		$http({
			method:'post',
			url:"http://localhost:9090/JsonRetrieveTest/signup",
			data:{
				firstName:$scope.firstName,
				lastName:$scope.lastName,
				emailId:$scope.emailId,
				password:$scope.password,
				country:$scope.country,
				state:$scope.state,
				city:$scope.city
			},
			header : {
				'Content-Type' : 'application/json',
				"Access-Control-Allow-Origin": "*",
				'Accept': 'application/json'
			}
		}).then(function(data){
			$scope.signupStatus=data.data.status;
			if($scope.signupStatus == 'success'){
				alert("Insert Successfully!!");
				$location.path('/home');
			}
			else{
				alert("Not inserted successfully");
			}
		});

	};

});

app.controller('login',function($scope,$http,$location){
	$scope.emailId="";
	$scope.password="";
	$scope.pageHeader=false;
	$scope.submit=function(){
		$http({
			method:'post',
			url:'http://localhost:9090/JsonRetrieveTest/login',
			data:{
				emailId:$scope.emailId,
				password:$scope.password
			},
			header:{
				'Content-Type' : 'application/json',
				"Access-Control-Allow-Origin": "*",
				'Accept': 'application/json'
			}
		}).then(function(data){
			$scope.loginStatus=data.data.status;
			if($scope.loginStatus=='success'){
				$scope.pageHeader=true;
				$location.path('/home');
			}
			else{
				$scope.errorMessage1="Invalid Credentials*";
				$scope.errorMessage2="Please enter valid Credentials";
				$location.path('/login');
			}
		});
	};
});

app.controller('forgotpassword',function($scope,$http,$location){
	$scope.firstName="";
	$scope.lastName="";
	$scope.emailId="";
	$scope.password="";
	$scope.isEmailVerified=false;
	$scope.loginPageButton=false;
	$scope.submitButton=true;
	$scope.submit=function(){
		$http({
			method:'post',
			url:'http://localhost:9090/JsonRetrieveTest/usermailverification',
			data:{
				firstName:$scope.firstName,
				lastName:$scope.lastName,
				emailId:$scope.emailId,
				password:$scope.password,
			},
			header:{
				'Content-Type' : 'application/json',
				"Access-Control-Allow-Origin": "*",
				'Accept': 'application/json'
			}
		}).then(function(data){
			$scope.changePassword=data.data.status;
			if($scope.changePassword=="emailVerified"){
				$scope.errorMessagefordata="";
				$scope.isEmailVerified=true;
				$location.path('/forgotpassword');
			}
			else if($scope.changePassword=="passwordupdated"){
				$scope.passwordUpdatedMessage1="Your Password has been updated";
				$scope.passwordUpdatedMessage2="Please check your registered Email for confirm password";
				$scope.isEmailVerified=false;
				$scope.loginPageButton=true;
				$scope.submitButton=false;
				$location.path('/forgotpassword');
			}
			else{
				$scope.errorMessagefordata="Invalid Details, Please fill up valid details";
				$location.path('/forgotpassword');
			}
		});
	};
});

app.controller('phonecontroller',function($scope,$http,$location){
	$http({
		method:'get',
		url:'http://localhost:9090/JsonRetrieveTest/retrivephone',
		data:{},
		header:{
			'Content-Type' : 'application/json',
			"Access-Control-Allow-Origin": "*",
			'Accept': 'application/json'
		}
	}).then(function(data){
		$scope.phonedata=data.data;
		if($scope.phonedata != null){
			$scope.tableHeader="Here is the list of Phones";
		}
		else{
			alert("No Data available for Phone");
		}
	});
});

app.controller('speakercontroller', function($scope,$http,$location){
	$http({
		method:'get',
		url:'http://localhost:9090/JsonRetrieveTest/retrievespeaker',
		data:{},
		header:{
			'Content-Type' : 'application/json',
			"Access-Control-Allow-Origin": "*",
			'Accept': 'application/json'

		}
	}).then(function(data){
		$scope.speakerdata=data.data;
		if($scope.speakerdata != null){
			$scope.tableHeader="Here is the list of Speakers";
		}
		else{
			alert("No data available for speaker");
		}
	});
});

app.controller('bagcontroller',function($scope,$http){
	$http({
		method:'get',
		url:'http://localhost:9090/JsonRetrieveTest/retrievebag',
		data:{},
		header:{
			'Content-Type' : 'application/json',
			"Access-Control-Allow-Origin": "*",
			'Accept': 'application/json'
		}
	}).then(function(data){
		$scope.bagdata=data.data;
		if($scope.bagdata != null){
			console.log($scope.bagdata);
			$scope.tableHeader="Here is the list of bags";
		}
		else{
			alert("No data available for Bag");
		}
	});
});

app.controller('laptopcontroller',function($scope,$http){
	$http({
		method:'get',
		url:'http://localhost:9090/JsonRetrieveTest/retrievelaptop',
		data:{},
		header:{
			'Content-Type' : 'application/json',
			"Access-Control-Allow-Origin": "*",
			'Accept': 'application/json'
		}
	}).then(function(data){
		$scope.laptopdata=data.data;
		if($scope.laptopdata != null){
			$scope.tableHeader="Here is the list of Laptops"
		}else{
			alert("No data available for Laptop");
		}
	});
});