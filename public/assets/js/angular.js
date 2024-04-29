const app = angular.module("todo-app", []);
app.controller("todo-controller", ($scope, $http) => {
  $scope.title = "ToDo App";
  $scope.taskName = "";
  $scope.taskList = [];

  $scope.addTask = () => {
    if (!$scope.taskName) {
      return alert("Digite o nome da tarefa: ");
    }
    $http
      .post("http://localhost:3333/api/tasks/", {
        name: $scope.taskName,
        checked: false,
      })
      .then(
        () => {
          $scope.loadTaskList();
        },
        () => {
          alert("Ops, aconteceu algum erro.");
        }
      );
  };

  $scope.deleteTask = (id) => {
    $http.delete("http://localhost:3333/api/tasks/" + id).then(() => {
      $scope.loadTaskList();
    });
  };

  $scope.updateTask = (id) => {
    const task = $scope.taskList.find((task) => task.id === id);
    $http.patch("http://localhost:3333/api/tasks/" + id, task).then(() => {
      $scope.taskList();
    });
  };

  $scope.loadTaskList = async () => {
    const { data } = await $http.get("http://localhost:3333/api/tasks");
    $scope.taskList = data;
    $scope.$apply();
  };

  $scope.loadTaskList();
});
