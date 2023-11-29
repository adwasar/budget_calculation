import { types, getSnapshot } from 'mobx-state-tree';

const Login = types
  .model({
    state: types.optional(types.boolean, false),
  })
  .actions((self) => {
    function toggle() {
      self.state = !self.state;
    }

    return { toggle };
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

const User = types
  .model({
    name: types.optional(types.string, ''),
    age: types.optional(types.number, 20),
  })
  .actions((self) => {
    function setName(newName) {
      self.name = newName;
    }

    function addYear() {
      self.age++;
    }

    return { setName, addYear };
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

store.addTodo(1, 'Eat a cake');
store.addTodo(2, 'Drink cola');
store.addUser(1, 'Vlad');
store.addUser(2, 'Sasha');
store.todos.get(1).toggle();
store.users.get(1).setName('Dima');

export { isLogin, store };
