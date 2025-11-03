
// Notion 스타일 캘린더 동작 구현
const calendarBody = document.getElementById('calendarBody');
const monthYear = document.getElementById('monthYear');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

function renderCalendar(month, year) {
	const firstDay = new Date(year, month, 1);
	const lastDay = new Date(year, month + 1, 0);
	const startDay = firstDay.getDay();
	const daysInMonth = lastDay.getDate();

	let html = '';
	let date = 1;
	for (let i = 0; i < 6; i++) { // 최대 6주
		html += '<tr>';
		for (let j = 0; j < 7; j++) {
			if (i === 0 && j < startDay) {
				html += '<td></td>';
			} else if (date > daysInMonth) {
				html += '<td></td>';
			} else {
				const isToday =
					date === today.getDate() &&
					month === today.getMonth() &&
					year === today.getFullYear();
				html += `<td class="${isToday ? 'today' : ''}">${date}</td>`;
				date++;
			}
		}
		html += '</tr>';
		if (date > daysInMonth) break;
	}
	calendarBody.innerHTML = html;
	monthYear.textContent = `${year}년 ${month + 1}월`;
}

prevMonthBtn.addEventListener('click', () => {
	currentMonth--;
	if (currentMonth < 0) {
		currentMonth = 11;
		currentYear--;
	}
	renderCalendar(currentMonth, currentYear);
});

nextMonthBtn.addEventListener('click', () => {
	currentMonth++;
	if (currentMonth > 11) {
		currentMonth = 0;
		currentYear++;
	}
	renderCalendar(currentMonth, currentYear);
});

// 최초 렌더링
renderCalendar(currentMonth, currentYear);