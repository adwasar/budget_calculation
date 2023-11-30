import { types } from 'mobx-state-tree';

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

const Record = types.model({
  date: types.optional(types.string, ''),
  balance: types.optional(types.number, 0),
});

const RecordsHistory = types
  .model({
    records: types.array(Record),
  })
  .actions((self) => {
    function addRecord(date, balance) {
      const existingRecordIndex = self.records.findIndex((record) => record.date === date);

      if (existingRecordIndex !== -1) {
        self.records[existingRecordIndex].balance = balance;
      } else {
        self.records.push(Record.create({ date, balance }));
        self.records = self.records.sort((a, b) => a.date.localeCompare(b.date));
      }
    }

    return { addRecord };
  });

const isLogin = Login.create({
  state: false,
});

const user = User.create({
  name: '',
});

const recordsHistory = RecordsHistory.create({
  records: [],
});

export { isLogin, recordsHistory, user };
