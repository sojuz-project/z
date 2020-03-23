<template>
  <div
    class="vdpComponent"
    v-bind:class="{vdpWithInput: hasInputElement}"
  >
    <input
      v-if="hasInputElement"
      type="text"
      v-bind="inputAttributes"
      v-bind:readonly="isReadOnly"
      v-bind:value="inputValue"
      v-on:input="editable && processUserInput($event.target.value)"
      v-on:focus="editable && open()"
      v-on:click="editable && open()"
      :required="required"
    >
    <button
      v-if="editable && hasInputElement && inputValue"
      class="vdpClearInput"
      type="button"
      v-on:click="clear"
    ></button>
    <transition name="vdp-toggle-calendar">
      <div
        v-if="opened"
        class="vdpOuterWrap"
        ref="outerWrap"
        v-on:click="closeViaOverlay"
        v-bind:class="[positionClass, {vdpFloating: hasInputElement}]"
      >
        <div class="vdpInnerWrap">
          <header class="vdpHeader">
            <button
              class="vdpArrow vdpArrowPrev"
              v-bind:title="prevMonthCaption"
              type="button"
              v-on:click="incrementMonth(-1)"
            >{{ prevMonthCaption }}</button>
            <button
              class="vdpArrow vdpArrowNext"
              type="button"
              v-bind:title="nextMonthCaption"
              v-on:click="incrementMonth(1)"
            >{{ nextMonthCaption }}</button>
            <div class="vdpPeriodControls">
              <div class="vdpPeriodControl">
                <button
                  v-bind:class="directionClass"
                  v-bind:key="currentPeriod.month"
                  type="button"
                >
                  {{ months[currentPeriod.month] }}
                </button>
                <select v-model="currentPeriod.month">
                  <option
                    v-for="(month, index) in months"
                    v-bind:value="index"
                    v-bind:key="month"
                  >
                    {{ month }}
                  </option>
                </select>
              </div>
              <div class="vdpPeriodControl">
                <button
                  v-bind:class="directionClass"
                  v-bind:key="currentPeriod.year"
                  type="button"
                >
                  {{ currentPeriod.year }}
                </button>
                <select v-model="currentPeriod.year">
                  <option
                    v-for="year in yearRange"
                    v-bind:value="year"
                    v-bind:key="year"
                  >
                    {{ year }}
                  </option>
                </select>
              </div>
            </div>
          </header>
          <table class="vdpTable">
            <thead>
              <tr>
                <th
                  class="vdpHeadCell"
                  v-for="weekday in weekdaysSorted"
                  v-bind:key="weekday"
                >
                  <span class="vdpHeadCellContent">{{weekday}}</span>
                </th>
              </tr>
            </thead>
            <tbody
              v-bind:key="currentPeriod.year + '-' + currentPeriod.month"
              v-bind:class="directionClass"
            >
              <tr
                class="vdpRow"
                v-for="(week, weekIndex) in currentPeriodDates"
                v-bind:key="weekIndex"
              >
                <td
                  class="vdpCell"
                  v-for="item in week"
                  v-bind:class="{
                                        selectable: !item.disabled,
                                        selected: item.selected,
                                        disabled: item.disabled,
                                        today: item.today,
                                        outOfRange: item.outOfRange
                                    }"
                  v-bind:data-id="item.dateKey"
                  v-bind:key="item.dateKey"
                  v-on:click="selectDateItem(item)"
                >
                  <div class="vdpCellContent">{{ item.date.getDate() }}</div>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            v-if="pickTime && currentTime"
            class="vdpTimeControls"
          >
            <span class="vdpTimeCaption">{{ setTimeCaption }}</span>
            <div class="vdpTimeUnit">
              <pre><span>{{ currentTime.hoursPadded }}</span><br></pre>
              <input
                type="number"
                pattern="\d*"
                class="vdpHoursInput"
                v-on:input.prevent="inputTime('setHours', $event)"
                v-bind:value="currentTime.hoursPadded"
              >
            </div>
            <span
              v-if="pickMinutes"
              class="vdpTimeSeparator"
            >:</span>
            <div
              v-if="pickMinutes"
              class="vdpTimeUnit"
            >
              <pre><span>{{ currentTime.minutesPadded }}</span><br></pre>
              <input
                v-if="pickMinutes"
                type="number"
                pattern="\d*"
                class="vdpMinutesInput"
                v-on:input="inputTime('setMinutes', $event)"
                v-bind:value="currentTime.minutesPadded"
              >
            </div>
            <span
              v-if="pickSeconds"
              class="vdpTimeSeparator"
            >:</span>
            <div
              v-if="pickSeconds"
              class="vdpTimeUnit"
            >
              <pre><span>{{ currentTime.secondsPadded }}</span><br></pre>
              <input
                v-if="pickSeconds"
                type="number"
                pattern="\d*"
                class="vdpSecondsInput"
                v-on:input="inputTime('setSeconds', $event)"
                v-bind:value="currentTime.secondsPadded"
              >
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// https://github.com/dbrekalo/vue-date-pick
const formatRE = /,|\.|-| |:|\/|\\/;
const dayRE = /D+/;
const monthRE = /M+/;
const yearRE = /Y+/;
const hoursRE = /h+/i;
const minutesRE = /m+/;
const secondsRE = /s+/;
function paddNum(num, padsize) {
  return typeof num !== "undefined"
    ? num.toString().length > padsize
      ? num
      : new Array(padsize - num.toString().length + 1).join("0") + num
    : undefined;
}
function chunkArray(inputArray, chunkSize) {
  const results = [];
  while (inputArray.length) {
    results.push(inputArray.splice(0, chunkSize));
  }
  return results;
}
function areSameDates(date1, date2) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}
export default {
  props: {
    required: { type: Boolean, default: false },
    value: { type: String, default: "" },
    format: { type: String, default: "YYYY-MM-DD" },
    displayFormat: { type: String },
    editable: { type: Boolean, default: true },
    hasInputElement: { type: Boolean, default: true },
    inputAttributes: { type: Object },
    selectableYearRange: { type: Number, default: 40 },
    parseDate: { type: Function },
    formatDate: { type: Function },
    pickTime: { type: Boolean, default: false },
    pickMinutes: { type: Boolean, default: true },
    pickSeconds: { type: Boolean, default: false },
    isDateDisabled: { type: Function, default: () => false },
    nextMonthCaption: { type: String, default: "Next month" },
    prevMonthCaption: { type: String, default: "Previous month" },
    setTimeCaption: { type: String, default: "Set time:" },
    mobileBreakpointWidth: { type: Number, default: 500 },
    weekdays: {
      type: Array,
      default: () => ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    months: {
      type: Array,
      default: () => [
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
        "December"
      ]
    },
    startWeekOnSunday: { type: Boolean, default: false }
  },
  data() {
    return {
      inputValue: this.valueToInputFormat(this.value),
      currentPeriod: this.getPeriodFromValue(this.value, this.format),
      direction: undefined,
      positionClass: undefined,
      opened: !this.hasInputElement
    };
  },
  computed: {
    valueDate() {
      const value = this.value;
      const format = this.format;
      return value ? this.parseDateString(value, format) : undefined;
    },
    isReadOnly() {
      return (
        !this.editable ||
        (this.inputAttributes && this.inputAttributes.readonly)
      );
    },
    isValidValue() {
      const valueDate = this.valueDate;
      return this.value ? Boolean(valueDate) : true;
    },
    currentPeriodDates() {
      const { year, month } = this.currentPeriod;
      const days = [];
      const date = new Date(year, month, 1);
      const today = new Date();
      const offset = this.startWeekOnSunday ? 1 : 0;
      // append prev month dates
      const startDay = date.getDay() || 7;
      if (startDay > 1 - offset) {
        for (let i = startDay - (2 - offset); i >= 0; i--) {
          const prevDate = new Date(date);
          prevDate.setDate(-i);
          days.push({ outOfRange: true, date: prevDate });
        }
      }
      while (date.getMonth() === month) {
        days.push({ date: new Date(date) });
        date.setDate(date.getDate() + 1);
      }
      // append next month dates
      const daysLeft = 7 - (days.length % 7);
      for (let i = 1; i <= daysLeft; i++) {
        const nextDate = new Date(date);
        nextDate.setDate(i);
        days.push({ outOfRange: true, date: nextDate });
      }
      // define day states
      days.forEach(day => {
        day.disabled = this.isDateDisabled(day.date);
        day.today = areSameDates(day.date, today);
        day.dateKey = [
          day.date.getFullYear(),
          day.date.getMonth() + 1,
          day.date.getDate()
        ].join("-");
        day.selected = this.valueDate
          ? areSameDates(day.date, this.valueDate)
          : false;
      });
      return chunkArray(days, 7);
    },
    yearRange() {
      const years = [];
      const currentYear = this.currentPeriod.year;
      const startYear = currentYear - this.selectableYearRange;
      const endYear = currentYear + this.selectableYearRange;
      for (let i = startYear; i <= endYear; i++) {
        years.push(i);
      }
      return years;
    },
    currentTime() {
      const currentDate = this.valueDate;
      return currentDate
        ? {
            hours: currentDate.getHours(),
            minutes: currentDate.getMinutes(),
            seconds: currentDate.getSeconds(),
            hoursPadded: paddNum(currentDate.getHours(), 1),
            minutesPadded: paddNum(currentDate.getMinutes(), 2),
            secondsPadded: paddNum(currentDate.getSeconds(), 2)
          }
        : undefined;
    },
    directionClass() {
      return this.direction ? `vdp${this.direction}Direction` : undefined;
    },
    weekdaysSorted() {
      if (this.startWeekOnSunday) {
        const weekdays = this.weekdays.slice();
        weekdays.unshift(weekdays.pop());
        return weekdays;
      } else {
        return this.weekdays;
      }
    }
  },
  watch: {
    value(value) {
      if (this.isValidValue) {
        this.inputValue = this.valueToInputFormat(value);
        this.currentPeriod = this.getPeriodFromValue(value, this.format);
      }
    },
    currentPeriod(currentPeriod, oldPeriod) {
      const currentDate = new Date(
        currentPeriod.year,
        currentPeriod.month
      ).getTime();
      const oldDate = new Date(oldPeriod.year, oldPeriod.month).getTime();
      this.direction =
        currentDate !== oldDate
          ? currentDate > oldDate
            ? "Next"
            : "Prev"
          : undefined;
    }
  },
  beforeDestroy() {
    this.removeCloseEvents();
    this.teardownPosition();
  },
  methods: {
    valueToInputFormat(value) {
      return !this.displayFormat
        ? value
        : this.formatDateToString(
            this.parseDateString(value, this.format),
            this.displayFormat
          ) || value;
    },
    getPeriodFromValue(dateString, format) {
      const date = this.parseDateString(dateString, format) || new Date();
      return { month: date.getMonth(), year: date.getFullYear() };
    },
    parseDateString(dateString, dateFormat) {
      return !dateString
        ? undefined
        : this.parseDate
        ? this.parseDate(dateString, dateFormat)
        : this.parseSimpleDateString(dateString, dateFormat);
    },
    formatDateToString(date, dateFormat) {
      return !date
        ? ""
        : this.formatDate
        ? this.formatDate(date, dateFormat)
        : this.formatSimpleDateToString(date, dateFormat);
    },
    parseSimpleDateString(dateString, dateFormat) {
      let day, month, year, hours, minutes, seconds;
      const dateParts = dateString.split(formatRE);
      const formatParts = dateFormat.split(formatRE);
      const partsSize = formatParts.length;
      for (let i = 0; i < partsSize; i++) {
        if (formatParts[i].match(dayRE)) {
          day = parseInt(dateParts[i], 10);
        } else if (formatParts[i].match(monthRE)) {
          month = parseInt(dateParts[i], 10);
        } else if (formatParts[i].match(yearRE)) {
          year = parseInt(dateParts[i], 10);
        } else if (formatParts[i].match(hoursRE)) {
          hours = parseInt(dateParts[i], 10);
        } else if (formatParts[i].match(minutesRE)) {
          minutes = parseInt(dateParts[i], 10);
        } else if (formatParts[i].match(secondsRE)) {
          seconds = parseInt(dateParts[i], 10);
        }
      }
      const resolvedDate = new Date(
        [paddNum(year, 4), paddNum(month, 2), paddNum(day, 2)].join("-")
      );
      if (isNaN(resolvedDate)) {
        return undefined;
      } else {
        const date = new Date(year, month - 1, day);
        [
          [year, "setFullYear"],
          [hours, "setHours"],
          [minutes, "setMinutes"],
          [seconds, "setSeconds"]
        ].forEach(([value, method]) => {
          typeof value !== "undefined" && date[method](value);
        });
        return date;
      }
    },
    formatSimpleDateToString(date, dateFormat) {
      return dateFormat
        .replace(yearRE, match => date.getFullYear())
        .replace(monthRE, match => paddNum(date.getMonth() + 1, match.length))
        .replace(dayRE, match => paddNum(date.getDate(), match.length))
        .replace(hoursRE, match => paddNum(date.getHours(), match.length))
        .replace(minutesRE, match => paddNum(date.getMinutes(), match.length))
        .replace(secondsRE, match => paddNum(date.getSeconds(), match.length));
    },
    incrementMonth(increment = 1) {
      const refDate = new Date(
        this.currentPeriod.year,
        this.currentPeriod.month
      );
      const incrementDate = new Date(
        refDate.getFullYear(),
        refDate.getMonth() + increment
      );
      this.currentPeriod = {
        month: incrementDate.getMonth(),
        year: incrementDate.getFullYear()
      };
    },
    processUserInput(userText) {
      const userDate = this.parseDateString(
        userText,
        this.displayFormat || this.format
      );
      this.inputValue = userText;
      this.$emit(
        "input",
        userDate ? this.formatDateToString(userDate, this.format) : userText
      );
    },
    open() {
      if (!this.opened) {
        this.opened = true;
        this.currentPeriod = this.getPeriodFromValue(this.value, this.format);
        this.addCloseEvents();
        this.setupPosition();
      }
      this.direction = undefined;
    },
    close() {
      if (this.opened) {
        this.opened = false;
        this.direction = undefined;
        this.removeCloseEvents();
        this.teardownPosition();
      }
    },
    closeViaOverlay(e) {
      if (this.hasInputElement && e.target === this.$refs.outerWrap) {
        this.close();
      }
    },
    addCloseEvents() {
      if (!this.closeEventListener) {
        this.closeEventListener = e => this.inspectCloseEvent(e);
        ["click", "keyup", "focusin"].forEach(eventName =>
          document.addEventListener(eventName, this.closeEventListener)
        );
      }
    },
    inspectCloseEvent(event) {
      if (event.keyCode) {
        event.keyCode === 27 && this.close();
      } else if (
        !(event.target === this.$el) &&
        !this.$el.contains(event.target)
      ) {
        this.close();
      }
    },
    removeCloseEvents() {
      if (this.closeEventListener) {
        ["click", "keyup"].forEach(eventName =>
          document.removeEventListener(eventName, this.closeEventListener)
        );
        delete this.closeEventListener;
      }
    },
    setupPosition() {
      if (!this.positionEventListener) {
        this.positionEventListener = () => this.positionFloater();
        window.addEventListener("resize", this.positionEventListener);
      }
      this.positionFloater();
    },
    positionFloater() {
      const inputRect = this.$el.getBoundingClientRect();
      let verticalClass = "vdpPositionTop";
      let horizontalClass = "vdpPositionLeft";
      const calculate = () => {
        const rect = this.$refs.outerWrap.getBoundingClientRect();
        const floaterHeight = rect.height;
        const floaterWidth = rect.width;
        if (window.innerWidth > this.mobileBreakpointWidth) {
          // vertical
          if (
            inputRect.top + inputRect.height + floaterHeight >
              window.innerHeight &&
            inputRect.top - floaterHeight > 0
          ) {
            verticalClass = "vdpPositionBottom";
          }
          // horizontal
          if (inputRect.left + floaterWidth > window.innerWidth) {
            horizontalClass = "vdpPositionRight";
          }
          this.positionClass = [
            "vdpPositionReady",
            verticalClass,
            horizontalClass
          ].join(" ");
        } else {
          this.positionClass = "vdpPositionFixed";
        }
      };
      this.$refs.outerWrap ? calculate() : this.$nextTick(calculate);
    },
    teardownPosition() {
      if (this.positionEventListener) {
        this.positionClass = undefined;
        window.removeEventListener("resize", this.positionEventListener);
        delete this.positionEventListener;
      }
    },
    clear() {
      this.$emit("input", "");
    },
    selectDateItem(item) {
      if (!item.disabled) {
        const newDate = new Date(item.date);
        if (this.currentTime) {
          newDate.setHours(this.currentTime.hours);
          newDate.setMinutes(this.currentTime.minutes);
          newDate.setSeconds(this.currentTime.seconds);
        }
        this.$emit("input", this.formatDateToString(newDate, this.format));
        if (this.hasInputElement && !this.pickTime) {
          this.close();
        }
      }
    },
    inputTime(method, event) {
      const currentDate = this.valueDate;
      const maxValues = { setHours: 23, setMinutes: 59, setSeconds: 59 };
      let numValue = parseInt(event.target.value, 10) || 0;
      if (numValue > maxValues[method]) {
        numValue = maxValues[method];
      } else if (numValue < 0) {
        numValue = 0;
      }
      event.target.value = paddNum(numValue, method === "setHours" ? 1 : 2);
      currentDate[method](numValue);
      this.$emit("input", this.formatDateToString(currentDate, this.format));
    }
  }
};
</script>

<style scoped>
/* default color - #7485c2; */

@keyframes vdpSlideFromLeft {
  from {
    opacity: 0;
    transform: translate3d(-0.5em, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes vdpSlideFromRight {
  from {
    opacity: 0;
    transform: translate3d(0.5em, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes vdpToggleCalendar {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes vdpFadeCalendar {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.vdp-toggle-calendar-enter-active.vdpPositionReady {
  transform-origin: top left;
  animation: vdpToggleCalendar 0.2s;
}

.vdp-toggle-calendar-leave-active {
  animation: vdpToggleCalendar 0.15s reverse;
}

.vdp-toggle-calendar-enter-active.vdpPositionFixed {
  animation: vdpFadeCalendar 0.3s;
}

.vdp-toggle-calendar-leave-active.vdpPositionFixed {
  animation: vdpFadeCalendar 0.3s reverse;
}

.vdpComponent {
  position: relative;
  /* display: inline-block; */
  font-size: 10px;
  color: #303030;
}

.vdpComponent.vdpWithInput > input {
  padding-right: 30px;
}

.vdpClearInput {
  font-size: 1em;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 3em;
}

.vdpClearInput:before {
  content: "×";
  width: 1.4em;
  height: 1.4em;
  line-height: 1.1em;
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -0.7em 0 0 -0.7em;
  color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  background-color: #fff;
}

.vdpClearInput:hover:before {
  box-shadow: 0 0.2em 0.5em rgba(0, 0, 0, 0.15);
}

.vdpOuterWrap.vdpFloating {
  position: absolute;
  padding: 0.5em 0;
  z-index: 220;
}

.vdpOuterWrap.vdpPositionFixed {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  padding: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
}

.vdpFloating .vdpInnerWrap {
  max-width: 30em;
}

.vdpPositionFixed .vdpInnerWrap {
  max-width: 30em;
  margin: 0 auto;
  border: 0;
  animation: vdpToggleCalendar 0.3s;
}

.vdpFloating.vdpPositionTop {
  top: 100%;
}
.vdpFloating.vdpPositionBottom {
  bottom: 100%;
}
.vdpFloating.vdpPositionLeft {
  left: 0;
}
.vdpFloating.vdpPositionRight {
  right: 0;
}

.vdpPositionTop.vdpPositionLeft {
  transform-origin: top left;
}
.vdpPositionTop.vdpPositionRight {
  transform-origin: top right;
}
.vdpPositionBottom.vdpPositionLeft {
  transform-origin: bottom left;
}
.vdpPositionBottom.vdpPositionRight {
  transform-origin: bottom right;
}

.vdpInnerWrap {
  overflow: hidden;
  min-width: 28em;
  box-sizing: border-box;
  padding: 1em;
  background: #fff;
  box-shadow: 0 0.2em 1.5em rgba(0, 0, 0, 0.06);
  border-radius: 0.5em;
  border: 1px solid rgba(0, 0, 0, 0.15);
}

.vdpHeader {
  position: relative;
  padding: 0 1em 2.5em;
  margin: -1em -1em -2.5em;
  text-align: center;
  background: #f5f5f5;
}

.vdpClearInput,
.vdpArrow,
.vdpPeriodControl > button {
  margin: 0;
  padding: 0;
  border: 0;
  cursor: pointer;
  background: none;
}

.vdpArrow::-moz-focus-inner,
.vdpClearInput::-moz-focus-inner,
.vdpPeriodControl > button::-moz-focus-inner {
  padding: 0;
  border: 0;
}

.vdpArrow {
  font-size: 1em;
  width: 5em;
  text-indent: -999em;
  overflow: hidden;
  position: absolute;
  top: 0;
  bottom: 2.5em;
  text-align: left;
}

.vdpArrow:before {
  content: "";
  width: 2.2em;
  height: 2.2em;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -1.1em 0 0 -1.1em;
  border-radius: 100%;
  transition: background-color 0.2s;
}

.vdpArrow:hover,
.vdpArrow:focus,
.vdpArrow:active {
  outline: 0;
}

.vdpArrow:hover:before,
.vdpArrow:focus:before {
  background-color: rgba(0, 0, 0, 0.03);
}

.vdpArrow:active:before {
  background-color: rgba(0, 0, 0, 0.07);
}

.vdpArrowNext:before {
  margin-left: -1.4em;
}

.vdpArrow:after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -0.5em;
  width: 0;
  height: 0;
  border: 0.5em solid transparent;
}

.vdpArrowPrev {
  left: -0.3em;
}

.vdpArrowPrev:after {
  margin-left: -0.8em;
  border-right-color: #7485c2;
}

.vdpArrowNext {
  right: -0.6em;
}

.vdpArrowNext:after {
  margin-left: -0.5em;
  border-left-color: #7485c2;
}

.vdpPeriodControl {
  display: inline-block;
  position: relative;
}

.vdpPeriodControl > button {
  font-size: 1.5em;
  padding: 1em 0.4em;
  display: inline-block;
}

.vdpPeriodControl > select {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
  font-size: 1.6em;
}

.vdpTable {
  width: 100%;
  table-layout: fixed;
  position: relative;
  z-index: 5;
}

.vdpNextDirection {
  animation: vdpSlideFromRight 0.5s;
}

.vdpPrevDirection {
  animation: vdpSlideFromLeft 0.5s;
}

.vdpCell,
.vdpHeadCell {
  text-align: center;
  box-sizing: border-box;
}

.vdpCell {
  padding: 0.5em 0;
}

.vdpHeadCell {
  padding: 0.3em 0.5em 1.8em;
}

.vdpHeadCellContent {
  font-size: 1.3em;
  font-weight: normal;
  color: #848484;
}

.vdpCellContent {
  font-size: 1.4em;
  display: block;
  margin: 0 auto;
  width: 1.857em;
  height: 1.857em;
  line-height: 1.857em;
  text-align: center;
  border-radius: 100%;
  transition: background 0.1s, color 0.1s;
}

.vdpCell.outOfRange {
  color: #c7c7c7;
}

.vdpCell.today {
  color: #7485c2;
}

.vdpCell.selected .vdpCellContent {
  color: #fff;
  background: #7485c2;
}

@media (hover: hover) {
  .vdpCell.selectable:hover .vdpCellContent {
    color: #fff;
    background: #7485c2;
  }
}

.vdpCell.selectable {
  cursor: pointer;
}

.vdpCell.disabled {
  opacity: 0.5;
}

.vdpTimeControls {
  padding: 1.2em 2em;
  position: relative;
  margin: 1em -1em -1em;
  text-align: center;
  background: #f5f5f5;
  /*border-top: 1px solid rgba(0,0,0,0.15);*/
}

.vdpTimeUnit {
  display: inline-block;
  position: relative;
  vertical-align: middle;
}

.vdpTimeUnit > pre,
.vdpTimeUnit > input {
  font-size: 1.7em;
  line-height: 1.3;
  padding: 0.1em 0.1em;
  word-wrap: break-word;
  white-space: pre-wrap;
  resize: none;
  margin: 0;
  box-sizing: border-box;
  color: #000;
  border: 0;
  border-bottom: 1px solid transparent;
  text-align: center;
}

.vdpTimeUnit > pre {
  visibility: hidden;
  font-family: inherit;
}

.vdpTimeUnit > input {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  height: 100%;
  width: 100%;
  outline: none;
  padding: 0;
  appearance: none;
  border-radius: 0;
  background: transparent;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.vdpTimeUnit > input:hover,
.vdpTimeUnit > input:focus {
  border-bottom-color: #7485c2;
}

.vdpTimeUnit > input::-webkit-inner-spin-button,
.vdpTimeUnit > input::-webkit-outer-spin-button {
  margin: 0;
  -webkit-appearance: none;
}

.vdpTimeSeparator,
.vdpTimeCaption {
  display: inline-block;
  vertical-align: middle;
  font-size: 1.3em;
  color: #848484;
}

.vdpTimeCaption {
  margin-right: 0.5em;
}
</style>