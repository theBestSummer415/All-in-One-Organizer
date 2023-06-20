"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatTime(date, dateSignTemp, timeSignTemp) {
    var dateSign = dateSignTemp ? dateSignTemp : "/";
    var timeSign = timeSignTemp ? timeSignTemp : ":";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return [year, month, day].map(formatNumber).join(dateSign) + ' ' + [hour, minute, second].map(formatNumber).join(timeSign);
}
exports.formatTime = formatTime;
function randomNumber() {
    return Math.round(Math.random() * 10000) + new Date().getTime() + "";
}
exports.randomNumber = randomNumber;
function copy(target, obj, defaults) {
    if (defaults) {
        copy(target, defaults);
    }
    if (target && obj && typeof obj === "object") {
        var i = void 0;
        for (i in target) {
            target[i] = obj[i];
        }
        for (i in obj) {
            target[i] = obj[i];
        }
    }
    return target;
}
exports.copy = copy;
function arrayRemove(array, removeEl) {
    if (array == null || removeEl == null) {
        return;
    }
    if (Array.isArray(removeEl)) {
        for (var j = 0, jlen = removeEl.length; j < jlen; j++) {
            for (var i = 0, ilen = array.length; i < ilen; i++) {
                if (array[i] === removeEl[j]) {
                    array.splice(i, 1);
                    break;
                }
            }
        }
    }
    else {
        for (var i = 0, len = array.length; i < len; i++) {
            if (array[i] === removeEl) {
                array.splice(i, 1);
                return;
            }
        }
    }
}
exports.arrayRemove = arrayRemove;
var formatNumber = function (n) {
    var str = n.toString();
    return str[1] ? str : '0' + str;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxTQUFnQixVQUFVLENBQUMsSUFBVSxFQUFFLFlBQXFCLEVBQUUsWUFBcUI7SUFDakYsSUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQTtJQUNsRCxJQUFNLFFBQVEsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFBO0lBQ2xELElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUMvQixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQ2pDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUMxQixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7SUFDNUIsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQ2hDLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUVoQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUM1SCxDQUFDO0FBWEQsZ0NBV0M7QUFLRCxTQUFnQixZQUFZO0lBQzFCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUM7QUFDdkUsQ0FBQztBQUZELG9DQUVDO0FBU0QsU0FBZ0IsSUFBSSxDQUFDLE1BQVcsRUFBRSxHQUFRLEVBQUUsUUFBYztJQUN4RCxJQUFJLFFBQVEsRUFBRTtRQUNaLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDeEI7SUFDRCxJQUFJLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO1FBQzVDLElBQUksQ0FBQyxTQUFLLENBQUM7UUFDWCxLQUFLLENBQUMsSUFBSSxNQUFNLEVBQUU7WUFDaEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwQjtRQUNELEtBQUssQ0FBQyxJQUFJLEdBQUcsRUFBRTtZQUNiLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEI7S0FDRjtJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFkRCxvQkFjQztBQU9ELFNBQWdCLFdBQVcsQ0FBQyxLQUFZLEVBQUUsUUFBYTtJQUNyRCxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksUUFBUSxJQUFJLElBQUksRUFBRTtRQUNyQyxPQUFPO0tBQ1I7SUFDRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDM0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNyRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNsRCxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQzVCLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNuQixNQUFNO2lCQUNQO2FBQ0Y7U0FDRjtLQUNGO1NBQU07UUFDTCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2hELElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRTtnQkFDekIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLE9BQU87YUFDUjtTQUNGO0tBQ0Y7QUFDSCxDQUFDO0FBckJELGtDQXFCQztBQUVELElBQU0sWUFBWSxHQUFHLFVBQUMsQ0FBUztJQUM3QixJQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUE7SUFDeEIsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTtBQUNqQyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIOagvOW8j+WMluaXpeacn1xuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0VGltZShkYXRlOiBEYXRlLCBkYXRlU2lnblRlbXA/OiBzdHJpbmcsIHRpbWVTaWduVGVtcD86IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IGRhdGVTaWduID0gZGF0ZVNpZ25UZW1wID8gZGF0ZVNpZ25UZW1wIDogXCIvXCJcbiAgY29uc3QgdGltZVNpZ24gPSB0aW1lU2lnblRlbXAgPyB0aW1lU2lnblRlbXAgOiBcIjpcIlxuICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpXG4gIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMVxuICBjb25zdCBkYXkgPSBkYXRlLmdldERhdGUoKVxuICBjb25zdCBob3VyID0gZGF0ZS5nZXRIb3VycygpXG4gIGNvbnN0IG1pbnV0ZSA9IGRhdGUuZ2V0TWludXRlcygpXG4gIGNvbnN0IHNlY29uZCA9IGRhdGUuZ2V0U2Vjb25kcygpXG5cbiAgcmV0dXJuIFt5ZWFyLCBtb250aCwgZGF5XS5tYXAoZm9ybWF0TnVtYmVyKS5qb2luKGRhdGVTaWduKSArICcgJyArIFtob3VyLCBtaW51dGUsIHNlY29uZF0ubWFwKGZvcm1hdE51bWJlcikuam9pbih0aW1lU2lnbilcbn1cblxuLyoqXG4gKiDpmo/mnLrmlbBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbU51bWJlcigpIHtcbiAgcmV0dXJuIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDEwMDAwKSArIG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgXCJcIjtcbn1cblxuLyoqXG4gKiDlpI3liLblr7nosaHvvIzlsIZvYmrkuK3lr7nlupTlgLzotYvkuoh0YXJnZXRcbiAqIEBwYXJhbSB0YXJnZXQg55uu5qCHXG4gKiBAcGFyYW0gb2JqIOimgeWkjeWItueahOWAvFxuICogQHBhcmFtIGRlZmF1bHRzIOm7mOiupOWAvOWvueixoVxuICogQHJldHVybnMge2FueX0g5aSN5Yi25ZCO55qE5a+56LGhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb3B5KHRhcmdldDogYW55LCBvYmo6IGFueSwgZGVmYXVsdHM/OiBhbnkpIHtcbiAgaWYgKGRlZmF1bHRzKSB7XG4gICAgY29weSh0YXJnZXQsIGRlZmF1bHRzKTtcbiAgfVxuICBpZiAodGFyZ2V0ICYmIG9iaiAmJiB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiKSB7XG4gICAgbGV0IGk6IGFueTtcbiAgICBmb3IgKGkgaW4gdGFyZ2V0KSB7XG4gICAgICB0YXJnZXRbaV0gPSBvYmpbaV07XG4gICAgfVxuICAgIGZvciAoaSBpbiBvYmopIHtcbiAgICAgIHRhcmdldFtpXSA9IG9ialtpXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuLyoqXG4gKiDliKDpmaTmlbDnu4TkuK3vvIzmjIflrprnmoTlr7nosaFcbiAqIEBwYXJhbSBhcnJheSDmlbDnu4RcbiAqIEBwYXJhbSByZW1vdmVFbCDmjIflrprlr7nosaFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFycmF5UmVtb3ZlKGFycmF5OiBhbnlbXSwgcmVtb3ZlRWw6IGFueSkge1xuICBpZiAoYXJyYXkgPT0gbnVsbCB8fCByZW1vdmVFbCA9PSBudWxsKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChBcnJheS5pc0FycmF5KHJlbW92ZUVsKSkge1xuICAgIGZvciAobGV0IGogPSAwLCBqbGVuID0gcmVtb3ZlRWwubGVuZ3RoOyBqIDwgamxlbjsgaisrKSB7XG4gICAgICBmb3IgKGxldCBpID0gMCwgaWxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGlsZW47IGkrKykge1xuICAgICAgICBpZiAoYXJyYXlbaV0gPT09IHJlbW92ZUVsW2pdKSB7XG4gICAgICAgICAgYXJyYXkuc3BsaWNlKGksIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhcnJheS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgaWYgKGFycmF5W2ldID09PSByZW1vdmVFbCkge1xuICAgICAgICBhcnJheS5zcGxpY2UoaSwgMSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuY29uc3QgZm9ybWF0TnVtYmVyID0gKG46IG51bWJlcikgPT4ge1xuICBjb25zdCBzdHIgPSBuLnRvU3RyaW5nKClcbiAgcmV0dXJuIHN0clsxXSA/IHN0ciA6ICcwJyArIHN0clxufVxuIl19