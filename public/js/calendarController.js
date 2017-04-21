let app = angular.module("CalendarApp", [])
        
app.controller("CalendarController", CalendarController)

function CalendarController($scope, $http) {
    $scope.createAppointment = createAppointment
    $scope.deleteAppointment = deleteAppointment
    $scope.editAppointment = editAppointment
    $scope.updateAppointment = updateAppointment
    // $scope.tutorOptions = ['Admin', 'Supervisor', 'Tutor', 'Student']
    $scope.studentOptions = getAllStudents()
    $scope.tutorOptions = getAllTutors()
    $scope.testFun = testFun
    $scope.numberOfDays = numberOfDays
    $scope.currentMonth = new Date().getMonth()
    $scope.currentYear = new Date().getFullYear()
    $scope.monthWeeks = numberOfDays($scope.currentMonth, $scope.currentYear)/7
    $scope.month = numberOfDays($scope.currentMonth, $scope.currentYear)/7
    $scope.constructMonth = constructMonth
    // $scope.week = 

    function init(){
        getAllAppointments()
        // $scope.studentOptions = getAllStudents()
        console.log($scope.studentOptions)
        console.log($scope.numberOfDays(2017, 4))

    }
    init()

    function getAllAppointments() {
        $http.get('/api/calendar').then(
            function(appointment){
                $scope.appointments = appointment.data
            },
            function(err) {
                console.log(err)
        })
    }

    function createAppointment(appointment) {
        // appointment  = appointment.trim()
        // for(thing in appointment){
        // appointment[thing] = appointment[thing].trim()
        // }
        // console.log(appointment)
        // appt = JSON.parse(appointment)
        // console.log(JSON.parse(appointment.tutor))
        console.log('\n\n appointment date: ' + JSON.stringify(appointment))
        $http.post('/api/calendar', appointment).then(
            function(result){
                getAllAppointments()
            },
            function(err){
                console.log(err)
        })
    }

    function deleteAppointment(appointment) {
        $http.delete('/api/calendar/' + appointment).then(
            function(result){
                getAllAppointments()
            },
            function(err){
                console.log(err)
        })
    }

    function editAppointment(appointment) {
        $http.get('/api/calendar/'+appointment).then(
            function(result){
              console.log(result)
                $scope.appointment = result.data
            },
            function(err){
                console.log(err)
            }
        )
    }

    function updateAppointment(appointment) {
        appointment.permissions = appointment.permissions.trim()
        $http.put('/api/users/'+appointment._id, appointment).then(
            function(result){
                getAllUsers()
            },
            function(err){
                console.log(err)
            }
        )
    }

    function getAllStudents(){
      $http.get('/api/users').then(
            function(students){
              console.log(students.data)
              let allStudents = []
              for(let i = 0; i < students.data.length; i++){
                if(students.data[i]['permissions'] == 'Student'){
                  allStudents.push(students.data[i])
                }
              }
              $scope.studentOptions = allStudents
            },
            function(err) {
                console.log(err)
        })
    }

    function getAllTutors(){
      $http.get('/api/users').then(
            function(tutors){
              console.log(tutors.data)
              let allTutors = []
              for(let i = 0; i < tutors.data.length; i++){
                if(tutors.data[i]['permissions'] == 'Tutor'){
                  allTutors.push(tutors.data[i])
                }
              }
              $scope.tutorOptions = allTutors
            },
            function(err) {
                console.log(err)
        })
    }

    function testFun() {
        let days = numberOfDays()

    }

    function numberOfDays(year, month) {
        var d = new Date(year, month, 0);
        return d.getDate();
    }

    function constructMonth() {
        let days = numberOfDays($scope.currentMonth, $scope.currentYear)
        let dayArr = []
        for(let i = 0; i < days; i++){
            dayArr.push(i)
        }
        
        dayArr.reverse()
        console.log(dayArr)
        let month = []
        let week = []
        count = 0
        while(true){
            if(dayArr.length != 0){
                week.push(dayArr.pop())
                count++
                console.log(dayArr)
            }
            
            if(count >= 7){
                month.push(week)
                week = []
            }
            else if(dayArr.length == 0){
                month.push(week)
                break
            }
        }
        // for(let i = 0; i < days; i++){
        //     if(count >= 7){
        //         count = 0
        //         month.push(week)
        //         week = []
        //     }
        //     week.push(i+1)
        //     count++
        // }
        console.log(month)
    }


}


/*myApp.directive('calendarDisplay', function() {
    // Requires that scope contains a 'monthDays' array.
    // Adds 'weeks' to scope.
    
                <div class="row">
                    <table class='table' style="table-layout:fixed;">
                        <tr>
                            <td class="mark">Content</td>
                            <td class="mark">Content</td>
                            <td class="mark">Content</td>
                            <td class="mark">Content</td>
                            <td class="mark">Content</td>
                            <td class="mark">Content</td>
                            <td class="mark">Content</td>
                            <td class="mark">Content</td>
                        </tr>
                    </table>
                </div>
    return {
        restrict: 'E',
        replace: true,
        template: '<table cellspacing="0" cellpadding="0">'
        + '<colgroup span="7"></colgroup>' 
        + '<tbody>' 
        + '<tr class="days">'
        + '<th scope="col" title="Monday">Mon</th>' 
        + '<th scope="col" title="Tuesday">Tue</th>' 
        + '<th scope="col" title="Wednesday">Wed</th>' 
        + '<th scope="col" title="Thursday">Thu</th>' 
        + '<th scope="col" title="Friday">Fri</th>' 
        + '<th scope="col" title="Saturday">Sat</th>' 
        + '<th scope="col" title="Sunday">Sun</th>' 
        + '</tr>'
        + '<tr ng-repeat="week in weeks">'
        + '<td ng-repeat="day in week">{{day}}</td>'
        + '</tr></tbody></table>',
        link: function(scope) {
            scope.weeks = [];
            for (var i = 0; i < scope.monthDays.length; i++) {
                if (i % 7 == 0) {
                    scope.weeks.push([]);
                }
                scope.weeks[scope.weeks.length-1].push(scope.monthDays[i]);
            }
        }
    }
})*/