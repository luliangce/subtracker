import {
  Button,
  Cell,
  CellGroup,
  Checkbox,
  DatetimePicker,
  Dialog,
  Empty,
  Field,
  Form,
  Picker,
  Popup,
  Radio,
  RadioGroup,
  SwipeCell,
  Tag,
} from "vant";
import { App } from "vue";
export const registerVant = (app: App) => {
  app.use(Button);
  app.use(Checkbox);
  app.use(Cell);
  app.use(CellGroup);
  app.use(DatetimePicker);
  app.use(Dialog);
  app.use(Empty);
  app.use(Field);
  app.use(Form);
  app.use(Picker);
  app.use(Popup);
  app.use(RadioGroup);
  app.use(Radio);
  app.use(SwipeCell);
  app.use(Tag);
  return app;
};
