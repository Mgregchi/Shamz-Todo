import Icons from "react-native-vector-icons/MaterialCommunityIcons";

const defaultIcons = {
  add: "add",
  plus: "plus",
  close: "close",
  delete: "delete",
  "arrow-left": "arrow-left",
  "chevron-left": "chevron-left",
  "chevron-right": "chevron-right",
  "checkbox-marked-circle": "checkbox-marked-circle",
  "checkbox-blank-circle": "checkbox-blank-circle",
  "check-circle": "check-circle",
  "clock-outline": "clock-outline",
  "content-save-check": "content-save-check",
  pencil: "pencil",
  "format-list-checkbox": "format-list-checkbox",
};

const DefaultIcon = (props) => {
  const { name, size, color } = props;
  if (typeof name === "string" && defaultIcons[name]) {
    return <Icons name={defaultIcons[name]} size={size} color={color} />;
  }
  return null;
};

export default DefaultIcon;
