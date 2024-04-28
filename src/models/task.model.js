export class TaskModel {
  id;
  checked;
  name;
  static lastId;

  constructor({ id, name, checked }) {
    if (id) {
      if (id > TaskModel.lastId) {
        TaskModel.lastId = id;
      }
      this.id = id;
    } else {
      if (!TaskModel.lastId) {
        TaskModel.lastId = 0;
      }
      this.setId(TaskModel.lastId);
    }
    this.name = name;
    this.checked = checked;
  }

  getName() {
    return this.name;
  }
  setName(name) {
    this.name = name;
  }

  getId() {
    return this.id;
  }
  setId(id) {
    this.id = id;
  }

  getChecked() {
    return this.checked;
  }
  setChecked(checked) {
    this.checked = checked;
  }
}
