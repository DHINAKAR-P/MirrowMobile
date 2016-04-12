// install   :      cordova plugin add https://github.com/litehelpers/Cordova-sqlite-storage.git
// link      :      https://github.com/litehelpers/Cordova-sqlite-storage


  app.factory("surveyFactory",['$q', '$window', function ($q, $window) {

  var survey = {};
  survey.Questions = [];
  survey.question={};
  survey.QuestionOptions = {};
  
  var nextquestionId = 0;
  
    return {
	
	setQuestions:function (questions) {        
		survey.Questions = questions;        
      },
	  getQuestions:function () {        
        return survey.Questions;
      },
	  
	  setQuestionOptions:function (questionOptions) {        
		survey.QuestionOptions = questionOptions;        
      },
	  getQuestionOptions:function () {
        
        return survey.QuestionOptions;
      },

	  setQuestion:function (question) {        
		survey.question = question;        
      },
	  getQuestion:function () {
        
        return survey.question;
      },
	  setNextquestionId:function (questionId) {        
		nextquestionId = questionId;        
      },
	  getNextquestionId:function () {
        
        return nextquestionId;
      },
      execute: function (db, query, binding) {
        var q = $q.defer();
        db.transaction(function (tx) {
          tx.executeSql(query, binding, function (tx, result) {		  
              q.resolve(result);
			  //alert("any result in factory? for query  "+query+angular.toJson(result));
            },
            function (transaction, error) {
              q.reject(error);
			  console.log("error in factory"+angular.toJson(error));
            });
        });
        return q.promise;
      },
      deleteDB: function (dbName) {
        var q = $q.defer();

        $window.sqlitePlugin.deleteDatabase(dbName, function (success) {
          q.resolve(success);
        }, function (error) {
          q.reject(error);
        });

        return q.promise;
      }	  
    };
  }]);