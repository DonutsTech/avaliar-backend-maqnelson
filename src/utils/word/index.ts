export function deletAccents(str: string) {
  if (!str || typeof str !== "string") {
    return "";
  }
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
