/**
 * Created by Henrikh on 1/20/16.
 */

app.controller('Profile', ['$scope', '$state', '$http', '$ionicPopup', 'RestURL', 'People_testId', 'Settings','surveyService','$rootScope',
    function ($scope, $state, $http, $ionicPopup, RestURL, People_testId, Settings,surveyService,$rootScope) {

    var self = $scope;

    //self.connectionMode = false;
    
    console.log('Profile');
    console.log(Settings.global);

    var chart = c3.generate({
        data: {
            columns: [
                ['canceled', 80],
                ['hired', 120]
            ],
            type: 'donut',
            colors: {
                canceled: '#f5f5f5',
                hired: '#387ef5'
            },
            onclick: function (d, i) {},
            onmouseover: function (d, i) {},
            onmouseout: function (d, i) {}
        },
        donut: {
            title: 'Job Success'
        }
    });

        $scope.SurveyCreate = function() { //SurveyWithQuestion.json
            //$http.get("surveyList.json").success(function (data){  
             //$http.get("SurveyWithQuestion.json").success(function (data){ 
           $http.get("http://45.55.156.148:8080/Mirrow/Survey_Default_Activity/get_all_Survey").success(function (data){ 
            console.log("----data---"+angular.toJson(data));
            if($rootScope.connectionMode == false)  {
            $rootScope.connectionMode = true;
            console.log("----deletelist=====+"+angular.toJson(data.delete)) ;
                for (var i=0; i<= data.create.length - 1;i++) {
            //    for (var i = self.jsonfile.createList.length - 1; i >= 0; i--) {                   
                    surveyService.insertSurvey(data.create[i].id,data.create[i].survey_name,data.create[i].survey_description,data.create[i].survey_notes,data.create[i].client_name,data.create[i].client_id,data.create[i].store_id,data.create[i].product_name,data.create[i].product_id,data.create[i].country_name,data.create[i].country_id);
                    //console.log("----question"+data.create[i].question);

                    console.log("----question--Ilength--"+data.create[i].question.length +'---i--'+i);
                    for(var j=0; j<= data.create[i].question.length - 1;j++){

surveyService.insertQuestion(data.create[i].question[j].id,data.create[i].question[j].the_question,data.create[i].question[j].display_type,data.create[i].question[j].answer_id,data.create[i].question[j].order_in_survey,data.create[i].question[j].group_name,data.create[i].question[j].group_id,data.create[i].question[j].rank_importance,data.create[i].question[j].created_by,
          data.create[i].question[j].created_date,data.create[i].question[j].updated_by,data.create[i].question[j].updated_date,data.create[i].question[j].survey_id );

                        for (var k = 0; k< data.create[i].question[j].option.length; k++) {                           
                           surveyService.insertOption(data.create[i].question[j].option[k].id,data.create[i].question[j].option[k].question_id,data.create[i].question[j].option[k].answer,data.create[i].question[j].option[k].answer_image,data.create[i].question[j].option[k].answer_type);
                           console.log("----option--"+data.create[i].question[j].option[k].answer_type);
                        }
            }
            }

            /*for(var i=0;i<= data.create.question.length - 1;i++){
                console.log("----question"+data.create.question[i].the_question);
            }*/
        }

        });
};



}]);