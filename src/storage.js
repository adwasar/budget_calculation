import { types, getSnapshot } from 'mobx-state-tree';

const Login = types
  .model({
    state: types.optional(types.boolean, false),
  })
  .actions((self) => {
    function toggle() {
      self.state = !self.state;
    }

    function setTrue() {
      self.state = true;
    }

    function setFalse() {
      self.state = false;
    }

    return { toggle, setTrue, setFalse };
  });

const User = types
  .model({
    name: types.optional(types.string, ''),
  })
  .actions((self) => {
    function setName(newName) {
      self.name = newName;
    }

    return { setName };
  });

const Todo = types
  .model({
    name: types.optional(types.string, ''),
    done: types.optional(types.boolean, false),
  })
  .actions((self) => {
    function setName(newName) {
      self.name = newName;
    }

    function toggle() {
      self.done = !self.done;
    }

    return { setName, toggle };
  });

const RootStore = types
  .model({
    users: types.map(User),
    todos: types.optional(types.map(Todo), {}),
  })
  .actions((self) => {
    function addTodo(id, name) {
      self.todos.set(id, Todo.create({ name }));
    }

    function addUser(id, name) {
      self.users.set(id, User.create({ name }));
    }

    return { addTodo, addUser };
  });

const store = RootStore.create({
  users: {}, // users is required here because it's not marked as optional
});

const isLogin = Login.create({
  state: false,
});

const user = User.create({
  name: '',
});

export { isLogin, store, user };
