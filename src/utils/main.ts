export {};
// Add hovered class to selected list item
let list: NodeListOf<Element> = document.querySelectorAll(".navigation li");

function activeLink(this: HTMLElement) {
  list.forEach((item: Element) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item: Element) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle: HTMLElement | null = document.querySelector(".toggle");
let navigation: HTMLElement | null = document.querySelector(".navigation");
let main: HTMLElement | null = document.querySelector(".main");


if (toggle && navigation && main) {
    toggle.onclick = function () {
      if (navigation) {
        navigation.classList.toggle("active");
      }
      if (main) {
        main.classList.toggle("active");
      }
    };
  }
  

function time() {
  let today: Date = new Date();
  let weekday: string[] = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  let day: string = weekday[today.getDay()];
  let dd: number | string = today.getDate();
  let mm: number | string = today.getMonth() + 1;
  let yyyy: number = today.getFullYear();
  let h: number | string = today.getHours();
  let m: number | string = today.getMinutes();

  m = checkTime(m);
  let nowTime: string = h + " giờ " + m + " phút ";
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  let formattedDate: string = day + ', ' + dd + '/' + mm + '/' + yyyy;
  let tmp: string = '<span class="date"> ' + formattedDate + ' - ' + nowTime +
    '</span>';
  let clock: HTMLElement | null = document.getElementById("clock");
  if (clock) {
    clock.innerHTML = tmp;
  }
  setTimeout(time, 1000);
}

function checkTime(i: number | string): string {
  if (typeof i === 'number' && i < 10) {
    return "0" + i;
  }
  return String(i);
}

time(); // Call the time function to start the clock
