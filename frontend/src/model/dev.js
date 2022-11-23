const suffix = " ⇒";
const dev = function dev() {};

Object.assign(
  dev,
  Object.fromEntries(
    Object.entries(console).map(([key, value]) => [
      key,
      key === "memory"
        ? value
        : value.bind(console, `%c [DEV]${suffix}`, "color: #bada55"),
    ])
  )
);

export default dev;
