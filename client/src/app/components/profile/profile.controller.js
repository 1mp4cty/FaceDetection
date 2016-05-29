(function() {
    'use strict';

    angular
        .module('client')
        .controller('ProfileController', ProfileController);
/*
    var stu = {
        fName: 'Энхсанаа',
        lName: 'Нацагдорж',
        type: 2,
        about: 'блах',
        lessons: [{
            id: 0,
            name: 'Аюулгүй байдал',
            teacher: 'Алтангэрэл',
            credit: '3',
            days: [{
                date: '2016-05-02',
                type: 'лекц',
                photo: 1,
                status: 'ирсэн'
            }, {
                date: '2016-05-02',
                type: 'лаб',
                photo: 1,
                status: 'ирсэн'
            }]
        }, {
            id: 1,
            name: 'Үүсмэл оюун',
            teacher: 'Сувдаа',
            credit: '3',
            days: [{
                date: '2016-05-11',
                type: 'лекц',
                photo: 1,
                status: 'ирээгүй'
            }, {
                date: '2016-05-12',
                type: 'лаб',
                photo: 0,
                status: 'ирээгүй'
            }]
        }]
    };

    var tea = {
        fName: 'Алтангэрэл',
        lName: 'Чагнаа',
        type: 1,
        about: 'блах',
        lessons: [{
            id: 0,
            name: 'Аюулгүй байдал',
            number: '30',
            credit: '3',
            days: [{
                date: '2016-04-06',
                type: 'лекц',
                photo: 1,
                students: [{
                    fName: 'Энхсанаа',
                    lName: 'Нацагдорж'
                }, {
                    fName: 'Дулам',
                    lName: 'Батбаатар'
                }]
            }, {
                date: '2016-04-06',
                type: 'лаб',
                photo: 1,
                students: [{
                    fName: 'Энхсанаа',
                    lName: 'Нацагдорж'
                }, {
                    fName: 'Баттулга',
                    lName: 'Цогтгэрэл'
                }]
            }, {
                date: '2016-04-07',
                type: 'лаб',
                photo: 0,
                students: []
            }]
        }, {
            id: 1,
            name: 'Програмчлалын үндэс',
            number: '55',
            credit: '3',
            days: [{
                date: '2016-05-02',
                type: 'лекц',
                photo: 0,
                students: []
            }, {
                date: '2016-05-02',
                type: 'лаб',
                photo: 0,
                students: []
            }, {
                date: '2016-05-04',
                type: 'лаб',
                photo: 0,
                students: []
            }]
        }]
    };*/

    var face = [{
        faceId: "4e11e7b0-761d-444b-99f5-a430cf8a8b66",
        faceRectangle: {
            top:56.06944444444444,
            left:15.111111111111114,
            width:10.629629629629628,
            height:13.824845679012345
        },
        lname: "",
        studId: ""
    }, {
        faceId: "87ae1fdc-cb63-4e6e-a3c9-612ed917d41a",
        faceRectangle: {
            top:47.78417107583773,
            left:66.51851851851852,
            width:9.814814814814815,
            height:12.765101410934744
        },
        lname: "",
        studId: ""
    }, {
        faceId: "bb68f759-af3c-483c-abf9-1eec523c26c5",
        faceRectangle: {
            top:46.772597001763664,
            left:37.629629629629626,
            width:7.51851851851852,
            height:9.77854938271605
        },
        lname: "",
        studId: ""
    }, {
        faceId: "bb68f759-af3c-483c-abf9-1eec523c26c5",
        faceRectangle: {
            top:48.69940476190476,
            left:89.48148148148148,
            width:6.481481481481483,
            height:8.429783950617285
        },
        lname: "",
        studId: ""
    }, {
        faceId: "bb68f759-af3c-483c-abf9-1eec523c26c5",
        faceRectangle: {
            top:42.629960317460316,
            left:13.333333333333334,
            width:5.740740740740741,
            height:7.466380070546738
        },
        lname: "",
        studId: ""
    }, {
        faceId: "bb68f759-af3c-483c-abf9-1eec523c26c5",
        faceRectangle: {
            top:47.06161816578483,
            left:48.7037037037037,
            width:5.481481481481482,
            height:7.129188712522046
        },
        lname: "",
        studId: ""
    }];

    /** @ngInject */
    function ProfileController(send, $log) {
        var vm = this;
        vm.faces = face;
        vm.user = [];
        vm.lesson = [];
        vm.day = [];
        vm.attended = [];

        vm.getImage = function(day) {
            if (day.photo) return "http://localhost/images/" + day.photo;
            else return "https://www.royalacademy.org.uk/assets/placeholder-1e385d52942ef11d42405be4f7d0a30d.jpg";
        }
        send.request('/user/2', 'GET')
            .then(function(res) {
                vm.user = res;
                if (res.type === 'Teacher') vm.user.type = 1;
                else vm.user.type = 2;
                vm.tab = vm.user.type;
                if (vm.tab === 1) {
                    vm.lesson = vm.user.lessons[0];
                    vm.day = vm.user.lessons[0].days[0];
                } else {
                    vm.lesson = vm.user.lessons[0];
                }
            },function(err){});

        vm.post = {};
        vm.submit = function(day){
            $log.debug(day);
          send.request('/day/' + day.id, 'PUT', vm.post, true)
            .then(function(res) {
              $log.debug('1234 SUCCES')
            }, function(err) {
              $log.debug('errr', err)
            })
        }

    }

})();
