let apiService = angular.module('apiService', [])

apiService.factory('api',['$http', function($http) {

  let api = {}

  api.getAllUsers = function($http) {
       return $http.get('/api/users').then(
            function(users){
                return users.data
            },
            function(err) {
                console.log(err)
        })
    }

    api.getAllStudents = function($http){
      $http.get('/api/users').then(
            function(students){
              console.log(students.data)
              let allStudents = []
              for(let i = 0; i < students.data.length; i++){
                if(students.data[i]['permissions'] == 'Student'){
                  console.log(students.data[i])
                  allStudents.push(students.data[i])
                }
              }
              return allStudents
            },
            function(err) {
                console.log(err)
        })
    }

    api.getAllTutors = function($http){
      $http.get('/api/users').then(
            function(tutors){
              console.log(tutors.data)
              let allTutors = []
              for(let i = 0; i < tutors.data.length; i++){
                if(tutors.data[i]['permissions'] == 'Tutor'){
                  allTutors.push(tutors.data[i])
                }
              }
              return allTutors
            },
            function(err) {
                console.log(err)
        })
    }

  return api
  

}]);