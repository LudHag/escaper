export const formatJson = (jsonString: string): string => {
  const obj = JSON.parse(jsonString);
  const formattedJsonString = JSON.stringify(obj, null, 2);

  return formattedJsonString;
};
