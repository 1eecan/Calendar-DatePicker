import calenderMaking from "./index.js";

const $containers = [...document.querySelectorAll(".calender-module")];

$containers.forEach(($container) => {
  calenderMaking($container);
});
