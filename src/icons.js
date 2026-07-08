async function getIconSrc(iconName) {
  const icon = await import(`./weather-icons/${iconName}.svg`);
  return icon.default;
}

export default getIconSrc;
