import { UnEscapedText } from "../models";

export const saveFormated = (data: UnEscapedText) => {
  localStorage.setItem(`history-${data.date}`, data.value);
};

export const loadAllFormated = (): UnEscapedText[] => {
  const keys = Object.keys(localStorage).filter((key) =>
    key.startsWith("history-")
  );
  return keys.map((key) => ({
    date: key.replace("history-", ""),
    value: localStorage.getItem(key) || "",
  }));
};

export const removeHistory = () => {
  const keys = Object.keys(localStorage).filter((key) =>
    key.startsWith("history-")
  );
  keys.forEach((key) => {
    localStorage.removeItem(key);
  });
};
