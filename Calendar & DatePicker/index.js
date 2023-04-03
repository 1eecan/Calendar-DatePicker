const calenderMaking = ($container) => {
  $container.insertAdjacentHTML(
    "beforeend",
    '<button class="date-picker">select date</button>'
  );
  $container.insertAdjacentHTML(
    "beforeend",
    '<div class="calender" style="display: none"></div>'
  );
  $container
    .querySelector(".calender")
    .insertAdjacentHTML("beforeend", '<div class="calender-nav"></div>');
  $container
    .querySelector(".calender")
    .insertAdjacentHTML("beforeend", '<div class="calender-grid"></div>');
  $container
    .querySelector(".calender-nav")
    .insertAdjacentHTML("beforeend", '<button class="left"></button>');
  $container
    .querySelector(".calender-nav")
    .insertAdjacentHTML("beforeend", '<div class="year-month"></div>');
  $container
    .querySelector(".calender-nav")
    .insertAdjacentHTML("beforeend", '<button class="right"></button>');
  $container
    .querySelector(".year-month")
    .insertAdjacentHTML("beforeend", '<div class="month">month</div>');
  $container
    .querySelector(".year-month")
    .insertAdjacentHTML("beforeend", '<div class="year">year</div>');
  $container
    .querySelector(".calender-grid")
    .insertAdjacentHTML("beforeend", '<div class="date"></div>');

  let now = new Date();
  let now_year = now.getFullYear();
  let now_month = now.getMonth() + 1;
  let now_date = now.getDate();
  let now_day = now.getDay();

  let thisMonthLastDay = new Date(now_year, now_month, 0);
  let thisMonthLastDayDay = thisMonthLastDay.getDay();
  let thisMonthLastDayDate = thisMonthLastDay.getDate();
  //달력 클릭시 날짜 저장 변수
  let save_point = new Date(
    thisMonthLastDay.getFullYear(),
    thisMonthLastDay.getMonth() + 1,
    thisMonthLastDayDate
  );
  let circle_save_point = -1;
  //오늘의 날짜
  const today = new Date();
  //처음에 달력 밀리는 현상 방지용 변수
  let count = 0;
  //좌 우 클릭시 동그라미 사라지는 현상 방지용 변수
  let count2 = 0;
  //달력 토글하기
  const toggle_calender = $container.querySelector(".calender");
  $container.querySelector(".date-picker").onclick = function toggleCalender() {
    if (count == 0) {
      if (toggle_calender.style.display == "none") {
        toggle_calender.style.display = "block";
        while (calender_grid.firstChild) {
          calender_grid.removeChild(calender_grid.firstChild);
        }
        now_year = save_point.getFullYear();
        now_month = save_point.getMonth();
        now_date = save_point.getDate();
        fill_calender();
        if (circle_save_point != -1) {
          $container
            .querySelectorAll(".item")
            [circle_save_point].classList.add("fullcircle");
        }
      } else {
        toggle_calender.style.display = "none";
      }
    } else {
      if (toggle_calender.style.display == "none") {
        toggle_calender.style.display = "block";
        while (calender_grid.firstChild) {
          calender_grid.removeChild(calender_grid.firstChild);
        }
        now_year = save_point.getFullYear();
        now_month = save_point.getMonth() + 1;
        now_date = save_point.getDate();
        fill_calender();
        if (circle_save_point != -1) {
          $container
            .querySelectorAll(".item")
            [circle_save_point].classList.add("fullcircle");
        }
      } else {
        toggle_calender.style.display = "none";
      }
    }
    count2 = 0;
  };

  //마우스 클릭했을 때 콘솔창에 출력&날짜변수에 저장&동그라미표시
  const consoleDate = function () {
    const items = $container.querySelectorAll(".item");
    for (let i = 0; i < items.length; i++) {
      items[i].addEventListener("click", function () {
        for (let j = 0; j < items.length; j++) {
          items[j].classList.remove("fullcircle");
        }
        console.log(items[i].id);
        save_point = new Date(
          thisMonthLastDay.getFullYear(),
          thisMonthLastDay.getMonth(),
          thisMonthLastDayDate
        );
        circle_save_point = i;
        $container.querySelector(".date-picker").innerText = items[i].id;
        items[i].classList.add("fullcircle");
        toggle_calender.style.display = "none";
        count++;
      });
    }
  };

  // .calender-grid 채우는 부분
  const calender_grid = $container.querySelector(".date");
  const month_name = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day_name = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  let fill_calender = function () {
    thisMonthLastDay = new Date(now_year, now_month, 0);
    thisMonthLastDayDay = thisMonthLastDay.getDay();
    thisMonthLastDayDate = thisMonthLastDay.getDate();

    let prevMonthLastDay = new Date(now_year, now_month - 1, 0);
    let prevMonthLastDayDay = prevMonthLastDay.getDay();
    let prevMonthLastDayDate = prevMonthLastDay.getDate();

    let nextMonthLastDay = new Date(now_year, now_month + 1, 0);
    let nextMonthLastDayDate = nextMonthLastDay.getDate();

    for (let i = 0; i < 7; i++) {
      calender_grid.insertAdjacentHTML(
        "beforeend",
        `<div class='day'>${day_name[i]}</div>`
      );
    }

    for (let i = prevMonthLastDayDay; i >= 0; i--) {
      if (i == 6) break;
      calender_grid.insertAdjacentHTML(
        "beforeend",
        `<div class="item prev_month" id="${prevMonthLastDay.getFullYear()}--${(
          prevMonthLastDay.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}--${(prevMonthLastDayDate - i)
          .toString()
          .padStart(2, "0")}">${prevMonthLastDayDate - i}</div>`
      );
    }

    for (let i = 1; i <= thisMonthLastDayDate; i++) {
      if (
        thisMonthLastDay.getFullYear() == today.getFullYear() &&
        thisMonthLastDay.getMonth() == today.getMonth() &&
        i == today.getDate()
      ) {
        calender_grid.insertAdjacentHTML(
          "beforeend",
          `<div class="item this_month today" id="${thisMonthLastDay.getFullYear()}--${(
            thisMonthLastDay.getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}--${i.toString().padStart(2, "0")}">${i}</div>`
        );
        continue;
      }
      calender_grid.insertAdjacentHTML(
        "beforeend",
        `<div class="item this_month" id="${thisMonthLastDay.getFullYear()}--${(
          thisMonthLastDay.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}--${i.toString().padStart(2, "0")}">${i}</div>`
      );
    }

    for (let i = 1; i <= 6 - thisMonthLastDayDay; i++) {
      if (thisMonthLastDayDay == 6) break;
      calender_grid.insertAdjacentHTML(
        "beforeend",
        `<div class="item next_month" id="${nextMonthLastDay.getFullYear()}--${(
          nextMonthLastDay.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}--${i.toString().padStart(2, "0")}">${i}</div>`
      );
    }

    $container
      .querySelector(".calender-grid")
      .classList.toggle("week6", calender_grid.childElementCount == 49);

    $container.querySelector(
      ".year"
    ).innerText = `${thisMonthLastDay.getFullYear()}`;
    $container.querySelector(".month").innerText = `${
      month_name[thisMonthLastDay.getMonth()]
    }`;

    consoleDate();
  };

  fill_calender();
  //calender 안의 화살표로 달 바꾸는 부분
  $container.querySelector(".left").onclick = function prevMonth() {
    while (calender_grid.firstChild) {
      calender_grid.removeChild(calender_grid.firstChild);
    }
    now_month -= 1;
    fill_calender();
    --count2;
    if (count2 == 0) {
      $container
        .querySelectorAll(".item")
        [circle_save_point].classList.add("fullcircle");
    }
  };
  $container.querySelector(".right").onclick = function nextMonth() {
    while (calender_grid.firstChild) {
      calender_grid.removeChild(calender_grid.firstChild);
    }
    now_month += 1;
    fill_calender();
    ++count2;
    if (count2 == 0) {
      $container
        .querySelectorAll(".item")
        [circle_save_point].classList.add("fullcircle");
    }
  };
  // 캘린더 바깥 클릭하면 토글
  document.querySelector("body").addEventListener("click", function (e) {
    if (toggle_calender.style.display == "block") {
      if (
        e.target.className == "no-clickable" ||
        e.target.className == "title" ||
        e.target.className == "calender-module"
      ) {
        while (calender_grid.firstChild) {
          calender_grid.removeChild(calender_grid.firstChild);
        }
        now_year = save_point.getFullYear();
        now_month = save_point.getMonth();
        now_date = save_point.getDate();
        fill_calender();
        toggle_calender.style.display = "none";
      }
    }
  });
};
export default calenderMaking;
