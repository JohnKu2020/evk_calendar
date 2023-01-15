/*!
 * evk_calendar_jk.js 1.0.0
 * https://github.com/JohnKu2020/evk_calendar
 *
 * Released under the MIT
 * https://github.com/JohnKu2020/evk_calendar/blob/main/LICENSE
 */
(function($) {
	$.fn.evkJKcalendar = function (options) {
		'use strict';
		return $(this).each(function () {
			var defaults = { lang: 'ru', width: '100%', backgroundcolor: 'transparent', color: '#000000'},
			activeOptions = $.extend(defaults, options),
			self = this,
			element = $(this),
			element_id = element.attr("id"),
			element_class = 'evk_calendar',
			CurrentDay = new Date().getDate(),
			CurrentMonth = new Date().getMonth(),
			CurrentYear = new Date().getFullYear(),
			Today = new Date().getDate(),
			DaysHeader='',
			LastRow='',
			tr_count = 0,
			lang = '',
			calendar = '',
			empty_day = '<td>&nbsp;</td>',
			initElement = function (show_month = CurrentMonth, show_year = CurrentYear) {
				if (activeOptions['lang'] === undefined || activeOptions['lang'] === null) { var strings = new Object(); if(navigator.browserLanguage){ lang = navigator.browserLanguage; } else { lang = navigator.language; }; lang = lang.substr(0,2).toLowerCase(); if (lang === undefined || lang === null) lang = 'ru'; } else { lang = activeOptions['lang']; }
				if(lang=='ru'){ var nmonth=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"], nday=["Пн","Вт","Ср","Чт","Пт","Сб","Вс"]; } else { var nmonth=["January","February","March","April","May","June","July","August","September","October","November","December"], nday=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]; }
				var Dlast = new Date(show_year,show_month+1,0).getDate(), D = new Date(show_year,show_month,Dlast), DNlast = new Date(D.getFullYear(),D.getMonth(),Dlast).getDay(), DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay(), curr_cls='';
				calendar = '<tr>'; tr_count = 0; LastRow = '';
				if (DNfirst != 0) { for(var i = 1; i < DNfirst; i++) calendar += empty_day; } else { for(var i = 0; i < 6; i++) calendar += empty_day; }
				for (var i = 1; i <= Dlast; i++) {
					if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) { curr_cls = 'сToday'; } else { curr_cls = 'cDay'; }
					calendar += '<td class="'+curr_cls+'" data-id="'+  format_event_date(CurrentYear, CurrentMonth, i) + '">' + i +'</td>';
					if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 0) { calendar += '<tr>'; tr_count++; }
				}
				for (var i = DNlast; i < 7; i++) calendar += empty_day;
				DaysHeader = ''; for(var i = 0; i < 7; i++) DaysHeader += '<td>'+nday[i]+'</td>';
				LastRow = ''; if (tr_count < 6) { for (var i = 1; i < 7; i++) LastRow +=empty_day;  LastRow = '<tr>'+LastRow+'</tr>'; }
				element.html('<table class="'+element_class+'" style="background-color:'+activeOptions.backgroundcolor+';color:'+activeOptions.color+';width:'+activeOptions.width+'">'
								+'<thead><tr><td class="m_Prev">‹</td><td colspan="5" data-month="'+D.getMonth()+1+'" data-year="'+D.getFullYear()+'">'+nmonth[D.getMonth()] +' '+ D.getFullYear()+'</td><td class="m_Next">›</td></tr></thead>'
								+'<tbody><tr>'+DaysHeader+'</tr>'+calendar+LastRow+'</tbody></table>');
				element.css('cursor', 'pointer');
			},
			format_event_date = function (iyear, imonth, iday) {
				var Dlast = new Date(CurrentYear,CurrentMonth+1,0).getDate(), D = new Date(CurrentYear,CurrentMonth,Dlast), d_month = D.getMonth()+1;
				return D.getFullYear()+'-'+d_month.toString().padStart(2, "0")+'-'+iday.toString().padStart(2, "0");
			}
			initElement();
			element.on('click', '.m_Prev', function (e) {
				if (e.which!=1) return false; e.preventDefault();
				CurrentMonth--; if (CurrentMonth<0) { CurrentMonth=11; CurrentYear--; }
				initElement(CurrentMonth, CurrentYear);
				var evt = $.Event('month_prev'); element.trigger(evt, format_event_date(CurrentYear, CurrentMonth+1, 1));
			});
			element.on('click', '.m_Next', function (e) {
				if (e.which!=1) return false; e.preventDefault();
				CurrentMonth++; if (CurrentMonth>12) { CurrentMonth=1; CurrentYear++; }
				initElement(CurrentMonth, CurrentYear);
				var evt = $.Event('month_next'); element.trigger(evt, format_event_date(CurrentYear, CurrentMonth+1, 1));
			});
			element.on('click', '.cDay, .сToday', function (e) {
				e.preventDefault();
				if (e.which!=1) return false;
				var ClickDay=$(e.target).attr('data-id');
				element.find('td.cDay, td.сToday').removeClass('selected');$(this).addClass('selected');
				if (ClickDay!=CurrentDay) CurrentDay=ClickDay;
				var evt = $.Event('change'); element.trigger(evt, ClickDay);
			});
		});
	}
})(jQuery);