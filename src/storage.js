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

    function deleteRecord(date) {
      self.records = self.records.filter((el) => el.date !== date);
    }

    return { addRecord, deleteRecord };
  });

const Coefficient = types
  .model({
    value: types.optional(types.number, 1),
  })
  .actions((self) => {
    function setValue(newValue) {
      self.value = newValue;
    }

    return { setValue };
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

const coefficient = Coefficient.create({
  value: 1,
});

export { isLogin, recordsHistory, user, coefficient };
