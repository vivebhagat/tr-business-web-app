export const getBaseUrl = (): string => {
  const protocol = window.location.protocol;
  const host = window.location.host;
  //return "https://localhost:7184";
  //return `${protocol}//${host}`;
 // return "http://api-bizportal.trilineas.com"
    return "http://api.bizportal.rechorderp.com"
};