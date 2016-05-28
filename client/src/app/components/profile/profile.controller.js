(function() {
    'use strict';

    angular
        .module('client')
        .controller('ProfileController', ProfileController);

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
    };

    var face = [{
        faceId: "4e11e7b0-761d-444b-99f5-a430cf8a8b66",
        faceRectangle: {
            width: 201,
            height: 201,
            left: 551,
            top: 166
        },
        lname: "",
        studId: ""
    }, {
        faceId: "87ae1fdc-cb63-4e6e-a3c9-612ed917d41a",
        faceRectangle: {
            width: 186,
            height: 186,
            left: 169,
            top: 186
        },
        lname: "",
        studId: ""
    }, {
        faceId: "bb68f759-af3c-483c-abf9-1eec523c26c5",
        faceRectangle: {
            width: 125,
            height: 125,
            left: 416,
            top: 353
        },
        lname: "",
        studId: ""
    }];

    /** @ngInject */
    function ProfileController(send, $log) {
        var vm = this;
        vm.user = tea;
        vm.tab = vm.user.type;
        vm.faces = face;
        if (vm.tab === 1) {
            vm.lesson = vm.user.lessons[0];
            vm.day = vm.user.lessons[0].days[0];
        } else {
            vm.lesson = vm.user.lessons[0];
        }
    }


})();
